import { Component, Input, OnInit } from '@angular/core';
import { AccountModel, CreateAccountModel } from './account.model';
import { AccountService } from './service/account.service';
import { TransactionService } from '../transaction/service/transaction.service';
import { TransactionModel } from '../transaction/transaction.model';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accounts: AccountModel[] = [];
  accountTransactions: TransactionModel[] = [];
  name: string = this.userService.currentUser.username;
  id = localStorage.getItem("id");
  constructor(private userService: UserService, private router: Router, private accountService: AccountService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    if (this.id != null) {
      this.accountService.getAccounts(this.id).subscribe(accounts => {
        this.accounts = accounts;
      });
    }
  }
}
