import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
    providers: [PostRepository, PostService],
})
export class PostModule {}
