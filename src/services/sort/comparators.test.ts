/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
    const dir = new Random().oneOf([SortDirection.ASC, SortDirection.DESC]);
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
  test('proper delegation to provided comparator', () => {
    const comparator = jest.fn();
    const propComparator = Comparators.property('name', comparator);
    propComparator({ name: 'n1' }, { name: 'n2' });
    expect(comparator.mock.calls.length).toBe(1);
    expect(comparator.mock.calls[0][0]).toBe('n1');
    expect(comparator.mock.calls[0][1]).toBe('n2');
  });

  test('resolving nested props', () => {
    const comparator = jest.fn();
    const propComparator = Comparators.property('person.name', comparator);
    propComparator({ person: { name: 'n1' } }, { person: { name: 'n2' } });
    expect(comparator.mock.calls.length).toBe(1);
    expect(comparator.mock.calls[0][0]).toBe('n1');
    expect(comparator.mock.calls[0][1]).toBe('n2');
  });
});

describe('default comparator', () => {
  test('null/undefined values are sorted to the end', () => {
    const sorted = [undefined, '7', 3, null, 5, undefined].sort(
      Comparators.default()
    );
    expect(sorted).toEqual([3, 5, '7', null, undefined, undefined]);
  });
});
