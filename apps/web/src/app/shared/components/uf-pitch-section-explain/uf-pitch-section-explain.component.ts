import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  inject,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import type { PitchSectionId } from '@ultima-forma/shared';
import { PitchExplainService, type ConversationMessage } from '../../../features/pitch-deck/pitch/pitch-explain.service';
import { TtsService } from '../../../core/services/tts.service';
import { TranscriptionService } from '../../../core/services/transcription.service';
import { VoiceRecorderService, type RecordingSession } from '../../../core/services/voice-recorder.service';
import { AiGenerationConfigService } from '../../../core/services/ai-generation-config.service';
import { EMPTY } from 'rxjs';
import { switchMap, tap, map, finalize } from 'rxjs/operators';

@Component({
  selector: 'uf-pitch-section-explain',
  standalone: true,
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (aiGenerationConfig.aiGenerationEnabled()) {
    <div class="mt-4 space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
          style="color: var(--color-primary)"
          [disabled]="loading()"
          (click)="triggerExplain()"
        >
          @if (loading()) {
            <span class="pi pi-spin pi-spinner" aria-hidden="true"></span>
            {{ 'pitch.explain.loading' | translate }}
          } @else {
            <span class="pi pi-sparkles" aria-hidden="true"></span>
            {{ 'pitch.explain.button' | translate }}
          }
        </button>
        @if (explanation(); as text) {
          <button
            type="button"
            class="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
            style="color: var(--color-primary)"
            [disabled]="isPlaying()"
            (click)="playText(text)"
            [attr.aria-label]="'pitch.explain.listen' | translate"
          >
            @if (isPlaying()) {
              <span class="pi pi-spin pi-spinner" aria-hidden="true"></span>
              {{ 'pitch.explain.playing' | translate }}
            } @else {
              <span class="pi pi-volume-up" aria-hidden="true"></span>
              {{ 'pitch.explain.listen' | translate }}
            }
          </button>
          <button
            type="button"
            class="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
            style="color: var(--color-primary)"
            [disabled]="isRecording() || isProcessingVoice()"
            (click)="toggleVoiceRecording()"
            [attr.aria-label]="'pitch.explain.speak' | translate"
          >
            @if (isRecording()) {
              <span class="pi pi-stop" aria-hidden="true"></span>
              {{ 'pitch.explain.stopRecording' | translate }}
            } @else if (isProcessingVoice()) {
              <span class="pi pi-spin pi-spinner" aria-hidden="true"></span>
              {{ 'pitch.explain.processing' | translate }}
            } @else {
              <span class="pi pi-microphone" aria-hidden="true"></span>
              {{ 'pitch.explain.speak' | translate }}
            }
          </button>
        }
      </div>

      @if (explanation(); as text) {
        <div
          class="rounded-lg p-4 text-sm"
          style="background-color: var(--color-bg); border: 1px solid var(--color-border); color: var(--color-text-muted); line-height: 1.6"
        >
          {{ text }}
        </div>
      }

      @if (conversation().length > 0) {
        <div class="space-y-2">
          @for (msg of conversation(); track $index) {
            <div
              class="rounded-lg p-3 text-sm"
              [style.background-color]="msg.role === 'user' ? 'var(--color-bg)' : 'var(--color-bg)'"
              style="border: 1px solid var(--color-border); color: var(--color-text-muted); line-height: 1.5"
            >
              <div class="flex items-start justify-between gap-2">
                <span class="flex-1" [attr.dir]="msg.role === 'user' ? 'ltr' : null">
                  {{ msg.content }}
                </span>
                @if (msg.role === 'assistant') {
                  <button
                    type="button"
                    class="flex-shrink-0 p-1 transition-opacity hover:opacity-80 disabled:opacity-50"
                    style="color: var(--color-primary)"
                    [disabled]="isPlaying()"
                    (click)="playText(msg.content)"
                    [attr.aria-label]="'pitch.explain.listen' | translate"
                  >
                    <span class="pi pi-volume-up text-xs" aria-hidden="true"></span>
                  </button>
                }
              </div>
            </div>
          }
        </div>
      }

      @if (micError()) {
        <p class="text-sm" style="color: #ef4444">
          {{ 'pitch.explain.micDenied' | translate }}
        </p>
      }
      @if (error()) {
        <p class="text-sm" style="color: #ef4444">
          {{ 'pitch.explain.error' | translate }}
        </p>
      }
    </div>
    }
  `,
})
export class UfPitchSectionExplainComponent {
  sectionId = input.required<PitchSectionId>();
  lang = input<string>();

  loading = signal(false);
  explanation = signal<string | null>(null);
  conversation = signal<ConversationMessage[]>([]);
  error = signal(false);
  micError = signal(false);
  isPlaying = signal(false);
  isRecording = signal(false);
  isProcessingVoice = signal(false);

  private readonly pitchExplain = inject(PitchExplainService);
  private readonly tts = inject(TtsService);
  private readonly transcription = inject(TranscriptionService);
  private readonly voiceRecorder = inject(VoiceRecorderService);
  private readonly translate = inject(TranslateService);
  protected readonly aiGenerationConfig = inject(AiGenerationConfigService);

  private recordingSession: RecordingSession | null = null;

  triggerExplain(): void {
    if (this.explanation() || this.loading()) return;

    this.loading.set(true);
    this.error.set(false);
    this.micError.set(false);

    this.pitchExplain
      .explainSection(this.sectionId(), this.effectiveLang())
      .subscribe({
        next: (res) => {
          this.explanation.set(res.explanation);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
  }

  playText(text: string): void {
    if (this.isPlaying() || !text.trim()) return;

    this.isPlaying.set(true);
    this.error.set(false);

    this.tts.synthesizeAndPlay(text, this.effectiveLang()).subscribe({
      complete: () => this.isPlaying.set(false),
      error: () => {
        this.error.set(true);
        this.isPlaying.set(false);
      },
    });
  }

  toggleVoiceRecording(): void {
    if (this.isRecording()) {
      this.recordingSession?.stop();
      this.recordingSession = null;
      return;
    }

    this.micError.set(false);
    this.error.set(false);
    this.recordingSession = this.voiceRecorder.startRecording();
    this.isRecording.set(true);

    this.recordingSession.blob$
      .pipe(
        tap(() => this.isRecording.set(false)),
        tap(() => this.isProcessingVoice.set(true)),
        switchMap((blob: Blob) =>
          this.transcription.transcribe(blob, this.effectiveLang())
        ),
        switchMap((res: { text: string }) => {
          const userMessage = res.text.trim();
          if (!userMessage) {
            return EMPTY;
          }
          const history = this.buildConversationHistory();
          return this.pitchExplain.askFollowUp(
            this.sectionId(),
            userMessage,
            history,
            this.effectiveLang()
          ).pipe(
            map((explainRes) => ({ userMessage, explanation: explainRes.explanation }))
          );
        }),
        finalize(() => this.isProcessingVoice.set(false)),
      )
      .subscribe({
        next: (payload: { userMessage: string; explanation: string } | undefined) => {
          if (payload) {
            this.conversation.update((prev) => [
              ...prev,
              { role: 'user', content: payload.userMessage },
              { role: 'assistant', content: payload.explanation },
            ]);
            this.playText(payload.explanation);
          }
        },
        error: (err: unknown) => {
          this.isRecording.set(false);
          const msg = err && typeof err === 'object' && 'message' in err ? String((err as { message?: unknown }).message) : '';
          const name = err && typeof err === 'object' && 'name' in err ? (err as { name?: string }).name : '';
          if (msg?.toLowerCase().includes('permission') || name === 'NotAllowedError') {
            this.micError.set(true);
          } else {
            this.error.set(true);
          }
        },
      });
  }

  private buildConversationHistory(): ConversationMessage[] {
    const initial = this.explanation();
    const conv = this.conversation();
    if (initial && conv.length === 0) {
      return [{ role: 'assistant', content: initial }];
    }
    return conv;
  }

  private effectiveLang(): string | undefined {
    return this.lang() ?? this.translate.currentLang ?? undefined;
  }
}
