import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE } from '@ultima-forma/shared';

export interface AiGenerationConfig {
  aiGenerationEnabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class AiGenerationConfigService {
  private readonly http = inject(HttpClient);

  readonly aiGenerationEnabled = signal<boolean>(false);

  async loadConfig(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.get<AiGenerationConfig>(`${API_BASE}/config`)
      );
      if (res?.aiGenerationEnabled !== undefined) {
        this.aiGenerationEnabled.set(res.aiGenerationEnabled);
      }
    } catch {
      this.aiGenerationEnabled.set(false);
    }
  }
}
