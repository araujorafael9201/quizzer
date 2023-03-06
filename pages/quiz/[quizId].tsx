import Router from "next/router";
import { useState, useRef } from "react";

import { getAllQuizzesIds, getSingleQuiz } from "../../db/functions";

import styles from "./quizId.module.css";

export default function Quiz(props) {
  const [curQuestion, setCurQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(1);

  const optionsRef = useRef<HTMLDivElement>();

  const quiz = {
    title: props.questions[0].title,
    description: props.questions[0].description,
  };

  function selectOption(e) {
    e.target.classList.add(styles.selected);

    const options = Array.from(optionsRef.current.children);
    options.forEach((opt: HTMLButtonElement) => {
      if (opt !== e.target) {
        opt.classList.remove(styles.selected);
      }
    });

    setSelectedOption(e.target.id);
  }

  function sendResponse() {
    if (selectedOption != 0) {
      // Check if it is correct
      if (selectedOption == props.questions[curQuestion].correct) {
        setScore(score + 1);
      }

      // Go to next question
      setCurQuestion(curQuestion + 1);
      setSelectedOption(0);

      const options = Array.from(optionsRef.current.children);
      options.forEach((opt: HTMLButtonElement) => {
        opt.classList.remove(styles.selected);
      });
    }
  }

  function goToHome() {
    Router.push("/");
  }

  return (
    <div className={styles.container}>
      {curQuestion < 4 ? (
        <>
          <h1 className={styles.title}>{quiz.title}</h1>
          <h2 className={styles.question}>
            {props.questions[curQuestion].text}
          </h2>
          <div ref={optionsRef} className={styles.options}>
            {JSON.parse(props.questions[curQuestion].options).map(
              (option, i) => (
                <button
                  id={i + 1}
                  className={styles.option}
                  onClick={selectOption}
                >
                  {option}
                </button>
              )
            )}
          </div>
          <button className={styles.send} onClick={sendResponse}>
            Confirm
          </button>
        </>
      ) : (
        <>
          <h1 className={styles.finished}>
            Finished! Your score is {score}pts.
          </h1>
          <button className={styles.send} onClick={goToHome}>
            Back to Home
          </button>
        </>
      )}
    </div>
  );
}

export async function getStaticPaths(context) {
  const ids = await getAllQuizzesIds();

  const paths = [];
  ids.forEach((obj) => {
    paths.push({
      params: {
        quizId: String(obj.id),
      },
    });
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { quizId } = context.params;

  const questions = await getSingleQuiz(quizId);
  let convertedQuestions = Object.values(JSON.parse(JSON.stringify(questions)));

  return {
    props: { questions: convertedQuestions },
  };
}
