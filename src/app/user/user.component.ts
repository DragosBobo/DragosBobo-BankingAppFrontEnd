import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { MockLogioginUser, mockUser } from './user.mock';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    //this.userService.registerUser(mockUser).subscribe(response=>console.log(response));
    this.userService.loginUser(MockLogioginUser).subscribe(response => console.log(response));
  }

}
