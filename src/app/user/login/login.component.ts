import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  subs = new SubSink();
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }
  login() {
    this.subs.add(this.userService.loginUser(this.loginForm).subscribe(res => { console.log(res); this.router.navigate(["/account"]).then(() => window.location.reload()) }));
  }
}
