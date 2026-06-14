import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (auth.checked() && auth.user()) return true;
  if (auth.checked() && !auth.user()) {
    return router.createUrlTree(['/admin/login']);
  }

  return auth.checkSession().pipe(
    map((ok) => (ok ? true : router.createUrlTree(['/admin/login']))),
  );
};

export const adminGuestGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (auth.checked() && auth.user()) {
    return router.createUrlTree(['/admin/dashboard']);
  }

  return auth.checkSession().pipe(
    switchMap((ok) => (ok ? of(router.createUrlTree(['/admin/dashboard'])) : of(true))),
  );
};
