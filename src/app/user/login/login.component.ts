import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  token!: string;
  currentUser!: IUserModel;
  notifier = new Subject();
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  login(form: IUserLoginModel) {
    this.userService
      .loginUser(form)
      .pipe(takeUntil(this.notifier))
      .subscribe(response => {
        this.currentUser = response;
        console.log(this.currentUser);
        this.router.navigate(['/account']).then(() => window.location.reload());
      });
  }
}
