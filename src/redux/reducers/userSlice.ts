import { User } from "@/services/types";
import { Tag } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: 0,
  name: {
    first: "",
    last: "",
    full: "",
  },
  email: "",
  gender: null,
  level: null,
  imageUrl: "",
  role: "user",
  createdAt: "",
  updatedAt: "",
  tags: [],
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    setUserTags: (state, action: PayloadAction<Tag[]>) => {
      return {
        ...state,
        tags: action.payload,
      };
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, setUserTags, resetUser } = userSlice.actions;

export default userSlice.reducer;
