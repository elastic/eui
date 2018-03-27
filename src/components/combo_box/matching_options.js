export const flattenOptionGroups = optionsOrGroups => {
  return optionsOrGroups.reduce((options, optionOrGroup) => {
    if (optionOrGroup.options) {
      options.push(...optionOrGroup.options);
    } else {
      options.push(optionOrGroup);
    }
    return options;
  }, []);
};

export const getSelectedOptionForSearchValue = (searchValue, selectedOptions) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(option => option.label.toLowerCase() === normalizedSearchValue);
};

const collectMatchingOption = (accumulator, option, selectedOptions, normalizedSearchValue, isPreFiltered) => {
  // Only show options which haven't yet been selected.
  const selectedOption = getSelectedOptionForSearchValue(option.label, selectedOptions);
  if (selectedOption) {
    return false;
  }

  // If the options have already been prefiltered then we can skip filtering against the search value.
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

export const getMatchingOptions = (options, selectedOptions, searchValue, isPreFiltered) => {
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const optionToGroupMap = new Map();
  const matchingOptions = [];

  options.forEach(option => {
    if (option.options) {
      option.options.forEach(groupOption => {
        optionToGroupMap.set(groupOption, option)
        collectMatchingOption(matchingOptions, groupOption, selectedOptions, normalizedSearchValue, isPreFiltered);
      })
    } else {
      collectMatchingOption(matchingOptions, option, selectedOptions, normalizedSearchValue, isPreFiltered);
    }
  });
  return { optionToGroupMap, matchingOptions };
};
