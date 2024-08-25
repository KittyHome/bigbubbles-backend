import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
