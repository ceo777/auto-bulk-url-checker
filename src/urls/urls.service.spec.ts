import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlsService } from './urls.service';
import { Url } from './schemas/url.schema';

describe('UrlsService', () => {
  let service: UrlsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<Url>;

  const mockUrl = (url = 'https://www.google.com', status = 200): Url => ({
    url,
    status,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: getModelToken('Url'),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockUrl),
            constructor: jest.fn().mockResolvedValue(mockUrl),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
    model = module.get<Model<Url>>(getModelToken('Url'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
  it('should insert a new cat', async () => {
    const newCat = await service.add({
      url: 'https://www.google.com',
    });
    expect(newCat).toEqual(mockUrl('https://www.google.com', 0));
  });
   */
});
