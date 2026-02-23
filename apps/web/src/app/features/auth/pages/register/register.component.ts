import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { InputText } from 'primeng/inputtext';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AppButtonComponent,
    InputText,
    AuthCardComponent,
  ],
  template: `
    <app-auth-card title="Create your workspace">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="form-label" for="register-email">Email</label>
          <input
            pInputText
            id="register-email"
            formControlName="email"
            type="email"
            placeholder="email@example.com"
            class="w-full"
          />
          @if (form.get('email')?.invalid && form.get('email')?.touched) {
            <p class="mt-1 text-sm text-red-500">Valid email is required</p>
          }
        </div>
        <div class="mb-4">
          <label class="form-label" for="register-password">Password</label>
          <input
            pInputText
            id="register-password"
            formControlName="password"
            type="password"
            placeholder="Min 8 characters"
            class="w-full"
          />
          @if (form.get('password')?.invalid && form.get('password')?.touched) {
            <p class="mt-1 text-sm text-red-500">Password must be at least 8 characters</p>
          }
        </div>
        @if (error()) {
          <p class="mb-4 text-sm text-red-500">{{ error() }}</p>
        }
        <app-button
          type="submit"
          label="Create account"
          [loading]="loading()"
          [fluid]="true"
          styleClass="min-h-[44px]"
        />
        <p class="mt-6 text-center">
          <a routerLink="/login" class="auth-switch-link inline-block py-2">
            Already have an account? Log in
          </a>
        </p>
      </form>
    </app-auth-card>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
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
    this.auth
      .register(this.form.value.email!, this.form.value.password!)
      .subscribe({
        next: () => {
          this.router.navigate(['/mfa/setup']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.error?.message || 'Registration failed');
        },
        complete: () => this.loading.set(false),
      });
  }
}
