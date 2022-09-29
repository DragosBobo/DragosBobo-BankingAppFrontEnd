import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateAccountModel } from 'src/app/account/account.model';
import { environment } from 'src/environments/environment';
import { IUserLoginModel, IUserModel } from '../user.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  helper = new JwtHelperService();
  currentUser: IUserModel = {
    email: '',
    userId: '',
    username: '',
  };
  private readonly userApiUrl = `${environment.apiBase}/Auth`;

  constructor(private http: HttpClient) {}

  // register a user
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.userApiUrl}/register`, user);
  }

  //login a user
  loginUser(user: IUserLoginModel): Observable<any> {
    return this.http.post<string>(`${this.userApiUrl}/login`, user, { responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        const decodedToken = this.helper.decodeToken(response);
        //console.log(decodedToken);
        this.currentUser.email = decodedToken.email;
        this.currentUser.userId = decodedToken.nameid;
        this.currentUser.username = decodedToken.given_name;
        localStorage.setItem('token', response);
        localStorage.setItem('id', this.currentUser.userId);
        return this.currentUser;
      })
    );
  }
}
