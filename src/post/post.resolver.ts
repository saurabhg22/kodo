import { Args, Query, Resolver } from '@nestjs/graphql';
import {
    SearchPostQueryDTO,
    SearchPostResponseDTO,
} from './dtos/search-post.dto';
import { Post } from './post.schema';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Query(() => SearchPostResponseDTO, { name: 'search' })
    async search(
        @Args('filter', { nullable: true })
        searchPostQueryDTO?: SearchPostQueryDTO,
    ) {
        const result = await this.postService.searchPosts(searchPostQueryDTO);

        return result;
    }
}
