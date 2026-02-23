import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { DOC_LIST } from '../../doc-list';
import { AppLoadingComponent } from '../../../../shared/components/app-loading/app-loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-doc-view',
  standalone: true,
  imports: [MarkdownComponent, AppLoadingComponent],
  template: `
    @if (error()) {
      <p class="text-red-500">{{ error() }}</p>
    } @else if (content()) {
      <article class="doc-content max-w-none">
        <markdown [data]="content()" />
      </article>
    } @else {
      <app-loading message="Loading documentation..." />
    }
  `,
})
export class DocViewComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  content = signal('');
  error = signal('');

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.loadDoc(id);
    });
  }

  private loadDoc(id: string) {
    const doc = DOC_LIST.find((d) => d.id === id);
    const filename = doc ? `${id}.md` : id;
    this.http
      .get(`/assets/docs/${filename}`, { responseType: 'text' })
      .subscribe({
        next: (text) => this.content.set(text),
        error: () =>
          this.error.set(`Documento não encontrado: ${id}`),
      });
  }
}
