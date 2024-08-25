import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ColorSchema } from './colors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
  ],
  providers: [ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}
