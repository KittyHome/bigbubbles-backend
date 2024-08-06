import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDefaultColors } from 'src/colors/color.factory';
import { Color } from 'src/colors/colors.schema';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(Color.name) private readonly colorModel: Model<Color>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const seedColors = createDefaultColors();

    try {
      // Clear existing data
      await this.colorModel.deleteMany({});
      this.logger.log('Existing data cleared.');

      // Insert seed data
      await this.colorModel.insertMany(seedColors);
      this.logger.log('Seed data inserted.');
    } catch (error) {
      this.logger.error('Error seeding data:', error);
    }
  }
}
