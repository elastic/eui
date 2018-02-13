import { Comparators } from './comparators';
import { Random } from '../random';
import { SortDirection } from './sort_direction';

describe('comparators - default', () => {
  test('asc', () => {
    expect(Comparators.default(SortDirection.ASC)(5, 10)).toBeLessThan(0);
  });
  test('desc', () => {
    expect(Comparators.default(SortDirection.DESC)(5, 10)).toBeGreaterThan(0);
  });
  test('asc/desc when the two values equal', () => {
    const dir = new Random().oneOf(SortDirection.ASC, SortDirection.DESC);
    expect(Comparators.default(dir)(5, 5)).toBe(0);
  });
});

describe('comparators - reverse', () => {
  const comparator = jest.fn();
  test('proper delegation to provided comparator', () => {
    const reverseComparator = Comparators.reverse(comparator);
    reverseComparator('v1', 'v2');
    expect(comparator.mock.calls.length).toBe(1);
    expect(comparator.mock.calls[0][0]).toBe('v2');
    expect(comparator.mock.calls[0][1]).toBe('v1');
  });
});

describe('comparators - property', () => {
  const comparator = jest.fn();
  test('proper delegation to provided comparator', () => {
    const propComparator = Comparators.property('name', comparator);
    propComparator({ name: 'n1' }, { name: 'n2' });
    expect(comparator.mock.calls.length).toBe(1);
    expect(comparator.mock.calls[0][0]).toBe('n1');
    expect(comparator.mock.calls[0][1]).toBe('n2');
  });
});
