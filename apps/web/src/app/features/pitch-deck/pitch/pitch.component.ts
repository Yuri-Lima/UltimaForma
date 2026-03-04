import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-pitch',
  standalone: true,
  imports: [TranslatePipe, RouterLink],
  styleUrl: './pitch.component.css',
  template: `
    <!-- ═══════════════════════════════════════════ -->
    <!-- S1: HERO                                    -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-hero">
      <div class="pitch-inner text-center">
        <span class="section-tag">{{ 'pitch.hero.tag' | translate }}</span>
        <h1
          class="gradient-text text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style="line-height: 1.1"
        >
          {{ 'pitch.hero.headline' | translate }}
        </h1>
        <p
          class="mx-auto mt-6 max-w-2xl text-lg sm:text-xl"
          style="color: var(--color-text-muted); line-height: 1.6"
        >
          {{ 'pitch.hero.sub' | translate }}
        </p>
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a routerLink="/pitch-deck/kb" class="cta-primary">
            <span class="pi pi-book" aria-hidden="true"></span>
            {{ 'pitch.hero.ctaPitch' | translate }}
          </a>
          <a href="#how-it-works" class="cta-secondary" (click)="scrollTo($event, 'how-it-works')">
            <span class="pi pi-play" aria-hidden="true"></span>
            {{ 'pitch.hero.ctaDemo' | translate }}
          </a>
        </div>

        <!-- Key stats -->
        <div class="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div class="stat-card">
            <div class="stat-number">R$ 40–100</div>
            <div class="stat-label">{{ 'pitch.hero.stat1' | translate }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">77%</div>
            <div class="stat-label">{{ 'pitch.hero.stat2' | translate }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">95M+</div>
            <div class="stat-label">{{ 'pitch.hero.stat3' | translate }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">$15–25B</div>
            <div class="stat-label">{{ 'pitch.hero.stat4' | translate }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S2: THE PROBLEM (Before vs After)           -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-dark" id="problem">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.problem.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.problem.headline' | translate }}
        </h2>
        <p class="mt-4 max-w-2xl text-lg" style="color: var(--color-text-muted)">
          {{ 'pitch.problem.sub' | translate }}
        </p>

        <div class="before-after-grid mt-10">
          <!-- Before -->
          <div class="before-card">
            <div class="flex items-center gap-2 mb-4">
              <span class="pi pi-times-circle text-xl" style="color: #ef4444" aria-hidden="true"></span>
              <h3 class="text-lg font-bold" style="color: #ef4444">{{ 'pitch.problem.beforeTitle' | translate }}</h3>
            </div>
            <ul class="space-y-3" style="color: var(--color-text-muted)">
              <li class="flex items-start gap-2">
                <span class="pi pi-minus text-xs mt-1.5" style="color: #ef4444" aria-hidden="true"></span>
                {{ 'pitch.problem.before1' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-minus text-xs mt-1.5" style="color: #ef4444" aria-hidden="true"></span>
                {{ 'pitch.problem.before2' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-minus text-xs mt-1.5" style="color: #ef4444" aria-hidden="true"></span>
                {{ 'pitch.problem.before3' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-minus text-xs mt-1.5" style="color: #ef4444" aria-hidden="true"></span>
                {{ 'pitch.problem.before4' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-minus text-xs mt-1.5" style="color: #ef4444" aria-hidden="true"></span>
                {{ 'pitch.problem.before5' | translate }}
              </li>
            </ul>
          </div>

          <!-- After -->
          <div class="after-card">
            <div class="flex items-center gap-2 mb-4">
              <span class="pi pi-check-circle text-xl" style="color: #22c55e" aria-hidden="true"></span>
              <h3 class="text-lg font-bold" style="color: #22c55e">{{ 'pitch.problem.afterTitle' | translate }}</h3>
            </div>
            <ul class="space-y-3" style="color: var(--color-text-muted)">
              <li class="flex items-start gap-2">
                <span class="pi pi-check text-xs mt-1.5" style="color: #22c55e" aria-hidden="true"></span>
                {{ 'pitch.problem.after1' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-check text-xs mt-1.5" style="color: #22c55e" aria-hidden="true"></span>
                {{ 'pitch.problem.after2' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-check text-xs mt-1.5" style="color: #22c55e" aria-hidden="true"></span>
                {{ 'pitch.problem.after3' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-check text-xs mt-1.5" style="color: #22c55e" aria-hidden="true"></span>
                {{ 'pitch.problem.after4' | translate }}
              </li>
              <li class="flex items-start gap-2">
                <span class="pi pi-check text-xs mt-1.5" style="color: #22c55e" aria-hidden="true"></span>
                {{ 'pitch.problem.after5' | translate }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S3: THE REVEAL — What is Ultima Forma       -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-accent" id="solution">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.solution.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.solution.headline' | translate }}
        </h2>
        <p class="mt-4 max-w-3xl text-lg" style="color: var(--color-text-muted)">
          {{ 'pitch.solution.sub' | translate }}
        </p>

        <div class="callout mt-8">
          {{ 'pitch.solution.positioning' | translate }}
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-3">
          <div class="feature-card">
            <span class="pi pi-wallet text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 text-lg font-semibold" style="color: var(--color-text)">
              {{ 'pitch.solution.card1Title' | translate }}
            </h3>
            <p class="mt-2 text-sm" style="color: var(--color-text-muted)">
              {{ 'pitch.solution.card1Desc' | translate }}
            </p>
          </div>
          <div class="feature-card">
            <span class="pi pi-sitemap text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 text-lg font-semibold" style="color: var(--color-text)">
              {{ 'pitch.solution.card2Title' | translate }}
            </h3>
            <p class="mt-2 text-sm" style="color: var(--color-text-muted)">
              {{ 'pitch.solution.card2Desc' | translate }}
            </p>
          </div>
          <div class="feature-card">
            <span class="pi pi-code text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 text-lg font-semibold" style="color: var(--color-text)">
              {{ 'pitch.solution.card3Title' | translate }}
            </h3>
            <p class="mt-2 text-sm" style="color: var(--color-text-muted)">
              {{ 'pitch.solution.card3Desc' | translate }}
            </p>
          </div>
        </div>

        <!-- What we are NOT -->
        <div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          @for (item of notItems; track item) {
            <div class="feature-card flex items-start gap-3">
              <span class="pi pi-ban text-lg flex-shrink-0 mt-0.5" style="color: var(--color-text-muted)" aria-hidden="true"></span>
              <div>
                <p class="text-sm font-semibold" style="color: var(--color-text)">{{ ('pitch.solution.not' + item + 'Title') | translate }}</p>
                <p class="text-xs mt-0.5" style="color: var(--color-text-muted)">{{ ('pitch.solution.not' + item + 'Desc') | translate }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S4: HOW IT WORKS (6-step stepper)           -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-dark" id="how-it-works">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.steps.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.steps.headline' | translate }}
        </h2>
        <p class="mt-4 max-w-2xl text-lg" style="color: var(--color-text-muted)">
          {{ 'pitch.steps.sub' | translate }}
        </p>

        <div class="mt-10 grid gap-12 lg:grid-cols-2">
          <!-- Stepper -->
          <div class="stepper">
            @for (step of steps; track step; let i = $index; let last = $last) {
              <div class="step-item">
                @if (!last) {
                  <div class="step-line"></div>
                }
                <div class="step-number">{{ i + 1 }}</div>
                <div class="step-content">
                  <h4>{{ ('pitch.steps.step' + (i + 1) + 'Title') | translate }}</h4>
                  <p>{{ ('pitch.steps.step' + (i + 1) + 'Desc') | translate }}</p>
                </div>
              </div>
            }
          </div>

          <!-- Consent simulator -->
          <div>
            <h3 class="text-lg font-semibold mb-4" style="color: var(--color-text)">
              {{ 'pitch.consent.title' | translate }}
            </h3>
            <div class="consent-sim">
              <div class="flex items-center gap-2 mb-4 pb-3" style="border-bottom: 1px solid var(--color-border)">
                <span class="pi pi-shield" style="color: var(--color-primary)" aria-hidden="true"></span>
                <span class="text-sm font-semibold" style="color: var(--color-text)">{{ 'pitch.consent.header' | translate }}</span>
              </div>
              @for (attr of consentAttrs; track attr.key) {
                <div class="consent-attr">
                  <div>
                    <p class="text-sm font-medium" style="color: var(--color-text)">{{ ('pitch.consent.' + attr.key) | translate }}</p>
                    <p class="text-xs" style="color: var(--color-text-muted)">{{ ('pitch.consent.' + attr.key + 'Issuer') | translate }}</p>
                  </div>
                  <button
                    type="button"
                    class="consent-toggle"
                    [class.consent-toggle-on]="attr.on()"
                    (click)="attr.on.set(!attr.on())"
                    [attr.aria-pressed]="attr.on()"
                    [attr.aria-label]="('pitch.consent.' + attr.key) | translate"
                  ></button>
                </div>
              }
              <div class="mt-4 pt-3" style="border-top: 1px solid var(--color-border)">
                <p class="text-xs" style="color: var(--color-text-muted)">
                  {{ 'pitch.consent.footer' | translate }}
                </p>
                <div class="mt-2 text-sm font-semibold" style="color: var(--color-primary)">
                  {{ sharedCount() }}/{{ consentAttrs.length }} {{ 'pitch.consent.shared' | translate }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S5: PERSONA SWITCHER                        -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-accent" id="personas">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.personas.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.personas.headline' | translate }}
        </h2>

        <div class="persona-tabs mt-8">
          @for (p of personas; track p) {
            <button
              type="button"
              class="persona-tab"
              [class.persona-tab-active]="activePersona() === p"
              (click)="activePersona.set(p)"
            >
              {{ ('pitch.personas.' + p + 'Tab') | translate }}
            </button>
          }
        </div>

        <div class="persona-panel">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="pi text-2xl"
              [class.pi-user]="activePersona() === 'user'"
              [class.pi-building]="activePersona() === 'bank'"
              [class.pi-shield]="activePersona() === 'insurance'"
              [class.pi-globe]="activePersona() === 'gov'"
              style="color: var(--color-primary)"
              aria-hidden="true"
            ></span>
            <h3 class="text-xl font-bold" style="color: var(--color-text)">
              {{ ('pitch.personas.' + activePersona() + 'Title') | translate }}
            </h3>
          </div>
          <p class="text-base mb-6" style="color: var(--color-text-muted); line-height: 1.7">
            {{ ('pitch.personas.' + activePersona() + 'Desc') | translate }}
          </p>
          <div class="grid gap-3 sm:grid-cols-3">
            @for (i of [1, 2, 3]; track i) {
              <div class="feature-card">
                <p class="text-sm font-semibold" style="color: var(--color-text)">
                  {{ ('pitch.personas.' + activePersona() + 'Benefit' + i) | translate }}
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S6: ARCHITECTURE TOGGLE                     -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-dark" id="architecture">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.arch.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.arch.headline' | translate }}
        </h2>
        <p class="mt-4 max-w-2xl text-lg" style="color: var(--color-text-muted)">
          {{ 'pitch.arch.sub' | translate }}
        </p>

        <div class="arch-toggle mt-8 max-w-md">
          <button
            type="button"
            class="arch-toggle-btn"
            [class.arch-toggle-btn-active]="archMode() === 'pragmatic'"
            (click)="archMode.set('pragmatic')"
          >{{ 'pitch.arch.pragmatic' | translate }}</button>
          <button
            type="button"
            class="arch-toggle-btn"
            [class.arch-toggle-btn-active]="archMode() === 'device'"
            (click)="archMode.set('device')"
          >{{ 'pitch.arch.device' | translate }}</button>
        </div>

        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @if (archMode() === 'pragmatic') {
            <div class="feature-card">
              <span class="pi pi-cloud text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
              <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.arch.prag1Title' | translate }}</h3>
              <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.arch.prag1Desc' | translate }}</p>
            </div>
            <div class="feature-card">
              <span class="pi pi-bolt text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
              <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.arch.prag2Title' | translate }}</h3>
              <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.arch.prag2Desc' | translate }}</p>
            </div>
            <div class="feature-card">
              <span class="pi pi-check-square text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
              <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.arch.prag3Title' | translate }}</h3>
              <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.arch.prag3Desc' | translate }}</p>
            </div>
          } @else {
            <div class="feature-card">
              <span class="pi pi-mobile text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
              <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.arch.dev1Title' | translate }}</h3>
              <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.arch.dev1Desc' | translate }}</p>
            </div>
            <div class="feature-card">
              <span class="pi pi-lock text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
              <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.arch.dev2Title' | translate }}</h3>
              <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.arch.dev2Desc' | translate }}</p>
            </div>
            <div class="feature-card">
              <span class="pi pi-verified text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
              <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.arch.dev3Title' | translate }}</h3>
              <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.arch.dev3Desc' | translate }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S7: MARKET + MOAT                           -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-accent" id="market">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.market.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.market.headline' | translate }}
        </h2>

        <div class="mt-10 grid gap-6 sm:grid-cols-3">
          <div class="stat-card">
            <div class="stat-number">$15–25B</div>
            <div class="stat-label">TAM — {{ 'pitch.market.tam' | translate }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">15–25%</div>
            <div class="stat-label">SAM — {{ 'pitch.market.sam' | translate }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">0.5–2%</div>
            <div class="stat-label">SOM — {{ 'pitch.market.som' | translate }}</div>
          </div>
        </div>

        <!-- Flywheel -->
        <h3 class="mt-16 text-xl font-bold" style="color: var(--color-text)">
          {{ 'pitch.market.flywheelTitle' | translate }}
        </h3>
        <div class="flywheel mt-6">
          <div class="flywheel-node">
            <span class="pi pi-building text-xl block mb-1" style="color: var(--color-primary)" aria-hidden="true"></span>
            {{ 'pitch.market.fw1' | translate }}
          </div>
          <span class="flywheel-arrow pi pi-arrow-right" aria-hidden="true"></span>
          <div class="flywheel-node">
            <span class="pi pi-id-card text-xl block mb-1" style="color: var(--color-primary)" aria-hidden="true"></span>
            {{ 'pitch.market.fw2' | translate }}
          </div>
          <span class="flywheel-arrow pi pi-arrow-right" aria-hidden="true"></span>
          <div class="flywheel-node">
            <span class="pi pi-search text-xl block mb-1" style="color: var(--color-primary)" aria-hidden="true"></span>
            {{ 'pitch.market.fw3' | translate }}
          </div>
          <span class="flywheel-arrow pi pi-arrow-right" aria-hidden="true"></span>
          <div class="flywheel-node">
            <span class="pi pi-users text-xl block mb-1" style="color: var(--color-primary)" aria-hidden="true"></span>
            {{ 'pitch.market.fw4' | translate }}
          </div>
          <span class="flywheel-arrow pi pi-arrow-right hidden sm:inline" aria-hidden="true"></span>
          <span class="flywheel-arrow pi pi-arrow-up sm:hidden" aria-hidden="true"></span>
        </div>

        <div class="callout mt-8">
          {{ 'pitch.market.moatSummary' | translate }}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S8: BUSINESS MODEL + ROI CALCULATOR         -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-dark" id="business-model">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.biz.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.biz.headline' | translate }}
        </h2>

        <div class="mt-10 grid gap-6 sm:grid-cols-3">
          <div class="feature-card">
            <span class="pi pi-receipt text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.biz.stream1Title' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.biz.stream1Desc' | translate }}</p>
            <p class="mt-2 text-lg font-bold" style="color: var(--color-primary)">R$ 3.90 – R$ 12.90</p>
          </div>
          <div class="feature-card">
            <span class="pi pi-sync text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.biz.stream2Title' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.biz.stream2Desc' | translate }}</p>
            <p class="mt-2 text-lg font-bold" style="color: var(--color-primary)">R$ 7.5k – R$ 29k/{{ 'pitch.biz.month' | translate }}</p>
          </div>
          <div class="feature-card">
            <span class="pi pi-star text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
            <h3 class="mt-3 font-semibold" style="color: var(--color-text)">{{ 'pitch.biz.stream3Title' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.biz.stream3Desc' | translate }}</p>
            <p class="mt-2 text-lg font-bold" style="color: var(--color-primary)">&ge; R$ 450k/{{ 'pitch.biz.year' | translate }}</p>
          </div>
        </div>

        <!-- Unit economics highlight -->
        <div class="mt-10 grid gap-4 sm:grid-cols-4">
          <div class="stat-card">
            <div class="stat-number">85–89%</div>
            <div class="stat-label">{{ 'pitch.biz.grossMargin' | translate }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">65%</div>
            <div class="stat-label">{{ 'pitch.biz.recurring' | translate }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">&ge; 3:1</div>
            <div class="stat-label">LTV:CAC</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">3–10{{ 'pitch.biz.monthShort' | translate }}</div>
            <div class="stat-label">Payback</div>
          </div>
        </div>

        <!-- ROI mini-calculator -->
        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 class="text-xl font-bold mb-4" style="color: var(--color-text)">
              {{ 'pitch.roi.title' | translate }}
            </h3>
            <div class="roi-calculator">
              <div class="roi-input-group">
                <label>{{ 'pitch.roi.volumeLabel' | translate }}: {{ roiVolume().toLocaleString() }}</label>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  [value]="roiVolume()"
                  (input)="roiVolume.set(+$any($event.target).value)"
                />
              </div>
              <div class="roi-input-group">
                <label>{{ 'pitch.roi.costLabel' | translate }}: R$ {{ roiCurrentCost() }}</label>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  [value]="roiCurrentCost()"
                  (input)="roiCurrentCost.set(+$any($event.target).value)"
                />
              </div>
              <div class="roi-result">
                <p class="text-sm mb-1" style="color: var(--color-text-muted)">{{ 'pitch.roi.savingsLabel' | translate }}</p>
                <p class="text-3xl font-bold" style="color: var(--color-primary)">
                  R$ {{ roiSavings().toLocaleString() }}
                </p>
                <p class="text-xs mt-1" style="color: var(--color-text-muted)">{{ 'pitch.roi.perYear' | translate }}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4" style="color: var(--color-text)">
              {{ 'pitch.roi.comparisonTitle' | translate }}
            </h3>
            <div class="space-y-4">
              <div class="feature-card">
                <div class="flex justify-between items-center">
                  <span class="text-sm" style="color: var(--color-text-muted)">{{ 'pitch.roi.traditional' | translate }}</span>
                  <span class="font-bold" style="color: #ef4444">R$ {{ roiTraditionalTotal().toLocaleString() }}</span>
                </div>
                <div class="mt-2 h-2 rounded-full" style="background-color: var(--color-border)">
                  <div class="h-full rounded-full" style="background-color: #ef4444; width: 100%"></div>
                </div>
              </div>
              <div class="feature-card">
                <div class="flex justify-between items-center">
                  <span class="text-sm" style="color: var(--color-text-muted)">Ultima Forma</span>
                  <span class="font-bold" style="color: #22c55e">R$ {{ roiUfTotal().toLocaleString() }}</span>
                </div>
                <div class="mt-2 h-2 rounded-full" style="background-color: var(--color-border)">
                  <div
                    class="h-full rounded-full"
                    style="background-color: #22c55e"
                    [style.width.%]="roiUfPercent()"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S9: ROADMAP TIMELINE                        -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-accent" id="roadmap">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.roadmap.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.roadmap.headline' | translate }}
        </h2>

        <div class="timeline mt-10">
          @for (phase of phases; track phase; let i = $index) {
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <span
                  class="text-sm font-bold whitespace-nowrap"
                  style="color: var(--color-primary); min-width: 100px"
                >{{ ('pitch.roadmap.phase' + i + 'Period') | translate }}</span>
                <div>
                  <h4 class="font-bold" style="color: var(--color-text)">
                    {{ ('pitch.roadmap.phase' + i + 'Title') | translate }}
                  </h4>
                  <p class="mt-1 text-sm" style="color: var(--color-text-muted)">
                    {{ ('pitch.roadmap.phase' + i + 'Desc') | translate }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S10: RISK REGISTER                          -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-dark" id="risks">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.risks.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.risks.headline' | translate }}
        </h2>
        <p class="mt-4 max-w-2xl text-lg" style="color: var(--color-text-muted)">
          {{ 'pitch.risks.sub' | translate }}
        </p>

        <div class="mt-8 space-y-2">
          @for (risk of risks; track risk.key) {
            <div class="risk-item">
              <button
                type="button"
                class="risk-header"
                (click)="risk.open.set(!risk.open())"
                [attr.aria-expanded]="risk.open()"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="pi"
                    [class]="risk.icon"
                    style="color: var(--color-primary)"
                    aria-hidden="true"
                  ></span>
                  <span>{{ ('pitch.risks.' + risk.key + 'Title') | translate }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="risk-badge" [class]="risk.level">
                    {{ ('pitch.risks.' + risk.level) | translate }}
                  </span>
                  <span
                    class="pi text-xs"
                    [class.pi-chevron-down]="!risk.open()"
                    [class.pi-chevron-up]="risk.open()"
                    aria-hidden="true"
                  ></span>
                </div>
              </button>
              @if (risk.open()) {
                <div class="risk-body">
                  <p class="mb-2"><strong>{{ 'pitch.risks.impact' | translate }}:</strong> {{ ('pitch.risks.' + risk.key + 'Impact') | translate }}</p>
                  <p><strong>{{ 'pitch.risks.mitigation' | translate }}:</strong> {{ ('pitch.risks.' + risk.key + 'Mitigation') | translate }}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S11: THE ASK                                -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-accent" id="ask">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.ask.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.ask.headline' | translate }}
        </h2>

        <div class="ask-card mt-10">
          <p class="text-5xl font-bold" style="color: var(--color-primary)">R$ 3.5M</p>
          <p class="text-xl mt-2" style="color: var(--color-text)">{{ 'pitch.ask.round' | translate }}</p>
          <p class="text-base mt-1" style="color: var(--color-text-muted)">{{ 'pitch.ask.runway' | translate }}</p>
        </div>

        <!-- Capital allocation -->
        <h3 class="mt-12 text-xl font-bold" style="color: var(--color-text)">
          {{ 'pitch.ask.allocationTitle' | translate }}
        </h3>
        <div class="mt-4">
          <div class="allocation-bar">
            <div class="allocation-segment" style="width: 45%; background: var(--color-primary)"></div>
            <div class="allocation-segment" style="width: 25%; background: #a78bfa"></div>
            <div class="allocation-segment" style="width: 10%; background: #f472b6"></div>
            <div class="allocation-segment" style="width: 20%; background: #94a3b8"></div>
          </div>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: var(--color-primary)"></span>
              <span class="text-sm" style="color: var(--color-text)">{{ 'pitch.ask.alloc1' | translate }} (45%)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: #a78bfa"></span>
              <span class="text-sm" style="color: var(--color-text)">{{ 'pitch.ask.alloc2' | translate }} (25%)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: #f472b6"></span>
              <span class="text-sm" style="color: var(--color-text)">{{ 'pitch.ask.alloc3' | translate }} (10%)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: #94a3b8"></span>
              <span class="text-sm" style="color: var(--color-text)">{{ 'pitch.ask.alloc4' | translate }} (20%)</span>
            </div>
          </div>
        </div>

        <!-- Milestones -->
        <h3 class="mt-12 text-xl font-bold" style="color: var(--color-text)">
          {{ 'pitch.ask.milestonesTitle' | translate }}
        </h3>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          @for (ms of milestones; track ms) {
            <div class="feature-card flex items-start gap-3">
              <span class="pi pi-check-circle text-lg flex-shrink-0 mt-0.5" style="color: var(--color-primary)" aria-hidden="true"></span>
              <p class="text-sm" style="color: var(--color-text)">{{ ('pitch.ask.ms' + ms) | translate }}</p>
            </div>
          }
        </div>

        <!-- Final CTA -->
        <div class="mt-12 text-center">
          <a href="mailto:contato@ultimaforma.id" class="cta-primary">
            <span class="pi pi-envelope" aria-hidden="true"></span>
            {{ 'pitch.ask.cta' | translate }}
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- S12: TEAM                                   -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="pitch-slide slide-dark" id="team">
      <div class="pitch-inner">
        <span class="section-tag">{{ 'pitch.team.tag' | translate }}</span>
        <h2 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
          {{ 'pitch.team.headline' | translate }}
        </h2>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <div class="feature-card text-center">
            <img
              src="/assets/founders/pedro.png"
              alt="Pedro Drummond"
              class="mx-auto h-24 w-24 rounded-full object-cover"
              width="96"
              height="96"
            />
            <h3 class="mt-4 text-lg font-bold" style="color: var(--color-text)">Pedro Drummond</h3>
            <p class="text-sm" style="color: var(--color-primary)">{{ 'pitch.team.pedroRole' | translate }}</p>
            <p class="mt-2 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.team.pedroDesc' | translate }}</p>
          </div>
          <div class="feature-card text-center">
            <img
              src="/assets/founders/yuri.png"
              alt="Yuri Lima"
              class="mx-auto h-24 w-24 rounded-full object-cover"
              width="96"
              height="96"
            />
            <h3 class="mt-4 text-lg font-bold" style="color: var(--color-text)">Yuri Lima</h3>
            <p class="text-sm" style="color: var(--color-primary)">{{ 'pitch.team.yuriRole' | translate }}</p>
            <p class="mt-2 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.team.yuriDesc' | translate }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-4 text-center" style="background-color: var(--color-bg); border-top: 1px solid var(--color-border)">
      <p class="text-sm" style="color: var(--color-text-muted)">
        {{ 'landing.footer.copyright' | translate }}
      </p>
      <div class="mt-3 flex justify-center gap-4">
        <a routerLink="/pitch-deck/kb" class="text-sm" style="color: var(--color-primary)">{{ 'pitch.nav.kb' | translate }}</a>
        <a routerLink="/pitch-deck/trust" class="text-sm" style="color: var(--color-primary)">{{ 'pitch.nav.trust' | translate }}</a>
        <a href="mailto:contato@ultimaforma.id" class="text-sm" style="color: var(--color-primary)">{{ 'pitch.ask.cta' | translate }}</a>
      </div>
    </footer>
  `,
})
export class PitchComponent {
  notItems = ['Bank', 'Credit', 'Repo', 'Authority'];
  steps = [1, 2, 3, 4, 5, 6];
  personas = ['user', 'bank', 'insurance', 'gov'] as const;
  phases = [0, 1, 2, 3];
  milestones = [1, 2, 3, 4];

