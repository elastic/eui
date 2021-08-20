/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiSelectableOption } from './selectable_option';

const getSearchableLabel = <T>(
  option: EuiSelectableOption<T>,
  normalize: boolean = true
): string => {
  const searchableLabel = option.searchableLabel || option.label;
  return normalize ? searchableLabel.trim().toLowerCase() : searchableLabel;
};

const getSelectedOptionForSearchValue = <T>(
  searchValue: string,
  selectedOptions: Array<EuiSelectableOption<T>>
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(
    (option) => getSearchableLabel<T>(option) === normalizedSearchValue
  );
};

const collectMatchingOption = <T>(
  accumulator: Array<EuiSelectableOption<T>>,
  option: EuiSelectableOption<T>,
  normalizedSearchValue: string,
  isPreFiltered?: boolean,
  selectedOptions?: Array<EuiSelectableOption<T>>
) => {
  // Don't show options that have already been requested if
  // the selectedOptions list exists
  if (selectedOptions) {
    const selectedOption = getSelectedOptionForSearchValue<T>(
      getSearchableLabel<T>(option, false),
      selectedOptions
    );
    if (selectedOption) {
      return false;
    }
  }

  // If the options have already been prefiltered then we can skip filtering against the search value.
  // TODO: I still don't quite understand how this works when hooked up to async
  if (isPreFiltered) {
    accumulator.push(option);
    return;
  }

  if (!normalizedSearchValue) {
    accumulator.push(option);
    return;
  }

  const normalizedOption = getSearchableLabel<T>(option);
  if (normalizedOption.includes(normalizedSearchValue)) {
    accumulator.push(option);
  }
};

type SelectableOptions<T> = Array<EuiSelectableOption<T>>;

export const getMatchingOptions = <T>(
  /**
   * All available options to match against
   */
  options: SelectableOptions<T>,
  /**
   * String to match option.label || option.searchableLabel against
   */
  searchValue: string,
  /**
   * Async?
   */
  isPreFiltered?: boolean,
  /**
   * To exclude selected options from the search list,
   * pass the array of selected options
   */
  selectedOptions?: SelectableOptions<T>
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  const matchingOptions: SelectableOptions<T> = [];

  options.forEach((option) => {
    collectMatchingOption<T>(
      matchingOptions,
      option,
      normalizedSearchValue,
      isPreFiltered,
      selectedOptions
    );
  });
  return matchingOptions;
};
