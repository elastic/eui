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
    option => getSearchableLabel<T>(option) === normalizedSearchValue
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

export const getMatchingOptions = <T>(
  /**
   * All available options to match against
   */
  options: Array<EuiSelectableOption<T>>,
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
  selectedOptions?: Array<EuiSelectableOption<T>>
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  const matchingOptions: Array<EuiSelectableOption<T>> = [];

  options.forEach(option => {
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
