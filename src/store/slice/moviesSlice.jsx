import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies } from '../../util/api';

export const fetchMoviesData = createAsyncThunk(
    'movies/fetchMoviesData',
    async ({ page, sortBy, genre }) => {
        const response = await fetchMovies(page, sortBy, genre);
        return response.data;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        data: [],
        totalPageNo: 0,
        pageNo: 1,
        genre: '',
        sortBy: 'popularity.desc',
        status: 'idle',
        error: null,
    },
    reducers: {
        resetMovies: (state) => {
            state.data = [];
            state.pageNo = 1;
        },
        setPageNo: (state, action) => {
            state.pageNo = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setGenre: (state, action) => {
            state.genre = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMoviesData.fulfilled, (state, action) => {
                state.data = [...state.data, ...action.payload.results];
                state.totalPageNo = action.payload.total_pages;
                state.status = 'succeeded';
            })
            .addCase(fetchMoviesData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetMovies, setPageNo, setSortBy, setGenre } = moviesSlice.actions;

export default moviesSlice.reducer;
