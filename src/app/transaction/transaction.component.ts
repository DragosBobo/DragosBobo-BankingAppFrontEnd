import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SubSink } from 'subsink';
import { RaportComponent } from './modal/raport/raport.component';
import { TransactionService } from './service/transaction.service';
import { TransactionId, CreateTransaction, RaportTransaction } from './transaction.mock';
import { TransactionModel } from './transaction.model';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit,OnDestroy {
  transactions: TransactionModel[] =[];
  id: any;
  notifier = new Subject();
  transactionSlice : TransactionModel[] = [];
  dataSource = new MatTableDataSource(this.transactionSlice);
  displayedColumns = ['num','categoryName','totalAmount'];
  constructor(private transactionService: TransactionService, private activatedRoute: ActivatedRoute,private matRef: MatDialog) {

  }
  ngOnDestroy(): void {
    this.notifier.complete();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id)
     this.transactionService.fetchTransactions().pipe(takeUntil(this.notifier)).subscribe(response => {this.transactions=response;this.transactionSlice=this.transactions.slice(0,20); this.dataSource  = new MatTableDataSource(this.transactionSlice);});
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.transactions.length) { endIndex = this.transactions.length; }
    this.transactionSlice = this.transactions.slice(startIndex, endIndex);
  }
  generateRaport(id:string){
    console.log(`generate raport for account wiht id : ${id}`);
    this.matRef.open(RaportComponent).afterClosed().pipe(takeUntil(this.notifier)).subscribe(result=>console.log("modal works"))
  }
  applyFilter(event: Event) {
    this.dataSource  = new MatTableDataSource(this.transactionSlice);
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }
}
