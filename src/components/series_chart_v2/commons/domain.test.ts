import { ScaleType } from '../commons/scales';
import { computeDataDomain } from './domain';

const TEST_DATASET_1 = [
  { group: 'a', stack: 'a', x: 1, y: 10 },
  { group: 'a', stack: 'b', x: 2, y: 20 },
  { group: 'a', stack: 'a', x: 3, y: 30 },
  { group: 'a', stack: 'b', x: 4, y: 5 },
  { group: 'a', stack: 'b', x: 4, y: 10 },
  { group: 'b', stack: 'c', x: 4, y: 10 },
];

describe('Domain Utils', () => {
  test('Compute linear domain', () => {
    const accessor = (d: any) => d.x;
    const domain = computeDataDomain(TEST_DATASET_1, accessor, ScaleType.Linear);
    const expectedDomain = [1, 4];
    expect(domain).toEqual(expectedDomain);
  });
  test('Compute ordinal domain', () => {
    const accessor = (d: any) => d.stack;
    const domain = computeDataDomain(TEST_DATASET_1, accessor, ScaleType.Ordinal);
    const expectedDomain = ['a', 'b', 'c'];
    expect(domain).toEqual(expectedDomain);
  });
  test('Compute linear domain with ordinal elements', () => {
    const accessor = (d: any) => d.stack;
    const domain = computeDataDomain(TEST_DATASET_1, accessor, ScaleType.Linear);
    const expectedDomain = ['a', 'c'];
    expect(domain).toEqual(expectedDomain);
  });
});
