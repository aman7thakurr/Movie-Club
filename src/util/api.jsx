import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'ef6d335af07081934aa88a703974311c', 
    },
});

export const fetchPopular = () => api.get('movie/popular');
export const fetchTrending = () => api.get('trending/movie/week');
export const fetchTopRated = () => api.get('discover/movie');

export const fetchMovies = (page, sortBy, genre) => api.get('discover/movie', {
  params: {
      page,
      sort_by: sortBy,
      with_genres: genre, 
  },
});
export const fetchTvShows = (page, sortBy, genre) => api.get('discover/tv', {
    params: {
        page,
        sort_by: sortBy,
        with_genres: genre, 
    },
});