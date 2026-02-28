import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-section',
  standalone: true,
  template: `
    <section
      [id]="id()"
      class="py-16 sm:py-20 px-4 sm:px-6"
      [style.background-color]="backgroundTransparent() ? 'transparent' : 'var(--color-bg)'"
    >
      <div class="mx-auto max-w-4xl">
        @if (title()) {
          <h2
            class="mb-8 text-2xl font-semibold sm:text-3xl"
            style="color: var(--color-text)"
          >
            {{ title() }}
          </h2>
        }
        <ng-content />
      </div>
    </section>
  `,
})
export class UfSectionComponent {
  title = input<string>();
  id = input<string>('');
  backgroundTransparent = input<boolean>(false);
}
