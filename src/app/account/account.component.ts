import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  accounts: AccountModel[] = [];
  accountTransactions: TransactionModel[] = [];
  name: string = this.userService.currentUser.username;
  id = localStorage.getItem('id');
  notifier = new Subject();
  accountSlice: AccountModel[] = [];
  constructor(
    private userService: UserService,
    private matRef: MatDialog,
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.accountService
        .getAccounts(this.id)
        .pipe(takeUntil(this.notifier))
        .subscribe((accounts) => {
          this.accounts = accounts;
          this.accounts.unshift(modal);
          this.accountSlice = this.accounts.slice(0, 4);
          console.log(this.id);
        });
    }
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
      .open(ModalComponent)
      .afterClosed()
      .pipe(takeUntil(this.notifier))
      .subscribe((val) => {
        if (val == 'Account created with succes ! ') {
          this.ngOnInit();
        }
      });
  }
  logout() {
    localStorage.clear();
  }
  deleteAccount(id: string) {
    this.matRef
      .open(DeleteModalComponent, { data: id })
      .afterClosed()
      .pipe(takeUntil(this.notifier))
      .subscribe((response) => this.ngOnInit());
  }
}
