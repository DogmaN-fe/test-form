export interface IQuestion {
  question: string;
  type: string;
  answers?: string[];
  maxLength?: number;
}

export interface IFormNewQuestionData {
  question: string;
  answers: string[];
  typeQuestion: string;
}
