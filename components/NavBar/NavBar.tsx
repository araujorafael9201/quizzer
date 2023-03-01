import Link from "next/link";

import styles from "./NavBar.module.css";

export default function Navbar(props) {
  return (
    <nav className={styles.navBar}>
      <Link href={"/"} className={styles.brand}>
        Quizzer
      </Link>
      <ul className={styles.navButtons}>
        <li>
          <Link className={styles.navItem} href={"/auth/login"}>
            Login
          </Link>
        </li>
        <li>
          <Link className={styles.navItem} href={"/auth/signup"}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
