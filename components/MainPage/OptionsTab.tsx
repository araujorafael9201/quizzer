import Link from "next/link";

import styles from "./OptionsTab.module.css";

export default function OptionsTab(props) {
  return (
    <ul className={styles.optionsList}>
      <li className={styles.optionDiv}>Search</li>
      <li className={styles.optionDiv}>
        <Link className={styles.option} href={"/quiz/create"}>
          Create New Quiz
        </Link>
      </li>
    </ul>
  );
}
