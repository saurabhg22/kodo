import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
    providers: [PostRepository, PostService, PostResolver],
})
export class PostModule {}
