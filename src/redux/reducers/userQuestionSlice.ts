import { Question, User } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Question[] = [];

const userSlice = createSlice({
  initialState,
  name: "userQuestions",
  reducers: {
    setUserQuestions: (state, action: PayloadAction<Question[]>) => {
      return action.payload;
    },
    addUserQuestion: (state, action: PayloadAction<Question>) => {
      return [...state, action.payload];
    },
    removeUserQuestion: (state, action: PayloadAction<string>) => {
      return state.filter((question) => question.id !== action.payload);
    },
    updateUserQuestion: (state, action: PayloadAction<Question>) => {
      return state.map((question) => {
        if (question.id === action.payload.id) {
          return action.payload;
        }
        return question;
      });
    },
  },
});

export const {
  setUserQuestions,
  addUserQuestion,
  removeUserQuestion,
  updateUserQuestion,
} = userSlice.actions;

export default userSlice.reducer;
