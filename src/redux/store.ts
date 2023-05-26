import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import userQuestionReducer from "./reducers/userQuestionSlice";
import authReducer from "./reducers/authSlice";
import { serverApi } from "@/services/serverApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userQuestions: userQuestionReducer,
    auth: authReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
