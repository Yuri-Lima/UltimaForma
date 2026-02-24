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
  minLength,
} from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth.service';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { UfInputComponent } from '../../../../shared/components/uf-input/uf-input.component';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register',
  standalone: true,
  imports: [
    FormField,
    RouterLink,
    AppButtonComponent,
    UfInputComponent,
    AuthCardComponent,
    TranslatePipe,
  ],
  template: `
    <app-auth-card [title]="'auth.register.title' | translate">
      <form novalidate (submit)="onSubmit($event)">
        <uf-input
          [formField]="registerForm.email"
          [label]="'auth.register.email' | translate"
          id="register-email"
          type="email"
          [placeholder]="'auth.register.emailPlaceholder' | translate"
        />
        <uf-input
          [formField]="registerForm.password"
          [label]="'auth.register.password' | translate"
          id="register-password"
          type="password"
          [placeholder]="'auth.register.passwordPlaceholder' | translate"
          [feedback]="true"
          [promptLabel]="'auth.password.prompt' | translate"
          [weakLabel]="'auth.password.weak' | translate"
          [mediumLabel]="'auth.password.medium' | translate"
          [strongLabel]="'auth.password.strong' | translate"
        />
        @if (error()) {
          <p class="mb-4 text-sm text-red-500">{{ error() }}</p>
        }
        <uf-button
          type="submit"
          [label]="'auth.register.createAccount' | translate"
          [loading]="loading()"
          [fluid]="true"
          styleClass="min-h-[44px]"
        />
        <p class="mt-6 text-center">
          <a routerLink="/login" class="auth-switch-link inline-block py-2">
            {{ 'auth.register.logInLink' | translate }}
          </a>
        </p>
      </form>
    </app-auth-card>
  `,
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  registerModel = signal({
    email: '',
    password: '',
  });

  registerForm = form(this.registerModel, (p) => {
    required(p.email, { message: 'auth.register.validEmailRequired' });
    email(p.email, { message: 'auth.register.validEmailRequired' });
    required(p.password, { message: 'auth.register.passwordMinLength' });
    minLength(p.password, 8, {
      message: 'auth.register.passwordMinLength',
    });
  });

  loading = signal(false);
  error = signal('');

  onSubmit(ev: Event) {
    ev.preventDefault();
    if (this.registerForm().invalid()) {
      this.registerForm.email().markAsTouched();
      this.registerForm.password().markAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const { email, password } = this.registerModel();
    this.auth.register(email, password).subscribe({
      next: () => {
        this.router.navigate(['/mfa/setup']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err.error?.message ||
            this.translate.instant('auth.register.failed')
        );
      },
      complete: () => this.loading.set(false),
    });
  }
}
