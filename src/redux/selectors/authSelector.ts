import { RootState } from "../store";

/**
 * Return either the user is authenticated or not
 * @param state
 * @returns boolean
 */
export const selectAuth = (state: RootState) => state.auth.authenticated;
