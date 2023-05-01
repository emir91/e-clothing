import { compose, legacy_createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
//import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
//import { loggerMiddleware } from "../middleware/logger";

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const middlewares = [
    process.env.NODE_ENV === "development" && logger,
    sagaMiddleware
    //thunk
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig: ExtendedPersistConfig = {
    key: "root",
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
