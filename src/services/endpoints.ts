// create endpoint constants
export const ENDPOINTS = {
  // user resources
  GET_USERS: "/users",
  GET_USER: "/users/:id",
  GET_USER_QUESTIONS: "/users/:userId/questions",
  CREATE_USER: "/users",
  UPDATE_USER: "/users/:id",
  DELETE_USER: "/users/:id",
  CREATE_USER_TAGS: "/users/:userId/usertags",

  // auth
  REGISTER_LOCAL: "/auth/register/local",
  LOGIN_LOCAL: "/auth/login/local",
  WHO_AM_I: "/auth/whoami",

  // question resources
  GET_QUESTIONS: "/questions",
  GET_ONE_QUESTION: "/questions/:questionId",
  GET_QUESTION_TAGS: "/questions/:questionId/tags",
  CREATE_QUESTION: "/questions",
  DELETE_QUESTION: "/questions/:questionId",

  // tag resources
  GET_TAGS: "/tags",

  // answer resources
  GET_ONE_ANSWER: "/answers/:answerId",
};
