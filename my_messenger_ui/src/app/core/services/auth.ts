import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/users/sign_in`,
      { user: { email, password } }
    ).pipe(
      tap(res => localStorage.setItem('jwt', res.token))
    );
  }

  signUp(email: string, password: string, passwordConfirmation: string) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/users`,
      { user: { email, password, password_confirmation: passwordConfirmation } }
    ).pipe(
      tap(res => localStorage.setItem('jwt', res.token))
    );
  }

  signOut() {
    return this.http.delete(`${this.apiUrl}/users/sign_out`).pipe(
      tap(() => localStorage.removeItem('jwt'))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
