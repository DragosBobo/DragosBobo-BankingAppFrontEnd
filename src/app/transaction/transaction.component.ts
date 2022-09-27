import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SubSink } from 'subsink';
import { TransactionService } from './service/transaction.service';
import { TransactionId, CreateTransaction, RaportTransaction } from './transaction.mock';
import { TransactionModel } from './transaction.model';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit,OnDestroy {
  transactions: TransactionModel[] = [];
  id: any;
  notifier = new Subject();
  constructor(private transactionService: TransactionService, private activatedRoute: ActivatedRoute) {

  }
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id)
     this.transactionService.fetchTransactionsByAccountId(this.id).pipe(takeUntil(this.notifier)).subscribe(response => this.transactions = response);
  }
}
