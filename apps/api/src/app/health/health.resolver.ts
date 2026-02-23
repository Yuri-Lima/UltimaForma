import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String)
  health(): string {
    return 'ok';
  }

  @Query(() => String)
  ping(): string {
    return 'pong';
  }
}
