import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthenticationGuard } from './app-guard.service';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: 'transaction', component: TransactionComponent },
  { path: 'login', component: LoginComponent },
  { path:'account',component:AccountComponent,canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
