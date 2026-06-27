import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Auth } from './auth';
import { ChatWidget } from './chat-widget/chat-widget';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ChatWidget],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bank-account-frontend');

  constructor(public authService: Auth, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}