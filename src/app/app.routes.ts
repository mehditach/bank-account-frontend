import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { AccountDetails } from './account-details/account-details';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: Customers },
  { path: 'accounts', component: Accounts },
  { path: 'accounts/:id', component: AccountDetails }
];