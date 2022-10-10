import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateAccountModel } from 'src/app/account/account.model';
import { environment } from 'src/environments/environment';
import { IUserLoginModel, IUserModel, IUserRegisterModel } from '../user.model';
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
  userId!: string;
  constructor(private http: HttpClient) {
    const id = localStorage.getItem('id');
    if (id) {
      this.userId = id;
    }
  }

  // register a user
  registerUser(user: IUserRegisterModel): Observable<any> {
    return this.http.post<any>(`${this.userApiUrl}/register`, user, { responseType: 'text' as 'json' });
  }

  //login a user
  loginUser(user: IUserLoginModel): Observable<any> {
    return this.http.post<string>(`${this.userApiUrl}/login`, user, { responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        const decodedToken = this.helper.decodeToken(response);
        this.currentUser.email = decodedToken.email;
        this.currentUser.userId = decodedToken.nameid;
        this.currentUser.username = decodedToken.given_name;
        localStorage.setItem('token', response);
        localStorage.setItem('id', this.currentUser.userId);
        return this.currentUser;
      })
    );
  }
  getUserId(): string {
    return this.userId;
  }
}
