import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-auth',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  host: {
    class: 'block min-h-screen',
  },
  template: `
    <div
      class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      style="background-color: var(--color-bg)"
    >
      <header class="absolute left-0 top-0 flex w-full items-center justify-between px-4 py-4 sm:px-6 sm:py-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <a routerLink="/" class="text-lg font-semibold" style="color: var(--color-text)" i18n="app title">Ultima Forma</a>
        <button
          type="button"
          (click)="theme.toggle()"
          [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          class="rounded p-2 transition-colors hover:opacity-80 min-w-[44px] min-h-[44px] flex items-center justify-center"
          style="color: var(--color-text)"
        >
          @if (theme.isDark()) {
            <span class="pi pi-sun text-xl" aria-hidden="true"></span>
          } @else {
            <span class="pi pi-moon text-xl" aria-hidden="true"></span>
          }
        </button>
      </header>
      <div class="w-full max-w-[400px] sm:max-w-[420px] shrink-0">
        <router-outlet />
      </div>
    </div>
  `,
})
export class LayoutAuthComponent {
  protected theme = inject(ThemeService);
}
