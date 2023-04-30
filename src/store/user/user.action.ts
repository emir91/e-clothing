import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { UserData, AdditionalInformation } from "../../utils/firebase/firebase.utils";

type SetCurrentUserAction = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;
type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;
type SignInSucces = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;
type SignInFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAIL, Error>;
type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {email: string, password: string, displayName: string}>;
type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user: UserData, additionalDetails: AdditionalInformation}>;
type SignUpFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAIL, Error>;
type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
type SignOutFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAIL, Error>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUserAction => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = withMatcher((user: UserData): SignInSucces => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFail = withMatcher((error: Error): SignInFail => createAction(USER_ACTION_TYPES.SIGN_IN_FAIL, error));

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName }));

export const signUpSuccess = withMatcher((user: UserData, additionalDetails: AdditionalInformation): SignUpSuccess => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }));

export const signUpFail = withMatcher((error: Error): SignUpFail => createAction(USER_ACTION_TYPES.SIGN_UP_FAIL, error));

export const signOutStart = withMatcher((): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export const signOutFail = withMatcher((error: Error): SignOutFail => createAction(USER_ACTION_TYPES.SIGN_OUT_FAIL, error));
