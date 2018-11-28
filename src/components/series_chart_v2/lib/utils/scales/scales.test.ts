import { createContinuousScale, createOrdinalScale, ScaleType } from './scales';

describe('Scale Test', () => {
  test('Create an ordinal scale', () => {
    const data = ['a', 'b', 'c', 'd', 'a', 'b', 'c'];
    const minRange = 0;
    const maxRange = 100;
    const ordinalScale = createOrdinalScale(data, minRange, maxRange);
    const { domain, range, bandwidth } = ordinalScale;
    expect(domain).toEqual(['a', 'b', 'c', 'd']);
    expect(range).toEqual([minRange, maxRange]);
    expect(bandwidth).toEqual(maxRange / domain.length);
    const scaledValue1 = ordinalScale.scale('a');
    expect(scaledValue1).toBe(0);
    const scaledValue2 = ordinalScale.scale('b');
    expect(scaledValue2).toBe(bandwidth);
    const scaledValue3 = ordinalScale.scale('c');
    expect(scaledValue3).toBe(bandwidth * 2);
    const scaledValue4 = ordinalScale.scale('d');
    expect(scaledValue4).toBe(bandwidth * 3);
  });
  test('Create an linear scale', () => {
    const data = [0, 10];
    const minRange = 0;
    const maxRange = 100;
    const linearScale = createContinuousScale(ScaleType.Linear, data, minRange, maxRange);
    const { domain, range } = linearScale;
    expect(domain).toEqual([0, 10]);
    expect(range).toEqual([minRange, maxRange]);
    const scaledValue1 = linearScale.scale(0);
    expect(scaledValue1).toBe(0);
    const scaledValue2 = linearScale.scale(1);
    expect(scaledValue2).toBe(10);
    const scaledValue3 = linearScale.scale(5);
    expect(scaledValue3).toBe(50);
    const scaledValue4 = linearScale.scale(10);
    expect(scaledValue4).toBe(100);
  });
  test('Create an log scale', () => {
    const data = [1, 10];
    const minRange = 0;
    const maxRange = 100;
    const logScale = createContinuousScale(ScaleType.Log, data, minRange, maxRange);
    const { domain, range } = logScale;
    expect(domain).toEqual([1, 10]);
    expect(range).toEqual([minRange, maxRange]);
    const scaledValue1 = logScale.scale(1);
    expect(scaledValue1).toBe(0);
    const scaledValue3 = logScale.scale(5);
    expect(scaledValue3).toBe(Math.log(5) / Math.log(10) * 100);
  });
  test('Create an sqrt scale', () => {
    const data = [0, 10];
    const minRange = 0;
    const maxRange = 100;
    const sqrtScale = createContinuousScale(ScaleType.Sqrt, data, minRange, maxRange);
    const { domain, range } = sqrtScale;
    expect(domain).toEqual([0, 10]);
    expect(range).toEqual([minRange, maxRange]);
    const scaledValue1 = sqrtScale.scale(0);
    expect(scaledValue1).toBe(0);
    const scaledValue3 = sqrtScale.scale(5);
    expect(scaledValue3).toBe(Math.sqrt(5) / Math.sqrt(10) * 100);
  });
});
