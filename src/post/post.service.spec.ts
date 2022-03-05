import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

describe('PostService', () => {
    let service: PostService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostService, PostRepository],
        }).compile();

        service = module.get<PostService>(PostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getPosts', () => {
        it('getPosts should return posts', async () => {
            const { data, total } = await service.getPosts();
            expect(total).toBeDefined();
            expect(typeof total).toBe('number');

            expect(data).toBeDefined();
            expect(data).toBeInstanceOf(Array);
        });

        it('getPosts should return at-least one post on empty query', async () => {
            const { data, total } = await service.getPosts();
            expect(total).toBeGreaterThan(0);

            expect(data[0]).toBeDefined();
        });
    });
});
