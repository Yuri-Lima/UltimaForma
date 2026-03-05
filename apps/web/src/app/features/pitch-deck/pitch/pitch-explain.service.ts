import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { PitchSectionId } from '@ultima-forma/shared';
import { API_BASE } from '@ultima-forma/shared';

export interface ExplainSectionResponse {
  explanation: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class PitchExplainService {
  constructor(private http: HttpClient) {}

  explainSection(sectionId: PitchSectionId, lang?: string): Observable<ExplainSectionResponse> {
    return this.http.post<ExplainSectionResponse>(
      `${API_BASE}/pitch/explain-section`,
      { sectionId, lang }
    );
  }

  askFollowUp(
    sectionId: PitchSectionId,
    userMessage: string,
    conversationHistory?: ConversationMessage[],
    lang?: string
  ): Observable<ExplainSectionResponse> {
    return this.http.post<ExplainSectionResponse>(
      `${API_BASE}/pitch/ask-follow-up`,
      { sectionId, userMessage, conversationHistory, lang }
    );
  }
}
