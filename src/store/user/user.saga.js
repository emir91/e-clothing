import { takeLatest, call, put, all } from "redux-saga/effects";

import { getCurrentUser, createUserDocumentFromAuth, signinWithGooglePopup, signInEmailPassword } from "../../utils/firebase/firebase.utils";

import { signInSuccess, signInFail } from "./user.action";

import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);


        yield put(signInSuccess({ id: userSnapshot.uid, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signinWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInEmailPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;

        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSaga() {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart)]);
}