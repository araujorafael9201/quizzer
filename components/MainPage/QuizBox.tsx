import Image from "next/image";

import styles from "./QuizBox.module.css";

export default function QuizBox(props) {
  console.log(props.quiz);
  return (
    <li>
      <div className={styles.container}>
        <Image
          className={styles.quizImg}
          alt={props.quiz.title}
          src={props.quiz.image_url}
          width={100}
          height={100}
        />
        <div className={styles.quizContent}>
          <h3 className={styles.quizTitle}>{props.quiz.title}</h3>
          <p className={styles.quizDescription}>{props.quiz.description}</p>
        </div>
      </div>
    </li>
  );
}
