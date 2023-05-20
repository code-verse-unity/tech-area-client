export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  user: User;
  title: string;
  content: string;
  tags: string[];
  answers: Answer[];
  createAt: string;
  updateAt: string;
}

export interface Answer {
  id: string;
  content: string;
  questionId: string;
  user: User;
  voteCount: number;
  createdAt: string;
  updatedAt: string;
}
