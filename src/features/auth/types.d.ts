import { Tag } from "@/utils/types";

export interface RegisterValues {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  role?: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface TagsValue {
  tags: string[];
}
