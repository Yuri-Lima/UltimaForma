import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, pattern } from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth.service';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { UfInputComponent } from '../../../../shared/components/uf-input/uf-input.component';
import { PageCardComponent } from '../../../../shared/components/page-card/page-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mfa-verify',
  standalone: true,
  imports: [
    FormField,
    AppButtonComponent,
    UfInputComponent,
    PageCardComponent,
    TranslatePipe,
  ],
  template: `
    <app-page-card [title]="'auth.mfa.verify.title' | translate">
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {{ 'auth.mfa.verify.instructions' | translate }}
      </p>
      <form novalidate (submit)="onSubmit($event)">
        <uf-input
          [formField]="mfaForm.code"
          [label]="'auth.mfa.verify.codeLabel' | translate"
          id="mfa-verify-code"
          type="text"
          [maxlength]="6"
          [placeholder]="'auth.mfa.verify.codePlaceholder' | translate"
          styleClass="font-mono text-lg tracking-widest"
        />
        @if (error()) {
          <p class="mb-4 text-sm text-red-500">{{ error() }}</p>
        }
        <uf-button type="submit" [label]="'auth.mfa.verify.verify' | translate" [loading]="loading()" />
      </form>
    </app-page-card>
  `,
})
export class MfaVerifyComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  codeModel = signal({ code: '' });
  mfaForm = form(this.codeModel, (p) => {
    required(p.code, { message: 'auth.mfa.verify.enter6Digits' });
    pattern(p.code, /^\d{6}$/, { message: 'auth.mfa.verify.enter6Digits' });
  });

  loading = signal(false);
  error = signal('');

  onSubmit(ev: Event) {
    ev.preventDefault();
    if (this.mfaForm().invalid()) {
      this.mfaForm.code().markAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.mfaValidate(this.codeModel().code).subscribe({
      next: () => {
        this.router.navigate(['/docs']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err.error?.message ||
            this.translate.instant('auth.mfa.verify.invalidCode')
        );
      },
      complete: () => this.loading.set(false),
    });
  }
}
