import { Component, Input, OnInit } from '@angular/core';
import { AccountModel, CreateAccountModel } from './account.model';
import { AccountService } from './service/account.service';
import { TransactionService } from '../transaction/service/transaction.service';
import { TransactionModel } from '../transaction/transaction.model';
import { UserService } from '../user/service/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accounts: AccountModel[] = [];
  accountTransactions: TransactionModel[] = [];
  name: string = this.userService.currentUser.username;

  constructor(private userService: UserService, private accountService: AccountService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.accountService.getAccounts(this.userService.currentUser.userId).subscribe(accounts => {
      this.accounts = accounts;
    });
  }
}
