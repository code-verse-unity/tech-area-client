import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import userQuestionReducer from "./reducers/userQuestionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userQuestions: userQuestionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
