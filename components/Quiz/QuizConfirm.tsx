import styles from "./QuizConfirm.module.css";

import QuizQuestionConfirm from "./QuizQuestionConfirm";

export default function QuizConfirm(props) {
  return (
    <>
      <h1>{props.quiz.title}</h1>
      <h3>{props.quiz.description}</h3>
      <div className={styles.questions}>
        {props.quiz.questions.map((question) => (
          <QuizQuestionConfirm question={question} />
        ))}
      </div>
    </>
  );
}
