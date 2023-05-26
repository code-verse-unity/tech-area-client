import { Tag, User } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
};

const userSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      return { authenticated: action.payload };
    },
    resetAuth: () => {
      return initialState;
    },
  },
});

export const { setAuth, resetAuth } = userSlice.actions;

export default userSlice.reducer;
