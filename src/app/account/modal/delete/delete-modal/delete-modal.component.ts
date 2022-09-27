import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/account/service/account.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit, OnDestroy {
  accId !: string;
  subs = new SubSink();
  constructor(private account: AccountService, private ref: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { this.accId = data }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }

  agree() {
    this.subs.add(this.account.deleteAccount(this.accId).subscribe(response => this.ref.close(response)));
  }
  disagree() {
    this.ref.close();
  }
}
