/**
 * File-type detection using the file-type package.
 * Used by AudioValidationService for content-based MIME detection.
 */

import { Injectable } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';
import { abortAsPromise } from '../common/utils/abort-promise';

@Injectable()
export class FileTypeDetectionService {
  /**
   * Detects file type from buffer using magic bytes.
   *
   * @param input - Buffer or Uint8Array
   * @param options - Optional AbortSignal for cancellation
   * @returns { ext, mime } or undefined if not detectable
   */
  async detect(
    input: Buffer | Uint8Array,
    options?: { signal?: AbortSignal }
  ): Promise<{ ext: string; mime: string } | undefined> {
    const buffer = input instanceof Buffer ? input : Buffer.from(input);

    let detectPromise = fileTypeFromBuffer(buffer);
    if (options?.signal) {
      detectPromise = Promise.race([
        detectPromise,
        abortAsPromise(options.signal),
      ]) as Promise<Awaited<ReturnType<typeof fileTypeFromBuffer>>>;
    }
    const result = await detectPromise;
    if (result) {
      return { ext: result.ext, mime: result.mime };
    }
    return undefined;
  }
}
