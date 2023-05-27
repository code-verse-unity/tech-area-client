import { Tag, UserTag } from "@/utils/types";

export interface ServerResponse {
  data: any;
  path: string;
  method: string;
  userAgent: string;
}

export interface TagsResponse extends ServerResponse {
  data: {
    tags: Tag[];
  };
}

export interface QuestionsResponse extends ServerResponse {
  data: {
    questions: Question[];
  };
}

export interface OneQuestionResponse extends ServerResponse {
  data: {
    question: Question;
  };
}

export interface OneAnswerResponse extends ServerResponse {
  data: {
    answer: Answer;
  };
}

export interface WhoAmIResponse extends ServerResponse {
  data: {
    user: User;
  };
}

export interface AuthResponse extends ServerResponse {
  data: {
    user: User;
    tokens: Tokens;
  };
}

export interface UserTagsResponse extends ServerResponse {
  data: {
    tags: UserTag[];
  };
}

export interface Question {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  user: User;
  answers: Answer[];
}
export interface Tokens {
  accessToken: string;
}

export interface User {
  id: number;
  name: Name;
  email: string;
  role: string;
  level: null;
  gender: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  tags: UserTag[];
}

export interface Name {
  first: string;
  last: string;
  full: string;
}

export interface Answer {
  id: number;
  userId: string;
  questionId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  votes: Vote[];
  comments: Comment[];
}

export interface Vote {
  id: number;
  answerId: number;
  userId: number;
  type: "up" | "down";
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}
