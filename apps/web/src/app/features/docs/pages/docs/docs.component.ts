import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { DOC_LIST } from '../../doc-list';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-docs',
  standalone: true,
  imports: [RouterModule, AppButtonComponent, TranslatePipe],
  template: `
    <div class="flex gap-6">
      <!-- Mobile overlay -->
      @if (sidebarOpen()) {
        <div
          class="fixed inset-0 z-40 bg-black/50 md:hidden"
          (click)="sidebarOpen.set(false)"
          role="button"
          tabindex="-1"
          [attr.aria-label]="'docs.closeSidebar' | translate"
        ></div>
      }
      <!-- Sidebar: drawer on mobile, fixed on desktop -->
      <aside
        [class.translate-x-0]="sidebarOpen()"
        [class.-translate-x-full]="!sidebarOpen()"
        class="fixed left-0 top-0 z-50 h-full w-64 shrink-0 border-r p-4 transition-transform duration-200 md:static md:z-auto md:block md:translate-x-0 md:border-r md:pr-4 md:pt-0"
        style="background-color: var(--color-surface); border-color: var(--color-border)"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold" style="color: var(--color-text)">
            {{ 'docs.title' | translate }}
          </h2>
          <uf-button
            icon="pi pi-times"
            severity="secondary"
            styleClass="rounded p-2 md:hidden"
            [ariaLabel]="'docs.closeSidebar' | translate"
            (clicked)="sidebarOpen.set(false)"
          />
        </div>
        <nav class="flex flex-col gap-1">
          @for (doc of docs; track doc.id) {
            <a
              [routerLink]="['/docs', doc.id]"
              routerLinkActive="docs-nav-link-active"
              [routerLinkActiveOptions]="{ exact: false }"
              (click)="sidebarOpen.set(false)"
              class="docs-nav-link rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {{ 'docTitles.' + doc.id | translate }}
            </a>
          }
        </nav>
      </aside>
      <!-- Main content -->
      <section class="min-w-0 flex-1 md:pl-0">
        <uf-button
          icon="pi pi-bars"
          severity="secondary"
          styleClass="mb-4 rounded p-2 md:hidden"
          [ariaLabel]="'docs.openMenu' | translate"
          (clicked)="sidebarOpen.set(true)"
        />
        <router-outlet />
      </section>
    </div>
  `,
})
export class DocsComponent {
  docs = DOC_LIST;
  sidebarOpen = signal(false);
}
