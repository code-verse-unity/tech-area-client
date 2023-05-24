export interface User {
  id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "user";
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

export interface Question {
  id: string;
  user: User;
  title: string;
  content: string;
  tags: Tag[];
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
export interface Tag {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
}
