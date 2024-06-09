import { ReactElement } from "react";
import styles from "./navigation-questions.module.scss";

export default function NavigationQuestions({
  questionsCount,
  currentQuestion,
}: {
  questionsCount: number;
  currentQuestion: number;
}): ReactElement {
  // Создание массива с длиной, равной questionsCount
  const elements = Array.from(
    { length: questionsCount },
    (_, i: number): ReactElement => (
      <span
        key={i}
        className={`${styles.navigation_questions__question} ${
          i > currentQuestion
            ? styles.navigation_questions__question__next
            : i < currentQuestion
            ? styles.navigation_questions__question__done
            : styles.navigation_questions__question__curr
        }`}
      ></span>
    )
  );

  return <div className={styles.navigation_questions}>{elements}</div>;
}
