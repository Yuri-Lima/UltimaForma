import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ method: string; url: string }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else {
        const r = res as Record<string, unknown>;
        const msg = r.message;
        message = Array.isArray(msg)
          ? msg.join('; ')
          : (msg?.toString() ?? r.error?.toString() ?? message);
        error = r.error as string | undefined;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      if (process.env.NODE_ENV !== 'production') {
        error = exception.stack;
      }
    }

    this.logger.warn(
      `HTTP ${status} ${request.method} ${request.url}: ${message}`
    );

    const body: ErrorResponse = {
      statusCode: status,
      message,
      ...(error && process.env.NODE_ENV !== 'production' && { error }),
    };

    response.status(status).json(body);
  }
}
