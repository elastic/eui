/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Comparators, Primitive } from './comparators';

export interface SortableProperty<T> {
  name: string;
  getValue: (obj: T) => Primitive;
  isAscending: boolean;
}

/**
 * @typedef {Object} SortableProperty
 * @property {string} sortableProperty.name - Name of the property.
 * @property {function} sortableProperty.getValue - A function that takes in an object and returns a value to sort
 * by.
 * @property {boolean} sortableProperty.isAscending - The direction of the last sort by this property. Used to preserve
 * past sort orders.
 */

/**
 * Stores sort information for a set of SortableProperties, including which property is currently being sorted on, as
 * well as the last sort order for each property.
 */
export class SortableProperties<T> {
  sortableProperties: Array<SortableProperty<T>>;
  currentSortedProperty: SortableProperty<T>;

  /**
   * @param {Array<SortableProperty>} sortableProperties - a set of sortable properties.
   * @param {string} initialSortablePropertyName - Which sort property should be sorted on by default.
   */
  constructor(
    sortableProperties: Array<SortableProperty<T>>,
    initialSortablePropertyName: string
  ) {
    this.sortableProperties = sortableProperties;
    /**
     * The current property that is being sorted on.
     * @type {SortableProperty}
     */
    const currentSortedProperty = this.getSortablePropertyByName(
      initialSortablePropertyName
    );
    if (!currentSortedProperty) {
      throw new Error(
        `No property with the name ${initialSortablePropertyName}`
      );
    }

    this.currentSortedProperty = currentSortedProperty;
  }

  /**
   * @returns {SortableProperty} The current property that is being sorted on. Undefined if no sort order is applied.
   */
  getSortedProperty() {
    return this.currentSortedProperty;
  }

  /**
   * Sorts the items passed in and returns a newly sorted array.
   * @param items {Array.<Object>}
   * @returns {Array.<Object>} sorted array of items, based off the sort properties.
   */
  sortItems(items: T[]): T[] {
    const copy = [...items];
    let comparator = Comparators.value(this.getSortedProperty().getValue);
    if (!this.isCurrentSortAscending()) {
      comparator = Comparators.reverse(comparator);
    }
    copy.sort(comparator);
    return copy;
  }

  /**
   * Returns the SortProperty with the given name, if found.
   * @param {String} propertyName
   * @returns {SortableProperty|undefined}
   */
  getSortablePropertyByName(propertyName: string) {
    return this.sortableProperties.find(
      (property) => property.name === propertyName
    );
  }

  /**
   * Updates the sort property, potentially flipping the sort order based on whether the same
   * property was already being sorted.
   * @param propertyName {String}
   */
  sortOn(propertyName: string) {
    const newSortedProperty = this.getSortablePropertyByName(propertyName);
    if (!newSortedProperty) {
      throw new Error(`No property with the name ${propertyName}`);
    }
    const sortedProperty = this.getSortedProperty();
    if (sortedProperty.name === newSortedProperty.name) {
      this.flipCurrentSortOrder();
    } else {
      this.currentSortedProperty = newSortedProperty;
    }
  }

  /**
   * @returns {boolean} True if the current sortable property is sorted in ascending order.
   */
  isCurrentSortAscending() {
    const sortedProperty = this.getSortedProperty();
    return sortedProperty ? this.isAscendingByName(sortedProperty.name) : false;
  }

  /**
   * @param {string} propertyName
   * @returns {boolean} True if the given sort property is sorted in ascending order.
   */
  isAscendingByName(propertyName: string) {
    const sortedProperty = this.getSortablePropertyByName(propertyName);
    return sortedProperty ? sortedProperty.isAscending : false;
  }

  /**
   * Flips the current sorted property sort order.
   */
  flipCurrentSortOrder() {
    this.currentSortedProperty.isAscending = !this.currentSortedProperty
      .isAscending;
  }
}
