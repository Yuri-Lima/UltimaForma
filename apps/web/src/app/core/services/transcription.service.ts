import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE, mapI18nToMlLang } from '@ultima-forma/shared';

export interface TranscribeResponse {
  text: string;
}

@Injectable({ providedIn: 'root' })
export class TranscriptionService {
  constructor(private http: HttpClient) {}

  transcribe(blob: Blob, lang?: string): Observable<TranscribeResponse> {
    const language = mapI18nToMlLang(lang ?? 'en');
    const formData = new FormData();
    formData.append('audio', blob, 'recording.webm');
    formData.append('language', language);

    return this.http.post<TranscribeResponse>(
      `${API_BASE}/transcription/transcribe`,
      formData
    );
  }
}
