import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/service/account.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionService } from './transaction/service/transaction.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/service/user.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes : Routes = [
{path : 'transaction' ,component: TransactionComponent},
{path : 'user' ,component: UserComponent},
{path : 'account' ,component: AccountComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    TransactionComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes)
  
  ],
  providers: [AccountService,TransactionService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
