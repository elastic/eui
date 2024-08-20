/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiComboBoxOptionOption, EuiComboBoxOptionMatcher } from './types';

export type SortMatchesBy = 'none' | 'startsWith';
interface GetMatchingOptions<T> {
  options: Array<EuiComboBoxOptionOption<T>>;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
  searchValue: string;
  optionMatcher: EuiComboBoxOptionMatcher<T>;
  isCaseSensitive?: boolean;
  isPreFiltered?: boolean;
  showPrevSelected?: boolean;
  sortMatchesBy?: SortMatchesBy;
}
interface CollectMatchingOption<T>
  extends Pick<
    GetMatchingOptions<T>,
    | 'isCaseSensitive'
    | 'isPreFiltered'
    | 'showPrevSelected'
    | 'optionMatcher'
    | 'searchValue'
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
  searchValue,
  normalizedSearchValue,
  isCaseSensitive,
  isPreFiltered,
  showPrevSelected,
  optionMatcher,
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

  const isMatching = optionMatcher({
    option,
    searchValue,
    normalizedSearchValue,
    isCaseSensitive: isCaseSensitive ?? true,
  });
  if (isMatching) {
    accumulator.push(option);
  }
};

export const getMatchingOptions = <T>({
  options,
  selectedOptions,
  searchValue,
  optionMatcher,
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
          searchValue,
          normalizedSearchValue,
          isCaseSensitive,
          isPreFiltered,
          showPrevSelected,
          optionMatcher,
        });
      });
      if (matchingOptionsForGroup.length > 0) {
        // Add option for group label
        matchingOptions.push({
          key: option.key,
          label: option.label,
          isGroupLabelOption: true,
          append: option.append,
          prepend: option.prepend,
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
        searchValue,
        normalizedSearchValue,
        isCaseSensitive,
        isPreFiltered,
        showPrevSelected,
        optionMatcher,
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

/**
 * Partial string equality option matcher for EuiComboBox.
 * It matches all options with labels including the searched string.
 */
export const createPartialStringEqualityOptionMatcher = <
  TOption
>(): EuiComboBoxOptionMatcher<TOption> => {
  return ({ option, isCaseSensitive, normalizedSearchValue }) => {
    if (!normalizedSearchValue) {
      return true;
    }

    const normalizedOption = transformForCaseSensitivity(
      option.label.trim(),
      isCaseSensitive
    );

    return normalizedOption.includes(normalizedSearchValue);
  };
};
