import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BankAccountModel {
  id: string;
  balance: number;
  createdAt: string;
  status: string;
  customer: { id: number; name: string; email: string };
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class Account {

  private apiUrl = 'http://localhost:8080/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<BankAccountModel[]> {
    return this.http.get<BankAccountModel[]>(this.apiUrl);
  }

  getAccount(id: string): Observable<BankAccountModel> {
    return this.http.get<BankAccountModel>(this.apiUrl + '/' + id);
  }

  debit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(this.apiUrl + '/' + accountId + '/debit', null, {
      params: { amount, description }
    });
  }

  credit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(this.apiUrl + '/' + accountId + '/credit', null, {
      params: { amount, description }
    });
  }

  getOperations(accountId: string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/accounts/' + accountId + '/operations');
  }

  getDashboardStats(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/dashboard/stats');
  }

}