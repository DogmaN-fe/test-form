import { IQuestion } from "./types";

export const questions: IQuestion[] = [
    {
      question: "1 + 1?",
      type: "radio",
      answers: ["1", "2", "3"],
    },
    {
      question: "День",
      type: "checkbox",
      answers: ["Грустный", "Хороший", "Новый"],
    },
    {
      question: "Введите 'слово' 15 раз",
      type: "text",
    },
    {
      question: "Имя Пушкина",
      type: "text",
      maxLength: 15,
    }
  ];