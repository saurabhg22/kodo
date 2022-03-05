import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';

describe('PostService', () => {
    let service: PostService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostService],
        }).compile();

        service = module.get<PostService>(PostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('getPosts should return posts', async () => {
        const { data, total } = await service.getPosts();
        expect(data).toBeDefined();
        expect(total).toBeDefined();
        expect(data).toBeInstanceOf(Array);
        expect(total).toBeInstanceOf(Number);
    });
});
