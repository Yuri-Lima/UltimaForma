import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AppButtonComponent } from '../../shared/components/app-button/app-button.component';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-header',
  standalone: true,
  imports: [RouterModule, AppButtonComponent],
  template: `
    <header class="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style="border-color: var(--color-border)">
      <h1 class="text-xl font-bold md:text-2xl" i18n="app title" style="color: var(--color-text)">Ultima Forma</h1>
      <div class="flex flex-wrap items-center gap-2 md:gap-4">
        <button
          type="button"
          (click)="theme.toggle()"
          [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
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
          <app-button label="Docs" [routerLink]="['/docs']" />
          <app-button label="API Health" severity="secondary" (clicked)="checkHealth()" />
          <app-button label="Logout" severity="danger" (clicked)="logout()" />
        } @else {
          <app-button label="Login" [routerLink]="['/login']" />
          <app-button label="Register" [routerLink]="['/register']" />
        }
      </div>
    </header>
  `,
})
export class LayoutHeaderComponent {
  protected api = inject(ApiService);
  protected auth = inject(AuthService);
  protected theme = inject(ThemeService);

  logout() {
    this.auth.logout();
  }

  checkHealth() {
    this.api.getHealth().subscribe({
      next: (r) => alert(`API: ${r.status} @ ${r.timestamp}`),
      error: () => alert('API não disponível'),
    });
  }
}
