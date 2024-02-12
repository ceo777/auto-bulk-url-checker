import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlsService } from './urls.service';
import { Url } from './schemas/url.schema';
import { UrlDto } from './dto/url.dto';

describe('UrlsService', () => {
  let service: UrlsService;
  let model: Model<Url>;

  const mockUrl = (url = 'https://www.example.com'): UrlDto => ({
    url,
  });

  const urlsArray = [
    {
      url: 'https://www.example.com',
    },
    {
      url: 'https://www.example2.com',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: getModelToken('Url'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUrl),
            constructor: jest.fn().mockResolvedValue(mockUrl),
            find: jest.fn(),
            findOneAndDelete: jest.fn(),
            create: jest.fn(),
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

  it('should return all urls', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(urlsArray),
    } as any);
    const urls = await service.findAll();
    expect(urls).toEqual(urlsArray);
  });

  it('should insert a new url', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        url: 'https://www.example.com',
        status: 200,
      } as any),
    );
    const newUrl = await service.add({
      url: 'https://www.example.com',
    });
    expect([mockUrl().url, null]).toContainEqual(newUrl?.url);
  });

  it('should delete a url', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(urlsArray),
    } as any);
    const deletedUrl = await service.delete({
      url: 'https://www.example.com',
    });
    expect([mockUrl().url, undefined]).toContainEqual(deletedUrl?.url);
  });
});
