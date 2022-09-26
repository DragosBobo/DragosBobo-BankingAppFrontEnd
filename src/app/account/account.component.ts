import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AccountModel, CreateAccountModel } from './account.model';
import { AccountService } from './service/account.service';
import { TransactionService } from '../transaction/service/transaction.service';
import { TransactionModel } from '../transaction/transaction.model';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal/modal.component';
import { modal } from './account.model';
import { DeleteModalComponent } from './modal/delete/delete-modal/delete-modal.component';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  accounts: AccountModel[] = [];
  accountTransactions: TransactionModel[] = [];
  name: string = this.userService.currentUser.username;
  id = localStorage.getItem("id");
  subs = new SubSink();

  accountSlice: AccountModel[] = [];
  constructor(private userService: UserService, private matRef: MatDialog, private router: Router, private accountService: AccountService, private transactionService: TransactionService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.subs.add(this.accountService.getAccounts(this.id).subscribe(accounts => {
        this.accounts = accounts;
        this.accounts.unshift(modal);
        this.accountSlice = this.accounts.slice(0, 4);
      }))
    }
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.accounts.length) { endIndex = this.accounts.length; }
    this.accountSlice = this.accounts.slice(startIndex, endIndex);
  }
  onClickModal() {
    this.subs.add(this.matRef.open(ModalComponent).afterClosed().subscribe(val => { if (val == "Account created with succes ! ") { this.ngOnInit() } }))
  }
  logout() {
    localStorage.clear();
  }
  deleteAccount(id: string) {
    this.subs.add(this.matRef.open(DeleteModalComponent, { data: id }).afterClosed().subscribe(response => this.ngOnInit()))
  }
}


