import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createDefaultCards } from 'src/card/card.factory';
import { CardService } from 'src/card/card.service';
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
    private readonly cardService: CardService,
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

    const seedCards = createDefaultCards();
    await this.cardService.removeAll();
    Promise.all(seedCards.map((seedCard) => this.cardService.create(seedCard)));

    const seedPlaygrounds = createDefaultPlaygrounds();
    await this.playgroundService.removeAll();
    Promise.all(
      seedPlaygrounds.map((seedPlayground) =>
        this.playgroundService.create(seedPlayground),
      ),
    );
  }
}
