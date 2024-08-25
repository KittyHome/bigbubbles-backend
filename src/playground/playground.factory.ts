import { CreatePlaygroundDto } from './dto/create-playground.dto';

export const createDefaultPlaygrounds = (): CreatePlaygroundDto[] => {
  return [
    { name: 'Greenfield' },
    {
      name: 'Volcano',
      width: 50,
      height: 50,
      maxNoOfUsers: 30,
      temperature: 0.05,
    },
  ];
};
