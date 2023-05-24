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
