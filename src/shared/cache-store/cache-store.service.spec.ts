import { Test, TestingModule } from '@nestjs/testing';
import { CacheStoreService } from './cache-store.service';

describe('CacheStoreService', () => {
  let service: CacheStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheStoreService],
    }).compile();

    service = module.get<CacheStoreService>(CacheStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
