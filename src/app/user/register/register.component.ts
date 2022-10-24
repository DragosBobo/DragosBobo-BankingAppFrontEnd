import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  regiterForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userName: new FormControl('', [Validators.required]),
    confirmedPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });
  notifier = new Subject();
  error = false;
  constructor(
    private user: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }
  register() {
    if (this.regiterForm.value.confirmedPassword === this.regiterForm.value.password) {
      this.user
        .registerUser(this.regiterForm.value)
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
