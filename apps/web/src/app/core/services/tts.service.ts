import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { API_BASE, mapI18nToMlLang } from '@ultima-forma/shared';

@Injectable({ providedIn: 'root' })
export class TtsService {
  private currentAudio: HTMLAudioElement | null = null;
  private currentObjectUrl: string | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Stops current TTS playback if any.
   */
  stopPlayback(): void {
    if (this.currentAudio && this.currentObjectUrl) {
      this.currentAudio.pause();
      this.currentAudio.src = '';
      URL.revokeObjectURL(this.currentObjectUrl);
      this.currentAudio = null;
      this.currentObjectUrl = null;
    }
  }

  /**
   * Fetches TTS audio blob without playing. Use for pre-loading.
   */
  synthesize(text: string, lang?: string): Observable<Blob> {
    const language = mapI18nToMlLang(lang ?? 'en');
    return this.http.post(`${API_BASE}/tts/synthesize`, { text, language }, { responseType: 'blob' });
  }

  /**
   * Plays a pre-fetched audio blob. Returns an observable that completes when playback ends.
   */
  playBlob(blob: Blob): Observable<void> {
    return new Observable<void>((observer) => {
      this.stopPlayback();

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      this.currentAudio = audio;
      this.currentObjectUrl = url;

      const cleanup = () => {
        if (this.currentAudio === audio) {
          this.currentAudio = null;
          this.currentObjectUrl = null;
        }
        URL.revokeObjectURL(url);
        observer.complete();
      };

      audio.onended = cleanup;
      audio.onerror = () => {
        observer.error(new Error('TTS playback failed'));
        cleanup();
      };

      audio.play().catch((err) => {
        observer.error(err);
        cleanup();
      });
    });
  }

  /**
   * Synthesizes text to speech and plays it. Returns an observable that
   * completes when playback ends or errors.
   */
  synthesizeAndPlay(text: string, lang?: string): Observable<void> {
    return this.synthesize(text, lang).pipe(switchMap((blob) => this.playBlob(blob)));
  }
}
