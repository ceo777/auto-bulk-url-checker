import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { AddUrlDto } from './dto/add-url.dto';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async add(addUrlDto: AddUrlDto): Promise<Url> {
    return await this.urlModel.create(addUrlDto);
  }

  async findAll(): Promise<Url[]> {
    return this.urlModel.find().exec();
  }

  async delete(addUrlDto: AddUrlDto): Promise<Url | null> {
    return await this.urlModel.findOneAndDelete(addUrlDto).exec();
  }
}
