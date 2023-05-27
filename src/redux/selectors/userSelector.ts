import { RootState } from "../store";

/**
 * Return the current user state
 * @param state
 * @returns
 */
export const selectUser = (state: RootState) => state.user;

/**
 * Return the id of the current user state
 * @param state
 * @returns
 */
export const selectUserId = (state: RootState) => state.user.id;
