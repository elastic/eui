import React from 'react';
import PropTypes from 'prop-types';

import { EuiCode } from '../../code';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiHighlight } from '../../highlight';
import { EuiPanel } from '../../panel';
import { EuiText } from '../../text';
import { EuiLoadingSpinner } from '../../loading';
import { EuiComboBoxOption } from './combo_box_option';
import { EuiComboBoxTitle } from './combo_box_title';

export const EuiComboBoxOptionsList = ({
  options,
  isLoading,
  selectedOptions,
  onCreateOption,
  searchValue,
  matchingOptions,
  optionToGroupMap,
  optionRef,
  onOptionClick,
  onOptionEnterKey,
  areAllOptionsSelected,
  getSelectedOptionForSearchValue,
}) => {
  let emptyStateContent;

  if (isLoading) {
    emptyStateContent = (
      <EuiFlexGroup gutterSize="s" justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiLoadingSpinner size="m" />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          Loading options
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  } else if (searchValue && matchingOptions.length === 0) {
    if (onCreateOption) {
      const selectedOptionForValue = getSelectedOptionForSearchValue(searchValue, selectedOptions);
      if (selectedOptionForValue) {
        // Disallow duplicate custom options.
        emptyStateContent = (
          <p><strong>{selectedOptionForValue.value}</strong> has already been added</p>
        );
      } else {
        emptyStateContent = (
          <p>Hit <EuiCode>ENTER</EuiCode> to add <strong>{searchValue}</strong> as a custom option</p>
        );
      }
    } else {
      emptyStateContent = (
        <p><strong>{searchValue}</strong> doesn&rsquo;t match any options</p>
      );
    }
  } else if (!options.length) {
    emptyStateContent = <p>There aren&rsquo;t any options available</p>;
  } else if (areAllOptionsSelected) {
    emptyStateContent = <p>You&rsquo;ve selected all available options</p>;
  }

  const emptyState = emptyStateContent ? (
    <EuiText size="xs" className="euiComoboBox__empty">
      {emptyStateContent}
    </EuiText>
  ) : undefined;

  const groupLabelToGroupMap = {};
  const optionsList = [];

  matchingOptions.forEach((option, index) => {
    const {
      value, // eslint-disable-line no-unused-vars
      label,
      ...rest
    } = option;

    const group = optionToGroupMap.get(option);

    if (group && !groupLabelToGroupMap[group.label]) {
      groupLabelToGroupMap[group.label] = true;
      optionsList.push(
        <EuiComboBoxTitle key={`group-${group.label}`}>
          {group.label}
        </EuiComboBoxTitle>
      );
    }

    const renderedOption = (
      <EuiComboBoxOption
        option={option}
        key={option.value}
        onClick={onOptionClick}
        onEnterKey={onOptionEnterKey}
        optionRef={optionRef.bind(this, index)}
        {...rest}
      >
        <EuiHighlight search={searchValue}>{label}</EuiHighlight>
      </EuiComboBoxOption>
    );

    optionsList.push(renderedOption);
  });

  return (
    <EuiPanel
      paddingSize="none"
      className="euiComboBox__panel"
      data-test-subj="comboBoxOptionsList"
    >
      <div className="euiComboBox__rowWrap">
        {emptyState || optionsList}
      </div>
    </EuiPanel>
  );
};

EuiComboBoxOptionsList.propTypes = {
  options: PropTypes.array,
  isLoading: PropTypes.bool,
  selectedOptions: PropTypes.array,
  onCreateOption: PropTypes.func,
  searchValue: PropTypes.string,
  matchingOptions: PropTypes.array,
  optionToGroupMap: PropTypes.object,
  optionRef: PropTypes.func,
  onOptionClick: PropTypes.func,
  onOptionEnterKey: PropTypes.func,
  areAllOptionsSelected: PropTypes.bool,
  getSelectedOptionForSearchValue: PropTypes.func,
};
