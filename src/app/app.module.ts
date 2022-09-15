import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/service/account.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionService } from './transaction/service/transaction.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/service/user.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './user/service/token.interceptor';
import { GuardService } from './app-guard.service';
const appRoutes: Routes = [
  { path: 'transaction', component: TransactionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [GuardService] },
]

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    TransactionComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [AccountService, TransactionService, UserService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
