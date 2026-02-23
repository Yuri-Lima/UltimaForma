import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'pt-BR']);
    this.translate.setFallbackLang('en');
    const browserLang = this.translate.getBrowserLang();
    const lang = browserLang?.startsWith('pt') ? 'pt-BR' : 'en';
    this.translate.use(lang);
  }
}
