import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  token !: string;
  constructor(private formBuilder: FormBuilder, private login: UserService,private router:Router) { }

 
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }
  Login() {
    this.login.loginUser(this.loginForm).subscribe(res =>{ localStorage.setItem("token", res);this.router.navigate(['/account'])});
  }
}
