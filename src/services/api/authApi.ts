import Client from "@/lib/Client";
import { ENDPOINTS } from "../endpoints";
import { RegisterResponse } from "../types";
import { RegisterValues } from "@/features/auth/types";

export const register = async (data: RegisterValues) => {
  // console.log(data);

  try {
    const response = await Client.post<RegisterResponse>(
      ENDPOINTS.REGISTER_LOCAL,
      {
        ...data,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users data.");
  }
};
