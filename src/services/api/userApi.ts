import Client from "@/lib/Client";
import { ENDPOINTS } from "../endpoints";

export const getUsers = async () => {
  try {
    const response = await Client.get(ENDPOINTS.GET_USERS);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users data.");
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await Client.get(ENDPOINTS.GET_USER.replace(":id", id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data.");
  }
};
