import { Component, OnInit } from '@angular/core';
import { AccountModel, CreateAccountModel } from './account.model';
import { AccountService } from './service/account.service';
import { AccountId, MockAccount } from './account.mock';

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
    // this.accountService.createAccounts(MockAccount).subscribe();
    // this.accountService.deleteAccount(AccountId).subscribe();
    // this.accountService.updateAccount(AccountId).subscribe();
  }

}
