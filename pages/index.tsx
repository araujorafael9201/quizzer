import HotQuizList from "../components/MainPage/HotQuizList";
import OptionsTab from "../components/MainPage/OptionsTab";

import { getQuizzes } from "../db/functions";

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

export async function getStaticProps() {
  // Get Hot Quizzes from DB
  const results = await getQuizzes();
  let hotQuizzes = Object.values(JSON.parse(JSON.stringify(results)));
  return {
    props: {
      hotQuizzes,
    },
  };
}
