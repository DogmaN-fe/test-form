import { ChangeEventHandler, ReactElement } from "react";
import styles from "./select-type-question.module.scss";

const SelectTypeOfQuestion = ({
  typeQuestion,
  handleSelectTypeOfQuestion,
}: {
  typeQuestion: string;
  handleSelectTypeOfQuestion: ChangeEventHandler<HTMLSelectElement>;
}): ReactElement => {
  return (
    <label className={styles.label__select_type}>
      Выберите тип вопроса:
      <select
        className={styles.label__select_type__select}
        name="inputType"
        value={typeQuestion}
        onChange={handleSelectTypeOfQuestion}
      >
        <option value="radio">Выбор одного варианта</option>
        <option value="checkbox">Выбор нескольких вариантов</option>
        {/* type="text-15" нужен для создания вопроса с коротким ответом */}
        <option value="text-15">Короткий ответ</option>
        <option value="text">Длинный ответ</option>
        <option value="number">Выбор числа</option>
        <option value="color">Выбор цвета</option>
        <option value="date">Выбор даты</option>
      </select>
    </label>
  );
};

export default SelectTypeOfQuestion;
