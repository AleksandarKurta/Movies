import { MovieInterface } from './movie.interface';

export interface MoviesStateInterface {
  movies: MovieInterface[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}
