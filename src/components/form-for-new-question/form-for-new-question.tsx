import { useState } from "react";
import { IQuestion } from "../../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/redux/store";
import { addNewQuestion } from "../../utils/redux/features/questions-slice";

import styles from "./form-for-new-question.module.scss";

export default function FormForNewQuestion() {
  const [question, setQuestion] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [thirdAnswer, setThirdAnswer] = useState("");
  const [selectValue, setSelectValue] = useState("radio");

  const dispatch = useDispatch<AppDispatch>();

  const handleAddNewQuestion = (newQuestion: IQuestion) =>
    dispatch(addNewQuestion(newQuestion));

  // Функция сохранения первого ответа
  const handleInputChange1 = (e: any) => {
    setFirstAnswer(e.target.value);
  };
  // Функция сохранения второго ответа
  const handleInputChange2 = (e: any) => {
    setSecondAnswer(e.target.value);
  };
  // Функция сохранения третьего ответа
  const handleInputChange3 = (e: any) => {
    setThirdAnswer(e.target.value);
  };

  // Функция сохранения типа вопроса
  const handleSelectChange = (e: any) => {
    setSelectValue(e.target.value);
  };

  // Функция сохранения вопроса
  const handleQuestionChange = (e: any) => {
    setQuestion(e.target.value);
  };

  // Функция добовляет новый вопрос для теста
  const handleSubmit = (e: any) => {
    e.preventDefault();

    handleAddNewQuestion({
      question: question,
      type: selectValue === "text-15" ? "text" : selectValue,
      answers: firstAnswer.length
        ? [firstAnswer, secondAnswer, thirdAnswer]
        : [],
      maxLength: selectValue === "text-15" ? 15 : NaN,
    });

    // Сбрасываем данные вопроса
    setFirstAnswer("");
    setSecondAnswer("");
    setThirdAnswer("");
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_new_question}>
      <label className={styles.form_new_question__select_type}>
        Выберите тип вопроса:
        <select
          className={styles.form_new_question__select_type__select}
          name="inputType"
          value={selectValue}
          onChange={handleSelectChange}
        >
          <option value="radio">Выбор одного варианта</option>
          <option value="checkbox">Выбор нескольких вариантов</option>
          <option value="text-15">Короткий ответ</option>
          <option value="text">Длинный ответ</option>
          <option value="number">Выбор числа</option>
          <option value="color">Выбор цвета</option>
          <option value="date">выбор даты</option>
        </select>
      </label>
      <label className={styles.form_new_question__input}>
        Введите вопрос:
        <input
          type="text"
          name="question"
          value={question}
          onChange={handleQuestionChange}
        />
      </label>
      <p className={styles.form_new_question__info}>
        Вводить только для вопросов с выбором
      </p>
      <label className={styles.form_new_question__input}>
        Введите первый ответ:
        <input
          type="text"
          name="answers"
          value={firstAnswer}
          onChange={handleInputChange1}
        />
      </label>
      <label className={styles.form_new_question__input}>
        Введите второй ответ:
        <input
          type="text"
          name="answers"
          value={secondAnswer}
          onChange={handleInputChange2}
        />
      </label>
      <label className={styles.form_new_question__input}>
        Введите третий ответ:
        <input
          type="text"
          name="answers"
          value={thirdAnswer}
          onChange={handleInputChange3}
        />
      </label>
      <input
        className={styles.form_new_question__button}
        type="submit"
        value="Добавить"
      />
    </form>
  );
}
