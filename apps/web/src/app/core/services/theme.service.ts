import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = signal<boolean>(this.loadStored());

  readonly isDark = computed(() => this.darkMode());

  constructor() {
    this.apply(this.darkMode());
  }

  private loadStored(): boolean {
    if (typeof localStorage === 'undefined') return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private persist(value: boolean) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light');
  }

  private apply(dark: boolean) {
    const html = document.documentElement;
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  setDark(dark: boolean) {
    this.darkMode.set(dark);
    this.apply(dark);
    this.persist(dark);
  }

  toggle() {
    this.setDark(!this.darkMode());
  }
}
