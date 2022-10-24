import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, TitleStrategy } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../service/user.service';
import { IUserLoginModel, IUserModel } from '../user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  token!: string;
  notifier = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  login() {
    this.userService
      .loginUser(this.loginForm.value)
      .pipe(takeUntil(this.notifier))
      .subscribe({
        complete: () => this.router.navigate(['/account']).then(() => window.location.reload()),
        error: () => this.openSnackBar(),
      });
  }
  openSnackBar() {
    this.snackBar.open('Invalid inputs ', 'x', { duration: 5000 });
  }
}
