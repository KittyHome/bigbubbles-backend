import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const newProfile = await this.profileModel.create(createProfileDto);
    return await newProfile.save();
  }
}
