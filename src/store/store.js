import { compose, legacy_createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";
import { loggerMiddleware } from "../middleware/logger";

const middlewares = [process.env.NODE_ENV === "development" && loggerMiddleware, thunk].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);
