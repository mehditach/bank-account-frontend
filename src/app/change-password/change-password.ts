import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message = signal<string>('');
  isError = signal<boolean>(false);

  constructor(private authService: Auth) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message.set('Les mots de passe ne correspondent pas');
      this.isError.set(true);
      return;
    }

    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.message.set('Mot de passe modifie avec succes !');
        this.isError.set(false);
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: () => {
        this.message.set('Erreur : ancien mot de passe incorrect');
        this.isError.set(true);
      }
    });
  }
}