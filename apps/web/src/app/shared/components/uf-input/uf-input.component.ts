import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import type {
  DisabledReason,
  FormValueControl,
  ValidationError,
  WithOptionalField,
} from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-input',
  standalone: true,
  imports: [InputText, Password, FormsModule, NgClass, TranslatePipe],
  template: `
    @if (!hidden()) {
      <div class="mb-4">
        @if (label()) {
          <label class="form-label" [for]="id()">{{ label() }}</label>
        }
        @if (type() === 'password' && usePrimePassword()) {
          <p-password
            [inputId]="id()"
            [placeholder]="placeholder()"
            [ngModel]="value()"
            (ngModelChange)="value.set($event)"
            (onBlur)="touched.set(true)"
            [disabled]="disabled()"
            [invalid]="invalid()"
            [toggleMask]="toggleMask()"
            [feedback]="feedback()"
            [promptLabel]="promptLabel() || undefined"
            [weakLabel]="weakLabel() || undefined"
            [mediumLabel]="mediumLabel() || undefined"
            [strongLabel]="strongLabel() || undefined"
            [attr.maxlength]="maxlength()"
            fluid
            class="w-full"
            [ngClass]="styleClass()"
          />
        } @else {
          <input
            pInputText
            [id]="id()"
            [type]="type()"
            [placeholder]="placeholder()"
            [attr.maxlength]="maxlength()"
            [disabled]="disabled()"
            [readonly]="readonly()"
            [value]="value()"
            (input)="onInput($event)"
            (blur)="touched.set(true)"
            class="w-full"
            [ngClass]="styleClass()"
            [class.invalid]="invalid()"
            [attr.aria-invalid]="invalid()"
          />
        }
        @if (invalid() && touched()) {
          <div class="mt-1 text-sm text-red-500" role="alert">
            @for (error of errors(); track error) {
              <p>{{ (error.message ?? error.kind) | translate }}</p>
            }
          </div>
        }
      </div>
    }
  `,
})
export class UfInputComponent implements FormValueControl<string> {
  /** Required by FormValueControl - bound by FormField directive */
  readonly value = model<string>('');

  /** Touched state - control updates on blur */
  readonly touched = model<boolean>(false);

  /** Read-only state from FormField directive */
  readonly disabled = input<boolean>(false);
  readonly disabledReasons = input<readonly WithOptionalField<DisabledReason>[]>(
    []
  );
  readonly readonly = input<boolean>(false);
  readonly hidden = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  /** Label text for the input */
  label = input<string>('');
  /** ID for the input element (required for a11y when label exists) */
  id = input<string>('');
  /** Input type */
  type = input<'text' | 'email' | 'password'>('text');
  /** Placeholder text */
  placeholder = input<string>('');
  /** Additional CSS classes for the input (e.g. font-mono text-lg tracking-widest) */
  styleClass = input<string>('');
  /** Max length for the input */
  maxlength = input<number | undefined>(undefined);

  /** When type=password, use p-password component if true */
  usePrimePassword = input<boolean>(true);
  /** Show show/hide icon (p-password only) */
  toggleMask = input<boolean>(true);
  /** Show strength meter (p-password only) */
  feedback = input<boolean>(false);
  /** Strength meter labels (p-password only). Use e.g. 'auth.password.prompt' \| translate */
  promptLabel = input<string>('');
  weakLabel = input<string>('');
  mediumLabel = input<string>('');
  strongLabel = input<string>('');

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target?.value ?? '');
  }
}
