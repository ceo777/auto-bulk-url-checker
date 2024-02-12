import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './schemas/url.schema';
import { UrlsService } from './urls.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  providers: [UrlsService],
})
export class UrlsModule {}
