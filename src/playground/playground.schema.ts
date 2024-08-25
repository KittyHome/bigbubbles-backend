import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

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

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  userIds: MongooseSchema.Types.ObjectId[];
}

export const PlaygroundSchema = SchemaFactory.createForClass(Playground);
