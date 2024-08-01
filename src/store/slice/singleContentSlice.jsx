
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ef6d335af07081934aa88a703974311c';

export const fetchContentDetails = createAsyncThunk(
  'singleContent/fetchContentDetails',
  async ({ id, isMovie }) => {
    const urls = [
      isMovie
        ? `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}`,
      isMovie
        ? `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`,
      `https://api.themoviedb.org/3/genre/${isMovie ? 'movie' : 'tv'}/list?api_key=${API_KEY}`
    ];

    const [similarResponse, recommendationResponse, genreResponse] = await Promise.all(
      urls.map(url => axios.get(url))
    );

    return {
      similarData: similarResponse.data.results,
      recommendationData: recommendationResponse.data.results,
      genreList: genreResponse.data.genres,
    };
  }
);

const singleContentSlice = createSlice({
  name: 'singleContent',
  initialState: {
    similarData: [],
    recommendationData: [],
    genreList: [],
    contentGenres: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setContentGenres: (state, action) => {
      state.contentGenres = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContentDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.similarData = action.payload.similarData;
        state.recommendationData = action.payload.recommendationData;
        state.genreList = action.payload.genreList;
      })
      .addCase(fetchContentDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setContentGenres } = singleContentSlice.actions;

export default singleContentSlice.reducer;
