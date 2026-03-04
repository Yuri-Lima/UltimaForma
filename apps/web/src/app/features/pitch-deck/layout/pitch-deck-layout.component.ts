import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';
import { UfLanguageSelectComponent } from '../../../shared/components/uf-language-select/uf-language-select.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-pitch-deck-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    UfLanguageSelectComponent,
  ],
  host: { class: 'block min-h-screen' },
  template: `
    <div class="min-h-screen w-full" style="background-color: var(--color-bg)">
      <header
        class="pitch-topbar sticky top-0 z-50 flex w-full items-center justify-between border-b px-4 py-3 sm:px-6"
        style="background-color: color-mix(in srgb, var(--color-bg) 85%, transparent); border-color: var(--color-border); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px)"
      >
        <a
          routerLink="/pitch-deck/pitch"
          class="flex items-center gap-2"
          aria-label="Ultima Forma"
        >
          <img
            src="/assets/brand/ultima-forma_lockup_gold_transparent_512w.png"
            alt=""
            class="h-7 w-auto object-contain sm:h-8"
            width="180"
            height="32"
          />
        </a>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-1 md:flex">
          <a
            routerLink="/pitch-deck/pitch"
            routerLinkActive="pitch-nav-active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="pitch-nav-link"
          >{{ 'pitch.nav.pitch' | translate }}</a>
          <a
            routerLink="/pitch-deck/kb"
            routerLinkActive="pitch-nav-active"
            class="pitch-nav-link"
          >{{ 'pitch.nav.kb' | translate }}</a>
          <a
            routerLink="/pitch-deck/trust"
            routerLinkActive="pitch-nav-active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="pitch-nav-link"
          >{{ 'pitch.nav.trust' | translate }}</a>
        </nav>

        <div class="flex items-center gap-2">
          <uf-language-select styleClass="min-w-[100px]" />
          <button
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="(theme.isDark() ? 'auth.theme.switchToLight' : 'auth.theme.switchToDark') | translate"
            class="rounded p-2 transition-colors hover:opacity-80 min-w-[40px] min-h-[40px] flex items-center justify-center"
            style="color: var(--color-text)"
          >
            @if (theme.isDark()) {
              <span class="pi pi-sun text-lg" aria-hidden="true"></span>
            } @else {
              <span class="pi pi-moon text-lg" aria-hidden="true"></span>
            }
          </button>

          <!-- Mobile hamburger -->
          <button
            type="button"
            class="rounded p-2 md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center"
            style="color: var(--color-text)"
            (click)="mobileOpen.set(!mobileOpen())"
            aria-label="Menu"
          >
            <span class="pi pi-bars text-lg" aria-hidden="true"></span>
          </button>
        </div>
      </header>

      <!-- Mobile nav drawer -->
      @if (mobileOpen()) {
        <div
          class="fixed inset-0 z-40 bg-black/50 md:hidden"
          (click)="mobileOpen.set(false)"
        ></div>
        <nav
          class="fixed right-0 top-0 z-50 h-full w-64 border-l p-6 md:hidden flex flex-col gap-2"
          style="background-color: var(--color-surface); border-color: var(--color-border)"
        >
          <button
            type="button"
            class="self-end rounded p-2 mb-4"
            style="color: var(--color-text)"
            (click)="mobileOpen.set(false)"
            aria-label="Close"
          >
            <span class="pi pi-times text-lg" aria-hidden="true"></span>
          </button>
          <a
            routerLink="/pitch-deck/pitch"
            (click)="mobileOpen.set(false)"
            class="pitch-nav-link text-base"
          >{{ 'pitch.nav.pitch' | translate }}</a>
          <a
            routerLink="/pitch-deck/kb"
            (click)="mobileOpen.set(false)"
            class="pitch-nav-link text-base"
          >{{ 'pitch.nav.kb' | translate }}</a>
          <a
            routerLink="/pitch-deck/trust"
            (click)="mobileOpen.set(false)"
            class="pitch-nav-link text-base"
          >{{ 'pitch.nav.trust' | translate }}</a>
        </nav>
      }

      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    .pitch-nav-link {
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-muted);
      transition: all 150ms ease;
      text-decoration: none;
    }
    .pitch-nav-link:hover {
      color: var(--color-text);
      background-color: var(--color-hover);
    }
    :host ::ng-deep .pitch-nav-active {
      color: var(--color-primary) !important;
      background-color: rgba(99, 102, 241, 0.08);
    }
  `,
})
export class PitchDeckLayoutComponent {
  protected theme = inject(ThemeService);
  mobileOpen = signal(false);
}
