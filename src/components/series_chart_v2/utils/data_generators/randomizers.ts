import { randomUniform } from 'd3-random';

export function randomizeData(
  data: any[],
  randomizedFields: string[],
  randomizer: (value: number) => number,
  allowNegative?: boolean,
) {
  return data.map((datum: any) => {
    const randomizedData = randomizedFields.reduce((acc: any, randomizedField) => {
      const value = randomizer(datum[randomizedField]);
      acc[randomizedField] = allowNegative ? value : Math.abs(value);
      return acc;
    }, {});
    return {
      ...datum,
      ...randomizedData,
    };
  });
}

export const uniformRandomizer = (amplitude: number) => (value: number) => {
  return value + randomUniform(- amplitude / 2, amplitude / 2)();
};
