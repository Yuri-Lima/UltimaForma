import { Route } from '@angular/router';
import { PitchDeckLayoutComponent } from './layout/pitch-deck-layout.component';

export const pitchDeckRoutes: Route[] = [
  {
    path: '',
    component: PitchDeckLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pitch' },
      {
        path: 'pitch',
        loadComponent: () =>
          import('./pitch/pitch.component').then((m) => m.PitchComponent),
      },
      {
        path: 'kb',
        loadComponent: () =>
          import('./kb/kb.component').then((m) => m.KbComponent),
        children: [
          { path: '', pathMatch: 'full', redirectTo: '01-executive-summary' },
          {
            path: ':id',
            loadComponent: () =>
              import('./kb/kb-page.component').then((m) => m.KbPageComponent),
          },
        ],
      },
      {
        path: 'trust',
        loadComponent: () =>
          import('./trust/trust.component').then((m) => m.TrustComponent),
      },
    ],
  },
];
