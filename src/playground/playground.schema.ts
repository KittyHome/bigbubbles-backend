import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Playground extends Document {
  @Prop()
  name: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  maxNoOfUsers: number;

  @Prop()
  temperature: number;
}

export const PlaygroundSchema = SchemaFactory.createForClass(Playground);
