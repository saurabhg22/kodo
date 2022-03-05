import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    async getPosts() {
        return { total: 0, data: [] };
    }
}
