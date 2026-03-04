import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-trust',
  standalone: true,
  imports: [TranslatePipe, RouterLink],
  template: `
    <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 class="text-3xl font-bold sm:text-4xl" style="color: var(--color-text)">
        {{ 'pitch.trust.headline' | translate }}
      </h1>
      <p class="mt-4 text-lg" style="color: var(--color-text-muted)">
        {{ 'pitch.trust.sub' | translate }}
      </p>

      <!-- Privacy by Design -->
      <section class="mt-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="pi pi-shield text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
          <h2 class="text-xl font-bold" style="color: var(--color-text)">
            {{ 'pitch.trust.privacyTitle' | translate }}
          </h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <h3 class="font-semibold text-sm" style="color: var(--color-text)">{{ 'pitch.trust.minimization' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.trust.minimizationDesc' | translate }}</p>
          </div>
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <h3 class="font-semibold text-sm" style="color: var(--color-text)">{{ 'pitch.trust.consent' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.trust.consentDesc' | translate }}</p>
          </div>
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <h3 class="font-semibold text-sm" style="color: var(--color-text)">{{ 'pitch.trust.noStorage' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.trust.noStorageDesc' | translate }}</p>
          </div>
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <h3 class="font-semibold text-sm" style="color: var(--color-text)">{{ 'pitch.trust.crypto' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.trust.cryptoDesc' | translate }}</p>
          </div>
        </div>
      </section>

      <!-- Regulatory Compliance -->
      <section class="mt-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="pi pi-balance-scale text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
          <h2 class="text-xl font-bold" style="color: var(--color-text)">
            {{ 'pitch.trust.regulatoryTitle' | translate }}
          </h2>
        </div>
        <div
          class="rounded-lg border overflow-hidden"
          style="border-color: var(--color-border)"
        >
          <table class="w-full text-sm">
            <thead>
              <tr style="background-color: var(--color-surface)">
                <th class="text-left p-3 font-semibold" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.framework' | translate }}</th>
                <th class="text-left p-3 font-semibold" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.approach' | translate }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-3 font-medium" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">LGPD</td>
                <td class="p-3" style="color: var(--color-text-muted); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.lgpdApproach' | translate }}</td>
              </tr>
              <tr>
                <td class="p-3 font-medium" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">GDPR</td>
                <td class="p-3" style="color: var(--color-text-muted); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.gdprApproach' | translate }}</td>
              </tr>
              <tr>
                <td class="p-3 font-medium" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">eIDAS 2.0</td>
                <td class="p-3" style="color: var(--color-text-muted); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.eidasApproach' | translate }}</td>
              </tr>
              <tr>
                <td class="p-3 font-medium" style="color: var(--color-text)">AML / KYC</td>
                <td class="p-3" style="color: var(--color-text-muted)">{{ 'pitch.trust.amlApproach' | translate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Data Residency -->
      <section class="mt-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="pi pi-database text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
          <h2 class="text-xl font-bold" style="color: var(--color-text)">
            {{ 'pitch.trust.dataTitle' | translate }}
          </h2>
        </div>
        <div
          class="rounded-lg border overflow-hidden"
          style="border-color: var(--color-border)"
        >
          <table class="w-full text-sm">
            <thead>
              <tr style="background-color: var(--color-surface)">
                <th class="text-left p-3 font-semibold" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.dataType' | translate }}</th>
                <th class="text-left p-3 font-semibold" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.location' | translate }}</th>
                <th class="text-left p-3 font-semibold" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.retention' | translate }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-3 font-medium" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.credentials' | translate }}</td>
                <td class="p-3" style="color: var(--color-text-muted); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.credLocation' | translate }}</td>
                <td class="p-3" style="color: var(--color-text-muted); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.credRetention' | translate }}</td>
              </tr>
              <tr>
                <td class="p-3 font-medium" style="color: var(--color-text); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.consentLogs' | translate }}</td>
                <td class="p-3" style="color: var(--color-text-muted); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.logLocation' | translate }}</td>
                <td class="p-3" style="color: var(--color-text-muted); border-bottom: 1px solid var(--color-border)">{{ 'pitch.trust.logRetention' | translate }}</td>
              </tr>
              <tr>
                <td class="p-3 font-medium" style="color: var(--color-text)">{{ 'pitch.trust.metadata' | translate }}</td>
                <td class="p-3" style="color: var(--color-text-muted)">{{ 'pitch.trust.metaLocation' | translate }}</td>
                <td class="p-3" style="color: var(--color-text-muted)">{{ 'pitch.trust.metaRetention' | translate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Responsibility Model -->
      <section class="mt-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="pi pi-users text-2xl" style="color: var(--color-primary)" aria-hidden="true"></span>
          <h2 class="text-xl font-bold" style="color: var(--color-text)">
            {{ 'pitch.trust.responsibilityTitle' | translate }}
          </h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <h3 class="font-semibold text-sm" style="color: var(--color-text)">{{ 'pitch.trust.issuers' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.trust.issuersDesc' | translate }}</p>
          </div>
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <h3 class="font-semibold text-sm" style="color: var(--color-text)">{{ 'pitch.trust.verifiers' | translate }}</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.trust.verifiersDesc' | translate }}</p>
          </div>
          <div
            class="rounded-lg border p-4"
            style="background-color: var(--color-surface); border-color: var(--color-border)"
          >
            <h3 class="font-semibold text-sm" style="color: var(--color-text)">Ultima Forma</h3>
            <p class="mt-1 text-sm" style="color: var(--color-text-muted)">{{ 'pitch.trust.ufDesc' | translate }}</p>
          </div>
        </div>
      </section>

      <!-- Deep dive link -->
      <div class="mt-12 text-center">
        <p class="text-sm mb-3" style="color: var(--color-text-muted)">
          {{ 'pitch.trust.deepDiveHint' | translate }}
        </p>
        <a
          routerLink="/pitch-deck/kb/11-regulatory-strategy"
          class="inline-flex items-center gap-2 text-sm font-medium"
          style="color: var(--color-primary)"
        >
          <span class="pi pi-arrow-right" aria-hidden="true"></span>
          {{ 'pitch.trust.deepDiveLink' | translate }}
        </a>
      </div>
    </div>
  `,
})
export class TrustComponent {}
