// create endpoint constants
export const ENDPOINTS = {
  // user resources
  GET_USERS: "/users",
  GET_USER: "/users/:id",
  CREATE_USER: "/users",
  UPDATE_USER: "/users/:id",
  DELETE_USER: "/users/:id",

  // auth
  REGISTER_LOCAL: "/auth/register/local",

  // question resources
  GET_QUESTIONS: "/questions",
  GET_QUESTION_TAGS: "/questions/:questionId/tags",

  // tag resources
  GET_TAGS: "/tags",
};
