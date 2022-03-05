import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { trim } from 'lodash';

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

    async searchPosts(query: string) {
        const posts = await this.getPosts();

        const isDoubleQuotes = query.startsWith('"') && query.endsWith('"');
        query = trim(query, '"');
        const queryRegex = new RegExp(query, isDoubleQuotes ? '' : 'i');

        const filteredPosts = posts.data.filter((post) => {
            if (post.name && post.name.match(queryRegex)) {
                return true;
            }
            if (post.description && post.description.match(queryRegex)) {
                return true;
            }
            return false;
        });

        return {
            data: filteredPosts,
            total: filteredPosts.length,
        };
    }
}
