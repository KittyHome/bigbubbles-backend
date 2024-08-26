import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playground } from './playground.schema';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { CacheService } from 'src/cache/cache.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class PlaygroundService {
  constructor(
    @InjectModel(Playground.name)
    private readonly playgroundModel: Model<Playground>,
    private readonly cacheService: CacheService,
    private readonly profileService: ProfileService,
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

  async attend(
    playgroundId: string,
    userId: string,
    waterAmount: number,
    saltsAmount: number,
  ) {
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
      // Initialize user information if it doesn't exist for the user in this playground
      await this.initUserInfo(playground, userId, waterAmount, saltsAmount);

      playground.userIds.push(userObjectId);
      await playground.save();
    }
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

    // Remove user information from cache
    await this.removeUserInfo(userId);
  }

  async getUserInfo(userId: string) {
    const userInfo = await this.cacheService.get(userId);
    if (!userInfo) {
      throw new NotFoundException('User position not found');
    }
    return JSON.parse(userInfo) as UserInfoDto;
  }

  async setUserInfo(userId: string, userInfo: UserInfoDto) {
    await this.cacheService.set(userId, JSON.stringify(userInfo));
  }

  async removeUserInfo(userId: string) {
    const profile = await this.profileService.get(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const userInfo = await this.getUserInfo(userId);
    const { waterAmount, saltsAmount } = userInfo;

    await this.profileService.update(userId, {
      waterAmount: profile.waterAmount + waterAmount,
      saltsAmount: profile.saltsAmount + saltsAmount,
    });

    await this.cacheService.remove(userId);
  }

  async initUserInfo(
    playground: Playground,
    userId: string,
    waterAmount: number,
    saltsAmount: number,
  ) {
    if (!playground) {
      throw new NotFoundException('Playground not found');
    }

    const profile = await this.profileService.get(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (
      profile.waterAmount < waterAmount ||
      profile.saltsAmount < saltsAmount
    ) {
      throw new BadRequestException('Not enough water or salts');
    }

    await this.profileService.update(userId, {
      waterAmount: profile.waterAmount - waterAmount,
      saltsAmount: profile.saltsAmount - saltsAmount,
    });

    await this.setUserInfo(userId, {
      waterAmount,
      saltsAmount,
      position: {
        x: Math.floor(Math.random() * playground.width),
        y: Math.floor(Math.random() * playground.height),
      },
    });
  }
}
