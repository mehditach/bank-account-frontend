import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { AccountDetails } from './account-details/account-details';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { ChangePassword } from './change-password/change-password';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'customers', component: Customers, canActivate: [authGuard] },
  { path: 'accounts', component: Accounts, canActivate: [authGuard] },
  { path: 'accounts/:id', component: AccountDetails, canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'change-password', component: ChangePassword, canActivate: [authGuard] }
];