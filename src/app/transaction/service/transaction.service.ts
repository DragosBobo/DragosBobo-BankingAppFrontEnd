import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TransactionModel } from "../transaction.model";

@Injectable({ providedIn: 'root' })
export class TransactionService {

    private readonly transactionApiUrl = environment.apiBase;
    constructor(private http: HttpClient) {

    }
    //get all transactions 
    fetchTransactions(): Observable<TransactionModel[]> {
        return this.http.get<TransactionModel[]>(`${this.transactionApiUrl}/Transaction`);
    }
    //get all transactions for one account Id
    fetchTransactionsById(id: string): Observable<TransactionModel[]> {
        return this.http.get<TransactionModel[]>(`${this.transactionApiUrl}/account/${id}`);
    }

}

