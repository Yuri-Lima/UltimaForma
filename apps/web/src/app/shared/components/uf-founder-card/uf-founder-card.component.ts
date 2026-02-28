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
      <div
        class="flex flex-col gap-6"
        [class.items-center]="imageUrl()"
        [class.sm:flex-row]="!imageUrl()"
        [class.sm:items-start]="!imageUrl()"
      >
        @if (icon() || imageUrl()) {
          <div
            class="flex shrink-0 items-center justify-center rounded-full text-3xl"
            [class.h-72]="imageUrl()"
            [class.w-72]="imageUrl()"
            [class.h-16]="!imageUrl()"
            [class.w-16]="!imageUrl()"
            [style.background-color]="imageUrl() ? 'transparent' : 'var(--color-hover)'"
            [style.color]="imageUrl() ? '' : 'var(--color-primary)'"
          >
            @if (imageUrl()) {
              <img
                [src]="imageUrl()"
                [alt]="name()"
                class="h-72 w-72 rounded-full object-cover object-top border-4 border-white"
              />
            } @else if (icon()) {
              <span [class]="icon()" aria-hidden="true"></span>
            }
          </div>
        }
        <div
          class="min-w-0 flex-1"
          [class.text-center]="imageUrl()"
          [class.sm:text-left]="imageUrl()"
        >
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
