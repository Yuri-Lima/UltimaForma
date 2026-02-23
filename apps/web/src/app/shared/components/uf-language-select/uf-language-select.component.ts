import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UfSelectComponent } from '../uf-select/uf-select.component';

interface LanguageOption {
  code: string;
  label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-language-select',
  standalone: true,
  imports: [UfSelectComponent, TranslatePipe],
  template: `
    <uf-select
      [options]="languageOptions()"
      optionLabel="label"
      optionValue="code"
      [(value)]="selectedLang"
      [placeholder]="'common.language' | translate"
      [styleClass]="styleClass()"
      [ariaLabel]="'common.language' | translate"
    />
  `,
})
export class UfLanguageSelectComponent {
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  /** Additional CSS classes (e.g. min-w-[120px] for compact header) */
  styleClass = input<string>('min-w-[120px]');

  /** Model synced with TranslateService - user changes propagate via effect */
  selectedLang = model<string | null>(this.translate.currentLang);

  /** Options built from translate.getLangs() with labels from common.languages.{code} */
  languageOptions = computed<LanguageOption[]>(() => {
    const codes = this.translate.getLangs() as string[];
    return codes.map((code) => ({
      code,
      label: this.translate.instant('common.languages.' + code),
    }));
  });

  constructor() {
    // Sync TranslateService when user selects a language
    effect(() => {
      const v = this.selectedLang();
      if (v && v !== this.translate.currentLang) {
        this.translate.use(v);
      }
    });

    // Sync selectedLang when language changes externally (e.g. another component)
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (this.selectedLang() !== event.lang) {
          this.selectedLang.set(event.lang);
        }
      });
  }
}
