import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { authRoutes } from './features/auth/auth.routes';
import { LayoutLandingComponent } from './features/landing/layout-landing/layout-landing.component';

export const appRoutes: Route[] = [
  ...authRoutes,
  {
    path: 'pitch-deck',
    loadChildren: () =>
      import('./features/pitch-deck/pitch-deck.routes').then(
        (m) => m.pitchDeckRoutes
      ),
  },
  {
    path: '',
    component: LayoutLandingComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/landing/landing.component').then(
            (m) => m.LandingComponent
          ),
      },
    ],
  },
  {
    path: 'docs',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/docs/docs.routes').then((m) => m.docsRoutes),
      },
    ],
  },
];
