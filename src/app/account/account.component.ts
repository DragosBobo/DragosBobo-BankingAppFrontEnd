import { Component, Input, OnInit } from '@angular/core';
import { AccountModel, CreateAccountModel } from './account.model';
import { AccountService } from './service/account.service';
import { AccountId, MockAccount } from './account.mock';
import { TransactionService } from '../transaction/service/transaction.service';
import { TransactionModel } from '../transaction/transaction.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accounts: AccountModel[] = [];
  accountTransactions : TransactionModel[]=[];
 

  constructor(public accountService: AccountService, public transactionService: TransactionService) { }

  ngOnInit(): void {
    this.accountService.fetchAccounts().subscribe(response => {
      this.accounts = response;
      

    });
    

    // this.accountService.createAccounts(MockAccount).subscribe();
    // this.accountService.deleteAccount(AccountId).subscribe();
    // this.accountService.updateAccount(AccountId).subscribe();
  }
 

}
