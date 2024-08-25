import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playground } from './playground.schema';
import { Model, Schema as MongooseSchema } from 'mongoose';
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
      userIds,
    } = createPlaygroundDto;

    const newPlayground = new this.playgroundModel({
      name,
      width,
      height,
      maxNoOfUsers,
      temperature,
      userIds,
    });
    return await newPlayground.save();
  }

  async getAll() {
    return await this.playgroundModel.find().exec();
  }

  async removeAll() {
    return await this.playgroundModel.deleteMany({});
  }

  async attend(playgroundId: string, userId: string) {
    const playground = await this.playgroundModel.findById(playgroundId).exec();
    if (!playground) {
      throw new NotFoundException('Playground not found');
    }

    const userObjectId = new MongooseSchema.Types.ObjectId(userId);

    if (
      !playground.userIds.some(
        (id) => id.toString() === userObjectId.toString(),
      )
    ) {
      playground.userIds.push(userObjectId);
      await playground.save();
    }

    return playground;
  }

  async leave(playgroundId: string, userId: string) {
    const playground = await this.playgroundModel.findById(playgroundId).exec();
    if (!playground) {
      throw new NotFoundException('Playground not found');
    }

    const userObjectId = new MongooseSchema.Types.ObjectId(userId);

    playground.userIds = playground.userIds.filter(
      (id) => id.toString() !== userObjectId.toString(),
    );
    await playground.save();

    return playground;
  }
}
