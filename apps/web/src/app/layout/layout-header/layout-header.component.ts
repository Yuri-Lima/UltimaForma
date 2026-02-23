import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AppButtonComponent } from '../../shared/components/app-button/app-button.component';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { UfLanguageSelectComponent } from '../../shared/components/uf-language-select/uf-language-select.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-header',
  standalone: true,
  imports: [RouterModule, AppButtonComponent, TranslatePipe, UfLanguageSelectComponent],
  template: `
    <header class="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style="border-color: var(--color-border)">
      <h1 class="text-xl font-bold md:text-2xl" style="color: var(--color-text)">
        {{ 'app.title' | translate }}
      </h1>
      <div class="flex flex-wrap items-center gap-2 md:gap-4">
        <uf-language-select />
        <button
          type="button"
          (click)="theme.toggle()"
          [attr.aria-label]="(theme.isDark() ? 'auth.theme.switchToLight' : 'auth.theme.switchToDark') | translate"
          class="rounded p-2 transition-colors hover:opacity-80"
          style="color: var(--color-text)"
        >
          @if (theme.isDark()) {
            <span class="pi pi-sun text-xl" aria-hidden="true"></span>
          } @else {
            <span class="pi pi-moon text-xl" aria-hidden="true"></span>
          }
        </button>
        @if (auth.isLoggedIn()) {
          <span class="text-sm" style="color: var(--color-text-muted)">{{ auth.currentUser()?.email }}</span>
          <uf-button [label]="'auth.nav.docs' | translate" [routerLink]="['/docs']" />
          <uf-button [label]="'auth.nav.apiHealth' | translate" severity="secondary" (clicked)="checkHealth()" />
          <uf-button [label]="'auth.nav.logout' | translate" severity="danger" (clicked)="logout()" />
        } @else {
          <uf-button [label]="'auth.nav.login' | translate" [routerLink]="['/login']" />
          <uf-button [label]="'auth.nav.register' | translate" [routerLink]="['/register']" />
        }
      </div>
    </header>
  `,
})
export class LayoutHeaderComponent {
  protected api = inject(ApiService);
  protected auth = inject(AuthService);
  protected theme = inject(ThemeService);
  private translate = inject(TranslateService);

  logout() {
    this.auth.logout();
  }

  checkHealth() {
    this.api.getHealth().subscribe({
      next: (r) =>
        alert(this.translate.instant('errors.apiStatus', { status: r.status, timestamp: r.timestamp })),
      error: () => alert(this.translate.instant('errors.apiUnavailable')),
    });
  }
}
