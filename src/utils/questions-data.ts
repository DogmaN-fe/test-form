import { IQuestion } from "./types";

export const questions: IQuestion[] = [
    {
      question: "test1",
      type: "radio",
      answers: ["1", "2", "3"],
    },
    {
      question: "test2",
      type: "checkbox",
      answers: ["1", "2", "3"],
    },
    {
      question: "test3",
      type: "text",
    },
    {
      question: "test4",
      type: "text",
      maxLength: 15,
    },
    {
      question: "test5",
      type: "number",
    },
    {
      question: "test6",
      type: "color",
    },
    {
      question: "test7",
      type: "date",
    },
  ];