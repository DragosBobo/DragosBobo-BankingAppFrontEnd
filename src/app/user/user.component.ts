import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import {  mockUser } from './user.mock';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }

}
