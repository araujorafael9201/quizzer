import { GetStaticProps } from "next";

import HotQuizList from "../components/MainPage/HotQuizList";
import OptionsTab from "../components/MainPage/OptionsTab";

import styles from "./index.module.css";

export default function MainPage(props) {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.sectionTitle}>Hot Quizzes</h1>
        <HotQuizList items={props.hotQuizzes} />
      </div>
      <div>
        <h1 className={styles.sectionTitle}>Options</h1>
        <OptionsTab />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Get Hot Quizzes from DB
  const hotQuizzes = [
    {
      id: 1,
      title: "Title",
      description: "Description",
      created_at: "11-04-04",
      imgUrl: "https://picsum.photos/500",
      questions: [
        {
          text: "Question",
          options: ["Option 01", "Option 02", "Option 03", "Option 04"],
          correct: 1,
        },
        {
          text: "Question",
          options: ["Option 01", "Option 02", "Option 03", "Option 04"],
          correct: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Title",
      description: "Description",
      created_at: "11-04-04",
      imgUrl: "https://picsum.photos/500",
      questions: [
        {
          text: "Question",
          options: ["Option 01", "Option 02", "Option 03", "Option 04"],
          correct: 1,
        },
        {
          text: "Question",
          options: ["Option 01", "Option 02", "Option 03", "Option 04"],
          correct: 2,
        },
      ],
    },
  ];

  return {
    props: {
      hotQuizzes,
    },
  };
};
