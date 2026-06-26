import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Account, BankAccountModel } from '../account';

@Component({
  selector: 'app-accounts',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  accounts = signal<BankAccountModel[]>([]);

  constructor(private accountService: Account) {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts.set(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}