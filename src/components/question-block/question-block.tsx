import { ReactElement, useEffect, useState } from "react";
import styles from "./question-block.module.scss";

export default function QuestionBlock({
  question,
  type,
  answers,
  maxLength,
}: {
  question: string;
  type: string;
  answers?: string[];
  maxLength?: number;
}): ReactElement {
  const [userAnswer, setUserAnswer] = useState<string[]>([]);

  useEffect(() => {
    // Получаем данные ответов из LocalStorage
    const savedAnswer = localStorage.getItem(question);
    if (savedAnswer) {
      // Парсим сохраненный ответ, так как он хранится в виде строки
      setUserAnswer(JSON.parse(savedAnswer));
    } else {
      // Если ответа пользователя на вопрос нет, очищаем userAnswer от предыдущего ответа
      setUserAnswer([]);
    }
  }, [question]);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, checked } = event.target;
    let newAnswer: string[] = [...userAnswer];

    switch (type) {
      case "checkbox":
        if (checked) {
          // Добавляем выбранный ответ, если checkbox отмечен
          newAnswer = [...newAnswer, value];
        } else {
          // Удаляем ответ, если checkbox не отмечен
          newAnswer = newAnswer.filter((answer) => answer !== value);
        }
        break;
      case "radio":
        // Для radio кнопок всегда будет только один ответ
        newAnswer = [value];
        break;
      default:
        // Для текстовых полей просто сохраняем значение
        newAnswer = [value];
        break;
    }

    setUserAnswer(newAnswer);
    // Сохраняем в localStorage в виде строки
    localStorage.setItem(question, JSON.stringify(newAnswer));
  };

  return (
    <label key={question} className={styles.question_block}>
      <p className={styles.question_block__question}>{question}</p>
      {answers?.length ? (
        answers.map((el) => (
          <>
            <input
              key={el}
              className={styles.question_block__answer}
              type={type}
              name={question}
              value={el}
              onChange={handleAnswerChange}
              checked={userAnswer.includes(el) ? true : false}
            />
            {el}
            <br />
          </>
        ))
      ) : (
        <input
          className={styles.question_block__answer}
          type={type}
          name={question}
          value={userAnswer}
          maxLength={maxLength}
          placeholder={maxLength ? `Максимально количество символов: ${maxLength}` : ''}
          onChange={handleAnswerChange}
        />
      )}
    </label>
  );
}
