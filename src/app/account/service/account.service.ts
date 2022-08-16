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
    createAccounts(addAccount: CreateAccountModel): Observable<CreateAccountModel> {
        return this.http.post<CreateAccountModel>(this.accountApiUrl, addAccount);
    }
    //delete account
    deleteAccount(id: string): Observable<CreateAccountModel> {
        return this.http.delete<CreateAccountModel>(`${this.accountApiUrl}?id=${id}`);
    }
    //update account 
    updateAccount(updateAccount: CreateAccountModel): Observable<CreateAccountModel> {
        return this.http.put<CreateAccountModel>(this.accountApiUrl, updateAccount);
    }
}