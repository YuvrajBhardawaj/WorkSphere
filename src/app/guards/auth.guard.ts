import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    filter(user => user !== undefined), // ⏳ wait for init (/me)
    take(1), // only first value
    map(user => {
      if (user) return true;

      router.navigate(['/signin']);
      return false;
    })
  );
};