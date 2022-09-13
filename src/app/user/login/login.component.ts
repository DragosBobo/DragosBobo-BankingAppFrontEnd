import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import {LoginUserModel} from '../user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  
  constructor(private formBuilder:FormBuilder,private login : UserService) { }

  ngOnInit(): void {
   this.loginForm=this.formBuilder.group({
    email:[''],
    password:['']
   })
   
  }
  Login(){
  }
}
