import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './post/post.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            debug: true,
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
        }),
        PostModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
