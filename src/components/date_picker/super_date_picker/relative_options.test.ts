import { relativeUnitsFromLargestToSmallest } from './relative_options';

describe('relativeUnitsFromLargestToSmallest', () => {
  test('relativeUnitsFromLargestToSmallest length', () => {
    expect(relativeUnitsFromLargestToSmallest.length).toBe(7);
  });
  test('relativeUnitsFromLargestToSmallest order', () => {
    expect(relativeUnitsFromLargestToSmallest).toEqual([
      'y',
      'M',
      'w',
      'd',
      'h',
      'm',
      's',
    ]);
  });
});
