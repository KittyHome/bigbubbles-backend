import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playground } from './playground.schema';
import { Model } from 'mongoose';
import { CreatePlaygroundDto } from './dto/create-playground.dto';

@Injectable()
export class PlaygroundService {
  constructor(
    @InjectModel(Playground.name)
    private readonly playgroundModel: Model<Playground>,
  ) {}

  async create(createPlaygroundDto: CreatePlaygroundDto) {
    const {
      name,
      width = 100,
      height = 100,
      maxNoOfUsers = 100,
      temperature = 0.1,
    } = createPlaygroundDto;

    const newPlayground = new this.playgroundModel({
      name,
      width,
      height,
      maxNoOfUsers,
      temperature,
    });
    return await newPlayground.save();
  }

  async getAll() {
    return await this.playgroundModel.find().exec();
  }

  async removeAll() {
    return await this.playgroundModel.deleteMany({});
  }
}
