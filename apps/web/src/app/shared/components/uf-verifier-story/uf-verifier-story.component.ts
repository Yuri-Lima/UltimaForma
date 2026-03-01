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
  selector: 'uf-verifier-story',
  standalone: true,
  imports: [TranslatePipe],
  styleUrl: './uf-verifier-story.component.css',
  template: `
    <section class="py-16 px-4 sm:py-24 sm:px-6">
      <div class="mx-auto max-w-4xl">

        <!-- Header -->
        <div class="story-header" [class.visible]="headerVisible()">
          <h2 class="story-header__title">
            {{ 'landing.verifierStory.title' | translate }}
          </h2>
          <p class="story-header__subtitle">
            {{ 'landing.verifierStory.subtitle' | translate }}
          </p>
        </div>

        <!-- Scene 1: Static Documents Era -->
        <div class="story-scene" [class.visible]="scene1Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.verifierStory.scene1' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="doc-container">
              <!-- Physical ID card -->
              <svg class="doc-float doc-float--id" width="90" height="60" viewBox="0 0 90 60">
                <rect x="1" y="1" width="88" height="58" rx="6" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.8"/>
                <circle cx="24" cy="26" r="10" stroke="var(--color-text-muted)" stroke-width="1" fill="none" opacity="0.3"/>
                <rect x="42" y="16" width="36" height="3" rx="1.5" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="42" y="24" width="28" height="3" rx="1.5" fill="var(--color-text-muted)" opacity="0.2"/>
                <rect x="42" y="32" width="32" height="3" rx="1.5" fill="var(--color-text-muted)" opacity="0.2"/>
                <rect x="10" y="46" width="70" height="3" rx="1.5" fill="var(--color-border)" opacity="0.3"/>
              </svg>
              <!-- PDF icon -->
              <svg class="doc-float doc-float--pdf" width="38" height="46" viewBox="0 0 38 46">
                <rect x="1" y="1" width="36" height="44" rx="3" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.7"/>
                <rect x="7" y="10" width="18" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="7" y="16" width="24" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <rect x="7" y="22" width="14" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.3"/>
                <text x="10" y="38" font-size="8" font-weight="700" fill="#ef4444" opacity="0.55" font-family="var(--font-sans)">PDF</text>
              </svg>
              <!-- Scanned document -->
              <svg class="doc-float doc-float--scan" width="70" height="50" viewBox="0 0 70 50">
                <rect x="1" y="1" width="68" height="48" rx="3" stroke="var(--color-text-muted)" stroke-width="1.5" fill="var(--color-surface)" opacity="0.6"/>
                <rect x="8" y="10" width="40" height="3" rx="1.5" fill="var(--color-text-muted)" opacity="0.2"/>
                <rect x="8" y="18" width="54" height="3" rx="1.5" fill="var(--color-text-muted)" opacity="0.2"/>
                <rect x="8" y="26" width="30" height="3" rx="1.5" fill="var(--color-text-muted)" opacity="0.15"/>
                <rect x="8" y="34" width="48" height="3" rx="1.5" fill="var(--color-text-muted)" opacity="0.15"/>
              </svg>
              <!-- Copy echoes -->
              <svg class="doc-float doc-float--copy1" width="32" height="40" viewBox="0 0 32 40">
                <rect x="1" y="1" width="30" height="38" rx="3" stroke="var(--color-text-muted)" stroke-width="1" fill="var(--color-surface)" opacity="0.35"/>
                <rect x="5" y="8" width="16" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.15"/>
                <rect x="5" y="14" width="22" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.15"/>
              </svg>
              <svg class="doc-float doc-float--copy2" width="28" height="36" viewBox="0 0 28 36">
                <rect x="1" y="1" width="26" height="34" rx="3" stroke="var(--color-text-muted)" stroke-width="1" fill="var(--color-surface)" opacity="0.25"/>
                <rect x="4" y="7" width="14" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.1"/>
                <rect x="4" y="12" width="18" height="2" rx="1" fill="var(--color-text-muted)" opacity="0.1"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Scene 2: Cryptographic Credential -->
        <div class="story-scene story-scene--reverse" [class.visible]="scene2Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.verifierStory.scene2' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="cred-card">
              <div class="cred-card__seal">
                <span class="cred-card__seal-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1L1.5 5v4c0 5 3.2 9.7 7.5 11 4.3-1.3 7.5-6 7.5-11V5L9 1z" stroke="var(--color-primary)" stroke-width="1.5" fill="none"/>
                    <path d="M6.5 9l2 2 3.5-3.5" stroke="var(--color-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="cred-card__seal-text">{{ 'landing.verifierStory.issuerAuthority' | translate }}</span>
              </div>
              <div class="cred-card__field">
                <div class="cred-card__label">{{ 'landing.verifierStory.fieldType' | translate }}</div>
                <div class="cred-card__value">{{ 'landing.verifierStory.fieldTypeVal' | translate }}</div>
              </div>
              <div class="cred-card__field">
                <div class="cred-card__label">{{ 'landing.verifierStory.fieldHolder' | translate }}</div>
                <div class="cred-card__value">{{ 'landing.verifierStory.fieldHolderVal' | translate }}</div>
              </div>
              <div class="cred-card__field">
                <div class="cred-card__label">{{ 'landing.verifierStory.fieldIssued' | translate }}</div>
                <div class="cred-card__value">{{ 'landing.verifierStory.fieldIssuedVal' | translate }}</div>
              </div>
              <div class="cred-card__field">
                <div class="cred-card__label">{{ 'landing.verifierStory.fieldStatus' | translate }}</div>
                <div class="cred-card__value">{{ 'landing.verifierStory.fieldStatusVal' | translate }}</div>
              </div>
              <div class="cred-card__sig">
                <span class="cred-card__sig-dot"></span>
                <span class="cred-card__sig-text">{{ 'landing.verifierStory.sigLabel' | translate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 3: Verification, Not Upload -->
        <div class="story-scene" [class.visible]="scene3Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.verifierStory.scene3' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="verify-panel">
              <div class="verify-panel__header">{{ 'landing.verifierStory.verifyHeader' | translate }}</div>
              <div class="verify-row">
                <span class="verify-row__label">{{ 'landing.verifierStory.vRow1' | translate }}</span>
                <span class="verify-row__badge">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2.5" stroke="#22c55e" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  {{ 'landing.verifierStory.verified' | translate }}
                </span>
              </div>
              <div class="verify-row">
                <span class="verify-row__label">{{ 'landing.verifierStory.vRow2' | translate }}</span>
                <span class="verify-row__badge">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2.5" stroke="#22c55e" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  {{ 'landing.verifierStory.verified' | translate }}
                </span>
              </div>
              <div class="verify-row">
                <span class="verify-row__label">{{ 'landing.verifierStory.vRow3' | translate }}</span>
                <span class="verify-row__badge">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2.5" stroke="#22c55e" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  {{ 'landing.verifierStory.verified' | translate }}
                </span>
              </div>
              <div class="verify-stream">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="2" width="12" height="16" rx="3" stroke="var(--color-text-muted)" stroke-width="1.2" fill="none" opacity="0.6"/>
                  <circle cx="10" cy="16" r="1" fill="var(--color-text-muted)" opacity="0.3"/>
                </svg>
                <div class="verify-stream__line">
                  <div class="verify-stream__dot"></div>
                  <div class="verify-stream__dot"></div>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 6h14L10 2z" stroke="var(--color-text-muted)" stroke-width="1.2" fill="none" opacity="0.6"/>
                  <rect x="3" y="6" width="14" height="1.5" fill="var(--color-border)" opacity="0.3"/>
                  <rect x="5" y="9" width="2" height="6" rx="0.5" fill="var(--color-text-muted)" opacity="0.2"/>
                  <rect x="9" y="9" width="2" height="6" rx="0.5" fill="var(--color-text-muted)" opacity="0.2"/>
                  <rect x="13" y="9" width="2" height="6" rx="0.5" fill="var(--color-text-muted)" opacity="0.2"/>
                  <rect x="3" y="15" width="14" height="2" rx="0.5" fill="var(--color-text-muted)" opacity="0.15"/>
                </svg>
                <span class="verify-stream__label">{{ 'landing.verifierStory.secureLink' | translate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scene 4: Lifecycle Governance -->
        <div class="story-scene story-scene--reverse" [class.visible]="scene4Visible()">
          <div class="story-scene__text">
            <p>{{ 'landing.verifierStory.scene4' | translate }}</p>
          </div>
          <div class="story-scene__visual">
            <div class="gov-panel">
              <div class="gov-panel__header">{{ 'landing.verifierStory.govHeader' | translate }}</div>
              <div class="gov-row">
                <span class="gov-row__label">{{ 'landing.verifierStory.govRow1' | translate }}</span>
                <span class="gov-row__status gov-row__status--active">{{ 'landing.verifierStory.govActive' | translate }}</span>
              </div>
              <div class="gov-row">
                <span class="gov-row__label">{{ 'landing.verifierStory.govRow2' | translate }}</span>
                <span class="gov-row__status gov-row__status--revoked">{{ 'landing.verifierStory.govRevoked' | translate }}</span>
              </div>
              <div class="gov-row">
                <span class="gov-row__label">{{ 'landing.verifierStory.govRow3' | translate }}</span>
                <span class="gov-row__status gov-row__status--active">{{ 'landing.verifierStory.govUpdated' | translate }}</span>
              </div>
              <div class="gov-row">
                <span class="gov-row__label">{{ 'landing.verifierStory.govRow4' | translate }}</span>
                <span class="gov-row__status gov-row__status--log">{{ 'landing.verifierStory.govLogged' | translate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Final bold statement -->
        <div class="story-final" [class.visible]="finalVisible()">
          <p class="story-final__text">
            {{ 'landing.verifierStory.final' | translate }}
          </p>
        </div>

        <!-- Technical credibility -->
        <div class="credibility" [class.visible]="credibilityVisible()">
          <p class="credibility__title">{{ 'landing.verifierStory.credTitle' | translate }}</p>
          <div class="credibility__grid">
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <path d="M18 3L4 10v8c0 10 6 19 14 22 8-3 14-12 14-22v-8L18 3z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M13 18l3.5 3.5L23 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="credibility__label">{{ 'landing.verifierStory.cred1' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="14" width="24" height="16" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 14V10a6 6 0 0112 0v4" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="18" cy="22" r="2.5" fill="currentColor" opacity="0.7"/>
                <path d="M18 24.5V27" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p class="credibility__label">{{ 'landing.verifierStory.cred2' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="14" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 18h12M18 12v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M24 12l-1.5 1.5M12 24l1.5-1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              </svg>
              <p class="credibility__label">{{ 'landing.verifierStory.cred3' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="14" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M18 10v8l5 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 28l2-3M24 28l-2-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
              </svg>
              <p class="credibility__label">{{ 'landing.verifierStory.cred4' | translate }}</p>
            </div>
            <div class="credibility__item">
              <svg class="credibility__icon" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="8" width="24" height="20" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M6 14h24" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                <path d="M12 20h4M12 24h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                <circle cx="26" cy="11" r="1.5" fill="currentColor" opacity="0.5"/>
              </svg>
              <p class="credibility__label">{{ 'landing.verifierStory.cred5' | translate }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class UfVerifierStoryComponent {
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
