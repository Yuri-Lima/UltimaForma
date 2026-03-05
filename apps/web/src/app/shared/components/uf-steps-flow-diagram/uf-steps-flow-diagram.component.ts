import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AiGenerationConfigService } from '../../../core/services/ai-generation-config.service';
import { TtsService } from '../../../core/services/tts.service';

type NodeId = 'issuers' | 'verifier' | 'wallet' | 'orchestration' | null;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'uf-steps-flow-diagram',
  standalone: true,
  imports: [TranslatePipe],
  styles: `
    :host{display:block}
    .sfd-diagram{padding:1.5rem;border-radius:0.875rem;background:var(--color-surface);border:1px solid var(--color-border);box-shadow:0 1px 3px rgba(0,0,0,0.04)}
    .sfd-header{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;margin-bottom:1rem}
    .sfd-phase-progress{height:3px;background:rgba(99,102,241,0.12);border-radius:2px;overflow:hidden;margin:0 0 1.5rem;width:100%}
    .sfd-phase-progress__fill{height:100%;background:linear-gradient(90deg,var(--color-primary),#8b5cf6,#a78bfa);border-radius:2px;transition:width 400ms ease-out}
    .sfd-node--orchestration.sfd-node--story-active{position:relative;overflow:visible}
    .sfd-node--orchestration.sfd-node--story-active::before{content:"";position:absolute;inset:-4px;border-radius:calc(0.5rem + 4px);border:2px solid rgba(139,92,246,0.5);animation:sfdOrchestratorPulse 1.5s ease-out infinite;pointer-events:none}
    @keyframes sfdOrchestratorPulse{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.08);opacity:0}}
    .sfd-flow-section--request.sfd-flow-section--active{animation:sfdSectionPulse 2s ease-in-out infinite}
    .sfd-flow-section--response.sfd-flow-section--active{animation:sfdSectionPulse 2s ease-in-out infinite}
    @keyframes sfdSectionPulse{0%,100%{background:linear-gradient(90deg,rgba(99,102,241,0.04),transparent)}50%{background:linear-gradient(90deg,rgba(99,102,241,0.08),transparent)}}
    .sfd-flow-section--response.sfd-flow-section--active{animation-name:sfdSectionPulseResponse}
    @keyframes sfdSectionPulseResponse{0%,100%{background:linear-gradient(90deg,rgba(34,197,94,0.04),transparent)}50%{background:linear-gradient(90deg,rgba(34,197,94,0.08),transparent)}}
    .sfd-title{font-size:1.125rem;font-weight:600;color:var(--color-text);margin:0;text-align:center;letter-spacing:-0.01em}
    .sfd-play{display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;border-radius:0.5rem;background:linear-gradient(135deg,var(--color-primary),#7c3aed);color:white;font-size:0.875rem;font-weight:600;border:none;cursor:pointer;transition:transform 150ms}
    .sfd-play:hover{filter:brightness(1.08);transform:translateY(-1px)}
    .sfd-play:disabled{opacity:0.6;cursor:not-allowed;transform:none}
    .sfd-issuers{display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;margin-bottom:1.5rem}
    .sfd-chip{padding:0.3rem 0.65rem;border-radius:9999px;background:var(--color-surface);border:1px solid var(--color-border);font-size:0.8125rem;color:var(--color-text-muted);cursor:pointer;transition:border-color 150ms, box-shadow 150ms}
    .sfd-chip:hover,.sfd-chip.sfd-chip--active,.sfd-chip.sfd-chip--story-active{border-color:var(--color-primary);box-shadow:0 0 0 2px rgba(99,102,241,0.2)}
    .sfd-chip.sfd-chip--story-active{animation:sfdPulse 1.2s ease-in-out 2}
    .sfd-node.sfd-node--story-active{border-width:3px;box-shadow:0 4px 20px rgba(99,102,241,0.4);animation:sfdPulse 1.2s ease-in-out 2}
    @keyframes sfdPulse{0%,100%{opacity:1}50%{opacity:0.9}}
    .sfd-flow-grid{display:flex;flex-direction:column;gap:2.25rem;padding:1.5rem 0}
    .sfd-flow-grid .sfd-flow-row{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;justify-items:center;gap:1rem 1.25rem}
    @media (max-width:767px){.sfd-flow-grid .sfd-flow-row{grid-template-columns:minmax(72px,1fr) auto minmax(72px,1fr) auto minmax(72px,1fr);gap:0.5rem 0.75rem;overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;padding-bottom:0.5rem}}
    @media (max-width:767px){.sfd-flow-grid .sfd-flow-row .sfd-node,.sfd-flow-grid .sfd-flow-row .sfd-arrow-wrap{scroll-snap-align:center}}
    @media (max-width:767px){.sfd-node{min-width:72px;max-width:none;font-size:0.8125rem;padding:0.75rem}}
    .sfd-row{display:contents}
    .sfd-node{min-width:100px;max-width:180px;width:100%;padding:1rem;border-radius:0.5rem;background:var(--color-surface);border:2px solid var(--color-primary);text-align:center;font-weight:600;font-size:0.875rem;color:var(--color-text);line-height:1.3;letter-spacing:0.01em;cursor:pointer;transition:transform 150ms, box-shadow 150ms, border-color 150ms}
    .sfd-node:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.1)}
    .sfd-node.sfd-node--active{border-width:3px;box-shadow:0 4px 16px rgba(99,102,241,0.25)}
    .sfd-node--center{border-width:3px}
    .sfd-node__icon{display:block;font-size:1.125rem;color:var(--color-primary);opacity:0.9;margin-bottom:0.35rem}
    .sfd-node--orchestration{background:rgba(99,102,241,0.08);border-color:var(--color-primary)}
    .sfd-node--orchestration .sfd-node__icon{font-size:1.25rem;opacity:0.95}
    .sfd-node--orchestration .sfd-node__subtitle{display:block;font-size:0.6875rem;font-weight:600;color:var(--color-primary);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.2rem}
    .sfd-arrow{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.25rem;min-width:72px;min-height:40px;font-size:0.8125rem;color:var(--color-primary);font-weight:600;position:relative}
    .sfd-arrow--v{flex-direction:column;min-height:50px}
    .sfd-arrow-icon{font-size:1.125rem;opacity:1;z-index:1}
    .sfd-arrow-label{z-index:1;font-weight:600;letter-spacing:0.02em}
    .sfd-main{display:flex;flex-direction:column;align-items:center}
    .sfd-stream{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
    .sfd-stream--h{width:100%;height:3px}
    .sfd-stream--v{width:3px;height:100%;flex-direction:column}
    .sfd-stream__line{position:absolute;background:linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa);border-radius:3px;opacity:0.6;box-shadow:0 0 8px rgba(99,102,241,0.25)}
    .sfd-stream--h .sfd-stream__line{left:0;right:0;height:5px;top:50%;margin-top:-2.5px}
    .sfd-stream--v .sfd-stream__line{top:0;bottom:0;width:5px;left:50%;margin-left:-2.5px;background:linear-gradient(180deg,#6366f1,#8b5cf6,#a78bfa)}
    .sfd-stream__dot{position:absolute;width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#818cf8,#a78bfa);box-shadow:0 0 12px 4px rgba(99,102,241,0.6),0 0 24px 2px rgba(167,139,250,0.3);border:1.5px solid rgba(255,255,255,0.8);top:50%;margin-top:-4px;left:0}
    .sfd-stream--v .sfd-stream__dot{top:0;left:50%;margin-left:-4px;margin-top:0}
    .sfd-stream--h .sfd-stream__dot{animation:sfdDotH 2.2s cubic-bezier(0.4,0,0.2,1) infinite}
    .sfd-stream--h .sfd-stream__dot--d2{animation-delay:0.45s}
    .sfd-stream--h .sfd-stream__dot--d3{animation-delay:0.9s}
    .sfd-stream--h .sfd-stream__dot--d4{animation-delay:1.35s}
    .sfd-stream--v .sfd-stream__dot{animation:sfdDotV 2.2s cubic-bezier(0.4,0,0.2,1) infinite}
    .sfd-stream--v .sfd-stream__dot--d2{animation-delay:0.45s}
    @keyframes sfdDotH{0%{left:0;opacity:0;transform:scale(0.95)}5%{opacity:1}50%{transform:scale(1.2)}95%{opacity:1}100%{left:calc(100% - 8px);opacity:0;transform:scale(0.95)}}
    @keyframes sfdDotV{0%{top:0;opacity:0;transform:scale(0.95)}5%{opacity:1}50%{transform:scale(1.2)}95%{opacity:1}100%{top:calc(100% - 8px);opacity:0;transform:scale(0.95)}}
    .sfd-arrow-wrap{position:relative;cursor:default;transition:opacity 200ms}
    .sfd-arrow-wrap.sfd-arrow--dimmed{opacity:0.4}
    .sfd-arrow-wrap.sfd-arrow--dimmed .sfd-stream{opacity:0}
    .sfd-story-caption{padding:0.75rem 1.25rem;border-radius:0.5rem;font-size:0.9375rem;color:var(--color-text);text-align:center;background:var(--color-surface);border:1px solid var(--color-border);border-left:4px solid #8b5cf6;transition:opacity 200ms;max-width:36rem;margin-left:auto;margin-right:auto}
    .sfd-story-caption--zone-issuers{min-height:2.5rem;margin:0 0 1.25rem}
    .sfd-story-caption--zone-vc{min-height:2.5rem;margin:0 0 1.25rem}
    .sfd-story-caption--zone-request{min-height:2.5rem;margin-top:1rem}
    .sfd-story-caption--zone-response{min-height:2.5rem;margin-top:1rem}
    .sfd-arrow-wrap:hover .sfd-tooltip,.sfd-arrow-wrap:focus-within .sfd-tooltip{opacity:1}
    .sfd-tooltip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:0.5rem;padding:0.5rem 0.75rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:0.5rem;font-size:0.75rem;color:var(--color-text);max-width:200px;text-align:center;opacity:0;pointer-events:none;transition:opacity 150ms;z-index:10;box-shadow:0 4px 12px rgba(0,0,0,0.15)}
    .sfd-detail{margin-top:2rem;padding:1.25rem 1.5rem;border-radius:0.75rem;background:var(--color-surface);border:1px solid var(--color-border);box-shadow:0 2px 8px rgba(0,0,0,0.06)}
    .sfd-detail-title{font-size:0.875rem;font-weight:600;color:var(--color-primary);margin-bottom:0.625rem}
    .sfd-detail-text{font-size:0.8125rem;color:var(--color-text-muted);line-height:1.6}
    .sfd-chip:focus-visible,.sfd-node:focus-visible,.sfd-play:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px}
    .sfd-arrow-wrap:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px;border-radius:0.25rem}
    .sfd-flow-label{font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;line-height:1;margin-bottom:0.75rem;padding-bottom:0.5rem;border-bottom:1px solid var(--color-border)}
    .sfd-flow-section--request .sfd-flow-label{color:var(--color-text)}
    .sfd-flow-section--response .sfd-flow-label{color:#15803d}
    .sfd-flow-section{display:flex;flex-direction:column;align-items:stretch;gap:0;min-height:0}
    .sfd-flow-section--request{padding:1.25rem 1.5rem;border-radius:0.75rem;background:linear-gradient(90deg,rgba(99,102,241,0.03),transparent);border:1px solid var(--color-border);border-left:3px solid var(--color-primary)}
    .sfd-flow-section--response{padding:1.25rem 1.5rem;border-radius:0.75rem;background:linear-gradient(90deg,rgba(34,197,94,0.03),transparent);border:1px solid var(--color-border);border-left:3px solid #22c55e}
    .sfd-flow-section .sfd-flow-row{width:100%}
    .sfd-progress-badge{display:inline-block;font-size:0.6875rem;font-weight:600;color:var(--color-text-muted);margin-left:0.5rem}
    .sfd-story-caption{animation:sfdCaptionFade 200ms ease-out}
    .sfd-story-caption__explanation{display:block;font-size:0.8125rem;color:var(--color-text-muted);font-weight:400;margin-top:0.4rem;line-height:1.5;animation:sfdExplanationFade 300ms ease-out 100ms both}
    @keyframes sfdExplanationFade{0%{opacity:0;transform:translateY(-2px)}100%{opacity:1;transform:translateY(0)}}
    @keyframes sfdCaptionFade{0%{opacity:0;transform:translateY(-4px)}100%{opacity:1;transform:translateY(0)}}
    .sfd-node.sfd-node--story-active{animation:sfdNodeEnter 400ms ease-out}
    @keyframes sfdNodeEnter{0%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.08)}50%{transform:scale(1.02);box-shadow:0 4px 16px rgba(99,102,241,0.35)}100%{transform:scale(1);box-shadow:0 4px 16px rgba(99,102,241,0.35)}}
    .sfd-arrow-wrap.sfd-arrow--highlight .sfd-arrow-icon,.sfd-arrow-wrap.sfd-arrow--highlight .sfd-arrow-label{opacity:1;filter:brightness(1.2)}
    .sfd-arrow-wrap:not(.sfd-arrow--dimmed) .sfd-arrow-icon,.sfd-arrow-wrap:not(.sfd-arrow--dimmed) .sfd-arrow-label{opacity:0!important;visibility:hidden!important}
    @media (prefers-reduced-motion:reduce){
    .sfd-chip.sfd-chip--story-active,.sfd-node.sfd-node--story-active{animation:none!important}
    .sfd-node--orchestration.sfd-node--story-active::before{animation:none;display:none}
    .sfd-flow-section--active{animation:none!important}
    .sfd-stream__dot{animation:none!important}
    .sfd-story-caption{animation:none}.sfd-story-caption__explanation{animation:none}
    .sfd-node.sfd-node--story-active{box-shadow:0 4px 16px rgba(99,102,241,0.35)}
    }
  `,
  template: `
    <div class="sfd-diagram mx-auto max-w-4xl">
      <div class="sfd-header">
        @if (title()) {
          <h3 class="sfd-title">{{ title() }}</h3>
        }
        <button
          type="button"
          class="sfd-play"
          (click)="isPlaying() ? onStop() : onPlay()"
          [attr.aria-label]="(isPlaying() ? 'pitch.steps.diagram.stopSimulation' : 'pitch.steps.diagram.playSimulation') | translate"
          [attr.title]="(isPlaying() ? 'pitch.steps.diagram.stopSimulation' : 'pitch.steps.diagram.playHint') | translate"
        >
          @if (isPlaying()) {
            <span class="pi pi-stop" aria-hidden="true"></span>
            {{ 'pitch.steps.diagram.stopSimulation' | translate }}
          } @else {
            <span class="pi pi-play" aria-hidden="true"></span>
            {{ 'pitch.steps.diagram.playSimulation' | translate }}
          }
        </button>
      </div>
      @if (storyPhase() >= 0) {
        <div class="sfd-phase-progress" role="progressbar" [attr.aria-valuenow]="storyPhase() + 1" aria-valuemin="1" aria-valuemax="6" [attr.aria-label]="'pitch.steps.diagram.stepProgress' | translate:{current: storyPhase() + 1}">
          <div class="sfd-phase-progress__fill" [style.width.%]="((storyPhase() + 1) / 6) * 100"></div>
        </div>
      }

      <!-- Issuers row -->
      <div class="sfd-issuers" role="group" [attr.aria-label]="'pitch.steps.diagram.issuers' | translate">
        <button type="button" class="sfd-chip" [class.sfd-chip--active]="activeNode()==='issuers'" [class.sfd-chip--story-active]="storyPhase()===0" (click)="selectNode('issuers')">Gov.br</button>
        <button type="button" class="sfd-chip" [class.sfd-chip--active]="activeNode()==='issuers'" [class.sfd-chip--story-active]="storyPhase()===0" (click)="selectNode('issuers')">{{ 'pitch.consent.cpfIssuer' | translate }}</button>
        <button type="button" class="sfd-chip" [class.sfd-chip--active]="activeNode()==='issuers'" [class.sfd-chip--story-active]="storyPhase()===0" (click)="selectNode('issuers')">{{ 'pitch.consent.addressIssuer' | translate }}</button>
        <button type="button" class="sfd-chip" [class.sfd-chip--active]="activeNode()==='issuers'" [class.sfd-chip--story-active]="storyPhase()===0" (click)="selectNode('issuers')">{{ 'pitch.consent.incomeIssuer' | translate }}</button>
        <button type="button" class="sfd-chip" [class.sfd-chip--active]="activeNode()==='issuers'" [class.sfd-chip--story-active]="storyPhase()===0" (click)="selectNode('issuers')">{{ 'pitch.consent.employerIssuer' | translate }}</button>
      </div>

      @if (storyPhase() >= 0 && storyPhase() === 0) {
        <p class="sfd-story-caption sfd-story-caption--zone-issuers" [attr.aria-live]="'polite'">
          {{ 'pitch.steps.diagram.storyPhase' + storyPhase() | translate }}
          <span class="sfd-progress-badge">{{ 'pitch.steps.diagram.stepProgress' | translate:{current: storyPhase() + 1} }}</span>
          <span class="sfd-story-caption__explanation">{{ 'pitch.steps.diagram.storyPhase' + storyPhase() + 'Long' | translate }}</span>
        </p>
      }

      <!-- VC arrow down (phase 1) -->
      <div class="sfd-main">
        <div class="sfd-arrow-wrap sfd-arrow sfd-arrow--v" [class.sfd-arrow--dimmed]="storyPhase()>=0 && storyPhase()!==1" [class.sfd-arrow--highlight]="storyPhase()===0 || storyPhase()===1" tabindex="0" role="group" [attr.aria-label]="'pitch.steps.diagram.arrowVcDetail' | translate" (mouseenter)="arrowHover.set('vc')" (mouseleave)="arrowHover.set(null)">
          @if (storyPhase() === 1) {
            <div class="sfd-stream sfd-stream--v" aria-hidden="true">
              <div class="sfd-stream__line"></div>
              <div class="sfd-stream__dot"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d2"></div>
            </div>
          }
          <span class="sfd-arrow-icon pi pi-arrow-down" aria-hidden="true"></span>
          <span class="sfd-arrow-label">{{ 'pitch.steps.diagram.arrowVc' | translate }}</span>
          @if (arrowHover() === 'vc') {
            <span class="sfd-tooltip">{{ 'pitch.steps.diagram.arrowVcDetail' | translate }}</span>
          }
        </div>
      </div>

      @if (storyPhase() >= 0 && storyPhase() === 1) {
        <p class="sfd-story-caption sfd-story-caption--zone-vc" [attr.aria-live]="'polite'">
          {{ 'pitch.steps.diagram.storyPhase' + storyPhase() | translate }}
          <span class="sfd-progress-badge">{{ 'pitch.steps.diagram.stepProgress' | translate:{current: storyPhase() + 1} }}</span>
          <span class="sfd-story-caption__explanation">{{ 'pitch.steps.diagram.storyPhase' + storyPhase() + 'Long' | translate }}</span>
        </p>
      }

      <!-- Request + Response flow (aligned grid) -->
      <div class="sfd-flow-grid" role="img" [attr.aria-label]="'pitch.steps.diagram.title' | translate">
      <div class="sfd-flow-section sfd-flow-section--request" [class.sfd-flow-section--active]="storyPhase() === 2 || storyPhase() === 3">
        <span class="sfd-flow-label">{{ 'pitch.steps.diagram.flowRequest' | translate }}</span>
        <div class="sfd-flow-row sfd-row">
        <button type="button" class="sfd-node" [class.sfd-node--active]="activeNode()==='verifier'" [class.sfd-node--story-active]="storyPhase()===1" (click)="selectNode('verifier')" [attr.aria-expanded]="activeNode()==='verifier'" aria-controls="sfd-detail-panel">
          <span class="sfd-node__icon pi pi-shield" aria-hidden="true"></span>
          {{ 'pitch.steps.diagram.verifier' | translate }}
        </button>
        <div class="sfd-arrow-wrap sfd-arrow" [class.sfd-arrow--dimmed]="storyPhase()>=0 && storyPhase()!==2" tabindex="0" role="group" [attr.aria-label]="'pitch.steps.diagram.arrowRequestDetail' | translate" (mouseenter)="arrowHover.set('request')" (mouseleave)="arrowHover.set(null)">
          @if (storyPhase() === 2) {
            <div class="sfd-stream sfd-stream--h" aria-hidden="true">
              <div class="sfd-stream__line"></div>
              <div class="sfd-stream__dot"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d2"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d3"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d4"></div>
            </div>
          }
          <span class="sfd-arrow-icon pi pi-arrow-right" aria-hidden="true"></span>
          <span class="sfd-arrow-label">{{ 'pitch.steps.diagram.arrowRequest' | translate }}</span>
          @if (arrowHover() === 'request') {
            <span class="sfd-tooltip">{{ 'pitch.steps.diagram.arrowRequestDetail' | translate }}</span>
          }
        </div>
        <button type="button" class="sfd-node sfd-node--center sfd-node--orchestration" [class.sfd-node--active]="activeNode()==='orchestration'" [class.sfd-node--story-active]="storyPhase()===2" (click)="selectNode('orchestration')" [attr.aria-expanded]="activeNode()==='orchestration'" aria-controls="sfd-detail-panel">
          <span class="sfd-node__icon pi pi-sitemap" aria-hidden="true"></span>
          {{ 'pitch.steps.diagram.orchestration' | translate }}
          <span class="sfd-node__subtitle">{{ 'pitch.steps.diagram.orchestrationSubtitle' | translate }}</span>
        </button>
        <div class="sfd-arrow-wrap sfd-arrow" [class.sfd-arrow--dimmed]="storyPhase()>=0 && storyPhase()!==3" tabindex="0" role="group" [attr.aria-label]="'pitch.steps.diagram.arrowPolicyDetail' | translate" (mouseenter)="arrowHover.set('policy')" (mouseleave)="arrowHover.set(null)">
          @if (storyPhase() === 3) {
            <div class="sfd-stream sfd-stream--h" aria-hidden="true">
              <div class="sfd-stream__line"></div>
              <div class="sfd-stream__dot"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d2"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d3"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d4"></div>
            </div>
          }
          <span class="sfd-arrow-icon pi pi-arrow-right" aria-hidden="true"></span>
          <span class="sfd-arrow-label">{{ 'pitch.steps.diagram.arrowPolicy' | translate }}</span>
          @if (arrowHover() === 'policy') {
            <span class="sfd-tooltip">{{ 'pitch.steps.diagram.arrowPolicyDetail' | translate }}</span>
          }
        </div>
        <button type="button" class="sfd-node" [class.sfd-node--active]="activeNode()==='wallet'" [class.sfd-node--story-active]="storyPhase()===3" (click)="selectNode('wallet')" [attr.aria-expanded]="activeNode()==='wallet'" aria-controls="sfd-detail-panel">
          <span class="sfd-node__icon pi pi-wallet" aria-hidden="true"></span>
          {{ 'pitch.steps.diagram.wallet' | translate }}
        </button>
      </div>
      @if (storyPhase() >= 0 && (storyPhase() === 2 || storyPhase() === 3)) {
        <p class="sfd-story-caption sfd-story-caption--zone-request" [attr.aria-live]="'polite'">
          {{ 'pitch.steps.diagram.storyPhase' + storyPhase() | translate }}
          <span class="sfd-progress-badge">{{ 'pitch.steps.diagram.stepProgress' | translate:{current: storyPhase() + 1} }}</span>
          <span class="sfd-story-caption__explanation">{{ 'pitch.steps.diagram.storyPhase' + storyPhase() + 'Long' | translate }}</span>
        </p>
      }
      </div>
      <div class="sfd-flow-section sfd-flow-section--response" [class.sfd-flow-section--active]="storyPhase() === 4 || storyPhase() === 5">
        <span class="sfd-flow-label">{{ 'pitch.steps.diagram.flowResponse' | translate }}</span>
        <div class="sfd-flow-row sfd-row">
        <button type="button" class="sfd-node" [class.sfd-node--active]="activeNode()==='wallet'" [class.sfd-node--story-active]="storyPhase()===4" (click)="selectNode('wallet')" [attr.aria-expanded]="activeNode()==='wallet'" aria-controls="sfd-detail-panel">
          <span class="sfd-node__icon pi pi-wallet" aria-hidden="true"></span>
          {{ 'pitch.steps.diagram.wallet' | translate }}
        </button>
        <div class="sfd-arrow-wrap sfd-arrow" [class.sfd-arrow--dimmed]="storyPhase()>=0 && storyPhase()!==4" tabindex="0" role="group" [attr.aria-label]="'pitch.steps.diagram.arrowVpDetail' | translate" (mouseenter)="arrowHover.set('vp')" (mouseleave)="arrowHover.set(null)">
          @if (storyPhase() === 4) {
            <div class="sfd-stream sfd-stream--h" aria-hidden="true">
              <div class="sfd-stream__line"></div>
              <div class="sfd-stream__dot"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d2"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d3"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d4"></div>
            </div>
          }
          <span class="sfd-arrow-icon pi pi-arrow-right" aria-hidden="true"></span>
          <span class="sfd-arrow-label">{{ 'pitch.steps.diagram.arrowVp' | translate }}</span>
          @if (arrowHover() === 'vp') {
            <span class="sfd-tooltip">{{ 'pitch.steps.diagram.arrowVpDetail' | translate }}</span>
          }
        </div>
        <button type="button" class="sfd-node sfd-node--center sfd-node--orchestration" [class.sfd-node--active]="activeNode()==='orchestration'" [class.sfd-node--story-active]="storyPhase()===4" (click)="selectNode('orchestration')" [attr.aria-expanded]="activeNode()==='orchestration'" aria-controls="sfd-detail-panel">
          <span class="sfd-node__icon pi pi-sitemap" aria-hidden="true"></span>
          {{ 'pitch.steps.diagram.orchestration' | translate }}
          <span class="sfd-node__subtitle">{{ 'pitch.steps.diagram.orchestrationSubtitle' | translate }}</span>
        </button>
        <div class="sfd-arrow-wrap sfd-arrow" [class.sfd-arrow--dimmed]="storyPhase()>=0 && storyPhase()!==5" tabindex="0" role="group" [attr.aria-label]="'pitch.steps.diagram.arrowResultDetail' | translate" (mouseenter)="arrowHover.set('result')" (mouseleave)="arrowHover.set(null)">
          @if (storyPhase() === 5) {
            <div class="sfd-stream sfd-stream--h" aria-hidden="true">
              <div class="sfd-stream__line"></div>
              <div class="sfd-stream__dot"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d2"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d3"></div>
              <div class="sfd-stream__dot sfd-stream__dot--d4"></div>
            </div>
          }
          <span class="sfd-arrow-icon pi pi-arrow-right" aria-hidden="true"></span>
          <span class="sfd-arrow-label">{{ 'pitch.steps.diagram.arrowResult' | translate }}</span>
          @if (arrowHover() === 'result') {
            <span class="sfd-tooltip">{{ 'pitch.steps.diagram.arrowResultDetail' | translate }}</span>
          }
        </div>
        <button type="button" class="sfd-node" [class.sfd-node--active]="activeNode()==='verifier'" [class.sfd-node--story-active]="storyPhase()===5" (click)="selectNode('verifier')" [attr.aria-expanded]="activeNode()==='verifier'" aria-controls="sfd-detail-panel">
          <span class="sfd-node__icon pi pi-shield" aria-hidden="true"></span>
          {{ 'pitch.steps.diagram.verifier' | translate }}
        </button>
      </div>
      @if (storyPhase() >= 0 && (storyPhase() === 4 || storyPhase() === 5)) {
        <p class="sfd-story-caption sfd-story-caption--zone-response" [attr.aria-live]="'polite'">
          {{ 'pitch.steps.diagram.storyPhase' + storyPhase() | translate }}
          <span class="sfd-progress-badge">{{ 'pitch.steps.diagram.stepProgress' | translate:{current: storyPhase() + 1} }}</span>
          <span class="sfd-story-caption__explanation">{{ 'pitch.steps.diagram.storyPhase' + storyPhase() + 'Long' | translate }}</span>
        </p>
      }
      </div>
      </div>

      <!-- Detail panel -->
      @if (activeNode()) {
        <div id="sfd-detail-panel" class="sfd-detail" role="region" [attr.aria-label]="'pitch.steps.diagram.detailTitle' | translate">
          @switch (activeNode()) {
            @case ('issuers') {
              <div class="sfd-detail-title">{{ 'pitch.steps.diagram.issuers' | translate }}</div>
              <p class="sfd-detail-text">{{ 'pitch.steps.diagram.issuersDetail' | translate }}</p>
            }
            @case ('verifier') {
              <div class="sfd-detail-title">{{ 'pitch.steps.diagram.verifier' | translate }}</div>
              <p class="sfd-detail-text">{{ 'pitch.steps.diagram.verifierDetail' | translate }}</p>
            }
            @case ('wallet') {
              <div class="sfd-detail-title">{{ 'pitch.steps.diagram.wallet' | translate }}</div>
              <p class="sfd-detail-text">{{ 'pitch.steps.diagram.walletDetail' | translate }}</p>
            }
            @case ('orchestration') {
              <div class="sfd-detail-title">{{ 'pitch.steps.diagram.orchestration' | translate }}</div>
              <p class="sfd-detail-text">{{ 'pitch.steps.diagram.orchestrationDetail' | translate }}</p>
            }
          }
        </div>
      }
    </div>
  `,
})
export class UfStepsFlowDiagramComponent {
  private static readonly TOTAL_PHASES = 6;
  private static readonly PHASE_DURATION_MS = 6000;
  title = input<string>('');
  flowTrigger = input<number>(0);
  lang = input<string>();

