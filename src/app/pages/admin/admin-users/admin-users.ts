import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { AdminUserRecord, AdminUsersService } from '../../../services/admin-users.service';

@Component({
  selector: 'app-admin-users',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsersComponent {
  private usersService = inject(AdminUsersService);
  private auth = inject(AdminAuthService);
  private fb = inject(FormBuilder);

  readonly users = signal<AdminUserRecord[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly formError = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor() {
    this.load();
  }

  currentUserEmail(): string | null {
    return this.auth.user()?.email ?? null;
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.usersService.list().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os usuários.');
        this.loading.set(false);
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.formError.set('');
    const { email, password } = this.form.getRawValue();

    this.usersService.create({ email, password }).subscribe({
      next: () => {
        this.form.reset();
        this.saving.set(false);
        this.load();
      },
      error: (err) => {
        const message = err?.error?.error ?? 'Não foi possível criar o usuário.';
        this.formError.set(message);
        this.saving.set(false);
      },
    });
  }

  remove(user: AdminUserRecord): void {
    if (user.email === this.currentUserEmail()) return;
    if (!confirm(`Excluir o usuário ${user.email}?`)) return;

    this.usersService.delete(user.id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Falha ao excluir o usuário.'),
    });
  }
}
