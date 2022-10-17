import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  login() {
    this.userService
      .loginUser(this.loginForm.value)
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.router.navigate(['/account']));
  }
}
