import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { InputText } from 'primeng/inputtext';
import { QRCodeComponent } from 'angularx-qrcode';
import { PageCardComponent } from '../../../../shared/components/page-card/page-card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mfa-setup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppButtonComponent,
    InputText,
    QRCodeComponent,
    PageCardComponent,
  ],
  template: `
    <app-page-card title="Setup MFA">
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Scan the QR code with Google Authenticator or Microsoft Authenticator.
      </p>
      @if (otpauthUrl()) {
        <div class="mb-6 flex justify-center rounded bg-gray-100 dark:bg-gray-700 p-4">
          <qrcode
            [qrdata]="otpauthUrl()"
            [width]="200"
            [errorCorrectionLevel]="'M'"
          />
        </div>
        <p class="mb-4 text-xs text-gray-500 dark:text-gray-400">
          Or enter manually: {{ secret() }}
        </p>
      }
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="form-label" for="mfa-setup-code">6-digit code</label>
          <input
            pInputText
            id="mfa-setup-code"
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
        <app-button type="submit" label="Verify & Enable" [loading]="loading()" />
      </form>
    </app-page-card>
  `,
})
export class MfaSetupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  otpauthUrl = signal('');
  secret = signal('');
  loading = signal(false);
  error = signal('');

  ngOnInit() {
    this.auth.mfaSetup().subscribe({
      next: (res) => {
        this.otpauthUrl.set(res.otpauthUrl);
        this.secret.set(res.secret);
      },
      error: (err) => {
        if (err.error?.message?.includes('already enabled')) {
          this.router.navigate(['/mfa/verify']);
        } else {
          this.error.set('Failed to load MFA setup');
        }
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.mfaVerify(this.form.value.code!).subscribe({
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
