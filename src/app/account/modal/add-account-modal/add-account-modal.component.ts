import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { AccountType, CreateAccountModel, Currency } from '../../account.model';
import { AccountService } from '../../service/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Type } from '@angular/compiler';
import { UserService } from 'src/app/user/service/user.service';
@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.scss'],
})
export class AddAccountModalComponent implements OnDestroy {
  addAccountForm = this.formBuilder.group({
    accountType: new FormControl(''),
    currency: new FormControl(''),
    iban: new FormControl('', [this.patternValidator(), Validators.maxLength(14)]),
    userId: new FormControl(''),
  });
  createAccount!: CreateAccountModel;
  accountTypeValues: AccountType[] = [0, 1];
  currencyCategories: Currency[] = [0, 1, 2];
  public currencyName = Object.keys(Currency).filter(v => isNaN(Number(v))) as (keyof typeof Currency)[];
  public typeName = Object.keys(AccountType).filter(v => isNaN(Number(v))) as (keyof typeof AccountType)[];
  notifier = new Subject();

  id = this.userService.getUserId();
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private ref: MatDialogRef<AddAccountModalComponent>
  ) {}
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  addAccount() {
    if (this.id) {
      if (this.addAccountForm.valid) {
        this.addAccountForm.patchValue({ userId: this.id });
        this.createAccount = this.addAccountForm.value as CreateAccountModel;
        this.accountService
          .createAccount(this.createAccount)
          .pipe(takeUntil(this.notifier))
          .subscribe(response => this.ref.close(response));
      }
    }
  }

  closeModal() {
    this.ref.close(true);
  }
  patternValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('[A-Z]{2}[0-9]{12}');
      const valid = regex.test(control.value);
      return valid ? null : { invalidIban: true };
    };
  }
}
