import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../../types";
import { questions } from "../../questions-data";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    loadedQuestions: questions as IQuestion[],
  },
  reducers: {
    // Редюсер для добавления нового вопроса
    addNewQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.loadedQuestions = [...state.loadedQuestions, action.payload];
      localStorage.setItem(
        "Question",
        `${JSON.stringify(state.loadedQuestions)}`
      );
    },
    // Редюсер меняет вопросы по умолчанию на собственные
    loadQuestionFromLocalStorage: (
      state,
      action: PayloadAction<IQuestion[]>
    ) => {
      state.loadedQuestions = action.payload;
    },
  },
});

export default questionsSlice.reducer;
export const { addNewQuestion, loadQuestionFromLocalStorage } =
  questionsSlice.actions;
