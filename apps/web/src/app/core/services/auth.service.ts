import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import {
  AuthUser,
  AuthResponse,
  API_BASE,
} from '@ultima-forma/shared';

export type { AuthUser, AuthResponse };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken = signal<string | null>(null);
  private refreshToken = signal<string | null>(null);
  private mfaRequired = signal<boolean>(false);
  private userEmail = signal<string | null>(null);

  readonly currentUser = computed(() =>
    this.accessToken()
      ? { email: this.userEmail(), mfaRequired: this.mfaRequired() }
      : null,
  );
  readonly isLoggedIn = computed(() => !!this.accessToken());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const stored = sessionStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.accessToken.set(parsed.accessToken);
        this.refreshToken.set(parsed.refreshToken ?? null);
        this.mfaRequired.set(parsed.mfaRequired ?? false);
        this.userEmail.set(parsed.user?.email ?? null);
      } catch {
        sessionStorage.removeItem('auth');
      }
    }
  }

  getToken(): string | null {
    return this.accessToken();
  }

  getMfaRequired(): boolean {
    return this.mfaRequired();
  }

  private persist(res: AuthResponse) {
    this.accessToken.set(res.accessToken);
    this.refreshToken.set(res.refreshToken ?? null);
    this.mfaRequired.set(res.mfaRequired);
    this.userEmail.set(res.user?.email ?? null);
    sessionStorage.setItem(
      'auth',
      JSON.stringify({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        mfaRequired: res.mfaRequired,
        user: res.user,
      }),
    );
  }

  private clear() {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.mfaRequired.set(false);
    this.userEmail.set(null);
    sessionStorage.removeItem('auth');
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${API_BASE}/auth/login`, { email, password })
      .pipe(tap((res) => this.persist(res)));
  }

  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${API_BASE}/auth/register`, { email, password })
      .pipe(tap((res) => this.persist(res)));
  }

  mfaSetup() {
    return this.http.post<{ otpauthUrl: string; secret: string }>(
      `${API_BASE}/auth/mfa/setup`,
      {},
    );
  }

  mfaVerify(code: string) {
    return this.http
      .post<AuthResponse>(`${API_BASE}/auth/mfa/verify`, { code })
      .pipe(tap((res) => this.persist(res)));
  }

  mfaValidate(code: string) {
    return this.http
      .post<AuthResponse>(`${API_BASE}/auth/mfa/validate`, { code })
      .pipe(tap((res) => this.persist(res)));
  }

  refresh() {
    const rt = this.refreshToken();
    if (!rt) return of(null);
    return this.http
      .post<AuthResponse>(`${API_BASE}/auth/refresh`, { refreshToken: rt })
      .pipe(
        tap((res) => this.persist(res)),
        catchError(() => {
          this.clear();
          this.router.navigate(['/login']);
          return of(null);
        }),
      );
  }

  logout() {
    const token = this.accessToken();
    const rt = this.refreshToken();
    this.clear();
    if (token) {
      this.http
        .post(`${API_BASE}/auth/logout`, { refreshToken: rt || undefined })
        .subscribe();
    }
    this.router.navigate(['/login']);
  }
}
