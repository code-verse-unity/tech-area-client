import { getUsers } from "./userApi";
import { register } from "./authApi";

export const api = {
  user: {
    getUsers,
  },
  auth: {
    register,
  },
};

export default api;
