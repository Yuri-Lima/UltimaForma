import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-auth-card',
  standalone: true,
  template: `
    <div
      class="rounded-xl border shadow-sm p-6 sm:p-8"
      style="background-color: var(--color-surface); border-color: var(--color-border)"
    >
      @if (title()) {
        <h2
          class="mb-6 text-xl font-semibold sm:text-2xl"
          style="color: var(--color-text)"
        >
          {{ title() }}
        </h2>
      }
      @if (subtitle()) {
        <p
          class="mb-6 text-sm"
          style="color: var(--color-text-muted)"
        >
          {{ subtitle() }}
        </p>
      }
      <ng-content />
    </div>
  `,
})
export class AuthCardComponent {
  title = input<string>();
  subtitle = input<string>();
}
