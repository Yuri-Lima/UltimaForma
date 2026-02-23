import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsController {
  @MessagePattern('events.health')
  handleHealth(@Payload() data: unknown) {
    return { status: 'ok', received: data, timestamp: new Date().toISOString() };
  }
}
