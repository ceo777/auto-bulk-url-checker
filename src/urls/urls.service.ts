import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { UrlDto } from './dto/url.dto';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async add(urlDto: UrlDto): Promise<Url | null> {
    return this.urlModel.create(urlDto);
    // return Model.findOneAndUpdate(urlDto, urlDto, { upsert: true, new: true });
  }

  async findAll(): Promise<UrlDto[]> {
    return this.urlModel.find({}, 'url').exec();
  }

  async delete(urlDto: UrlDto): Promise<Url | null> {
    return this.urlModel.findOneAndDelete(urlDto);
  }
}
