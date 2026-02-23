import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('tasks')
export class TasksProcessor extends WorkerHost {
  private readonly logger = new Logger(TasksProcessor.name);

  override async process(job: Job<unknown, unknown, string>): Promise<unknown> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    switch (job.name) {
      case 'example':
        return this.handleExample(job);
      default:
        this.logger.warn(`Unknown job type: ${job.name}`);
        return { processed: false };
    }
  }

  private async handleExample(job: Job): Promise<unknown> {
    const data = job.data;
    this.logger.log(`Example job data: ${JSON.stringify(data)}`);
    return { processed: true, jobId: job.id };
  }
}
