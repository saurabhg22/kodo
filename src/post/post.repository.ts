import { Injectable } from '@nestjs/common';
import * as posts from '../../db/posts.json';

@Injectable()
export class PostRepository {
    async getPosts() {
        return posts;
    }
}
