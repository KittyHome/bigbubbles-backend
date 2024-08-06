import { Color } from './colors.schema';

export const createDefaultColors = (): Partial<Color>[] => {
  return [
    { color: 'Red', code: '#FF0000', price: 0 },
    { color: 'Green', code: '#00FF00', price: 15 },
    { color: 'Blue', code: '#0000FF', price: 20 },
  ];
};
