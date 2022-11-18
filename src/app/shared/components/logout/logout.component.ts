import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/state/appState.interface';
import * as AuthAction from '../../../store/auth/actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {}

  logout(): void {
    localStorage.removeItem('sessionId');
    this.store.dispatch(
      AuthAction.getSession({
        session: false,
        sessionId: null,
      })
    );
  }
}
