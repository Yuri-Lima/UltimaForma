import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { authRoutes } from './features/auth/auth.routes';

export const appRoutes: Route[] = [
  ...authRoutes,
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'docs',
        loadChildren: () =>
          import('./features/docs/docs.routes').then((m) => m.docsRoutes),
        canActivate: [authGuard],
      },
      { path: '', pathMatch: 'full', redirectTo: 'docs' },
    ],
  },
];
