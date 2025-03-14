"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },

        logout: (state) => {
            state.isLoggedIn = false;
        },

        setAuthState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    },
});

export const { login, logout, setAuthState } = authSlice.actions;

export const authReducer = authSlice.reducer;