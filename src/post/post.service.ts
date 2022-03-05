import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { trim, sortBy } from 'lodash';
import {
    SearchPostQueryDTO,
    SearchPostResponseDTO,
} from './dtos/search-post.dto';

const DEFAULT_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 10;

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
        searchPostQueryDTO: SearchPostQueryDTO = {},
    ): Promise<SearchPostResponseDTO> {
        const {
            options: {
                sort,
                page = DEFAULT_PAGE,
                itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
            } = {
                page: DEFAULT_PAGE,
                itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
            },
        } = searchPostQueryDTO;

        let { query = '' } = searchPostQueryDTO;

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

        if (sort) {
            filteredPosts = sortBy(filteredPosts, sort);
        }
        filteredPosts = filteredPosts.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage,
        );

        return {
            results: filteredPosts,
            total: filteredPosts.length,
            page: page,
        };
    }
}
