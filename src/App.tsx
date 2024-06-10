import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IQuestion } from "./utils/types";
import QuestionBlock from "./components/question-block/question-block";
import NavigationQuestions from "./components/navigation-questions/navigation-questions";
import FormForNewQuestion from "./components/form-for-new-question/form-for-new-question";
import { AppDispatch, useAppSelector } from "./utils/redux/store";
import { loadQuestionFromLocalStorage } from "./utils/redux/features/questions-slice";
import styles from "./App.module.scss";

function App() {
  const questions: IQuestion[] = useAppSelector(
    (state) => state.questionsSlice.loadedQuestions
  );

  const [index, setIndex] = useState<number>(0); // Номер вопроса
  const [question, setQuestion] = useState<IQuestion>(questions[index]); // Вопрос
  const [sendForm, setSendForm] = useState<boolean>(false); // Переменная смены функции

  const dispatch = useDispatch<AppDispatch>();
  // Загрузка пользовательских вопросов
  const load = useCallback(
    (newQuestions: IQuestion[]) =>
      dispatch(loadQuestionFromLocalStorage(newQuestions)),
    [dispatch]
  );

  // Функция смены вопроса
  const handleNextQuestion = (): void => {
    setIndex((prevIndex) => {
      // Меняем индекс вопроса
      const newIndex = prevIndex + 1;
      // Меняем вопрос
      setQuestion(questions[newIndex]);
      // Если следующий поврос последний, то меняем текст и функцию input'a с type равным button
      newIndex === questions.length - 1
        ? setSendForm(true)
        : setSendForm(false);
      return newIndex;
    });
  };

  // Функция отправки теста пользователя
  const handleSendTest = () => {
    alert("Тест завершен и отправлен");

    // Сбрасываем все данные
    setIndex(0);
    setQuestion(questions[0]);
    setSendForm(false);
    // Получаем значение, которое хотим оставить
    const valueToKeep = localStorage.getItem("Question");

    // Удаляем все данные из LocalStorage
    localStorage.clear();
    if (valueToKeep !== null) {
      // Записываем обратно значение, которое хотим оставить
      localStorage.setItem("Question", valueToKeep);
    }
  };

  useEffect(() => {
    // Загружаем вопросы из LocalStorage
    const local = localStorage.getItem("Question");
    // Если вопросы есть, то меняем вопросы с обычных на новые
    if (local) {
      const parseLocal: IQuestion[] = JSON.parse(local);
      load(parseLocal);
    }
  }, [load]);

  return (
    <div className={styles.App}>
      <section className={styles.App__section}>
        <h1 className={styles.App__section__title}>Тестирование</h1>
        <NavigationQuestions
          questionsCount={questions.length}
          currentQuestion={index}
        />
        <form action="" className={styles.App__section__form_test}>
          <QuestionBlock {...question} />
          <input
            className={styles.App__section__form_test__button}
            type="button"
            value={sendForm ? "Завершить" : "Следующий"}
            onClick={sendForm ? handleSendTest : handleNextQuestion}
          />
        </form>
        <FormForNewQuestion />
      </section>
    </div>
  );
}

export default App;
