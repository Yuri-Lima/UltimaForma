import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface RecordingSession {
  /** Emits the recorded blob when stop() is called. Errors if mic is denied or recording fails. */
  blob$: Observable<Blob>;
  /** Call to stop recording. After this, blob$ will emit the recorded audio. */
  stop: () => void;
}

@Injectable({ providedIn: 'root' })
export class VoiceRecorderService {
  /**
   * Starts recording from the user's microphone. Returns a session with blob$
   * and stop(). Call stop() when the user finishes speaking.
   */
  startRecording(): RecordingSession {
    const subject = new Subject<Blob>();
    let mediaRecorder: MediaRecorder | null = null;
    let stream: MediaStream | null = null;
    const chunks: Blob[] = [];

    const stop = () => {
      if (mediaRecorder?.state === 'recording') {
        mediaRecorder.stop();
      }
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        stream = s;
        const mimeType = MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4';
        mediaRecorder = new MediaRecorder(s);

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          stream?.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunks, { type: mimeType });
          subject.next(blob);
          subject.complete();
        };

        mediaRecorder.onerror = () => {
          stream?.getTracks().forEach((t) => t.stop());
          subject.error(new Error('Recording failed'));
        };

        mediaRecorder.start();
      })
      .catch((err) => subject.error(err));

    return { blob$: subject.asObservable(), stop };
  }
}
