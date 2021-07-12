/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiComboBoxOptionOption } from './types';

export const flattenOptionGroups = <T>(
  optionsOrGroups: Array<EuiComboBoxOptionOption<T>>
) => {
  return optionsOrGroups.reduce(
    (
      options: Array<EuiComboBoxOptionOption<T>>,
      optionOrGroup: EuiComboBoxOptionOption<T>
    ) => {
      if (optionOrGroup.options) {
        options.push(...optionOrGroup.options);
      } else {
        options.push(optionOrGroup);
      }
      return options;
    },
    []
  );
};

export const getSelectedOptionForSearchValue = <T>(
  searchValue: string,
  selectedOptions: Array<EuiComboBoxOptionOption<T>>,
  optionKey?: string
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(
    (option) =>
      option.label.toLowerCase() === normalizedSearchValue &&
      (!optionKey || option.key === optionKey)
  );
};

const collectMatchingOption = <T>(
  accumulator: Array<EuiComboBoxOptionOption<T>>,
  option: EuiComboBoxOptionOption<T>,
  selectedOptions: Array<EuiComboBoxOptionOption<T>>,
  normalizedSearchValue: string,
  isPreFiltered: boolean,
  showPrevSelected: boolean
) => {
  // Only show options which haven't yet been selected unless requested.
  const selectedOption = getSelectedOptionForSearchValue(
    option.label,
    selectedOptions,
    option.key
  );
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

  const normalizedOption = option.label.trim().toLowerCase();
  if (normalizedOption.includes(normalizedSearchValue)) {
    accumulator.push(option);
  }
};

export const getMatchingOptions = <T>(
  options: Array<EuiComboBoxOptionOption<T>>,
  selectedOptions: Array<EuiComboBoxOptionOption<T>>,
  searchValue: string,
  isPreFiltered: boolean,
  showPrevSelected: boolean,
  sortMatchesBy: string
) => {
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const matchingOptions: Array<EuiComboBoxOptionOption<T>> = [];

  options.forEach((option) => {
    if (option.options) {
      const matchingOptionsForGroup: Array<EuiComboBoxOptionOption<T>> = [];
      option.options.forEach((groupOption: EuiComboBoxOptionOption<T>) => {
        collectMatchingOption(
          matchingOptionsForGroup,
          groupOption,
          selectedOptions,
          normalizedSearchValue,
          isPreFiltered,
          showPrevSelected
        );
      });
      if (matchingOptionsForGroup.length > 0) {
        // Add option for group label
        matchingOptions.push({
          key: option.key,
          label: option.label,
          isGroupLabelOption: true,
        });
        // Add matching options for group
        matchingOptions.push(...matchingOptionsForGroup);
      }
    } else {
      collectMatchingOption(
        matchingOptions,
        option,
        selectedOptions,
        normalizedSearchValue,
        isPreFiltered,
        showPrevSelected
      );
    }
  });

  if (sortMatchesBy === 'startsWith') {
    const refObj: {
      startWith: Array<EuiComboBoxOptionOption<T>>;
      others: Array<EuiComboBoxOptionOption<T>>;
    } = { startWith: [], others: [] };

    matchingOptions.forEach((object) => {
      if (object.label.toLowerCase().startsWith(normalizedSearchValue)) {
        refObj.startWith.push(object);
      } else {
        refObj.others.push(object);
      }
    });
    return [...refObj.startWith, ...refObj.others];
  }

  return matchingOptions;
};