  activePersona = signal<'user' | 'bank' | 'insurance' | 'gov'>('user');
  archMode = signal<'pragmatic' | 'device'>('pragmatic');

  consentAttrs = [
    { key: 'name', on: signal(true) },
    { key: 'cpf', on: signal(true) },
    { key: 'address', on: signal(false) },
    { key: 'income', on: signal(false) },
    { key: 'employer', on: signal(false) },
  ];

  sharedCount = computed(() => this.consentAttrs.filter((a) => a.on()).length);

  risks = [
    { key: 'regulatory', icon: 'pi-balance-scale', level: 'risk-high', open: signal(false) },
    { key: 'adoption', icon: 'pi-users', level: 'risk-high', open: signal(false) },
    { key: 'bigtech', icon: 'pi-building', level: 'risk-medium', open: signal(false) },
    { key: 'tech', icon: 'pi-server', level: 'risk-medium', open: signal(false) },
    { key: 'execution', icon: 'pi-flag', level: 'risk-high', open: signal(false) },
  ];

  // ROI Calculator
  roiVolume = signal(50000);
  roiCurrentCost = signal(70);

  roiTraditionalTotal = computed(() => this.roiVolume() * this.roiCurrentCost());
  roiUfTotal = computed(() => Math.round(this.roiVolume() * 3.9));
  roiSavings = computed(() => this.roiTraditionalTotal() - this.roiUfTotal());
  roiUfPercent = computed(() =>
    Math.round((this.roiUfTotal() / Math.max(this.roiTraditionalTotal(), 1)) * 100)
  );

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
