const API_BASE_URL = 'https://api.themoviedb.org/3';

export const endpoints = {
  POPULAR: `${API_BASE_URL}/movie/popular`,
  TOP_RATED: `${API_BASE_URL}/movie//top_rated`,
  UPCOMING: `${API_BASE_URL}/movie/upcoming`,
  SEARCH: `${API_BASE_URL}/search/movie`,
  MOVIE: `${API_BASE_URL}/movie`,
};
