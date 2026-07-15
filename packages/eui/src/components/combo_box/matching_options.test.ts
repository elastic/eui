/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiComboBoxOptionOption, EuiComboBoxOptionMatcher } from './types';
import {
  SortMatchesBy,
  flattenOptionGroups,
  getMatchingOptions,
  getSelectedOptionForSearchValue,
  createPartialStringEqualityOptionMatcher,
  splitByDelimiterAndNewlines,
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
    const got = getSelectedOptionForSearchValue({
      searchValue: 'saturn',
      selectedOptions: options,
    });
    // Assert
    expect(got).toMatchObject(expected);
  });
});

describe('getSelectedOptionForSearchValue', () => {
  test('returns undefined when no matching option found for search value', () => {
    // Act
    const got = getSelectedOptionForSearchValue({
      searchValue: 'Pluto',
      selectedOptions: options,
    });
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
    const got = getSelectedOptionForSearchValue({
      searchValue: 'saturn',
      selectedOptions: options,
    });
    // Assert
    expect(got).toMatchObject(expected);
  });
});

interface GetMatchingOptionsTestCase {
  expected: EuiComboBoxOptionOption[];
  isCaseSensitive: boolean;
  isPreFiltered: boolean;
  options: EuiComboBoxOptionOption[];
  searchValue: string;
  selectedOptions: EuiComboBoxOptionOption[];
  showPrevSelected: boolean;
  sortMatchesBy: SortMatchesBy;
  optionMatcher: EuiComboBoxOptionMatcher<unknown>;
}

const defaultOptionMatcher =
  createPartialStringEqualityOptionMatcher<unknown>();

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
    isCaseSensitive: false,
    isPreFiltered: false,
    showPrevSelected: false,
    expected: [],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
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
    isCaseSensitive: false,
    isPreFiltered: true,
    showPrevSelected: false,
    expected: [
      { 'data-test-subj': 'titanOption', label: 'Titan' },
      { label: 'Mimas' },
    ],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
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
    isCaseSensitive: false,
    isPreFiltered: false,
    showPrevSelected: true,
    expected: [{ 'data-test-subj': 'saturnOption', label: 'Saturn' }],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
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
    isCaseSensitive: false,
    isPreFiltered: true,
    showPrevSelected: true,
    expected: [
      { 'data-test-subj': 'titanOption', label: 'Titan' },
      { 'data-test-subj': 'saturnOption', label: 'Saturn' },
      { label: 'Mimas' },
    ],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
  },
  {
    options: [{ label: 'Titan' }, { label: 'Titan' }],
    selectedOptions: [
      {
        label: 'Titan',
      },
    ],
    searchValue: 'titan',
    isCaseSensitive: false,
    isPreFiltered: true,
    showPrevSelected: false,
    expected: [
      // Duplicate options without an key will be treated as the same option
    ],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
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
    isCaseSensitive: false,
    isPreFiltered: true,
    showPrevSelected: false,
    expected: [
      // Duplicate options with an key will be treated as different items
      { label: 'Titan', key: 'titan1' },
    ],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
  },
  // Case sensitivity
  {
    options,
    selectedOptions: [],
    searchValue: 'saturn',
    isCaseSensitive: false,
    isPreFiltered: false,
    showPrevSelected: false,
    expected: [
      {
        label: 'Saturn',
        'data-test-subj': 'saturnOption',
      },
    ],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
  },
  {
    options,
    selectedOptions: [],
    searchValue: 'saturn',
    isCaseSensitive: true,
    isPreFiltered: false,
    showPrevSelected: false,
    expected: [],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
  },
  {
    options,
    selectedOptions: [],
    searchValue: 'Saturn',
    isCaseSensitive: true,
    isPreFiltered: false,
    showPrevSelected: false,
    expected: [
      {
        label: 'Saturn',
        'data-test-subj': 'saturnOption',
      },
    ],
    sortMatchesBy: 'none',
    optionMatcher: defaultOptionMatcher,
  },
  {
    options,
    selectedOptions: [],
    searchValue: 'Titan',
    isCaseSensitive: false,
    isPreFiltered: false,
    showPrevSelected: false,
    expected: options,
    sortMatchesBy: 'none',
    optionMatcher: () => true,
  },
  {
    options,
    selectedOptions: [],
    searchValue: 'Titan',
    isCaseSensitive: false,
    isPreFiltered: false,
    showPrevSelected: false,
    expected: [],
    sortMatchesBy: 'none',
    optionMatcher: () => false,
  },
];

describe('getMatchingOptions', () => {
  test.each(testCases)(
    '.getMatchingOptions(%o)',
    (testCase: (typeof testCases)[number]) => {
      const { expected, ...rest } = testCase;
      expect(getMatchingOptions(rest)).toMatchObject(expected);
    }
  );
});

describe('splitByDelimiterAndNewlines', () => {
  it('splits on the configured delimiter', () => {
    expect(splitByDelimiterAndNewlines('a, b, c', ',')).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('splits on newlines even without the delimiter present', () => {
    expect(splitByDelimiterAndNewlines('a\nb\r\nc', ',')).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('splits on a mix of the delimiter and newlines', () => {
    expect(splitByDelimiterAndNewlines('a,\nb,\nc', ',')).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('trims whitespace and drops empty values', () => {
    expect(splitByDelimiterAndNewlines(' a ,  , b ,,c  ', ',')).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('deduplicates repeated values', () => {
    expect(splitByDelimiterAndNewlines('a, a, b, a', ',')).toEqual(['a', 'b']);
  });

  it('treats a single value with no separators as one value', () => {
    expect(splitByDelimiterAndNewlines('a', ',')).toEqual(['a']);
  });

  it('escapes regex-special delimiter characters', () => {
    expect(splitByDelimiterAndNewlines('a|b|c', '|')).toEqual(['a', 'b', 'c']);
  });
});
