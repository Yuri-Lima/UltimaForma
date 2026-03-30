import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

const KB_DOCS = [
  { id: '01-executive-summary' },
  { id: '02-vision-mission-values' },
  { id: '03-problem-statement' },
  { id: '04-market-thesis' },
  { id: '05-solution-architecture' },
  { id: '06-what-we-are-and-are-not' },
  { id: '10-business-model' },
  { id: '11-go-to-market' },
  { id: '21-roadmap-36-months' },
  { id: '09-technology-strategy' },
  { id: '17-regulatory-strategy' },
  { id: '14-competitive-landscape' },
  { id: '15-infrastructure-moat' },
  { id: '18-unit-economics' },
  { id: '19-risk-analysis' },
  { id: '20-fundraising-strategy' },
  { id: '22-appendix' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-kb',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  template: `
    <div class="flex min-h-[calc(100vh-3.5rem)]">
      <!-- Mobile overlay -->
      @if (sidebarOpen()) {
        <div
          class="fixed inset-0 z-40 bg-black/50 lg:hidden"
          (click)="sidebarOpen.set(false)"
          role="button"
          tabindex="-1"
          aria-label="Close sidebar"
        ></div>
      }

      <!-- Sidebar -->
      <aside
        [class.translate-x-0]="sidebarOpen()"
        [class.-translate-x-full]="!sidebarOpen()"
        class="fixed left-0 top-0 z-50 h-full w-72 shrink-0 border-r p-5 pt-6 overflow-y-auto transition-transform duration-200 lg:sticky lg:top-[3.5rem] lg:z-auto lg:block lg:translate-x-0 lg:h-[calc(100vh-3.5rem)]"
        style="background-color: var(--color-surface); border-color: var(--color-border)"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-base font-bold" style="color: var(--color-text)">
            {{ 'pitch.kb.title' | translate }}
          </h2>
          <button
            type="button"
            class="rounded p-1 lg:hidden"
            style="color: var(--color-text)"
            (click)="sidebarOpen.set(false)"
            aria-label="Close"
          >
            <span class="pi pi-times" aria-hidden="true"></span>
          </button>
        </div>

        <!-- Search -->
        <div class="relative mb-4">
          <span
            class="pi pi-search absolute left-2.5 top-1/2 -translate-y-1/2 text-sm"
            style="color: var(--color-text-muted)"
            aria-hidden="true"
          ></span>
          <input
            type="text"
            class="w-full rounded-md border py-2 pl-8 pr-3 text-sm"
            style="background-color: var(--color-bg); border-color: var(--color-border); color: var(--color-text)"
            [placeholder]="'pitch.kb.searchPlaceholder' | translate"
            (input)="filterTerm.set($any($event.target).value)"
          />
        </div>

        <nav class="flex flex-col gap-0.5">
          @for (doc of filteredDocs(); track doc.id) {
            <a
              [routerLink]="['/pitch-deck/kb', doc.id]"
              routerLinkActive="kb-nav-active"
              [routerLinkActiveOptions]="{ exact: false }"
              (click)="sidebarOpen.set(false)"
              class="kb-nav-link rounded-md px-3 py-2 text-sm transition-colors"
              style="color: var(--color-text-muted)"
            >
              {{ ('docTitles.' + doc.id) | translate }}
            </a>
          }
        </nav>
      </aside>

      <!-- Main content -->
      <section class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <button
          type="button"
          class="mb-4 rounded-md p-2 lg:hidden"
          style="color: var(--color-text); background-color: var(--color-surface); border: 1px solid var(--color-border)"
          (click)="sidebarOpen.set(true)"
          aria-label="Open navigation"
        >
          <span class="pi pi-bars" aria-hidden="true"></span>
        </button>
        <router-outlet />
      </section>
    </div>
  `,
  styles: `
    .kb-nav-link:hover {
      color: var(--color-text);
      background-color: var(--color-hover);
    }
    :host ::ng-deep .kb-nav-active {
      color: var(--color-primary) !important;
      background-color: rgba(99, 102, 241, 0.08) !important;
      font-weight: 500;
    }
  `,
})
export class KbComponent {
  private allDocs = KB_DOCS;
  sidebarOpen = signal(false);
  filterTerm = signal('');

  filteredDocs = computed(() => {
    const term = this.filterTerm().toLowerCase();
    if (!term) return this.allDocs;
    return this.allDocs.filter((d) => d.id.replace(/-/g, ' ').includes(term));
  });
}
