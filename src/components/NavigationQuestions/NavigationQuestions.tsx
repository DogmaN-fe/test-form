import { ReactElement } from "react";
import styles from "./NavigationQuestions.module.scss";

export default function NavigationQuestions({
  questionsCount,
  currentQuestion,
}: {
  questionsCount: number;
  currentQuestion: number;
}): ReactElement {
  return (
    <div className={styles.navigation_questions}>
      {Array.from({ length: questionsCount }).map((_, i) => (
        <span
          key={i}
          className={`${styles.navigation_questions__question} ${
            i > currentQuestion
              ? styles.navigation_questions__question__next
              : i < currentQuestion
              ? styles.navigation_questions__question__done
              : styles.navigation_questions__question__curr
          }`}
          role="button"
          aria-label={`Перейти к вопросу ${i + 1}`}
        ></span>
      ))}
    </div>
  );
}
