import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import {LoginUserModel} from '../user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  token !: string;
  constructor(private formBuilder:FormBuilder,private login : UserService) { }

  ngOnInit(): void {
   this.loginForm=this.formBuilder.group({
    email:[""],
    password:[""]
  },)
   
  }
  Login(){
    this.login.loginUser(this.loginForm).subscribe(res=>{this.token=res;console.log(this.token)});
  }
}
