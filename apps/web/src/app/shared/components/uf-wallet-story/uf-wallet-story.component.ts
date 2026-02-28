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
  selector: 'uf-wallet-story',
  standalone: true,
  imports: [TranslatePipe],
  styleUrl: './uf-wallet-story.component.css',
  template: `
    <section class="py-16 px-4 sm:py-24 sm:px-6">
      <div class="mx-auto max-w-4xl">

        <!-- Header -->
        <div class="story-header" [class.visible]="headerVisible()">
          <h2 class="story-header__title">
            {{ 'landing.walletStory.title' | translate }}
          </h2>
          <p class="story-header__subtitle">
            {{ 'landing.walletStory.subtitle' | translate }}
          </p>
        </div>

        <!-- Scene 1: Old Bureaucracy -->
        <div class="story-scene" [class.visible]="scene1Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.walletStory.scene1' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="chaos-container">
              <!-- Laptop -->
              <svg class="chaos-laptop" width="180" height="130" viewBox="0 0 180 130" fill="none">
                <rect x="28" y="8" width="124" height="82" rx="6" stroke="var(--color-text-muted)" stroke-width="2" fill="none" opacity="0.3"/>
                <rect x="36" y="16" width="108" height="66" rx="2" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="1"/>
                <path d="M12 98h156l8 16H4l8-16z" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="1.5"/>
                <rect x="72" y="102" width="36" height="4" rx="2" fill="var(--color-border)"/>
              </svg>
              <!-- Floating PDFs -->
              <svg class="chaos-float chaos-float--pdf1" width="38" height="46" viewBox="0 0 38 46">
                <rect x="1" y="1" width="36" height="44" rx="3" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.7"/>
                <rect x="7" y="10" width="18" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="7" y="16" width="24" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="7" y="22" width="14" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <text x="10" y="38" font-size="8" font-weight="700" fill="#ef4444" opacity="0.6" font-family="var(--font-sans)">PDF</text>
              </svg>
              <svg class="chaos-float chaos-float--pdf2" width="34" height="42" viewBox="0 0 34 42">
                <rect x="1" y="1" width="32" height="40" rx="3" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.6"/>
                <rect x="6" y="9" width="16" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="6" y="14" width="22" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <text x="8" y="34" font-size="7" font-weight="700" fill="#ef4444" opacity="0.5" font-family="var(--font-sans)">PDF</text>
              </svg>
              <svg class="chaos-float chaos-float--pdf3" width="30" height="38" viewBox="0 0 30 38">
                <rect x="1" y="1" width="28" height="36" rx="3" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.5"/>
                <rect x="5" y="8" width="14" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="5" y="13" width="18" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <text x="6" y="30" font-size="7" font-weight="700" fill="#ef4444" opacity="0.45" font-family="var(--font-sans)">PDF</text>
              </svg>
              <!-- Upload icon -->
              <svg class="chaos-float chaos-float--upload" width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.5"/>
                <path d="M18 24V12M18 12l-5 5M18 12l5 5" stroke="var(--color-text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
              </svg>
              <!-- Error badge -->
              <div class="chaos-float chaos-float--error">
                <span class="chaos-error-badge">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#fca5a5" stroke-width="1.5"/>
                    <path d="M6 3.5v3M6 8.5v0" stroke="#fca5a5" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  {{ 'landing.walletStory.errorBadge' | translate }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 2: The Wallet -->
        <div class="story-scene story-scene--reverse" [class.visible]="scene2Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.walletStory.scene2' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="wallet-phone">
              <div class="wallet-phone__header">{{ 'landing.walletStory.walletHeader' | translate }}</div>
              <div class="wallet-doc">
                <span class="wallet-doc__name">{{ 'landing.walletStory.doc1' | translate }}</span>
                <span class="wallet-doc__badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.walletStory.verified' | translate }}
                </span>
              </div>
              <div class="wallet-doc">
                <span class="wallet-doc__name">{{ 'landing.walletStory.doc2' | translate }}</span>
                <span class="wallet-doc__badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.walletStory.verified' | translate }}
                </span>
              </div>
              <div class="wallet-doc">
                <span class="wallet-doc__name">{{ 'landing.walletStory.doc3' | translate }}</span>
                <span class="wallet-doc__badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.walletStory.verified' | translate }}
                </span>
              </div>
              <div class="wallet-doc">
                <span class="wallet-doc__name">{{ 'landing.walletStory.doc4' | translate }}</span>
                <span class="wallet-doc__badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.walletStory.verified' | translate }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 3: Consent Moment -->
        <div class="story-scene" [class.visible]="scene3Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.walletStory.scene3' | translate }}</p>
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
                  {{ 'landing.walletStory.consentMessage' | translate }}
                </p>
                <button class="consent-btn" type="button" tabindex="-1">
                  {{ 'landing.walletStory.authorize' | translate }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 4: Instant Verification -->
        <div class="story-scene story-scene--reverse" [class.visible]="scene4Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.walletStory.scene4' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="flow-visual">
              <div class="flow-visual__row">
                <!-- Phone node -->
                <div class="flow-visual__node flow-visual__node--phone">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="8" y="2" width="16" height="28" rx="4" stroke="var(--color-text)" stroke-width="1.5" fill="none" opacity="0.7"/>
                    <circle cx="16" cy="27" r="1.5" fill="var(--color-text)" opacity="0.4"/>
                    <rect x="10" y="6" width="12" height="17" rx="1" fill="var(--color-border)" opacity="0.3"/>
                  </svg>
                </div>
                <!-- Stream -->
                <div class="flow-visual__stream">
                  <div class="flow-visual__stream-dot"></div>
                  <div class="flow-visual__stream-dot"></div>
                  <div class="flow-visual__stream-dot"></div>
                </div>
                <!-- Bank node -->
                <div class="flow-visual__node flow-visual__node--bank">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 3L4 10h24L16 3z" stroke="var(--color-text)" stroke-width="1.5" fill="none" opacity="0.7"/>
                    <rect x="4" y="10" width="24" height="2" fill="var(--color-border)" opacity="0.3"/>
                    <rect x="7" y="14" width="3" height="10" rx="0.5" fill="var(--color-text)" opacity="0.25"/>
                    <rect x="14.5" y="14" width="3" height="10" rx="0.5" fill="var(--color-text)" opacity="0.25"/>
                    <rect x="22" y="14" width="3" height="10" rx="0.5" fill="var(--color-text)" opacity="0.25"/>
                    <rect x="4" y="24" width="24" height="3" rx="1" fill="var(--color-text)" opacity="0.2"/>
                  </svg>
                </div>
              </div>
              <!-- Verification badges -->
              <div class="flow-visual__badges">
                <span class="flow-visual__badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.walletStory.badge1' | translate }}
                </span>
                <span class="flow-visual__badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.walletStory.badge2' | translate }}
                </span>
                <span class="flow-visual__badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ 'landing.walletStory.badge3' | translate }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Final bold statement -->
        <div class="story-final" [class.visible]="finalVisible()">
          <p class="story-final__text">
            {{ 'landing.walletStory.final' | translate }}
          </p>
        </div>

        <!-- Technical credibility -->
        <div class="credibility" [class.visible]="credibilityVisible()">
          <div class="credibility__grid">
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <path d="M18 3L4 10v8c0 10 6 19 14 22 8-3 14-12 14-22v-8L18 3z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M13 18l3.5 3.5L23 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="credibility__label">{{ 'landing.walletStory.cred1' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="14" width="24" height="16" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 14V10a6 6 0 0112 0v4" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="18" cy="22" r="2.5" fill="currentColor" opacity="0.7"/>
                <path d="M18 24.5V27" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p class="credibility__label">{{ 'landing.walletStory.cred2' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="14" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M18 10v8l5 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 28l2-3M24 28l-2-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
              </svg>
              <p class="credibility__label">{{ 'landing.walletStory.cred3' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="24" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="12" cy="24" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="24" cy="24" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M17 12h-1M20 12h-1M12 17v-1M12 20v-1M24 17v-1M24 20v-1M17 24h-1M20 24h-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              </svg>
              <p class="credibility__label">{{ 'landing.walletStory.cred4' | translate }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class UfWalletStoryComponent {
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
