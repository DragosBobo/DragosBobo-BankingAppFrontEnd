import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../service/user.service';
import { IUserRegisterModel } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  notifier = new Subject();
  error = false;
  constructor(private user: UserService, private router: Router, private snackBar: MatSnackBar) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }
  register(user: IUserRegisterModel) {
    if (user.confirmedPassword === user.password) {
      this.user
        .registerUser(user)
        .pipe(takeUntil(this.notifier))
        .subscribe({
          complete: () => {
            this.router.navigate(['/login']);
          },
          error: e => {
            this.error = true;
          },
        });
    } else {
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this.snackBar.open("passwords doesn't match ", 'x', { duration: 5000 });
  }
}
