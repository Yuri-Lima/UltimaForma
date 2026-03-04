import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-kb-page',
  standalone: true,
  imports: [MarkdownComponent, TranslatePipe],
  template: `
    @if (error()) {
      <p class="text-red-500">{{ error() }}</p>
    } @else if (content()) {
      <article class="kb-content max-w-none prose prose-sm sm:prose-base" style="color: var(--color-text)">
        <markdown [data]="content()" />
      </article>
    } @else {
      <div class="flex items-center gap-2 py-12" style="color: var(--color-text-muted)">
        <span class="pi pi-spin pi-spinner" aria-hidden="true"></span>
        {{ 'docs.loading' | translate }}
      </div>
    }
  `,
  styles: `
    :host ::ng-deep .kb-content {
      line-height: 1.7;
    }
    :host ::ng-deep .kb-content h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-text);
    }
    :host ::ng-deep .kb-content h2 {
      font-size: 1.375rem;
      font-weight: 600;
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      color: var(--color-text);
    }
    :host ::ng-deep .kb-content h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--color-text);
    }
    :host ::ng-deep .kb-content p {
      margin-bottom: 0.75rem;
      color: var(--color-text-muted);
    }
    :host ::ng-deep .kb-content ul,
    :host ::ng-deep .kb-content ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      color: var(--color-text-muted);
    }
    :host ::ng-deep .kb-content li {
      margin-bottom: 0.25rem;
    }
    :host ::ng-deep .kb-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      font-size: 0.875rem;
    }
    :host ::ng-deep .kb-content th {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      padding: 0.5rem 0.75rem;
      text-align: left;
      font-weight: 600;
      color: var(--color-text);
    }
    :host ::ng-deep .kb-content td {
      border: 1px solid var(--color-border);
      padding: 0.5rem 0.75rem;
      color: var(--color-text-muted);
    }
    :host ::ng-deep .kb-content code {
      background-color: var(--color-surface);
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.8125rem;
    }
    :host ::ng-deep .kb-content pre {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      padding: 1rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
    :host ::ng-deep .kb-content strong {
      color: var(--color-text);
      font-weight: 600;
    }
    :host ::ng-deep .kb-content a {
      color: var(--color-primary);
      text-decoration: underline;
    }
    :host ::ng-deep .kb-content hr {
      border-color: var(--color-border);
      margin: 2rem 0;
    }
    :host ::ng-deep .kb-content blockquote {
      border-left: 3px solid var(--color-primary);
      padding-left: 1rem;
      margin: 1rem 0;
      color: var(--color-text-muted);
      font-style: italic;
    }
  `,
})
export class KbPageComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  content = signal('');
  error = signal('');

  private currentDocId: string | null = null;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        this.currentDocId = id;
        if (id) this.loadDoc(id);
      });

    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.currentDocId) this.loadDoc(this.currentDocId);
      });
  }

  private loadDoc(id: string) {
    const lang = this.translate.currentLang || 'en';
    const filename = `${id}.md`;

    this.error.set('');
    this.content.set('');
    this.http
      .get(`/assets/docs/${lang}/${filename}`, { responseType: 'text' })
      .subscribe({
        next: (text) => this.content.set(text),
        error: () => {
          if (lang !== 'en') {
            this.http
              .get(`/assets/docs/en/${filename}`, { responseType: 'text' })
              .subscribe({
                next: (text) => this.content.set(text),
                error: () =>
                  this.error.set(
                    this.translate.instant('docs.notFound', { id })
                  ),
              });
          } else {
            this.error.set(this.translate.instant('docs.notFound', { id }));
          }
        },
      });
  }
}
