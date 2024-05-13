/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiSelectableOption } from './selectable_option';
import { EuiSelectableOptionMatcher } from './selectable';

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

interface CollectMatchingOptionArgs<TOption> {
  accumulator: Array<EuiSelectableOption<TOption>>;
  option: EuiSelectableOption<TOption>;
  searchValue: string;
  normalizedSearchValue: string;
  isPreFiltered?: boolean;
  selectedOptions?: Array<EuiSelectableOption<TOption>>;
  optionMatcher: EuiSelectableOptionMatcher<TOption>;
}

const collectMatchingOption = <TOption>({
  selectedOptions,
  isPreFiltered,
  option,
  accumulator,
  searchValue,
  normalizedSearchValue,
  optionMatcher,
}: CollectMatchingOptionArgs<TOption>) => {
  // Don't show options that have already been requested if
  // the selectedOptions list exists
  if (selectedOptions) {
    const selectedOption = getSelectedOptionForSearchValue<TOption>(
      getSearchableLabel<TOption>(option, false),
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

  const isMatching = optionMatcher({
    option,
    searchValue,
    normalizedSearchValue,
  });
  if (isMatching) {
    accumulator.push(option);
  }
};

type SelectableOptions<T> = Array<EuiSelectableOption<T>>;

interface GetMatchingOptionsArgs<TOption> {
  /**
   * All available options to match against
   */
  options: SelectableOptions<TOption>;
  /**
   * String to match option.label || option.searchableLabel against
   */
  searchValue: string;
  /**
   * Async?
   */
  isPreFiltered: boolean;
  /**
   * To exclude selected options from the search list,
   * pass the array of selected options
   */
  selectedOptions?: SelectableOptions<TOption>;
  /**
   * Option matcher function passed to EuiSelectable or the default matcher
   */
  optionMatcher: EuiSelectableOptionMatcher<TOption>;
}

export const getMatchingOptions = <TOption>({
  searchValue,
  options,
  isPreFiltered,
  selectedOptions = [],
  optionMatcher,
}: GetMatchingOptionsArgs<TOption>) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  const matchingOptions: SelectableOptions<TOption> = [];

  options.forEach((option) => {
    collectMatchingOption<TOption>({
      accumulator: matchingOptions,
      option,
      searchValue,
      normalizedSearchValue,
      isPreFiltered,
      selectedOptions,
      optionMatcher,
    });
  });
  return matchingOptions;
};

/**
 * Partial string equality option matcher for EuiSelectable
 * It matches all options with labels including the searched string.
 */
export const createPartialStringEqualityOptionMatcher = <
  TOption
>(): EuiSelectableOptionMatcher<TOption> => {
  return ({ option, normalizedSearchValue }) => {
    const normalizedOption = getSearchableLabel(option);

    return normalizedOption.includes(normalizedSearchValue);
  };
};
