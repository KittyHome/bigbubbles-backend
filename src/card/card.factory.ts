import { CreateCardDto } from './dto/create-card.dto';

export const createDefaultCards = (): CreateCardDto[] => {
  return [
    {
      name: 'hedgehog',
      description: 'Gives you a spiky boost of strength',
      price: 5,
      duration: 10,
    },
    {
      name: 'Rabbit',
      description: 'Hop to it! Run faster than ever!',
      price: 5,
      duration: 10,
    },
  ];
};
