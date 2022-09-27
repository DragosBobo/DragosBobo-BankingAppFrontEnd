import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SubSink } from 'subsink';
import { UserService } from '../service/user.service';
import { IUserModel } from '../user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm !: FormGroup;
  token !: string;
  notifier = new Subject();
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }
  login() {
    this.userService.loginUser(this.loginForm).pipe(takeUntil(this.notifier)).subscribe(res => { console.log(res); this.router.navigate(["/account"]).then(() => window.location.reload()) });
  }
}
