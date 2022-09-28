import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/account/service/account.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit, OnDestroy {
  notifier = new Subject();
  accId!: string;
  constructor(
    private account: AccountService,
    private ref: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.accId = data;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  agree() {
    this.account
      .deleteAccount(this.accId)
      .pipe(takeUntil(this.notifier))
      .subscribe(response => this.ref.close(response));
  }
  disagree() {
    this.ref.close();
  }
}
