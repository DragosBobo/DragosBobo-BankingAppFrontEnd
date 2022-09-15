import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccountModel, CreateAccountModel } from "../account.model";

@Injectable({ providedIn: 'root' })
export class AccountService {

    private readonly accountApiUrl = `${environment.apiBase}/Account`;
    constructor(private http: HttpClient) { }
    //get accounts 
    fetchAccounts(): Observable<AccountModel[]> {
        return this.http.get<AccountModel[]>(this.accountApiUrl);
    }
    //create accounts
    createAccounts(addAccount: CreateAccountModel): Observable<string> {
        return this.http.post<string>(this.accountApiUrl, addAccount);
    }
    //delete account
    deleteAccount(id: string): Observable<string> {
        return this.http.delete<string>(`${this.accountApiUrl}?id=${id}`);
    }
    //update account 
    updateAccount(updateAccount: CreateAccountModel): Observable<string> {
        return this.http.put<string>(this.accountApiUrl, updateAccount);
    }
    //get accounts by user id
    getAccounts(id:string):Observable<AccountModel[]>{
        return this.http.get<AccountModel[]>(`${this.accountApiUrl}/${id}`);
    }
}