import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-page-card',
  standalone: true,
  template: `
    <div
      class="rounded-xl border p-6 shadow-sm"
      style="background-color: var(--color-surface); border-color: var(--color-border)"
    >
      @if (title()) {
        <h2 class="mb-4 text-xl font-semibold" style="color: var(--color-text)">{{ title() }}</h2>
      }
      <ng-content />
    </div>
  `,
})
export class PageCardComponent {
  title = input<string>();
}
