import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createDefaultColors } from 'src/colors/color.factory';
import { ColorsService } from 'src/colors/colors.service';
import { createDefaultPlaygrounds } from 'src/playground/playground.factory';
import { PlaygroundService } from 'src/playground/playground.service';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly colorsService: ColorsService,
    private readonly playgroundService: PlaygroundService,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const seedColors = createDefaultColors();
    await this.colorsService.removeAll();
    Promise.all(
      seedColors.map((seedColor) => this.colorsService.create(seedColor)),
    );

    const seedPlaygrounds = createDefaultPlaygrounds();
    await this.playgroundService.removeAll();
    Promise.all(
      seedPlaygrounds.map((seedPlayground) =>
        this.playgroundService.create(seedPlayground),
      ),
    );
  }
}
