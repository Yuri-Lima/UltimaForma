import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { UfSectionComponent } from '../../../shared/components/uf-section/uf-section.component';
import { UfFounderCardComponent } from '../../../shared/components/uf-founder-card/uf-founder-card.component';
import { AppButtonComponent } from '../../../shared/components/app-button/app-button.component';
import { UfFlowDiagramComponent } from '../../../shared/components/uf-flow-diagram/uf-flow-diagram.component';
import { UfWalletStoryComponent } from '../../../shared/components/uf-wallet-story/uf-wallet-story.component';
import { Textarea } from 'primeng/textarea';
import { InputText } from 'primeng/inputtext';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  standalone: true,
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ opacity: 0, maxHeight: '0px', overflow: 'hidden' }),
        animate('500ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, maxHeight: '4000px', overflow: 'hidden' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, maxHeight: '4000px', overflow: 'hidden' }),
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 0, maxHeight: '0px', overflow: 'hidden' })),
      ]),
    ]),
  ],
  imports: [
    TranslatePipe,
    RouterLink,
    UfSectionComponent,
    UfFounderCardComponent,
    AppButtonComponent,
    UfFlowDiagramComponent,
    UfWalletStoryComponent,
    FormsModule,
    Textarea,
    InputText,
  ],
  template: `
    <!-- Hero -->
    <section
      class="landing-hero-bg relative overflow-hidden px-4 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-28"
    >
      <span
        class="absolute right-6 top-8 hidden items-center gap-6 rounded-full px-10 py-4 text-2xl font-semibold sm:right-8 sm:top-12 sm:inline-flex"
        style="background-color: rgba(99, 102, 241, 0.12); color: var(--color-primary); border: 1px solid rgba(99, 102, 241, 0.25); box-shadow: 0 0 24px 8px #ef4444, inset 0 0 24px 3px rgba(239, 68, 68, 0.2)"
        role="status"
      >
        <span class="pi pi-shield text-4xl" aria-hidden="true"></span>
        {{ 'landing.badge.privacyFirst' | translate }}
      </span>
      <div class="mx-auto max-w-4xl text-center">
        <h1
            class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            style="color: var(--color-text)"
          >
            {{ 'landing.hero.headline' | translate }}
        </h1>
        <p
            class="mx-auto mt-6 max-w-2xl text-lg"
            style="color: var(--color-text-muted)"
          >
            {{ 'landing.hero.subheadline' | translate }}
        </p>
        <div class="mt-10">
            <uf-button
              [label]="'landing.hero.cta' | translate"
              severity="primary"
              styleClass="min-h-[48px] px-8"
              (clicked)="scrollToContact($event)"
            />
        </div>
        <div class="mt-16 sm:mt-20">
            <uf-flow-diagram
            [title]="'landing.diagram.title' | translate"
            [clickHint]="'landing.diagram.clickHint' | translate"
            [activeTile]="activeUseCase()"
            (tileClicked)="toggleUseCase($event)"
            [verifierLabel]="'landing.diagram.verifier' | translate"
            [verifierDesc]="'landing.diagram.verifierDesc' | translate"
            [verifierHover]="'landing.diagram.verifierHover' | translate"
            [walletLabel]="'landing.diagram.wallet' | translate"
            [walletDesc]="'landing.diagram.walletDesc' | translate"
            [walletHover]="'landing.diagram.walletHover' | translate"
            [providerLabel]="'landing.diagram.provider' | translate"
            [providerDesc]="'landing.diagram.providerDesc' | translate"
            [providerHover]="'landing.diagram.providerHover' | translate"
            />
        </div>
      </div>
    </section>

    <!-- Use-case accordion panels -->
    @if (activeUseCase() === 'wallet') {
      <div id="use-case-panel" class="landing-wallet-story-bg" style="scroll-margin-top: 2rem" @expandCollapse>
        <uf-wallet-story />
      </div>
    }

    <!-- Produto -->
    <div class="landing-product-bg">
    <uf-section id="produto" [title]="'landing.product.title' | translate" [backgroundTransparent]="true">
      <div class="space-y-6">
        <p class="text-base leading-relaxed" style="color: var(--color-text-muted)">
          {{ 'landing.product.description' | translate }}
        </p>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <span class="pi pi-shield text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 font-semibold" style="color: var(--color-text)">
              {{ 'landing.product.feature1.title' | translate }}
            </h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">
              {{ 'landing.product.feature1.desc' | translate }}
            </p>
          </div>
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <span class="pi pi-wallet text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 font-semibold" style="color: var(--color-text)">
              {{ 'landing.product.feature2.title' | translate }}
            </h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">
              {{ 'landing.product.feature2.desc' | translate }}
            </p>
          </div>
          <div
            class="rounded-lg border p-4 sm:col-span-2 lg:col-span-1"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <span class="pi pi-link text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 font-semibold" style="color: var(--color-text)">
              {{ 'landing.product.feature3.title' | translate }}
            </h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">
              {{ 'landing.product.feature3.desc' | translate }}
            </p>
          </div>
        </div>
      </div>
    </uf-section>
    </div>

    <!-- Fundadores -->
    <div class="landing-founders-bg">
    <uf-section id="fundadores" [title]="'landing.founders.title' | translate" [backgroundTransparent]="true">
        <div class="grid gap-8 sm:grid-cols-2">
          <uf-founder-card
            [name]="'landing.founders.pedro.name' | translate"
            [role]="'landing.founders.pedro.role' | translate"
            [description]="'landing.founders.pedro.description' | translate"
            imageUrl="/assets/founders/pedro.png"
          />
          <uf-founder-card
            [name]="'landing.founders.yuri.name' | translate"
            [role]="'landing.founders.yuri.role' | translate"
            [description]="'landing.founders.yuri.description' | translate"
            imageUrl="/assets/founders/yuri.png"
          />
        </div>
    </uf-section>
    </div>

    <!-- Contato -->
    <div class="landing-contact-bg">
    <uf-section id="contato" [title]="'landing.contact.title' | translate" [backgroundTransparent]="true">
        <div class="grid gap-12 lg:grid-cols-2">
          <div>
            <p class="text-base" style="color: var(--color-text-muted)">
              {{ 'landing.contact.intro' | translate }}
            </p>
            <a
              href="mailto:contato@ultimaforma.id"
              class="mt-4 inline-flex items-center gap-2 text-lg font-medium hover:opacity-80 transition-opacity"
              style="color: var(--color-primary)"
            >
              <span class="pi pi-envelope" aria-hidden="true"></span>
              contato&#64;ultimaforma.id
            </a>
        </div>
        <div
          class="rounded-xl border p-6"
          style="background-color: var(--color-surface); border-color: var(--color-border)"
        >
          @if (contactSubmitted()) {
            <p class="text-center font-medium" style="color: var(--color-primary)">
              {{ 'landing.contact.success' | translate }}
            </p>
          } @else {
            <form (ngSubmit)="onContactSubmit()" class="space-y-4">
              <div>
                <label class="form-label" for="contact-name">
                  {{ 'landing.contact.name' | translate }}
                </label>
                <input
                  pInputText
                  id="contact-name"
                  type="text"
                  [(ngModel)]="contactName"
                  name="name"
                  class="w-full"
                  [placeholder]="'landing.contact.namePlaceholder' | translate"
                />
              </div>
              <div>
                <label class="form-label" for="contact-email">
                  {{ 'landing.contact.email' | translate }}
                </label>
                <input
                  pInputText
                  id="contact-email"
                  type="email"
                  [(ngModel)]="contactEmail"
                  name="email"
                  class="w-full"
                  [placeholder]="'landing.contact.emailPlaceholder' | translate"
                />
              </div>
              <div>
                <label class="form-label" for="contact-message">
                  {{ 'landing.contact.message' | translate }}
                </label>
                <textarea
                  pTextarea
                  id="contact-message"
                  [(ngModel)]="contactMessage"
                  name="message"
                  rows="4"
                  class="w-full"
                  [placeholder]="'landing.contact.messagePlaceholder' | translate"
                ></textarea>
              </div>
              <uf-button
                type="submit"
                [label]="'common.send' | translate"
                severity="primary"
                [fluid]="true"
              />
            </form>
          }
          </div>
        </div>
    </uf-section>
    </div>

    <!-- Footer -->
    <footer
      class="landing-footer-bg border-t px-4 py-8 sm:px-6"
      style="border-color: var(--color-border)"
    >
      <div class="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm" style="color: var(--color-text-muted)">
          {{ 'landing.footer.copyright' | translate }}
        </p>
        <div class="flex gap-6">
          <a
            routerLink="/login"
            class="text-sm hover:opacity-80 transition-opacity"
            style="color: var(--color-primary)"
          >
            {{ 'auth.nav.login' | translate }}
          </a>
          <a
            href="#contato"
            class="text-sm hover:opacity-80 transition-opacity"
            style="color: var(--color-primary)"
          >
            {{ 'landing.nav.contact' | translate }}
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class LandingComponent {
  contactName = '';
  contactEmail = '';
  contactMessage = '';
  contactSubmitted = signal(false);
  activeUseCase = signal<'verifier' | 'wallet' | 'provider' | null>(null);

  toggleUseCase(tile: 'verifier' | 'wallet' | 'provider') {
    const isClosing = this.activeUseCase() === tile;
    this.activeUseCase.set(isClosing ? null : tile);
    if (!isClosing) {
      setTimeout(() => {
        document.getElementById('use-case-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 550);
    }
  }

  scrollToContact(ev: Event) {
    ev.preventDefault();
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  onContactSubmit() {
    if (!this.contactName.trim() || !this.contactEmail.trim()) {
      return;
    }
    this.contactSubmitted.set(true);
  }
}
