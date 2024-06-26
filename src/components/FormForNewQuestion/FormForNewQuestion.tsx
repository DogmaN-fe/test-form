import { useCallback, useState } from "react";
import { IFormNewQuestionData, IQuestion } from "../../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/redux/store";
import { addNewQuestion } from "../../utils/redux/features/questionsSlice";

import styles from "./FormForNewQuestion.module.scss";
import SelectTypeOfQuestion from "./SelectTypeQuestion/SelectTypeQuestion";
import CustomInputAnswer from "./CustomInputAnswer/CustomInputAnswer";

export default function FormForNewQuestion() {
  // Переменная для хранения данных о новом вопросе
  const [formData, setFormData] = useState<IFormNewQuestionData>({
    question: "",
    typeQuestion: "radio",
    answers: ["", "", ""],
  });

  const dispatch = useDispatch<AppDispatch>();

  /**
   * Функция сохраняет в store и localStorage новый вопрос
   * @param newQuestion Новый вопрос
   */
  const handleAddingNewQuestion = useCallback(
    (newQuestion: IQuestion) => dispatch(addNewQuestion(newQuestion)),
    [dispatch]
  );

  /**
   * Функция сохраняет ответ на вопрос
   * @param index Номер ответа
   */
  const handleInputChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAnswers = formData.answers.map((answer, i) =>
        i === index ? e.target.value : answer
      );
      setFormData({ ...formData, answers: newAnswers });
    },
    [formData]
  );

  /**
   * Функция сохраняет тип вопроса
   */
  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setFormData({ ...formData, typeQuestion: e.target.value });
    },
    [formData]
  );

  /**
   * Функция сохраняет вопрос
   */
  const handleQuestionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData({ ...formData, question: e.target.value });
    },
    [formData]
  );

  /**
   * Функция добавления нового вопроса
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      const { question, typeQuestion, answers } = formData;

      const isTextType = typeQuestion === "text-15";
      const newQuestion: IQuestion = {
        question,
        type: isTextType ? "text" : typeQuestion,
        answers: answers.filter((answer: string) => answer.trim() !== ""),
        maxLength: isTextType ? 15 : undefined,
      };

      handleAddingNewQuestion(newQuestion);

      setFormData({
        question: "",
        typeQuestion: "radio",
        answers: ["", "", ""],
      });
    },
    [formData, handleAddingNewQuestion]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form_new_question}>
      <SelectTypeOfQuestion
        typeQuestion={formData.typeQuestion}
        handleSelectTypeOfQuestion={handleSelectChange}
      />
      <label className={styles.form_new_question__label}>
        Введите вопрос:
        <input
          className={styles.form_new_question__label_input}
          type="text"
          name="question"
          value={formData.question}
          onChange={handleQuestionChange}
        />
      </label>
      <p className={styles.form_new_question__info}>
        Вводить только для вопросов с выбором
      </p>
      {formData.answers.map((answer: string, index: number) => (
        <CustomInputAnswer
          key={index}
          index={index}
          answer={answer}
          handleInputChange={handleInputChange}
        />
      ))}
      <input
        className={styles.form_new_question__button}
        type="submit"
        value="Добавить"
      />
    </form>
  );
}
