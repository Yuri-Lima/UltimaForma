import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  form,
  FormField,
  required,
  email,
} from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth.service';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { UfInputComponent } from '../../../../shared/components/uf-input/uf-input.component';
import { UfLanguageSelectComponent } from '../../../../shared/components/uf-language-select/uf-language-select.component';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  standalone: true,
  imports: [
    FormField,
    RouterLink,
    AppButtonComponent,
    UfInputComponent,
    UfLanguageSelectComponent,
    AuthCardComponent,
    TranslatePipe,
  ],
  template: `
    <app-auth-card [title]="'auth.login.title' | translate">
      <form novalidate (submit)="onSubmit($event)">
        <div class="mb-4">
        </div>
        <uf-input
          [formField]="loginForm.email"
          [label]="'auth.login.email' | translate"
          id="login-email"
          type="email"
          [placeholder]="'auth.login.emailPlaceholder' | translate"
        />
        <uf-input
          [formField]="loginForm.password"
          [label]="'auth.login.password' | translate"
          id="login-password"
          type="password"
          [placeholder]="'auth.login.passwordPlaceholder' | translate"
        />
        @if (error()) {
          <p class="mb-4 text-sm text-red-500">{{ error() }}</p>
        }
        <uf-button
          type="submit"
          [label]="'auth.login.continue' | translate"
          [loading]="loading()"
          [fluid]="true"
          styleClass="min-h-[44px]"
        />
        <p class="mt-6 text-center">
          <a routerLink="/register" class="auth-switch-link inline-block py-2">
            {{ 'auth.login.signUpLink' | translate }}
          </a>
        </p>
      </form>
    </app-auth-card>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (p) => {
    required(p.email, { message: 'auth.login.emailRequired' });
    email(p.email, { message: 'auth.login.emailRequired' });
    required(p.password, { message: 'auth.login.passwordRequired' });
  });

  loading = signal(false);
  error = signal('');

  onSubmit(ev: Event) {
    ev.preventDefault();
    if (this.loginForm().invalid()) {
      this.loginForm.email().markAsTouched();
      this.loginForm.password().markAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const { email, password } = this.loginModel();
    this.auth.login(email, password).subscribe({
      next: (res) => {
        if (res.mfaRequired) {
          this.router.navigate(['/mfa/verify']);
        } else {
          this.router.navigate(['/docs']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err.error?.message ||
            this.translate.instant('auth.login.failed')
        );
      },
      complete: () => this.loading.set(false),
    });
  }
}
