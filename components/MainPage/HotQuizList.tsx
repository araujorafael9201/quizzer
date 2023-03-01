import QuizBox from "./QuizBox";

import styles from "./HotQuizList.module.css";

export default function HotQuizList(props) {
  return (
    <ul className={styles.quizList}>
      {props.items.map((quiz) => (
        <QuizBox key={quiz.id} quiz={quiz} />
      ))}
    </ul>
  );
}
