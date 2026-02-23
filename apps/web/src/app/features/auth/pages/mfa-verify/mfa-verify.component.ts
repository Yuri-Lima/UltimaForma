import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { InputText } from 'primeng/inputtext';
import { PageCardComponent } from '../../../../shared/components/page-card/page-card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mfa-verify',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppButtonComponent,
    InputText,
    PageCardComponent,
  ],
  template: `
    <app-page-card title="MFA Verification">
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Enter the 6-digit code from your authenticator app.
      </p>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="form-label" for="mfa-verify-code">Code</label>
          <input
            pInputText
            id="mfa-verify-code"
            formControlName="code"
            type="text"
            maxlength="6"
            placeholder="000000"
            class="w-full font-mono text-lg tracking-widest"
          />
          @if (form.get('code')?.invalid && form.get('code')?.touched) {
            <p class="mt-1 text-sm text-red-500">Enter 6 digits</p>
          }
        </div>
        @if (error()) {
          <p class="mb-4 text-sm text-red-500">{{ error() }}</p>
        }
        <app-button type="submit" label="Verify" [loading]="loading()" />
      </form>
    </app-page-card>
  `,
})
export class MfaVerifyComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  loading = signal(false);
  error = signal('');

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.mfaValidate(this.form.value.code!).subscribe({
      next: () => {
        this.router.navigate(['/docs']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Invalid code');
      },
      complete: () => this.loading.set(false),
    });
  }
}
