import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { Router } from '@angular/router';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Service()

export class AuthService {

  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  private router = inject(Router);

  get token(): string | null {
    return this.cookie.get('token') || null;
  }

  get refreshToken(): string | null {
    return this.cookie.get('refreshToken') || null;
  }

  get isAuth(): boolean {
    return !!this.token;
  }

  login(dto: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', dto.username);
    fd.append('password', dto.password);

    return this.http.post<TokenResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.auth.token}`,
      fd
    ).pipe(
      tap(res => this.save(res))
    );
  }

  refresh() {
    return this.http.post<TokenResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.auth.refresh}`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe(
      tap(res => this.save(res))
    );
  }

  save(res: TokenResponse) {
    this.cookie.set('token', res.access_token);
    this.cookie.set('refreshToken', res.refresh_token);
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
  }
}
