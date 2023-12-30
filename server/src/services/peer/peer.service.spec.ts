import { Test, TestingModule } from '@nestjs/testing';
import { PeerService } from './peer.service';

describe('PeerService', () => {
  let service: PeerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeerService],
    }).compile();

    service = module.get<PeerService>(PeerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
