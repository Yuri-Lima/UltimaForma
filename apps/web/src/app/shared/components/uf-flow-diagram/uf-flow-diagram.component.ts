import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-flow-diagram',
  standalone: true,
  styles: `
    :host {
      display: block;
    }

    .flow-scene {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 1rem;
      padding: 2rem 0 1rem;
      flex-wrap: wrap;
    }
    @media (min-width: 768px) {
      .flow-scene { flex-wrap: nowrap; gap: 1.5rem; }
    }

    /* ---- data stream ---- */
    .flow-stream {
      position: relative;
      width: 60px;
      min-width: 40px;
      display: none;
      align-items: center;
      justify-content: center;
      align-self: center;
    }
    @media (min-width: 768px) {
      .flow-stream { display: flex; }
    }
    .flow-stream__line {
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #ef4444, #3b82f6);
      border-radius: 2px;
      opacity: 0.4;
    }
    .flow-stream__dot {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      filter: blur(1px);
    }
    .flow-stream__dot--r1 {
      background: #ef4444;
      box-shadow: 0 0 12px 4px #ef4444;
      animation: dotTravel 1.4s linear infinite;
    }
    .flow-stream__dot--b1 {
      background: #3b82f6;
      box-shadow: 0 0 12px 4px #3b82f6;
      animation: dotTravel 1.4s linear infinite 0.35s;
    }
    .flow-stream__dot--p1 {
      background: #8b5cf6;
      box-shadow: 0 0 12px 4px #8b5cf6;
      animation: dotTravel 1.4s linear infinite 0.7s;
    }
    .flow-stream__dot--r2 {
      background: #ef4444;
      box-shadow: 0 0 12px 4px #ef4444;
      animation: dotTravel 1.4s linear infinite 1.05s;
    }
    @keyframes dotTravel {
      0%   { left: -10px; opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      100% { left: calc(100% + 10px); opacity: 0; }
    }

    /* ---- tile ---- */
    .flow-tile {
      position: relative;
      width: 240px;
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  box-shadow 0.4s ease;
    }
    .flow-tile:hover {
      transform: translateY(-16px);
    }

    .flow-tile__face {
      position: relative;
      width: 100%;
      padding: 1.5rem 1rem;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
      background-color: var(--color-surface);
      border: 2px solid var(--color-primary);
      z-index: 2;
      transition: border-color 0.3s ease, min-height 0.4s ease,
                  box-shadow 0.4s ease;
      min-height: 220px;
    }

    /* bottom depth wall */
    .flow-tile__face::before {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 8px;
      right: 8px;
      height: 8px;
      background: linear-gradient(90deg, #ef4444aa, #3b82f6aa);
      border-radius: 0 0 10px 10px;
      z-index: -1;
      transition: height 0.4s ease, bottom 0.4s ease;
    }

    /* right depth wall */
    .flow-tile__face::after {
      content: '';
      position: absolute;
      top: 8px;
      bottom: 8px;
      right: -8px;
      width: 8px;
      background: linear-gradient(180deg, #3b82f6aa, #ef4444aa);
      border-radius: 0 10px 10px 0;
      z-index: -1;
      transition: width 0.4s ease, right 0.4s ease;
    }

    /* pulsing glow layers */
    .flow-tile__glow {
      position: absolute;
      inset: -4px;
      border-radius: 18px;
      z-index: 1;
      pointer-events: none;
    }
    .flow-tile__glow--red {
      box-shadow: 0 0 20px 6px #ef4444, inset 0 0 20px 2px #ef444433;
      animation: glowPulseA 2s ease-in-out infinite;
    }
    .flow-tile__glow--blue {
      box-shadow: 0 0 20px 6px #3b82f6, inset 0 0 20px 2px #3b82f633;
      animation: glowPulseB 2s ease-in-out infinite;
    }
    @keyframes glowPulseA {
      0%, 100% { opacity: 0.2; }
      50%      { opacity: 0.7; }
    }
    @keyframes glowPulseB {
      0%, 100% { opacity: 0.7; }
      50%      { opacity: 0.2; }
    }

    /* hover intensify */
    .flow-tile:hover .flow-tile__face {
      border-color: #8b5cf6;
      min-height: 300px;
      box-shadow: 0 8px 30px rgba(139, 92, 246, 0.25);
    }
    .flow-tile:hover .flow-tile__face::before {
      height: 14px;
      bottom: -14px;
    }
    .flow-tile:hover .flow-tile__face::after {
      width: 14px;
      right: -14px;
    }
    .flow-tile:hover .flow-tile__glow--red {
      box-shadow: 0 0 35px 12px #ef4444, inset 0 0 30px 4px #ef444444;
    }
    .flow-tile:hover .flow-tile__glow--blue {
      box-shadow: 0 0 35px 12px #3b82f6, inset 0 0 30px 4px #3b82f644;
    }

    /* icon */
    .flow-tile__icon {
      width: 90px;
      height: 90px;
      color: var(--color-primary);
    }

    .flow-tile__label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text);
      font-family: var(--font-sans);
    }
    .flow-tile__desc {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      font-family: var(--font-sans);
      line-height: 1.4;
    }
    .flow-tile__hover-desc {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      font-family: var(--font-sans);
      line-height: 1.5;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.4s ease, opacity 0.4s ease, margin 0.4s ease;
      margin-top: 0;
    }
    .flow-tile:hover .flow-tile__hover-desc {
      max-height: 120px;
      opacity: 1;
      margin-top: 0.5rem;
    }

    /* center tile elevated */
    .flow-tile--center {
      margin-bottom: 2rem;
    }
    @media (min-width: 768px) {
      .flow-tile--center { margin-bottom: 3rem; }
    }
    .flow-tile--center .flow-tile__face {
      border-width: 3px;
    }
    .flow-tile--center .flow-tile__glow--red {
      box-shadow: 0 0 24px 8px #ef4444, inset 0 0 24px 3px #ef444433;
    }
    .flow-tile--center .flow-tile__glow--blue {
      box-shadow: 0 0 24px 8px #3b82f6, inset 0 0 24px 3px #3b82f633;
    }

    /* active tile (selected) */
    .flow-tile--active {
      transform: translateY(-16px);
    }
    .flow-tile--active .flow-tile__face {
      border-color: #8b5cf6;
      box-shadow: 0 8px 30px rgba(139, 92, 246, 0.25);
    }
    .flow-tile--active .flow-tile__glow--red {
      box-shadow: 0 0 35px 12px #ef4444, inset 0 0 30px 4px #ef444444;
    }
    .flow-tile--active .flow-tile__glow--blue {
      box-shadow: 0 0 35px 12px #3b82f6, inset 0 0 30px 4px #3b82f644;
    }

    /* active indicator arrow */
    .flow-tile__indicator {
      display: flex;
      justify-content: center;
      margin-top: 0.75rem;
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .flow-tile--active .flow-tile__indicator {
      opacity: 1;
      transform: translateY(0);
    }

    /* click hint */
    .flow-tile__hint {
      font-size: 0.65rem;
      font-weight: 500;
      color: var(--color-text-muted);
      font-family: var(--font-sans);
      text-align: center;
      margin-top: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .flow-tile:hover .flow-tile__hint {
      opacity: 0.7;
    }
  `,
  template: `
    <div class="mx-auto w-full max-w-5xl px-4">
      @if (title()) {
        <h3
          class="mb-4 text-center text-xl font-semibold sm:text-2xl"
          style="color: var(--color-text)"
        >
          {{ title() }}
        </h3>
      }

      <div class="flow-scene">
        <!-- VERIFIER -->
        <div class="flow-tile" [class.flow-tile--active]="activeTile() === 'verifier'" (click)="tileClicked.emit('verifier')">
          <div class="flow-tile__glow flow-tile__glow--red"></div>
          <div class="flow-tile__glow flow-tile__glow--blue"></div>
          <div class="flow-tile__face">
            <svg class="flow-tile__icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 6L12 20v20c0 16.6 11.9 32.1 28 36 16.1-3.9 28-19.4 28-36V20L40 6z" stroke="currentColor" stroke-width="3" fill="none"/>
              <path d="M40 14L18 25v15c0 12.8 9.2 24.8 22 28 12.8-3.2 22-15.2 22-28V25L40 14z" stroke="currentColor" stroke-width="1.5" opacity="0.4" fill="none"/>
              <circle cx="40" cy="40" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
              <path d="M35 40l3 3 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="30" y1="40" x2="14" y2="40" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
              <circle cx="14" cy="40" r="2" fill="currentColor" opacity="0.5"/>
              <line x1="50" y1="40" x2="66" y2="40" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
              <circle cx="66" cy="40" r="2" fill="currentColor" opacity="0.5"/>
              <line x1="40" y1="50" x2="40" y2="62" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
              <circle cx="40" cy="62" r="2" fill="currentColor" opacity="0.5"/>
              <line x1="32" y1="48" x2="22" y2="58" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
              <circle cx="22" cy="58" r="2" fill="currentColor" opacity="0.4"/>
              <line x1="48" y1="48" x2="58" y2="58" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
              <circle cx="58" cy="58" r="2" fill="currentColor" opacity="0.4"/>
            </svg>
            <span class="flow-tile__label">{{ verifierLabel() }}</span>
            <span class="flow-tile__desc">{{ verifierDesc() }}</span>
            <span class="flow-tile__hover-desc">{{ verifierHover() }}</span>
          </div>
          <div class="flow-tile__indicator">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M2 2l6 6 6-6" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          @if (clickHint()) {
            <span class="flow-tile__hint">{{ clickHint() }}</span>
          }
        </div>

        <!-- stream left → center -->
        <div class="flow-stream">
          <div class="flow-stream__line"></div>
          <div class="flow-stream__dot flow-stream__dot--r1"></div>
          <div class="flow-stream__dot flow-stream__dot--b1"></div>
          <div class="flow-stream__dot flow-stream__dot--p1"></div>
          <div class="flow-stream__dot flow-stream__dot--r2"></div>
        </div>

        <!-- DIGITAL WALLET (center, elevated) -->
        <div class="flow-tile flow-tile--center" [class.flow-tile--active]="activeTile() === 'wallet'" (click)="tileClicked.emit('wallet')">
          <div class="flow-tile__glow flow-tile__glow--red"></div>
          <div class="flow-tile__glow flow-tile__glow--blue"></div>
          <div class="flow-tile__face">
            <svg class="flow-tile__icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="18" y="6" width="44" height="68" rx="8" stroke="currentColor" stroke-width="3" fill="none"/>
              <rect x="22" y="14" width="36" height="46" rx="2" stroke="currentColor" stroke-width="1.5" opacity="0.35" fill="none"/>
              <circle cx="40" cy="68" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
              <rect x="30" y="28" width="28" height="22" rx="4" stroke="currentColor" stroke-width="2.5" fill="none"/>
              <path d="M30 36h28" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
              <rect x="46" y="40" width="8" height="6" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="50" cy="43" r="1.5" fill="currentColor"/>
            </svg>
            <span class="flow-tile__label">{{ walletLabel() }}</span>
            <span class="flow-tile__desc">{{ walletDesc() }}</span>
            <span class="flow-tile__hover-desc">{{ walletHover() }}</span>
          </div>
          <div class="flow-tile__indicator">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M2 2l6 6 6-6" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          @if (clickHint()) {
            <span class="flow-tile__hint">{{ clickHint() }}</span>
          }
        </div>

        <!-- stream center → right -->
        <div class="flow-stream">
          <div class="flow-stream__line"></div>
          <div class="flow-stream__dot flow-stream__dot--r1"></div>
          <div class="flow-stream__dot flow-stream__dot--b1"></div>
          <div class="flow-stream__dot flow-stream__dot--p1"></div>
          <div class="flow-stream__dot flow-stream__dot--r2"></div>
        </div>

        <!-- SERVICE PROVIDER -->
        <div class="flow-tile" [class.flow-tile--active]="activeTile() === 'provider'" (click)="tileClicked.emit('provider')">
          <div class="flow-tile__glow flow-tile__glow--red"></div>
          <div class="flow-tile__glow flow-tile__glow--blue"></div>
          <div class="flow-tile__face">
            <svg class="flow-tile__icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="34" r="12" stroke="currentColor" stroke-width="2.5" fill="none"/>
              <path d="M40 22v-4M40 46v4M28 34h-4M52 34h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M31.5 25.5l-2.5-2.5M48.5 25.5l2.5-2.5M31.5 42.5l-2.5 2.5M48.5 42.5l2.5 2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="40" cy="34" r="7" stroke="currentColor" stroke-width="1.5" opacity="0.5" fill="none"/>
              <path d="M36 34l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 62c0 0 4-16 14-16 4 0 6 4 6 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              <path d="M70 62c0 0-4-16-14-16-4 0-6 4-6 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              <path d="M14 66c2-2 6-6 10-6 3 0 5 2 6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
              <path d="M66 66c-2-2-6-6-10-6-3 0-5 2-6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
            </svg>
            <span class="flow-tile__label">{{ providerLabel() }}</span>
            <span class="flow-tile__desc">{{ providerDesc() }}</span>
            <span class="flow-tile__hover-desc">{{ providerHover() }}</span>
          </div>
          <div class="flow-tile__indicator">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M2 2l6 6 6-6" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          @if (clickHint()) {
            <span class="flow-tile__hint">{{ clickHint() }}</span>
          }
        </div>
      </div>
    </div>
  `,
})
export class UfFlowDiagramComponent {
  title = input<string>('');
  clickHint = input<string>('');
  activeTile = input<'verifier' | 'wallet' | 'provider' | null>(null);
  verifierLabel = input<string>('Verifier');
  verifierDesc = input<string>('');
  verifierHover = input<string>('');
  walletLabel = input<string>('Digital Wallet');
  walletDesc = input<string>('');
  walletHover = input<string>('');
  providerLabel = input<string>('Service Provider');
  providerDesc = input<string>('');
  providerHover = input<string>('');

  tileClicked = output<'verifier' | 'wallet' | 'provider'>();

  hoveredNode = signal<'verifier' | 'wallet' | 'provider' | null>(null);
}
