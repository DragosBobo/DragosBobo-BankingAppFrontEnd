import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateTransactionModel, TransactionModel, RaportTransactionModel } from "../transaction.model";

@Injectable({ providedIn: 'root' })
export class TransactionService {

    private readonly transactionApiUrl = `${environment.apiBase}/Transaction`;
    constructor(private http: HttpClient) {

    }
    //get all transactions 
    fetchTransactions(): Observable<TransactionModel[]> {
        return this.http.get<TransactionModel[]>(`${this.transactionApiUrl}`);
    }
    //get all transactions for one account Id
    fetchTransactionsByAccountId(id:string) : Observable<TransactionModel[]>{
        return this.http.get<TransactionModel[]>(`${this.transactionApiUrl}/${id}`);
    }
    //create a transaction 
    createTransaction(transaction: CreateTransactionModel): Observable<CreateTransactionModel> {
        return this.http.post<CreateTransactionModel>(`${this.transactionApiUrl}`, transaction);
    }
    //get transaction report 
    fetchReportTransaction(req: RaportTransactionModel): Observable<TransactionModel[]> {

        var startDate = encodeURI(req.startDate).replace(/:/gm, "%3A").replace(/\+/gm, "%2B");
        var lastDate = encodeURI(req.lastDate).replace(/:/gm, "%3A").replace(/\+/gm, "%2B");

        return this.http.get<TransactionModel[]>(`${this.transactionApiUrl}/raport?id=${req.id}&startDate=${startDate}&lastDate=${lastDate}`);
    }
}
