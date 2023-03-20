import { compose, legacy_createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('Type: ', action.type);
    console.log('Payload: ', action.payload);
    console.log('Current State: ', store.getState());

    next(action);

    console.log('Next state: ', store.getState());
}

const middlewares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = legacy_createStore(rootReducer, undefined, composedEnhancers);
export const persistor = persistStore(persistReducer);
