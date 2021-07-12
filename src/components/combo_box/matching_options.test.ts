/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiComboBoxOptionOption } from './types';
import {
  flattenOptionGroups,
  getMatchingOptions,
  getSelectedOptionForSearchValue,
} from './matching_options';

const options = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Saturn',
    'data-test-subj': 'saturnOption',
  },
  {
    label: 'Mimas',
  },
];

describe('flattenOptionGroups', () => {
  test('it flattens one level of options', () => {
    // Assemble
    const input = [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
      },
      {
        label: 'Enceladus',
        options: [
          {
            label: 'Saturn',
            'data-test-subj': 'saturnOption',
          },
        ],
      },
      {
        label: 'Mimas',
      },
    ];
    const expected = options;
    // Act
    const got = flattenOptionGroups(input);
    // Assert
    expect(got).toMatchObject(expected);
  });
});

describe('getSelectedOptionForSearchValue', () => {
  test('gets the first matching selected option for search value', () => {
    // Assemble
    const expected = {
      label: 'Saturn',
      'data-test-subj': 'saturnOption',
    };
    // Act
    const got = getSelectedOptionForSearchValue('saturn', options);
    // Assert
    expect(got).toMatchObject(expected);
  });
});

describe('getSelectedOptionForSearchValue', () => {
  test('returns undefined when no matching option found for search value', () => {
    // Act
    const got = getSelectedOptionForSearchValue('Pluto', options);
    // Assert
    expect(got).toBeUndefined();
  });
  test('gets the first matching selected option for search value', () => {
    // Assemble
    const expected = {
      label: 'Saturn',
      'data-test-subj': 'saturnOption',
    };
    // Act
    const got = getSelectedOptionForSearchValue('saturn', options);
    // Assert
    expect(got).toMatchObject(expected);
  });
});

interface GetMatchingOptionsTestCase {
  expected: EuiComboBoxOptionOption[];
  isPreFiltered: boolean;
  options: EuiComboBoxOptionOption[];
  searchValue: string;
  selectedOptions: EuiComboBoxOptionOption[];
  showPrevSelected: boolean;
  sortMatchesBy: string;
}

const testCases: GetMatchingOptionsTestCase[] = [
  {
    options,
    selectedOptions: [
      {
        label: 'Saturn',
        'data-test-subj': 'saturnOption',
      },
    ],
    searchValue: 'saturn',
    isPreFiltered: false,
    showPrevSelected: false,
    expected: [],
    sortMatchesBy: 'none',
  },
  {
    options,
    selectedOptions: [
      {
        label: 'Saturn',
        'data-test-subj': 'saturnOption',
      },
    ],
    searchValue: 'saturn',
    isPreFiltered: true,
    showPrevSelected: false,
    expected: [
      { 'data-test-subj': 'titanOption', label: 'Titan' },
      { label: 'Mimas' },
    ],
    sortMatchesBy: 'none',
  },
  {
    options,
    selectedOptions: [
      {
        label: 'Saturn',
        'data-test-subj': 'saturnOption',
      },
    ],
    searchValue: 'saturn',
    isPreFiltered: false,
    showPrevSelected: true,
    expected: [{ 'data-test-subj': 'saturnOption', label: 'Saturn' }],
    sortMatchesBy: 'none',
  },
  {
    options,
    selectedOptions: [
      {
        label: 'Saturn',
        'data-test-subj': 'saturnOption',
      },
    ],
    searchValue: 'saturn',
    isPreFiltered: true,
    showPrevSelected: true,
    expected: [
      { 'data-test-subj': 'titanOption', label: 'Titan' },
      { 'data-test-subj': 'saturnOption', label: 'Saturn' },
      { label: 'Mimas' },
    ],
    sortMatchesBy: 'none',
  },
  {
    options: [{ label: 'Titan' }, { label: 'Titan' }],
    selectedOptions: [
      {
        label: 'Titan',
      },
    ],
    searchValue: 'titan',
    isPreFiltered: true,
    showPrevSelected: false,
    expected: [
      // Duplicate options without an key will be treated as the same option
    ],
    sortMatchesBy: 'none',
  },
  {
    options: [
      { label: 'Titan', key: 'titan1' },
      { label: 'Titan', key: 'titan2' },
    ],
    selectedOptions: [
      {
        label: 'Titan',
        key: 'titan2',
      },
    ],
    searchValue: 'titan',
    isPreFiltered: true,
    showPrevSelected: false,
    expected: [
      // Duplicate options with an key will be treated as different items
      { label: 'Titan', key: 'titan1' },
    ],
    sortMatchesBy: 'none',
  },
];

describe('getMatchingOptions', () => {
  test.each(testCases)(
    '.getMatchingOptions(%o)',
    (testCase: typeof testCases[number]) => {
      expect(
        getMatchingOptions(
          testCase.options,
          testCase.selectedOptions,
          testCase.searchValue,
          testCase.isPreFiltered,
          testCase.showPrevSelected,
          testCase.sortMatchesBy
        )
      ).toMatchObject(testCase.expected);
    }
  );
});
