import { Component, signal } from '@angular/core';
import { Customer, CustomerModel } from '../customer';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customers = signal<CustomerModel[]>([]);

  constructor(private customerService: Customer) {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log('Données reçues:', data);
        this.customers.set(data);
      },
      error: (err) => {
        console.log('Erreur:', err);
      }
    });
  }
}