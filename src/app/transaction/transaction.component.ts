import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from './service/transaction.service';
import { TransactionId, CreateTransaction, RaportTransaction } from './transaction.mock';
import { TransactionModel } from './transaction.model';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: TransactionModel[] = [];
  id: any;
  constructor(private transactionService: TransactionService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id)
      this.transactionService.fetchTransactionsByAccountId(this.id).subscribe(response => this.transactions = response);
  }
}
