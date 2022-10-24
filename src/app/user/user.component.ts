import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  displayedColumns = ['accounts', 'email'];
  constructor(public userService: UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
