import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentVideo: null,
    loading: false,
    error: null,
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.currentVideo  = action.payload;
            state.loading = false;
        },
        fetchFailure: (state, action) => {
            state.loading = false;
            state.error = true
        },
    },
  })

export const { fetchStart, fetchSuccess, fetchFailure } = videoSlice.actions;

export default videoSlice.reducer;