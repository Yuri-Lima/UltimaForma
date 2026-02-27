import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { UfLanguageSelectComponent } from '../../../shared/components/uf-language-select/uf-language-select.component';
import { AppButtonComponent } from '../../../shared/components/app-button/app-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    TranslatePipe,
    UfLanguageSelectComponent,
    AppButtonComponent,
  ],
  host: {
    class: 'block min-h-screen',
  },
  template: `
    <div
      class="min-h-screen w-full"
      style="background-color: var(--color-bg)"
    >
      <header
        class="sticky top-0 z-50 flex w-full items-center justify-between border-b px-4 py-4 sm:px-6 sm:py-5"
        style="background-color: var(--color-bg); border-color: var(--color-border)"
      >
        <a
          routerLink="/"
          class="flex items-center"
          [attr.aria-label]="'app.title' | translate"
        >
          <img
            src="/assets/brand/ultima-forma_lockup_gold_transparent_512w.png"
            alt=""
            class="h-8 max-w-[180px] sm:h-9 sm:max-w-[200px] w-auto object-contain object-left"
            width="200"
            height="36"
          />
        </a>
        <nav class="flex items-center gap-2 sm:gap-4">
          <a
            href="#produto"
            class="hidden text-sm font-medium sm:inline-block hover:opacity-80 transition-opacity"
            style="color: var(--color-text-muted)"
        >{{ 'landing.nav.product' | translate }}</a>
          <a
            href="#fundadores"
            class="hidden text-sm font-medium sm:inline-block hover:opacity-80 transition-opacity"
            style="color: var(--color-text-muted)"
        >{{ 'landing.nav.founders' | translate }}</a>
          <a
            href="#contato"
            class="hidden text-sm font-medium sm:inline-block hover:opacity-80 transition-opacity"
            style="color: var(--color-text-muted)"
        >{{ 'landing.nav.contact' | translate }}</a>
          <uf-language-select />
          <button
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="(theme.isDark() ? 'auth.theme.switchToLight' : 'auth.theme.switchToDark') | translate"
            class="rounded p-2 transition-colors hover:opacity-80 min-w-[44px] min-h-[44px] flex items-center justify-center"
            style="color: var(--color-text)"
          >
            @if (theme.isDark()) {
              <span class="pi pi-sun text-xl" aria-hidden="true"></span>
            } @else {
              <span class="pi pi-moon text-xl" aria-hidden="true"></span>
            }
          </button>
          <uf-button
            [label]="'auth.nav.login' | translate"
            [routerLink]="['/login']"
            severity="secondary"
          />
        </nav>
      </header>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
})
export class LayoutLandingComponent {
  protected theme = inject(ThemeService);
}
