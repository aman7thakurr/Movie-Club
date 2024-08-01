import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slice/homeSlice';
import moviesReducer from './slice/moviesSlice';
import tvShowsReducer from './slice/tvShowsSlice'
import webSeriesReducer from './slice/webSeriesSlice'
import singleContentReducer from './slice/singleContentSlice';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        movies: moviesReducer,
        tvShows: tvShowsReducer,
        webSeries: webSeriesReducer,
        singleContent: singleContentReducer,
    },
});
