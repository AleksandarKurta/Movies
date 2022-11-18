export const API_BASE_URL = 'https://api.themoviedb.org';

export const endpoints = {
  POPULAR: `${API_BASE_URL}/3/movie/popular`,
  TOP_RATED: `${API_BASE_URL}/3/movie//top_rated`,
  UPCOMING: `${API_BASE_URL}/3/movie/upcoming`,
  SEARCH: `${API_BASE_URL}/3/search/movie`,
  MOVIE: `${API_BASE_URL}/3/movie`,
  CREATE_TOKEN: `${API_BASE_URL}/3/authentication/token/new`,
  AUTHENTICATE: `${API_BASE_URL}/authenticate`,
  VALIDATE_WITH_LOGIN: `${API_BASE_URL}/3/authentication/token/validate_with_login`,
  AUTHENTICATION_SESSION: `${API_BASE_URL}/3/authentication/session/new`,
};
