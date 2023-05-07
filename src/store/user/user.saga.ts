import { takeLatest, call, put, all } from "typed-redux-saga/macro";
import { User } from "firebase/auth";

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signinWithGooglePopup,
    signInEmailPassword,
    createUserEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from "../../utils/firebase/firebase.utils";

import {
    signInSuccess,
    signInFail,
    signUpSuccess,
    signUpFail,
    signOutSuccess,
    signOutFail,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess
} from "./user.action";

import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);

        if(userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield* put(signInFail(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;

        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFail(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signinWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFail(error as Error));
    }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInEmailPassword, email, password);

        if(userCredential) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFail(error as Error));
    }
}

export function* signUpUser({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const userCredential = yield* call(
            createUserEmailAndPassword,
            email,
            password
        );

        if(userCredential) {
            const { user } = userCredential;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFail(error as Error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails }}: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFail(error as Error))
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield* all(
        [
            call(onCheckUserSession),
            call(onGoogleSignInStart),
            call(onEmailSignInStart),
            call(onSignUpStart),
            call(onSignUpSuccess),
            call(onSignOutStart)
        ]
    );
}
