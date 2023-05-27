import { User } from "@/services/types";
import { UserTag } from "./types";

export const isUser = (value: any): value is { data: User } => {
  return value.data !== undefined;
};

export const isUserTags = (value: any): value is { data: UserTag[] } => {
  return value.data !== undefined;
};
