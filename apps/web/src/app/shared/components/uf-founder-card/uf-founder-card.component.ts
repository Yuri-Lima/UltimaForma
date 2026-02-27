import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-founder-card',
  standalone: true,
  template: `
    <div
      class="rounded-xl border p-6 shadow-sm sm:p-8"
      style="background-color: var(--color-surface); border-color: var(--color-border)"
    >
      <div class="flex flex-col sm:flex-row sm:items-start gap-6">
        @if (icon() || imageUrl()) {
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-3xl"
            style="background-color: var(--color-hover); color: var(--color-primary)"
          >
            @if (imageUrl()) {
              <img
                [src]="imageUrl()"
                [alt]="name()"
                class="h-16 w-16 rounded-full object-cover"
              />
            } @else if (icon()) {
              <span [class]="icon()" aria-hidden="true"></span>
            }
          </div>
        }
        <div class="min-w-0 flex-1">
          <h3 class="text-lg font-semibold" style="color: var(--color-text)">
            {{ name() }}
          </h3>
          @if (role()) {
            <p
              class="mt-1 text-sm font-medium"
              style="color: var(--color-primary)"
            >
              {{ role() }}
            </p>
          }
          @if (description()) {
            <p
              class="mt-4 text-sm leading-relaxed"
              style="color: var(--color-text-muted)"
            >
              {{ description() }}
            </p>
          }
          <ng-content />
        </div>
      </div>
    </div>
  `,
})
export class UfFounderCardComponent {
  name = input<string>('');
  role = input<string>('');
  description = input<string>('');
  icon = input<string>('');
  imageUrl = input<string>('');
}
