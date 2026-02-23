import { Route } from '@angular/router';
import { DocsComponent } from './pages/docs/docs.component';
import { DocViewComponent } from './components/doc-view/doc-view.component';

export const docsRoutes: Route[] = [
  {
    path: '',
    component: DocsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '01-executive-summary' },
      { path: ':id', component: DocViewComponent },
    ],
  },
];
