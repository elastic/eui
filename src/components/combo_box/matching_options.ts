/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiComboBoxOptionOption } from './types';

export type SortMatchesBy = 'none' | 'startsWith';
interface GetMatchingOptions<T> {
  options: Array<EuiComboBoxOptionOption<T>>;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
  searchValue: string;
  isCaseSensitive?: boolean;
  isPreFiltered?: boolean;
  showPrevSelected?: boolean;
  sortMatchesBy?: SortMatchesBy;
}
interface CollectMatchingOption<T>
  extends Pick<
    GetMatchingOptions<T>,
    'isCaseSensitive' | 'isPreFiltered' | 'showPrevSelected'
  > {
  accumulator: Array<EuiComboBoxOptionOption<T>>;
  option: EuiComboBoxOptionOption<T>;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
  normalizedSearchValue: string;
}
interface GetSelectedOptionForSearchValue<T>
  extends Pick<
    GetMatchingOptions<T>,
    'isCaseSensitive' | 'searchValue' | 'selectedOptions'
  > {
  optionKey?: string;
}

export const transformForCaseSensitivity = (
  string: string,
  isCaseSensitive?: boolean
) => (isCaseSensitive ? string : string.toLowerCase());

export const flattenOptionGroups = <T>(
  optionsOrGroups: Array<EuiComboBoxOptionOption<T>>
) => {
  return optionsOrGroups.reduce(
    (
      options: Array<EuiComboBoxOptionOption<T>>,
      optionOrGroup: EuiComboBoxOptionOption<T>
    ) => {
      if (optionOrGroup.options) {
        options = options.concat(optionOrGroup.options);
      } else {
        options.push(optionOrGroup);
      }
      return options;
    },
    []
  );
};

export const getSelectedOptionForSearchValue = <T>({
  isCaseSensitive,
  searchValue,
  selectedOptions,
  optionKey,
}: GetSelectedOptionForSearchValue<T>) => {
  const normalizedSearchValue = transformForCaseSensitivity(
    searchValue,
    isCaseSensitive
  );
  return selectedOptions.find((option) => {
    const normalizedOption = transformForCaseSensitivity(
      option.label,
      isCaseSensitive
    );
    return (
      normalizedOption === normalizedSearchValue &&
      (!optionKey || option.key === optionKey)
    );
  });
};

const collectMatchingOption = <T>({
  accumulator,
  option,
  selectedOptions,
  normalizedSearchValue,
  isCaseSensitive,
  isPreFiltered,
  showPrevSelected,
}: CollectMatchingOption<T>) => {
  // Only show options which haven't yet been selected unless requested.
  const selectedOption = getSelectedOptionForSearchValue({
    isCaseSensitive,
    searchValue: option.label,
    selectedOptions,
    optionKey: option.key,
  });
  if (selectedOption && !showPrevSelected) {
    return false;
  }

  // If the options have already been pre-filtered then we can skip filtering against the search value.
  if (isPreFiltered) {
    accumulator.push(option);
    return;
  }

  if (!normalizedSearchValue) {
    accumulator.push(option);
    return;
  }

  const normalizedOption = transformForCaseSensitivity(
    option.label.trim(),
    isCaseSensitive
  );
  if (normalizedOption.includes(normalizedSearchValue)) {
    accumulator.push(option);
  }
};

export const getMatchingOptions = <T>({
  options,
  selectedOptions,
  searchValue,
  isCaseSensitive = false,
  isPreFiltered = false,
  showPrevSelected = false,
  sortMatchesBy = 'none',
}: GetMatchingOptions<T>) => {
  const normalizedSearchValue = transformForCaseSensitivity(
    searchValue.trim(),
    isCaseSensitive
  );
  let matchingOptions: Array<EuiComboBoxOptionOption<T>> = [];

  options.forEach((option) => {
    if (option.options) {
      const matchingOptionsForGroup: Array<EuiComboBoxOptionOption<T>> = [];
      option.options.forEach((groupOption: EuiComboBoxOptionOption<T>) => {
        collectMatchingOption({
          accumulator: matchingOptionsForGroup,
          option: groupOption,
          selectedOptions,
          normalizedSearchValue,
          isCaseSensitive,
          isPreFiltered,
          showPrevSelected,
        });
      });
      if (matchingOptionsForGroup.length > 0) {
        // Add option for group label
        matchingOptions.push({
          key: option.key,
          label: option.label,
          isGroupLabelOption: true,
        });
        // Add matching options for group
        // use concat over spreading to support large arrays - https://mathiasbynens.be/demo/javascript-argument-count
        matchingOptions = matchingOptions.concat(matchingOptionsForGroup);
      }
    } else {
      collectMatchingOption({
        accumulator: matchingOptions,
        option,
        selectedOptions,
        normalizedSearchValue,
        isCaseSensitive,
        isPreFiltered,
        showPrevSelected,
      });
    }
  });

  if (sortMatchesBy === 'startsWith') {
    const refObj: {
      startWith: Array<EuiComboBoxOptionOption<T>>;
      others: Array<EuiComboBoxOptionOption<T>>;
    } = { startWith: [], others: [] };

    matchingOptions.forEach((object) => {
      const normalizedLabel = transformForCaseSensitivity(
        object.label,
        isCaseSensitive
      );
      if (normalizedLabel.startsWith(normalizedSearchValue)) {
        refObj.startWith.push(object);
      } else {
        refObj.others.push(object);
      }
    });
    return [...refObj.startWith, ...refObj.others];
  }

  return matchingOptions;
};
