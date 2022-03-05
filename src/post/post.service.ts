import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(private readonly postRepo: PostRepository) {}

    async getPosts() {
        const posts = await this.postRepo.getPosts();

        return {
            data: posts,
            total: posts.length,
        };
    }
}
