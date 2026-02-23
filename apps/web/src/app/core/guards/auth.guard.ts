import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  if (auth.getMfaRequired() && !state.url.includes('/mfa/')) {
    router.navigate(['/mfa/setup']);
    return false;
  }

  return true;
};

export const mfaSetupGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (auth.getMfaRequired()) {
    router.navigate(['/mfa/verify']);
    return false;
  }

  return true;
};

export const publicGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    if (auth.getMfaRequired()) {
      router.navigate(['/mfa/verify']);
    } else {
      router.navigate(['/docs']);
    }
    return false;
  }
  return true;
};
