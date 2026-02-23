import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, ButtonDirective } from 'primeng/button';

export type AppButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button',
  standalone: true,
  imports: [Button, ButtonDirective, RouterLink],
  template: `
    @if (routerLink(); as link) {
      <a
        pButton
        [routerLink]="link"
        [label]="label()"
        [icon]="icon() || ''"
        [iconPos]="iconPos()"
        [severity]="severity()"
        [loading]="loading()"
        loadingIcon="pi pi-spinner"
        [ariaLabel]="ariaLabel() || label()"
        [fluid]="fluid()"
        [attr.aria-disabled]="isDisabled"
        [class]="styleClass() + (isDisabled ? ' pointer-events-none' : '')"
        (click)="isDisabled && $event.preventDefault()"
      >&#8203;</a>
    } @else {
      <p-button
        [type]="type()"
        [label]="label()"
        [icon]="icon() || ''"
        [iconPos]="iconPos()"
        [severity]="severity()"
        [loading]="loading()"
        loadingIcon="pi pi-spinner"
        [disabled]="isDisabled"
        [styleClass]="styleClass()"
        [ariaLabel]="ariaLabel() || label()"
        [fluid]="fluid()"
        (onClick)="clicked.emit($event)"
      />
    }
  `,
})
export class AppButtonComponent {
  /** Button label text */
  label = input<string>('');
  /** Visual variant */
  severity = input<AppButtonSeverity>('primary');
  /** HTML type: 'button' | 'submit' | 'reset' */
  type = input<'button' | 'submit' | 'reset'>('button');
  /** Loading spinner state */
  loading = input<boolean>(false);
  /** Disabled state */
  disabled = input<boolean>(false);
  /** PrimeIcons icon name (e.g. 'pi pi-check') */
  icon = input<string | undefined>(undefined);
  /** Icon position: 'left' | 'right' | 'top' | 'bottom' */
  iconPos = input<'left' | 'right' | 'top' | 'bottom'>('left');
  /** Router link for navigation; when set, button acts as link and clicked is ignored */
  routerLink = input<string | string[] | undefined>(undefined);
  /** Additional CSS classes */
  styleClass = input<string>('');
  /** Accessibility label for icon-only buttons */
  ariaLabel = input<string | undefined>(undefined);
  /** Full width */
  fluid = input<boolean>(false);

  /** Emitted on click; not used when routerLink is set */
  clicked = output<Event>();

  protected get isDisabled(): boolean {
    return this.disabled() || this.loading();
  }
}
