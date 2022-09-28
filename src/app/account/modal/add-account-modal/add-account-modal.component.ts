import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AccountType, CreateAccountModel, Currency } from '../../account.model';
import { AccountService } from '../../service/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.scss'],
})
export class AddAccountModalComponent implements OnInit, OnDestroy {
  accountTypeValues: AccountType[] = [0, 1];
  currencyValues: Currency[] = [0, 1, 2];
  x: Currency = 0;
  notifier = new Subject();
  id = localStorage.getItem('id');
  constructor(private accountService: AccountService, private ref: MatDialogRef<AddAccountModalComponent>) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }
  ngOnInit(): void {
    console.log('hey');
  }
  addAccount(acc: CreateAccountModel) {
    if (this.id) {
      acc.userId = this.id;
      this.accountService
        .createAccounts(acc)
        .pipe(takeUntil(this.notifier))
        .subscribe(resonse => this.ref.close(resonse));
    }
  }

  closeModal() {
    this.ref.close(true);
  }
}
