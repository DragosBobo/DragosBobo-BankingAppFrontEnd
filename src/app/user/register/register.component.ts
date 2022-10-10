import { Component, OnDestroy, OnInit } from '@angular/core';
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
  confirmedPasswordError = false;
  constructor(private user: UserService, private router: Router) {}
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
          error: e => (this.error = true),
        });
    } else {
      this.confirmedPasswordError = true;
    }
  }
}
