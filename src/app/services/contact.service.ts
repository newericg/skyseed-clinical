import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  capture?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private readonly endpoint = 'https://formsubmit.co/ajax/contato@skyseed.com.br';

  send(data: ContactFormData) {
    const capture = data.capture ?? false;
    const body = {
      name: data.name,
      email: data.email,
      phone: data.phone || '—',
      message: data.message || (capture ? 'Cadastro via homepage' : '—'),
      _replyto: data.email,
      _subject: capture
        ? `Novo cadastro de ${data.name} — Skyseed Clinical`
        : `Nova mensagem de ${data.name} — Fale Conosco Skyseed`,
      _template: 'table',
      _captcha: 'false',
    };

    return this.http.post<{ success: string }>(this.endpoint, body).pipe(
      map(() => void 0),
      catchError((err) => throwError(() => err)),
    );
  }
}
