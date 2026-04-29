// auth-reverse-guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authReverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const isAuthenticated = authService.isUserAuthenticated; // sync signal value
  return isAuthenticated ? router.parseUrl('/home/products') : true;
};