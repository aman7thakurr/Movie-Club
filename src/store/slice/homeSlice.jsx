import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopular, fetchTrending, fetchTopRated } from '../../util/Api';

export const fetchPopularData = createAsyncThunk('home/fetchPopularData', async () => {
    const response = await fetchPopular();
    return response.data.results;
});

export const fetchTrendingData = createAsyncThunk('home/fetchTrendingData', async () => {
    const response = await fetchTrending();
    return response.data.results;
});

export const fetchTopRatedData = createAsyncThunk('home/fetchTopRatedData', async () => {
    const response = await fetchTopRated();
    return response.data.results;
});

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        popular: [],
        trending: [],
        topRated: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPopularData.fulfilled, (state, action) => {
                state.popular = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPopularData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTrendingData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrendingData.fulfilled, (state, action) => {
                state.trending = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchTrendingData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTopRatedData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopRatedData.fulfilled, (state, action) => {
                state.topRated = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchTopRatedData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default homeSlice.reducer;
