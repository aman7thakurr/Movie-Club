
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = 'ef6d335af07081934aa88a703974311c';

export const fetchTvShows = createAsyncThunk(
  'tvShows/fetchTvShows',
  async ({ page = 1, genre = '', sortBy = '' }) => {
    const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
      params: {
        api_key: apiKey,
        page,
        with_genres: genre,
        sort_by: sortBy,
      },
    });
    return response.data;
  }
);

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState: {
    data: [],
    totalPageNo: 0,
    pageNo: 1,
    status: 'idle',
    error: null,
    genre: '',
    sortBy: '',
  },
  reducers: {
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTvShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.results;
        state.totalPageNo = action.payload.total_pages;
      })
      .addCase(fetchTvShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPageNo, setGenre, setSortBy } = tvShowsSlice.actions;

export default tvShowsSlice.reducer;
