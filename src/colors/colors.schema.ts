import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Color extends Document {
  @Prop({ required: true })
  color: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  price: number;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
