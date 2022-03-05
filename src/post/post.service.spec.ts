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

    describe('searchPosts', () => {
        it('searchPosts should take an input text and return posts', async () => {
            const { data, total } = await service.searchPosts('the king');

            expect(total).toBeDefined();
            expect(typeof total).toBe('number');

            expect(data).toBeDefined();
            expect(data).toBeInstanceOf(Array);
        });

        it('searchPosts should only return items with exact match when query has double quotes', async () => {
            const { data } = await service.searchPosts('"the King"');

            for (const post of data) {
                expect(
                    (post.name + post.description).includes('the King'),
                ).toBeTruthy();
            }
        });

        it('searchPosts should sort with name', async () => {
            const { data } = await service.searchPosts('the', { sort: 'name' });

            for (let i = 0; i < data.length - 1; i++) {
                expect(data[i].name < data[i + 1].name).toBeTruthy();
            }
        });

        it('searchPosts should sort with name', async () => {
            const { data } = await service.searchPosts('the', { sort: 'name' });

            for (let i = 0; i < data.length - 1; i++) {
                expect(data[i].name < data[i + 1].name).toBeTruthy();
            }
        });
    });
});
