import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const currentUserSelector = createSelector(
    selectUserReducer,
    (user) => user.currentUser
);
