import { AccountStateInterface } from '../account/accountState.interface';
import { SessionStateInterface } from '../auth/sessionState.interface';
import { MoviesStateInterface } from '../movies/moviesState.interface';

export interface AppStateInterface {
  movies: MoviesStateInterface;
  auth: SessionStateInterface;
  account: AccountStateInterface;
}