  activeNode = signal<NodeId>(null);
  arrowHover = signal<string | null>(null);
  isPlaying = signal(false);
  storyPhase = signal<number>(-1);

  nodeClicked = output<NodeId>();

  private tts = inject(TtsService);
  private translate = inject(TranslateService);
  private aiGenerationConfig = inject(AiGenerationConfigService);
  private ttsSubscription: Subscription | null = null;
  private phaseInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const trigger = this.flowTrigger();
      if (trigger > 0) {
        this.startStorySequence();
      }
    });

    effect(() => {
      const phase = this.storyPhase();
      if (phase >= 0 && phase < UfStepsFlowDiagramComponent.TOTAL_PHASES) {
        this.speakPhase(phase);
      }
    });
  }

  private speakPhase(phase: number): void {
    if (!this.aiGenerationConfig.aiGenerationEnabled()) {
      if (phase === 0) {
        this.schedulePhaseAdvance();
      }
      return;
    }

    const title = this.translate.instant('pitch.steps.diagram.storyPhase' + phase);
    const long = this.translate.instant('pitch.steps.diagram.storyPhase' + phase + 'Long');
    const text = [title, long].filter(Boolean).join('. ');
    const effectiveLang = this.lang() ?? this.translate.currentLang ?? 'en';

    if (!text?.trim()) {
      this.advancePhaseAfterSpeak(phase);
      return;
    }

    this.ttsSubscription?.unsubscribe();
    this.ttsSubscription = this.tts
      .synthesizeAndPlay(text, effectiveLang)
      .subscribe({
        complete: () => this.advancePhaseAfterSpeak(phase),
        error: () => this.advancePhaseAfterSpeak(phase),
      });
  }

  private schedulePhaseAdvance(): void {
    this.clearPhaseInterval();
    let phase = this.storyPhase();
    this.phaseInterval = setInterval(() => {
      phase += 1;
      if (phase < UfStepsFlowDiagramComponent.TOTAL_PHASES) {
        this.storyPhase.set(phase);
      } else {
        this.clearPhaseInterval();
        this.storyPhase.set(-1);
        this.isPlaying.set(false);
      }
    }, UfStepsFlowDiagramComponent.PHASE_DURATION_MS);
  }

  private advancePhaseAfterSpeak(phase: number): void {
    if (phase < UfStepsFlowDiagramComponent.TOTAL_PHASES - 1) {
      this.storyPhase.set(phase + 1);
    } else {
      this.speakClosing();
      this.storyPhase.set(-1);
      this.isPlaying.set(false);
    }
  }

  private speakClosing(): void {
    if (!this.aiGenerationConfig.aiGenerationEnabled()) return;

    const text = this.translate.instant('pitch.steps.diagram.storyClosing');
    if (!text?.trim()) return;
    const effectiveLang = this.lang() ?? this.translate.currentLang ?? 'en';
    this.ttsSubscription?.unsubscribe();
    this.ttsSubscription = this.tts
      .synthesizeAndPlay(text, effectiveLang)
      .subscribe({ error: () => {} });
  }

  onStop(): void {
    this.ttsSubscription?.unsubscribe();
    this.ttsSubscription = null;
    this.clearPhaseInterval();
    this.tts.stopPlayback();
    this.storyPhase.set(-1);
    this.isPlaying.set(false);
  }

  private clearPhaseInterval(): void {
    if (this.phaseInterval) {
      clearInterval(this.phaseInterval);
      this.phaseInterval = null;
    }
  }

  selectNode(node: NodeId) {
    this.activeNode.set(this.activeNode() === node ? null : node);
    if (node) this.nodeClicked.emit(node);
  }

  startStorySequence() {
    this.nodeClicked.emit(null);
    this.storyPhase.set(0);
    this.isPlaying.set(true);
  }

  onPlay() {
    this.startStorySequence();
  }
}
