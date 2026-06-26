import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Account, BankAccountModel } from '../account';

@Component({
  selector: 'app-account-details',
  imports: [DatePipe],
  templateUrl: './account-details.html',
  styleUrl: './account-details.css',
})
export class AccountDetails {
  account = signal<BankAccountModel | null>(null);
  operations = signal<any[]>([]);
  accountId: string = '';

  constructor(private route: ActivatedRoute, private accountService: Account) {
    this.accountId = this.route.snapshot.params['id'];

    this.accountService.getAccount(this.accountId).subscribe({
      next: (data) => this.account.set(data)
    });

    this.accountService.getOperations(this.accountId).subscribe({
      next: (data) => this.operations.set(data)
    });
  }
}