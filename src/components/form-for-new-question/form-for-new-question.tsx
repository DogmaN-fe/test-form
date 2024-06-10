import { useState } from "react";
import { IQuestion } from "../../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/redux/store";
import { addNewQuestion } from "../../utils/redux/features/questions-slice";

import styles from "./form-for-new-question.module.scss";
import SelectTypeOfQuestion from "../select-type-question/select-type-question";

export default function FormForNewQuestion() {
  const [question, setQuestion] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [thirdAnswer, setThirdAnswer] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("radio");

  const dispatch = useDispatch<AppDispatch>();

  const handleAddingNewQuestion = (newQuestion: IQuestion) =>
    dispatch(addNewQuestion(newQuestion));

  // Функция сохранения первого ответа
  const handleInputFirstAnswer = (e: any) => {
    setFirstAnswer(e.target.value);
  };
  // Функция сохранения второго ответа
  const handleInputSecondAnswer = (e: any) => {
    setSecondAnswer(e.target.value);
  };
  // Функция сохранения третьего ответа
  const handleInputThirdAnswer = (e: any) => {
    setThirdAnswer(e.target.value);
  };

  // Функция сохранения типа вопроса
  const handleSelectTypeOfQuestion = (e: any) => {
    setTypeQuestion(e.target.value);
  };

  // Функция сохранения вопроса
  const handleInputQuestion = (e: any) => {
    setQuestion(e.target.value);
  };

  // Функция добовляет новый вопрос для теста
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Добавление нового вопроса
    handleAddingNewQuestion({
      question: question,
      type: typeQuestion === "text-15" ? "text" : typeQuestion,
      answers: firstAnswer.length
        ? [firstAnswer, secondAnswer, thirdAnswer]
        : [],
      maxLength: typeQuestion === "text-15" ? 15 : NaN,
    });

    // Сбрасываем данные вопроса
    setFirstAnswer("");
    setSecondAnswer("");
    setThirdAnswer("");
    setQuestion("");
    setTypeQuestion("radio");
  };

  
  return (
    <form onSubmit={handleSubmit} className={styles.form_new_question}>
      <SelectTypeOfQuestion typeQuestion={typeQuestion} handleSelectTypeOfQuestion={handleSelectTypeOfQuestion}/>
      <label className={styles.form_new_question__input}>
        Введите вопрос:
        <input
          className={styles.form_new_question__input_i}
          type="text"
          name="question"
          value={question}
          onChange={handleInputQuestion}
        />
      </label>
      <p className={styles.form_new_question__info}>
        Вводить только для вопросов с выбором
      </p>
      <label className={styles.form_new_question__input}>
        Введите первый ответ:
        <input
          className={styles.form_new_question__input_i}
          type="text"
          name="answers"
          value={firstAnswer}
          onChange={handleInputFirstAnswer}
        />
      </label>
      <label className={styles.form_new_question__input}>
        Введите второй ответ:
        <input
          className={styles.form_new_question__input_i}
          type="text"
          name="answers"
          value={secondAnswer}
          onChange={handleInputSecondAnswer}
        />
      </label>
      <label className={styles.form_new_question__input}>
        Введите третий ответ:
        <input
          className={styles.form_new_question__input_i}
          type="text"
          name="answers"
          value={thirdAnswer}
          onChange={handleInputThirdAnswer}
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
