import { AnyAction } from "redux";
import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signOutSuccess, signInFail, signUpFail, signOutFail } from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: Boolean;
    readonly error: Error | null
};

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }

    if(signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null
        }
    }

    if(signInFail.match(action) || signUpFail.match(action) || signOutFail.match(action)) {
        return {
            ...state,
            error: action.payload
        }
    }

    return state   
}
