import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from './post.repository';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

describe('PostResolver', () => {
    let resolver: PostResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostResolver, PostService, PostRepository],
        }).compile();

        resolver = module.get<PostResolver>(PostResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('search', () => {
        it('should return results with no query', async () => {
            const { results, total } = await resolver.search();
            expect(total).toBeDefined();
            expect(typeof total).toBe('number');

            expect(results).toBeDefined();
            expect(results).toBeInstanceOf(Array);

            expect(typeof results[0].name).toBe('string');
        });
    });
});
