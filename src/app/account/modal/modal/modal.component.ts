import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { AccountType } from '../../account.model';
import { Currency } from '../../account.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit ,OnDestroy {
  accountForm!: FormGroup;
  accountTypeValues: AccountType[] = [0, 1];
  currencyValues: Currency[] = [0, 1, 2];
  x: Currency = 0;
  subs = new SubSink();
  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private ref: MatDialogRef<ModalComponent>) {
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      accountType: 0,
      currency: 0,
      iban: [""],
      userId: [""]
    })
  }
  addAccount() {
    const id = localStorage.getItem("id");
    this.accountForm.patchValue({ userId: id });
    this.subs.add(this.accountService.createAccounts(this.accountForm).subscribe(response => this.ref.close(response)));
  }

  closeModal() {
    this.ref.close("modal was closed ");
  }
}