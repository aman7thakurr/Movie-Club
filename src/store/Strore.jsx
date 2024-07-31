import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slice/homeSlice';
import moviesReducer from './slice/moviesSlice';
// import tvShowsReducer from './slice/tvSeriesSlice'

export const store = configureStore({
    reducer: {
        home: homeReducer,
        movies: moviesReducer,
        // tvShows: tvShowsReducer
    },
});
