import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card.schema';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const newCard = new this.cardModel(createCardDto);
    return await newCard.save();
  }

  async removeAll() {
    return await this.cardModel.deleteMany({});
  }
}
