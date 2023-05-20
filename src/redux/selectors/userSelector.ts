import { RootState } from "../store";

/**
 * Return the current user state
 * @param state
 * @returns
 */
export const selectUser = (state: RootState) => state.user;
