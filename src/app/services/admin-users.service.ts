import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminUserRecord {
  id: string;
  email: string;
  createdAt: string;
}

export interface CreateAdminUserInput {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/users`;

  list(): Observable<AdminUserRecord[]> {
    return this.http
      .get<{ users: AdminUserRecord[] }>(this.base, { withCredentials: true })
      .pipe(map((res) => res.users));
  }

  create(input: CreateAdminUserInput): Observable<AdminUserRecord> {
    return this.http
      .post<{ user: AdminUserRecord }>(this.base, input, { withCredentials: true })
      .pipe(map((res) => res.user));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<{ ok: boolean }>(`${this.base}/${id}`, { withCredentials: true })
      .pipe(map(() => void 0));
  }
}
