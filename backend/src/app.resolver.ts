import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppService } from './app.service';
import { App } from './app.schema';

@Resolver(() => App)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => [App])
  async findAll() {
    return this.appService.findAll();
  }

  @Mutation(() => App)
  async createApp(
    @Args('name') name: string,
    @Args('email') email: string,
  ) {
    return this.appService.createApp(name, email);
  }
}
