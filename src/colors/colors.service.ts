import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Color } from './colors.schema';
import { Model } from 'mongoose';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel(Color.name)
    private readonly colorModel: Model<Color>,
  ) {}

  async create(createColorDto: CreateColorDto) {
    const newColor = new this.colorModel(createColorDto);
    return await newColor.save();
  }

  async removeAll() {
    return await this.colorModel.deleteMany({});
  }
}
