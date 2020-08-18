/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { EuiSelectableOption } from './selectable_option';

const getSearchableLabel = (
  option: EuiSelectableOption,
  normalize: boolean = true
): string => {
  const searchableLabel = option.searchableLabel || option.label;
  return normalize ? searchableLabel.trim().toLowerCase() : searchableLabel;
};

const getSelectedOptionForSearchValue = (
  searchValue: string,
  selectedOptions: EuiSelectableOption[]
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(
    option => getSearchableLabel(option) === normalizedSearchValue
  );
};

const collectMatchingOption = (
  accumulator: EuiSelectableOption[],
  option: EuiSelectableOption,
  normalizedSearchValue: string,
  isPreFiltered?: boolean,
  selectedOptions?: EuiSelectableOption[]
) => {
  // Don't show options that have already been requested if
  // the selectedOptions list exists
  if (selectedOptions) {
    const selectedOption = getSelectedOptionForSearchValue(
      getSearchableLabel(option, false),
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

  const normalizedOption = getSearchableLabel(option);
  if (normalizedOption.includes(normalizedSearchValue)) {
    accumulator.push(option);
  }
};

export const getMatchingOptions = (
  /**
   * All available options to match against
   */
  options: EuiSelectableOption[],
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
  selectedOptions?: EuiSelectableOption[]
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  const matchingOptions: EuiSelectableOption[] = [];

  options.forEach(option => {
    collectMatchingOption(
      matchingOptions,
      option,
      normalizedSearchValue,
      isPreFiltered,
      selectedOptions
    );
  });
  return matchingOptions;
};
