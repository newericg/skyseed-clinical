import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminUser {
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/auth`;

  readonly user = signal<AdminUser | null>(null);
  readonly checked = signal(false);

  checkSession(): Observable<boolean> {
    return this.http.get<AdminUser>(`${this.base}/me`, { withCredentials: true }).pipe(
      tap((user) => {
        this.user.set(user);
        this.checked.set(true);
      }),
      map(() => true),
      catchError(() => {
        this.user.set(null);
        this.checked.set(true);
        return of(false);
      }),
    );
  }

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<AdminUser>(`${this.base}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap((user) => this.user.set(user)),
        map(() => void 0),
      );
  }

  logout(): Observable<void> {
    return this.http.post(`${this.base}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.user.set(null)),
      map(() => void 0),
    );
  }
}
