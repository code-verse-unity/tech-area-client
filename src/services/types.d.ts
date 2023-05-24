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

export interface Tag {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
}

export interface RegisterResponse {
  data: Data;
  path: string;
  method: string;
  userAgent: string;
}

export interface Data {
  user: User;
  tokens: Tokens;
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
  tags: any[];
}

export interface Name {
  first: string;
  last: string;
  full: string;
}
