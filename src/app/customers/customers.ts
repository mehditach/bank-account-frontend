import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer, CustomerModel } from '../customer';

@Component({
  selector: 'app-customers',
  imports: [FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customers = signal<CustomerModel[]>([]);
  searchKeyword: string = '';

  newCustomer: CustomerModel = { name: '', email: '' };
  editingCustomer: CustomerModel | null = null;

  constructor(private customerService: Customer) {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers.set(data)
    });
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      this.loadCustomers();
      return;
    }
    this.customerService.searchCustomers(this.searchKeyword).subscribe({
      next: (data) => this.customers.set(data)
    });
  }

  addCustomer() {
    if (this.newCustomer.name.trim() === '') return;
    this.customerService.addCustomer(this.newCustomer).subscribe({
      next: () => {
        this.newCustomer = { name: '', email: '' };
        this.loadCustomers();
      }
    });
  }

  startEdit(customer: CustomerModel) {
    this.editingCustomer = { ...customer };
  }

  saveEdit() {
    if (this.editingCustomer && this.editingCustomer.id) {
      this.customerService.updateCustomer(this.editingCustomer.id, this.editingCustomer).subscribe({
        next: () => {
          this.editingCustomer = null;
          this.loadCustomers();
        }
      });
    }
  }

  cancelEdit() {
    this.editingCustomer = null;
  }

  deleteCustomer(id: number | undefined) {
    if (!id) return;
    this.customerService.deleteCustomer(id).subscribe({
      next: () => this.loadCustomers()
    });
  }
}