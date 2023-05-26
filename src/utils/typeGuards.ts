import { User } from "@/services/types";

export const isUser = (value: any): value is { data: User } => {
  return value.data !== undefined;
};
