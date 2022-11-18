import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { AppStateInterface } from 'src/app/types/state/appState.interface';
import { sessionSelector } from 'src/app/store/auth/selectors';
import { LogoutComponent } from '../logout/logout.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  session!: string;
  sessionSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppStateInterface>
  ) {
    this.sessionSub = this.store
      .pipe(select(sessionSelector))
      .subscribe((session) => (this.session = session));
  }

  ngOnInit(): void {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }

  openLogoutDialog(): void {
    this.dialog.open(LogoutComponent);
  }

  ngOnDestroy(): void {
    if (this.sessionSub) {
      this.sessionSub.unsubscribe();
    }
  }
}
