import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = true
    },
    logout: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        // reload to home after logout
        sessionStorage.setItem('category', 'random');
        window.location.href = '/';
    },
    },
  })

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;