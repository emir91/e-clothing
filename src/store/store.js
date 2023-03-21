import { compose, legacy_createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
//import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import { loggerMiddleware } from "../middleware/logger";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    process.env.NODE_ENV === "development" && loggerMiddleware,
    sagaMiddleware
    //thunk
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
