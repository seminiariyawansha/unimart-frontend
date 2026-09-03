import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from './authTypes';

const initialState: AuthState = {
    accessToken: null,
    email: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; email: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.accessToken = null;
            state.email = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;