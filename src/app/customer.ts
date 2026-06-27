import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerModel {
  id?: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class Customer {

  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(this.apiUrl + '/' + id);
  }

  addCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(this.apiUrl, customer);
  }
  updateCustomer(id: number, customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(this.apiUrl + '/' + id, customer);
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
  searchCustomers(keyword: string): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.apiUrl + '/search', {
      params: { keyword }
    });
  }
}