import { User } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "user",
  createdAt: "",
  updatedAt: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
