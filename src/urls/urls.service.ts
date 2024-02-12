import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { UrlDto } from './dto/url.dto';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async add(urlDto: UrlDto): Promise<Url> {
    return await this.urlModel.create(urlDto);
  }

  async findAll(): Promise<Url[]> {
    return this.urlModel.find().exec();
  }

  async delete(urlDto: UrlDto): Promise<Url | null> {
    return await this.urlModel.findOneAndDelete(urlDto).exec();
  }
}
