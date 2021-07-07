/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { SortableProperty, SortableProperties } from './sortable_properties';

interface Bird {
  name: string;
  color: string;
  size: number;
}

describe('SortProperties', () => {
  const name: SortableProperty<Bird> = {
    name: 'name',
    getValue: (bird) => bird.name,
    isAscending: true,
  };

  const size: SortableProperty<Bird> = {
    name: 'size',
    getValue: (bird) => bird.size,
    isAscending: false,
  };

  const color: SortableProperty<Bird> = {
    name: 'color',
    getValue: (bird) => bird.color,
    isAscending: true,
  };

  const birds: Bird[] = [
    {
      name: 'cardinal',
      color: 'red',
      size: 7,
    },
    {
      name: 'bluejay',
      color: 'blue',
      size: 8,
    },
    {
      name: 'chickadee',
      color: 'black and white',
      size: 3,
    },
  ];

  describe('initialSortProperty', () => {
    test('is set', () => {
      const sortableProperties = new SortableProperties(
        [name, size, color],
        'size'
      );
      expect(sortableProperties.getSortedProperty().name).toBe('size');
    });

    test('throws an error with an invalid property name', () => {
      expect(
        () => new SortableProperties([name, size, color], 'does not exist')
      ).toThrow();
    });

    test('throws an error property name is not defined', () => {
      // @ts-ignore second param is mandatory
      expect(() => new SortableProperties([name, size, color])).toThrow();
    });
  });

  describe('isAscendingByName', () => {
    test('returns initial ascending values', () => {
      const initialColorAscending = color.isAscending;
      const initialNameAscending = name.isAscending;
      const initialSizeAscending = size.isAscending;

      const sortableProperties = new SortableProperties(
        [name, size, color],
        'color'
      );

      expect(sortableProperties.isAscendingByName('color')).toBe(
        initialColorAscending
      );
      expect(sortableProperties.isAscendingByName('name')).toBe(
        initialNameAscending
      );
      expect(sortableProperties.isAscendingByName('size')).toBe(
        initialSizeAscending
      );
    });
  });

  describe('sortOn', () => {
    test('a new property name retains the original sort order', () => {
      const initialColorAscending = color.isAscending;
      const sortableProperties = new SortableProperties(
        [name, size, color],
        'color'
      );
      sortableProperties.sortOn('name');
      expect(sortableProperties.isAscendingByName('color')).toBe(
        initialColorAscending
      );
    });

    test('the same property name twice flips sort order', () => {
      const initialColorAscending = color.isAscending;
      const sortableProperties = new SortableProperties(
        [name, size, color],
        'color'
      );
      sortableProperties.sortOn('color');
      expect(sortableProperties.isAscendingByName('color')).toBe(
        !initialColorAscending
      );
    });
  });

  describe('sortItems', () => {
    test('sorts by initialSortProperty', () => {
      const sortableProperties = new SortableProperties(
        [name, size, color],
        'name'
      );
      const sortedItems = sortableProperties.sortItems(birds);
      expect(sortedItems.length).toBe(birds.length);
      expect(sortedItems[0].name).toBe('bluejay');
      expect(sortedItems[1].name).toBe('cardinal');
      expect(sortedItems[2].name).toBe('chickadee');
    });

    test('first sorts by initial isAscending value', () => {
      const sortableProperties = new SortableProperties(
        [name, size, color],
        'size'
      );
      const sortedItems = sortableProperties.sortItems(birds);
      expect(sortedItems[0].size).toBe(8);
      expect(sortedItems[1].size).toBe(7);
      expect(sortedItems[2].size).toBe(3);
    });

    test('sorts by descending', () => {
      const sortableProperties = new SortableProperties(
        [name, size, color],
        'name'
      );
      sortableProperties.sortOn('size');
      sortableProperties.sortOn('size');
      const sortedItems = sortableProperties.sortItems(birds);
      expect(sortedItems[0].size).toBe(3);
      expect(sortedItems[1].size).toBe(7);
      expect(sortedItems[2].size).toBe(8);
    });

    test('empty items array is a noop', () => {
      const sortableProperties = new SortableProperties(
        [name, size, color],
        'color'
      );
      const sortedItems = sortableProperties.sortItems([]);
      expect(sortedItems.length).toBe(0);
    });
  });
});
