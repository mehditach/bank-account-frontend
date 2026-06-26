import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage = signal<string>('');

  constructor(private authService: Auth, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/customers');
      },
      error: (err) => {
        this.errorMessage.set('Identifiant ou mot de passe incorrect');
        console.log(err);
      }
    });
  }
}