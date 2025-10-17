import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'travlr_jwt';
  private base = '/API/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{token:string}>(`${this.base}/login`, { email, password })
      .pipe(tap(res => localStorage.setItem(this.key, res.token)));
  }

  logout(): void { localStorage.removeItem(this.key); }
  get token(): string | null { return localStorage.getItem(this.key); }
  isAuthenticated(): boolean { return !!this.token; }
}
