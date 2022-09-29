import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AccountType, CreateAccountModel, Currency } from '../../account.model';
import { AccountService } from '../../service/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Type } from '@angular/compiler';
import { UserService } from 'src/app/user/service/user.service';
@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.scss'],
})
export class AddAccountModalComponent implements OnDestroy {
  accountTypeValues: AccountType[] = [0, 1];
  currencyCategories: Currency[] = [0, 1, 2];
  public currencyName = Object.keys(Currency).filter(v => isNaN(Number(v))) as (keyof typeof Currency)[];
  public typeName = Object.keys(AccountType).filter(v => isNaN(Number(v))) as (keyof typeof AccountType)[];
  notifier = new Subject();

  id = this.userService.getUserId();
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private ref: MatDialogRef<AddAccountModalComponent>
  ) {}
  ngOnDestroy(): void {
    this.notifier.complete();
    console.log(this.currencyName);
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
