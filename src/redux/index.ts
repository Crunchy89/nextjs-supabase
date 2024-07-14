"use client";
import { persistReducer } from "redux-persist";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./lib/authSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import logger from "redux-logger";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

// Configure the persist options
const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["isLoggedIn"],
};

// Create the persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Combine the reducers
const rootReducer = combineReducers({
    auth: persistedAuthReducer,
});

// Configure the store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false, logger: logger }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;