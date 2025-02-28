import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { App, AppSchema } from './app.schema';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),

    MongooseModule.forRoot('mongodb://db:27017/mydatabase'),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}