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
import { DOC_LIST } from '../../doc-list';
import { AppLoadingComponent } from '../../../../shared/components/app-loading/app-loading.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-doc-view',
  standalone: true,
  imports: [MarkdownComponent, AppLoadingComponent, TranslatePipe],
  template: `
    @if (error()) {
      <p class="text-red-500">{{ error() }}</p>
    } @else if (content()) {
      <article class="doc-content max-w-none">
        <markdown [data]="content()" />
      </article>
    } @else {
      <app-loading [message]="'docs.loading' | translate" />
    }
  `,
})
export class DocViewComponent {
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
    const doc = DOC_LIST.find((d) => d.id === id);
    const filename = doc ? `${id}.md` : id;
    const lang = this.translate.currentLang || 'en';

    this.error.set('');
    this.http
      .get(`/assets/docs/${lang}/${filename}`, { responseType: 'text' })
      .subscribe({
        next: (text) => {
          this.content.set(text);
        },
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
