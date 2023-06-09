import { Answer, Question, User } from "@/services/types";
import { UserTag } from "./types";

export const isUser = (value: any): value is { data: User } => {
  return value.data !== undefined;
};

export const isUserTags = (value: any): value is { data: UserTag[] } => {
  return value.data !== undefined;
};

export const isQuestion = (value: any): value is { data: Question } => {
  return value.data !== undefined;
};

export const isAnswer = (value: any): value is { data: Answer } => {
  return value.data !== undefined;
};
