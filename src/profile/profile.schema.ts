import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Color' })
  colorId: MongooseSchema.Types.ObjectId;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Card' })
  cardIds: MongooseSchema.Types.ObjectId[];

  @Prop()
  saltsAmount: number;

  @Prop()
  waterAmount: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
