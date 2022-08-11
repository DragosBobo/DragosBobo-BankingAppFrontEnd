import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/service/account.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionService } from './transaction/service/transaction.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  providers: [AccountService,TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
