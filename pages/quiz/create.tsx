import Router from "next/router";
import { useState, useRef } from "react";

import { validateQuizTitle } from "../../utils/validateData";
import QuizConfirm from "../../components/Quiz/QuizConfirm";

import styles from "./create.module.css";

export default function CreateQuiz(props) {
  // Must be logged in to access
  const [formStep, setFormStep] = useState(0);
  const [data, setData] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const formRef = useRef();
  function clearSingleInput(input: any) {
    input.value = "";
    return;
  }

  function clearInputs(ref: HTMLElement) {
    const formChildren = ref.children;
    const formChildrenArray = Array.from(formChildren);

    formChildrenArray.map((c: HTMLElement) => {
      if (c.tagName === "DIV") {
        // Recursively calls itself to clear all inputs inside the form, event if they are in inner divs
        clearInputs(c);
      } else if (c.tagName === "INPUT") {
        clearSingleInput(c);
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formStep);

    if (formStep == 0) {
      const { title, description } = e.target;

      if (!validateQuizTitle(title.value)) {
        // Somehow show error message
      } else {
        setData({
          title: title.value,
          description: description.value,
          questions: data.questions,
        });
        clearInputs(formRef.current);
        setFormStep(formStep + 1);
      }

      return;
    }

    const { question, option1, option2, option3, option4, correct } = e.target;
    const newQuestion = {
      text: question.value,
      options: [option1.value, option2.value, option3.value, option4.value],
      correct: correct.value,
    };

    const newData = { ...data, questions: [...data.questions, newQuestion] };

    setData(newData);
    clearInputs(formRef.current);

    setFormStep(formStep + 1);

    return;
  }

  async function saveQuiz() {
    // Save quiz
    const res: Response = await fetch("/api/quiz/create", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });

    if (res.status == 201) {
      Router.push("/");
      return;
    }

    res.json().then((r) => {
      alert(r.message);
    });
  }

  function generateInput() {
    // Generates the right inputs for each option in the quiz
    if (formStep == 0) {
      return (
        <>
          <h1>New Quiz</h1>
          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title:</label>
              <input
                className={styles.input}
                type="text"
                placeholder="title"
                name="title"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description:</label>
              <input
                className={styles.input}
                type="text"
                placeholder="title"
                name="description"
                required
              />
            </div>
            <input className={styles.btnSubmit} type="submit" value="Next" />
          </form>
        </>
      );
    }
    if (formStep <= 4) {
      return (
        <>
          <h1>Question {formStep}</h1>
          <form
            className={styles.questionForm}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className={styles.formGroup}>
              <label htmlFor="question">Question:</label>
              <input className={styles.input} type="text" name="question" />
            </div>
            <div>
              <div className={styles.formGroup}>
                <label htmlFor="option1">Option 1:</label>
                <input
                  className={styles.input}
                  type="text"
                  name="option1"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="option2">Option 2:</label>
                <input
                  className={styles.input}
                  type="text"
                  name="option2"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="option3">Option 3:</label>
                <input
                  className={styles.input}
                  type="text"
                  name="option3"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="option4">Option 4:</label>
                <input
                  className={styles.input}
                  type="text"
                  name="option4"
                  required
                />
              </div>
            </div>

            <div>
              <div className={styles.correct}>
                <h3>Correct Answer: </h3>
                <select className={styles.input} name="correct">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <input className={styles.input} type="submit" value="next" />
            </div>
          </form>
        </>
      );
    }

    if (formStep == 5) {
      return (
        <>
          <h1 className={styles.title}>Finished!</h1>
          <QuizConfirm quiz={data} />
          <button className={styles.btnSubmit} onClick={saveQuiz}>
            Confirm
          </button>
        </>
      );
    }
  }

  return <div className={styles.container}>{generateInput()}</div>;
}
