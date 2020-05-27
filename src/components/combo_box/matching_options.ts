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
  selectedOptions: Array<EuiComboBoxOptionOption<T>>
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(
    option => option.label.toLowerCase() === normalizedSearchValue
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
    selectedOptions
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
  showPrevSelected: boolean
) => {
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const matchingOptions: Array<EuiComboBoxOptionOption<T>> = [];

  options.forEach(option => {
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
        matchingOptions.push({ label: option.label, isGroupLabelOption: true });
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
  return matchingOptions;
};
