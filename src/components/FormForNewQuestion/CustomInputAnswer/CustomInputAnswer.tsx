import { ReactElement } from "react";
import styles from "./CustomInputAnswer.module.scss";

const CustomInputAnswer = ({
  index,
  answer,
  handleInputChange,
}: {
  index: number;
  answer: string;
  handleInputChange: (
    index: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}): ReactElement => {
  return (
    <label key={index} className={styles.label}>
      Введите ответ {index + 1}:
      <input
        className={styles.label__input}
        type="text"
        name={`answer-${index}`}
        value={answer}
        onChange={handleInputChange(index)}
      />
    </label>
  );
};

export default CustomInputAnswer;
