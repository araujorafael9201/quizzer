import styles from "./QuizQuestionConfirm.module.css";

export default function QuizQuestionConfirm(props) {
  const correct = props.question.correct;
  console.log(correct);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>{props.question.text}</h1>
        </div>
        {props.question.options.map((opt: string, i: number) =>
          i + 1 == correct ? (
            <p className={`${styles.option} ${styles.correct}`}>{opt}</p>
          ) : (
            <p className={styles.option}>{opt}</p>
          )
        )}
      </div>
    </>
  );
}
