import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:8080/auth';

  // signal qui dit si l'utilisateur est connecte ou pas
  isLoggedIn = signal<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + '/login', { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          this.isLoggedIn.set(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post('http://localhost:8080/auth/change-password', {
      oldPassword,
      newPassword
    });
  }
}