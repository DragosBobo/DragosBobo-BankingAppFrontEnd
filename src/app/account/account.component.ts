import { Component, OnInit } from '@angular/core';
import { AccountModel } from './account.model';
import { AccountService } from './service/account.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accounts: AccountModel[] = [];

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.fetchAccounts().subscribe(response => {
      this.accounts = response;

    });
  }

}
