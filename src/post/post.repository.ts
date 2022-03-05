import { Injectable } from '@nestjs/common';
import * as mock_posts from '../../db/posts.json';
import { Post } from './post.schema';

@Injectable()
export class PostRepository {
    private static posts: Array<Post> = [];

    constructor() {
        mock_posts.forEach((mock_post) => {
            PostRepository.posts.push({
                ...mock_post,
                dateLastEdited:
                    mock_post.dateLastEdited &&
                    new Date(mock_post.dateLastEdited),
            });
        });
    }
    async getPosts() {
        return PostRepository.posts;
    }
}
