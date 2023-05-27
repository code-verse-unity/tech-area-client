import { Tag, User } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  /**
   * To show ui when the authentication is in process
   */
  isAuthenticating: true,
};

const userSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    /**
     * setAuth Action is only triggered
     * when the whoAmI api is called
     */
    setAuth: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        authenticated: action.payload,
      };
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuthenticating: action.payload,
      };
    },
    resetAuth: () => {
      return initialState;
    },
  },
});

export const { setAuth, resetAuth, setAuthLoading } = userSlice.actions;

export default userSlice.reducer;
