import { EuiComboBoxOptionProps } from '@elastic/eui';

export const flattenOptionGroups = (
  optionsOrGroups: EuiComboBoxOptionProps[]
) => {
  return optionsOrGroups.reduce(
    (
      options: EuiComboBoxOptionProps[],
      optionOrGroup: EuiComboBoxOptionProps
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

export const getSelectedOptionForSearchValue = (
  searchValue: string,
  selectedOptions: EuiComboBoxOptionProps[]
) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(
    option => option.label.toLowerCase() === normalizedSearchValue
  );
};

const collectMatchingOption = (
  accumulator: EuiComboBoxOptionProps[],
  option: EuiComboBoxOptionProps,
  selectedOptions: EuiComboBoxOptionProps[],
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

export const getMatchingOptions = (
  options: EuiComboBoxOptionProps[],
  selectedOptions: EuiComboBoxOptionProps[],
  searchValue: string,
  isPreFiltered: boolean,
  showPrevSelected: boolean
) => {
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const matchingOptions: EuiComboBoxOptionProps[] = [];

  options.forEach(option => {
    if (option.options) {
      const matchingOptionsForGroup: EuiComboBoxOptionProps[] = [];
      option.options.forEach((groupOption: EuiComboBoxOptionProps) => {
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
