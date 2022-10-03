import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AccountModel, CreateAccountModel } from './account.model';
import { AccountService } from './service/account.service';
import { TransactionService } from '../transaction/service/transaction.service';
import { TransactionModel } from '../transaction/transaction.model';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { modal } from './account.model';
import { DeleteModalComponent } from './modal/delete/delete-modal/delete-modal.component';
import { Subject, takeUntil } from 'rxjs';
import { AddAccountModalComponent } from './modal/add-account-modal/add-account-modal.component';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  accounts: AccountModel[] = [];
  accountTransactions: TransactionModel[] = [];
  name!: string;
  id = this.userService.getUserId();
  notifier = new Subject();
  accountSlice: AccountModel[] = [];
  constructor(private userService: UserService, private matRef: MatDialog, private accountService: AccountService) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  ngOnInit(): void {
    this.getAccounts();
    this.name = this.userService.getUserName();
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.accounts.length) {
      endIndex = this.accounts.length;
    }
    this.accountSlice = this.accounts.slice(startIndex, endIndex);
  }
  onClickModal() {
    this.matRef
      .open(AddAccountModalComponent)
      .afterClosed()
      .pipe(takeUntil(this.notifier))
      .subscribe(val => {
        if (val) {
          this.getAccounts();
          console.log(val);
        }
      });
  }

  deleteAccount(id: string) {
    this.matRef
      .open(DeleteModalComponent, { data: id })
      .afterClosed()
      .pipe(takeUntil(this.notifier))
      .subscribe(response => this.getAccounts());
  }
  getAccounts() {
    if (this.id != null) {
      this.accountService
        .getAccounts(this.id)
        .pipe(takeUntil(this.notifier))
        .subscribe(accounts => {
          this.accounts = accounts;
          this.accounts.unshift(modal);
          this.accountSlice = this.accounts.slice(0, 4);
        });
    }
  }
}
