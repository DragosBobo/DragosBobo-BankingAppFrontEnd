import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { TransactionService } from './service/transaction.service';
import { TransactionId, CreateTransaction, RaportTransaction } from './transaction.mock';
import { TransactionModel } from './transaction.model';
import { FormControl, FormGroup } from '@angular/forms';
import { RaportTransactionModel } from './transaction.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  providers: [DatePipe],
})
export class TransactionComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator;
  search!: string;
  transactions: TransactionModel[] = [];
  id: any;
  notifier = new Subject();
  transactionSlice: TransactionModel[] = [];
  dataSource = new MatTableDataSource(this.transactionSlice);
  displayedColumns = ['categoryName', 'totalAmount', 'transactionDate'];
  startDate!: any;
  endDate!: any;
  report: RaportTransactionModel = {
    id: '',
    startDate: '',
    lastDate: '',
  };
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private datePipe: DatePipe,
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private matRef: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.notifier.complete();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id)
      this.transactionService
        .fetchTransactionsByAccountId(this.id)
        .pipe(takeUntil(this.notifier))
        .subscribe(response => {
          this.transactions = response;
          this.transactionSlice = this.transactions.slice(0, 20);
          this.dataSource = new MatTableDataSource(this.transactionSlice);
          this.dataSource.sort = this.sort;
        });
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.transactions.length) {
      endIndex = this.transactions.length;
    }
    this.transactionSlice = this.transactions.slice(startIndex, endIndex);
    this.dataSource.paginator = this.paginator;
  }
  generateRaport(id: string) {
    this.report.id = id;
    this.startDate = new Date(this.startDate).toISOString();
    this.endDate = new Date(this.endDate).toISOString();
    let startTransformed = this.datePipe.transform(this.startDate, 'yyyy-MM-dd hh:mm:ss');
    let endTransformed = this.datePipe.transform(this.endDate, 'yyyy-MM-dd hh:mm:ss');
    if (startTransformed && endTransformed) {
      this.report.lastDate = endTransformed;
      this.report.startDate = startTransformed;
    }
  }
  searchHandler(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data.categoryName.includes(filter)) {
        return true;
      } else return false;
    };
    this.dataSource.filter = filter;
  }
  datePickerHandler() {
    this.startDate = new Date(this.startDate).toISOString();
    this.endDate = new Date(this.endDate).toISOString();

    this.dataSource.filterPredicate = (data, filter: string) => {
      if (
        new Date(data.transactionDate).getTime() >= new Date(this.startDate).getTime() &&
        new Date(data.transactionDate).getTime() <= new Date(this.endDate).getTime()
      ) {
        return true;
      } else return false;
    };
    if (this.endDate) this.dataSource.filter = this.endDate;
  }
}
