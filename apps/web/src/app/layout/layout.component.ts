import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, LayoutHeaderComponent],
  template: `
    <div class="min-h-screen p-4">
      <app-layout-header class="mb-6 block" />
      <main class="mx-auto max-w-7xl">
        <router-outlet />
      </main>
    </div>
  `,
})
export class LayoutComponent {}
