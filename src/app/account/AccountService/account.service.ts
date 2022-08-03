import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class AccountService{
    constructor(private http : HttpClient){

    }
    //get accounts 
   public  fetchAccounts() : Observable<any> {
        const url = 'https://localhost:7240/api/Account';
        return this.http.get<any>(url);
    }
    //create accounts
    createAccounts(){

    }
    //delete account
    deleteAccount(){

    }
}