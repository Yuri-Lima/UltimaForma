import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, pattern } from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth.service';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { UfInputComponent } from '../../../../shared/components/uf-input/uf-input.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { PageCardComponent } from '../../../../shared/components/page-card/page-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mfa-setup',
  standalone: true,
  imports: [
    FormField,
    AppButtonComponent,
    UfInputComponent,
    QRCodeComponent,
    PageCardComponent,
    TranslatePipe,
  ],
  template: `
    <app-page-card [title]="'auth.mfa.setup.title' | translate">
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {{ 'auth.mfa.setup.instructions' | translate }}
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
          {{ 'auth.mfa.setup.orEnterManually' | translate:{ secret: secret() } }}
        </p>
      }
      <form novalidate (submit)="onSubmit($event)">
        <uf-input
          [formField]="mfaForm.code"
          [label]="'auth.mfa.setup.codeLabel' | translate"
          id="mfa-setup-code"
          type="text"
          [maxlength]="6"
          [placeholder]="'auth.mfa.setup.codePlaceholder' | translate"
          styleClass="font-mono text-lg tracking-widest"
        />
        @if (error()) {
          <p class="mb-4 text-sm text-red-500">{{ error() }}</p>
        }
        <uf-button type="submit" [label]="'auth.mfa.setup.verifyEnable' | translate" [loading]="loading()" />
      </form>
    </app-page-card>
  `,
})
export class MfaSetupComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  codeModel = signal({ code: '' });
  mfaForm = form(this.codeModel, (p) => {
    required(p.code, { message: 'auth.mfa.setup.enter6Digits' });
    pattern(p.code, /^\d{6}$/, { message: 'auth.mfa.setup.enter6Digits' });
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
          this.error.set(this.translate.instant('auth.mfa.setup.loadFailed'));
        }
      },
    });
  }

  onSubmit(ev: Event) {
    ev.preventDefault();
    if (this.mfaForm().invalid()) {
      this.mfaForm.code().markAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.mfaVerify(this.codeModel().code).subscribe({
      next: () => {
        this.router.navigate(['/docs']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err.error?.message ||
            this.translate.instant('auth.mfa.setup.invalidCode')
        );
      },
      complete: () => this.loading.set(false),
    });
  }
}
