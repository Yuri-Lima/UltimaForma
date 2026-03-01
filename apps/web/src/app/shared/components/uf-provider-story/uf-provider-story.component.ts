import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-provider-story',
  standalone: true,
  imports: [TranslatePipe],
  styleUrl: './uf-provider-story.component.css',
  template: `
    <section class="py-16 px-4 sm:py-24 sm:px-6">
      <div class="mx-auto max-w-4xl">

        <!-- Header -->
        <div class="story-header" [class.visible]="headerVisible()">
          <h2 class="story-header__title">
            {{ 'landing.providerStory.title' | translate }}
          </h2>
          <p class="story-header__subtitle">
            {{ 'landing.providerStory.subtitle' | translate }}
          </p>
        </div>

        <!-- Scene 1: The Old Model -->
        <div class="story-scene" [class.visible]="scene1Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.providerStory.scene1' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="dash-container">
              <!-- Dashboard screen -->
              <div class="dash-screen">
                <div class="dash-screen__bar">
                  <span class="dash-screen__dot dash-screen__dot--r"></span>
                  <span class="dash-screen__dot dash-screen__dot--y"></span>
                  <span class="dash-screen__dot dash-screen__dot--g"></span>
                </div>
                <div class="dash-screen__row dash-screen__row--w80"></div>
                <div class="dash-screen__row dash-screen__row--w60"></div>
                <div class="dash-screen__row dash-screen__row--w45"></div>
                <div class="dash-screen__row dash-screen__row--w80"></div>
                <div class="dash-screen__row dash-screen__row--w60"></div>
              </div>
              <!-- Floating PDFs -->
              <svg class="dash-float dash-float--pdf1" width="36" height="44" viewBox="0 0 36 44">
                <rect x="1" y="1" width="34" height="42" rx="3" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.7"/>
                <rect x="6" y="9" width="16" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="6" y="15" width="22" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <text x="8" y="36" font-size="7.5" font-weight="700" fill="#ef4444" opacity="0.55" font-family="var(--font-sans)">PDF</text>
              </svg>
              <svg class="dash-float dash-float--pdf2" width="32" height="40" viewBox="0 0 32 40">
                <rect x="1" y="1" width="30" height="38" rx="3" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.6"/>
                <rect x="5" y="8" width="14" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="5" y="13" width="20" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <text x="7" y="32" font-size="7" font-weight="700" fill="#ef4444" opacity="0.5" font-family="var(--font-sans)">PDF</text>
              </svg>
              <!-- Upload icon -->
              <svg class="dash-float dash-float--upload" width="34" height="34" viewBox="0 0 34 34">
                <circle cx="17" cy="17" r="15" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.5"/>
                <path d="M17 23V11M17 11l-4.5 4.5M17 11l4.5 4.5" stroke="var(--color-text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
              </svg>
              <!-- Warning badge -->
              <div class="dash-float dash-float--warn">
                <span class="dash-badge dash-badge--warn">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.5 1L1 10h9L5.5 1z" stroke="#fbbf24" stroke-width="1.2" fill="none"/>
                    <path d="M5.5 5v2M5.5 8.5v0" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
                  </svg>
                  {{ 'landing.providerStory.manualReview' | translate }}
                </span>
              </div>
              <!-- Fraud alert -->
              <div class="dash-float dash-float--fraud">
                <span class="dash-badge dash-badge--fraud">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <circle cx="5.5" cy="5.5" r="4.5" stroke="#fca5a5" stroke-width="1.2"/>
                    <path d="M5.5 3v3M5.5 7.8v0" stroke="#fca5a5" stroke-width="1.2" stroke-linecap="round"/>
                  </svg>
                  {{ 'landing.providerStory.fraudAlert' | translate }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 2: Structured Request -->
        <div class="story-scene story-scene--reverse" [class.visible]="scene2Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.providerStory.scene2' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="req-panel">
              <div class="req-panel__header">{{ 'landing.providerStory.reqHeader' | translate }}</div>
              <div class="req-item">
                <span class="req-item__icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L2 3.5v3c0 3.7 2.1 7.2 5 8.5 2.9-1.3 5-4.8 5-8.5v-3L7 1z" stroke="var(--color-primary)" stroke-width="1.3" fill="none"/>
                  </svg>
                </span>
                <span class="req-item__label">{{ 'landing.providerStory.req1' | translate }}</span>
              </div>
              <div class="req-item">
                <span class="req-item__icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="3" width="10" height="8" rx="1.5" stroke="var(--color-primary)" stroke-width="1.3" fill="none"/>
                    <path d="M5 6h4M5 8.5h2.5" stroke="var(--color-primary)" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
                  </svg>
                </span>
                <span class="req-item__label">{{ 'landing.providerStory.req2' | translate }}</span>
              </div>
              <div class="req-item">
                <span class="req-item__icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="var(--color-primary)" stroke-width="1.3" fill="none"/>
                    <path d="M7 4.5v5M4.5 7h5" stroke="var(--color-primary)" stroke-width="1" stroke-linecap="round"/>
                  </svg>
                </span>
                <span class="req-item__label">{{ 'landing.providerStory.req3' | translate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 3: Consent & Secure Transfer -->
        <div class="story-scene" [class.visible]="scene3Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.providerStory.scene3' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="consent-phone">
              <div class="consent-notif">
                <div class="consent-notif__icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1L1.5 5v4c0 5 3.2 9.7 7.5 11 4.3-1.3 7.5-6 7.5-11V5L9 1z" stroke="var(--color-primary)" stroke-width="1.5" fill="none"/>
                    <path d="M6.5 9l2 2 3.5-3.5" stroke="var(--color-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <p class="consent-notif__text">
                  {{ 'landing.providerStory.consentMessage' | translate }}
                </p>
                <button class="consent-btn" type="button" tabindex="-1">
                  {{ 'landing.providerStory.authorize' | translate }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 4: Instant Verification -->
        <div class="story-scene story-scene--reverse" [class.visible]="scene4Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.providerStory.scene4' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="compliance-panel">
              <div class="compliance-panel__header">{{ 'landing.providerStory.complianceHeader' | translate }}</div>
              <div class="compliance-row">
                <div>
                  <div class="compliance-row__label">{{ 'landing.providerStory.comp1Label' | translate }}</div>
                  <div class="compliance-row__issuer">{{ 'landing.providerStory.comp1Issuer' | translate }}</div>
                </div>
                <span class="compliance-row__badge">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2L7.5 2.5" stroke="#22c55e" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.providerStory.verified' | translate }}
                </span>
              </div>
              <div class="compliance-row">
                <div>
                  <div class="compliance-row__label">{{ 'landing.providerStory.comp2Label' | translate }}</div>
                  <div class="compliance-row__issuer">{{ 'landing.providerStory.comp2Issuer' | translate }}</div>
                </div>
                <span class="compliance-row__badge">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2L7.5 2.5" stroke="#22c55e" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.providerStory.verified' | translate }}
                </span>
              </div>
              <div class="compliance-row">
                <div>
                  <div class="compliance-row__label">{{ 'landing.providerStory.comp3Label' | translate }}</div>
                  <div class="compliance-row__issuer">{{ 'landing.providerStory.comp3Issuer' | translate }}</div>
                </div>
                <span class="compliance-row__badge">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2L7.5 2.5" stroke="#22c55e" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.providerStory.verified' | translate }}
                </span>
              </div>
              <div class="compliance-footer">
                <div class="compliance-stat">
                  <span class="compliance-stat__val">0</span>
                  {{ 'landing.providerStory.statFraud' | translate }}
                </div>
                <div class="compliance-stat">
                  <span class="compliance-stat__val">0</span>
                  {{ 'landing.providerStory.statManual' | translate }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Final bold statement -->
        <div class="story-final" [class.visible]="finalVisible()">
          <p class="story-final__text">
            {{ 'landing.providerStory.final' | translate }}
          </p>
        </div>

        <!-- Technical credibility -->
        <div class="credibility" [class.visible]="credibilityVisible()">
          <p class="credibility__title">{{ 'landing.providerStory.credTitle' | translate }}</p>
          <div class="credibility__grid">
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <path d="M18 3L4 10v8c0 10 6 19 14 22 8-3 14-12 14-22v-8L18 3z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M13 18l3.5 3.5L23 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="credibility__label">{{ 'landing.providerStory.cred1' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="14" width="24" height="16" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 14V10a6 6 0 0112 0v4" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="18" cy="22" r="2.5" fill="currentColor" opacity="0.7"/>
                <path d="M18 24.5V27" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p class="credibility__label">{{ 'landing.providerStory.cred2' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="14" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M18 10v8l5 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 28l2-3M24 28l-2-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
              </svg>
              <p class="credibility__label">{{ 'landing.providerStory.cred3' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="24" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="12" cy="24" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="24" cy="24" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M17 12h-1M20 12h-1M12 17v-1M12 20v-1M24 17v-1M24 20v-1M17 24h-1M20 24h-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              </svg>
              <p class="credibility__label">{{ 'landing.providerStory.cred4' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="8" width="24" height="20" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M6 14h24" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                <path d="M12 20h4M12 24h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                <circle cx="26" cy="11" r="1.5" fill="currentColor" opacity="0.5"/>
              </svg>
              <p class="credibility__label">{{ 'landing.providerStory.cred5' | translate }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class UfProviderStoryComponent {
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  headerVisible = signal(false);
  scene1Visible = signal(false);
  scene2Visible = signal(false);
  scene3Visible = signal(false);
  scene4Visible = signal(false);
  finalVisible = signal(false);
  credibilityVisible = signal(false);

  constructor() {
    afterNextRender(() => {
      this.initScrollObserver();
    });
  }

  private initScrollObserver() {
    const root = this.el.nativeElement as HTMLElement;
    const targets = root.querySelectorAll(
      '.story-header, .story-scene, .story-final, .credibility'
    );

    const signalMap: Record<string, ReturnType<typeof signal<boolean>>> = {};
    targets.forEach((el, i) => {
      const key = `target-${i}`;
      (el as HTMLElement).dataset['observeKey'] = key;

      if (el.classList.contains('story-header')) signalMap[key] = this.headerVisible;
      else if (el.classList.contains('story-final')) signalMap[key] = this.finalVisible;
      else if (el.classList.contains('credibility')) signalMap[key] = this.credibilityVisible;
      else {
        const scenes = root.querySelectorAll('.story-scene');
        const idx = Array.from(scenes).indexOf(el);
        if (idx === 0) signalMap[key] = this.scene1Visible;
        else if (idx === 1) signalMap[key] = this.scene2Visible;
        else if (idx === 2) signalMap[key] = this.scene3Visible;
        else if (idx === 3) signalMap[key] = this.scene4Visible;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset['observeKey'];
            if (key && signalMap[key]) {
              signalMap[key].set(true);
            }
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((t) => observer.observe(t));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
