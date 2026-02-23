import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-select',
  standalone: true,
  imports: [Select, FormsModule],
  template: `
    <p-select
      [options]="options()"
      [optionLabel]="optionLabel()"
      [optionValue]="optionValue()"
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [styleClass]="styleClass()"
      [showClear]="showClear()"
      [attr.aria-label]="ariaLabel()"
    />
  `,
})
export class UfSelectComponent<T = unknown> {
  /** Array of option objects */
  options = input.required<unknown[]>();
  /** Property name for display text */
  optionLabel = input<string>('label');
  /** Property name for option value */
  optionValue = input<string>('value');
  /** Two-way bound selected value */
  value = model<T | null>(null);
  /** Placeholder when empty */
  placeholder = input<string>('');
  /** Disabled state */
  disabled = input<boolean>(false);
  /** Additional CSS classes */
  styleClass = input<string>('');
  /** Show clear icon */
  showClear = input<boolean>(false);
  /** A11y label */
  ariaLabel = input<string | undefined>(undefined);
}
