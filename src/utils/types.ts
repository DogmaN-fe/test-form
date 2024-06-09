export interface IQuestion {
  question: string;
  type: string;
  answers?: string[];
  maxLength?: number;
}
