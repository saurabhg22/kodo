import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { trim, sortBy } from 'lodash';

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

    async searchPosts(
        query: string,
        options: { sort?: 'name' | 'dateLastEdited' } = {},
    ) {
        const posts = await this.getPosts();

        const isDoubleQuotes = query.startsWith('"') && query.endsWith('"');
        query = trim(query, '"');
        const queryRegex = new RegExp(query, isDoubleQuotes ? '' : 'i');

        let filteredPosts = posts.data.filter((post) => {
            if (post.name && post.name.match(queryRegex)) {
                return true;
            }
            if (post.description && post.description.match(queryRegex)) {
                return true;
            }
            return false;
        });

        if (options.sort) {
            filteredPosts = sortBy(filteredPosts, options.sort);
        }

        return {
            data: filteredPosts,
            total: filteredPosts.length,
        };
    }
}
