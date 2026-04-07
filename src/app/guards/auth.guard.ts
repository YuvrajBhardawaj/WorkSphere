
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { supabase } from '../supabase.client';
// auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const session = supabase.auth.getSession(); // ❌ don’t await

  return session.then(({ data }) => {
    const user = data.session?.user;

    if (user) return true;

    router.navigate(['/signin']);
    return false;
  }).catch(() => {
    router.navigate(['/signin']);
    return false;
  });
};