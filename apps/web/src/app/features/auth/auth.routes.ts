import { Route } from '@angular/router';
import { LayoutAuthComponent } from '../../layout/layout-auth/layout-auth.component';
import { publicGuard } from '../../core/guards/auth.guard';
import { authGuard } from '../../core/guards/auth.guard';

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: LayoutAuthComponent,
    canActivate: [publicGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: 'register',
    component: LayoutAuthComponent,
    canActivate: [publicGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
    ],
  },
  {
    path: 'mfa/setup',
    component: LayoutAuthComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/mfa-setup/mfa-setup.component').then(
            (m) => m.MfaSetupComponent,
          ),
      },
    ],
  },
  {
    path: 'mfa/verify',
    component: LayoutAuthComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/mfa-verify/mfa-verify.component').then(
            (m) => m.MfaVerifyComponent,
          ),
      },
    ],
  },
];
