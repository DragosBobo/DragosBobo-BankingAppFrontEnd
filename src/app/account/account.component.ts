import { Component, OnInit } from '@angular/core';
import { AccountModel } from './accountModel';
import { AccountService } from './AccountService/account.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accounts = new Array<AccountModel>();
  
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.fetchAccounts().subscribe(response =>{
      this.accounts = response;
      console.log(response);
      // console.log(this.accounts[0].accountType);
      
    });
  }

}
