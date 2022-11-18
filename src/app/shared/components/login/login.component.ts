import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AppStateInterface } from 'src/app/types/state/appState.interface';
import { Store } from '@ngrx/store';
import * as AuthAction from '../../../store/auth/actions';
import { AccountService } from 'src/app/services/account/account.service';
import * as AccountAction from '../../../store/account/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  profileForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  private userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private store: Store<AppStateInterface>,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.profileForm.valid) {
      return;
    }
    this.authService
      .createToken()
      .pipe(
        mergeMap((resp: any) => {
          return this.authService
            .validateWithLogin(resp.request_token, this.profileForm.value)
            .pipe(
              map((resp) => {
                return resp;
              }),
              catchError((error) => of(error))
            );
        }),
        mergeMap((resp: any) => {
          if (resp.success) {
            return this.authService.authenticationSession(resp.request_token);
          }
          // Catch error
          console.log('resp 1', resp);
          return resp;
        }),
        mergeMap((resp: any) => {
          localStorage.setItem('sessionId', resp.session_id);

          this.store.dispatch(
            AuthAction.getSession({
              session: true,
              sessionId: resp.session_id,
            })
          );

          return this.accountService.getUserDetails(resp.session_id);
        }),
        mergeMap((resp: any) => {
          this.userId = resp.id;
          const page = 1;

          return of(
            this.store.dispatch(
              AccountAction.getRatedMovies({
                userId: this.userId,
                page: 1,
              })
            )
          );
        })
        // mergeMap((resp: any) => {
        //   if (resp.page < resp.total_pages) {
        //     for (let page = resp.page + 1; page <= resp.total_pages; page++) {
        //       return this.accountService.getRatedMovies(this.userId, page);
        //     }
        //   }

        //   return this.accountService.getRatedMovies(this.userId, 1);
        // })
      )
      .subscribe({
        next: (resp: any) => {
          console.log('resp', resp);

          this.dialogRef.close();
        },
        error: (e) => console.error('error', e),
        complete: () => console.info('complete'),
      });
  }
}
