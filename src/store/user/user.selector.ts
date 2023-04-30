import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state): UserState => state.user;

export const currentUserSelector = createSelector(
    selectUserReducer,
    (user) => user.currentUser
);
