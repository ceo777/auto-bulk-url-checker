import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop()
  url!: string;

  @Prop()
  status!: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
