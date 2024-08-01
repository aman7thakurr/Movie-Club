
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = 'ef6d335af07081934aa88a703974311c';

export const fetchWebSeries = createAsyncThunk(
  'webSeries/fetchWebSeries',
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

const webSeriesSlice = createSlice({
  name: 'webSeries',
  initialState: {
    data: [],
    totalPageNo: 0,
    pageNo: 1,
    status: 'idle',
    error: null,
    genre: '',
    sortBy: '',
    hasMore: true,
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
      .addCase(fetchWebSeries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWebSeries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.page === 1) {
          state.data = action.payload.results;
        } else {
          state.data = [...state.data, ...action.payload.results];
        }
        state.totalPageNo = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(fetchWebSeries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPageNo, setGenre, setSortBy } = webSeriesSlice.actions;

export default webSeriesSlice.reducer;
