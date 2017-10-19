'use strict';

var _sortable_properties = require('./sortable_properties');

describe('SortProperties', function () {
  var name = {
    name: 'name',
    getValue: function getValue(bird) {
      return bird.name;
    },
    isAscending: true
  };

  var size = {
    name: 'size',
    getValue: function getValue(bird) {
      return bird.size;
    },
    isAscending: false
  };

  var color = {
    name: 'color',
    getValue: function getValue(bird) {
      return bird.color;
    },
    isAscending: true
  };

  var birds = [{
    name: 'cardinal',
    color: 'red',
    size: 7
  }, {
    name: 'bluejay',
    color: 'blue',
    size: 8
  }, {
    name: 'chickadee',
    color: 'black and white',
    size: 3
  }];

  describe('initialSortProperty', function () {
    test('is set', function () {
      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'size');
      expect(sortableProperties.getSortedProperty().name).toBe('size');
    });

    test('throws an error with an invalid property name', function () {
      expect(function () {
        return new _sortable_properties.SortableProperties([name, size, color], 'does not exist');
      }).toThrow();
    });

    test('throws an error property name is not defined', function () {
      expect(function () {
        return new _sortable_properties.SortableProperties([name, size, color]);
      }).toThrow();
    });
  });

  describe('isAscendingByName', function () {
    test('returns initial ascending values', function () {
      var initialColorAscending = color.isAscending;
      var initialNameAscending = name.isAscending;
      var initialSizeAscending = size.isAscending;

      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'color');

      expect(sortableProperties.isAscendingByName('color')).toBe(initialColorAscending);
      expect(sortableProperties.isAscendingByName('name')).toBe(initialNameAscending);
      expect(sortableProperties.isAscendingByName('size')).toBe(initialSizeAscending);
    });
  });

  describe('sortOn', function () {
    test('a new property name retains the original sort order', function () {
      var initialColorAscending = color.isAscending;
      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'color');
      sortableProperties.sortOn('name');
      expect(sortableProperties.isAscendingByName('color')).toBe(initialColorAscending);
    });

    test('the same property name twice flips sort order', function () {
      var initialColorAscending = color.isAscending;
      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'color');
      sortableProperties.sortOn('color');
      expect(sortableProperties.isAscendingByName('color')).toBe(!initialColorAscending);
    });
  });

  describe('sortItems', function () {
    test('sorts by initialSortProperty', function () {
      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'name');
      var sortedItems = sortableProperties.sortItems(birds);
      expect(sortedItems.length).toBe(birds.length);
      expect(sortedItems[0].name).toBe('bluejay');
      expect(sortedItems[1].name).toBe('cardinal');
      expect(sortedItems[2].name).toBe('chickadee');
    });

    test('first sorts by initial isAscending value', function () {
      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'size');
      var sortedItems = sortableProperties.sortItems(birds);
      expect(sortedItems[0].size).toBe(8);
      expect(sortedItems[1].size).toBe(7);
      expect(sortedItems[2].size).toBe(3);
    });

    test('sorts by descending', function () {
      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'name');
      sortableProperties.sortOn('size');
      sortableProperties.sortOn('size');
      var sortedItems = sortableProperties.sortItems(birds);
      expect(sortedItems[0].size).toBe(3);
      expect(sortedItems[1].size).toBe(7);
      expect(sortedItems[2].size).toBe(8);
    });

    test('empty items array is a noop', function () {
      var sortableProperties = new _sortable_properties.SortableProperties([name, size, color], 'color');
      var sortedItems = sortableProperties.sortItems([]);
      expect(sortedItems.length).toBe(0);
    });
  });
});