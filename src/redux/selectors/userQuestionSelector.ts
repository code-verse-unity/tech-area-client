import { RootState } from "../store";

/**
 * Return all questions asked by the current user
 * @param state
 * @returns
 */
export const selectUserQuestions = (state: RootState) => state.userQuestions;
