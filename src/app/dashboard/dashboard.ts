import { Component, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { DecimalPipe } from '@angular/common';
import { Account } from '../account';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats = signal<any>(null);

  // graphique 1 : repartition des comptes (Pie chart)
  accountsChartData: ChartData<'pie'> = {
    labels: ['Comptes Courants', 'Comptes Epargne'],
    datasets: [{ data: [0, 0], backgroundColor: ['#0d6efd', '#198754'] }]
  };

  // graphique 2 : operations DEBIT vs CREDIT (Bar chart)
  operationsChartData: ChartData<'bar'> = {
    labels: ['DEBIT', 'CREDIT'],
    datasets: [{ data: [0, 0], backgroundColor: ['#dc3545', '#198754'], label: 'Nombre d\'operations' }]
  };

  // graphique 3 : montants DEBIT vs CREDIT (Bar chart)
  amountsChartData: ChartData<'bar'> = {
    labels: ['Total Debit', 'Total Credit'],
    datasets: [{ data: [0, 0], backgroundColor: ['#dc3545', '#198754'], label: 'Montant (DH)' }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  constructor(private accountService: Account) {
    this.accountService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats.set(data);

        this.accountsChartData = {
          ...this.accountsChartData,
          datasets: [{
            data: [data.currentAccountsCount, data.savingAccountsCount],
            backgroundColor: ['#0d6efd', '#198754']
          }]
        };

        this.operationsChartData = {
          ...this.operationsChartData,
          datasets: [{
            data: [data.debitCount, data.creditCount],
            backgroundColor: ['#dc3545', '#198754'],
            label: 'Nombre d\'operations'
          }]
        };

        this.amountsChartData = {
          ...this.amountsChartData,
          datasets: [{
            data: [data.totalDebit, data.totalCredit],
            backgroundColor: ['#dc3545', '#198754'],
            label: 'Montant (DH)'
          }]
        };
      }
    });
  }
}