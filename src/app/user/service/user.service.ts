import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAccountModel } from 'src/app/account/account.model';
import { environment } from 'src/environments/environment';
import { CreateUserModel, LoginUserModel } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userApiUrl = `${environment.apiBase}/Auth`;
  constructor(private http: HttpClient) { }

  // register a user 
  registerUser(user: CreateUserModel) : Observable<CreateUserModel> {
    return this.http.post<CreateUserModel>(`${this.userApiUrl}/register`,user);
  }

  //login a user 
  loginUser(user: LoginUserModel) : Observable<string> {
    return this.http.post<string>(`${this.userApiUrl}/login`,user);
  }
 

}