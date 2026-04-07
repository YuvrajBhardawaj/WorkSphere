
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { supabase } from '../supabase.client';
// auth.guard.ts
export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.waitForAuthReady(); // waits for Supabase to respond

  if (!user) {
    router.navigate(['/signin']);
    return false;
  }

  return true;
};