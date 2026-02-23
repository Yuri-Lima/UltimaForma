import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loading',
  standalone: true,
  template: `
    <div
      class="flex flex-col items-center justify-center gap-4"
      [class]="fullPage() ? 'fixed inset-0 z-50 min-h-screen' : 'min-h-[200px]'"
      [style.background-color]="fullPage() ? 'var(--color-bg)' : undefined"
      [style.color]="'var(--color-text-muted)'"
    >
      <span
        class="pi pi-spin pi-spinner text-3xl"
        style="color: var(--color-primary)"
        aria-hidden="true"
      ></span>
      <p class="text-sm">{{ message() }}</p>
    </div>
  `,
})
export class AppLoadingComponent {
  message = input<string>('Loading...');
  /** When true: fixed overlay, full viewport, bg from tokens. Use for app bootstrap, route resolve. */
  fullPage = input<boolean>(false);
}
