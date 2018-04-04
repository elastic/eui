import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiCode } from '../../code';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiHighlight } from '../../highlight';
import { EuiPanel } from '../../panel';
import { EuiText } from '../../text';
import { EuiLoadingSpinner } from '../../loading';
import { EuiComboBoxOption } from './combo_box_option';
import { EuiComboBoxTitle } from './combo_box_title';

const positionToClassNameMap = {
  top: 'euiComboBoxOptionsList--top',
  bottom: 'euiComboBoxOptionsList--bottom',
};

const POSITIONS = Object.keys(positionToClassNameMap);

export class EuiComboBoxOptionsList extends Component {
  static propTypes = {
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
    updatePosition: PropTypes.func.isRequired,
    position: PropTypes.oneOf(POSITIONS),
    listRef: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
  }

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition(this.list.getBoundingClientRect());
    });
  };

  componentDidMount() {
    // Wait a frame, otherwise moving focus from one combo box to another will result in the class
    // being removed from the body.
    requestAnimationFrame(() => {
      document.body.classList.add('euiBody-hasPortalContent');
    });
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);
  }

  componentWillUpdate(nextProps) {
    const { options, selectedOptions, searchValue } = nextProps;

    // We don't compare matchingOptions because that will result in a loop.
    if (
      searchValue !== this.props.searchValue
      || options !== this.props.options
      || selectedOptions !== this.props.selectedOptions
    ) {
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasPortalContent');
    window.removeEventListener('resize', this.updatePosition);
  }

  listRef = node => {
    this.props.listRef(node);
    this.list = node;
  }

  render() {
    const {
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
      position,
      renderOption,
      listRef, // eslint-disable-line no-unused-vars
      updatePosition, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

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
      <EuiText size="xs" className="euiComboBoxOptionsList__empty">
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
          key={option.label.toLowerCase()}
          onClick={onOptionClick}
          onEnterKey={onOptionEnterKey}
          optionRef={optionRef.bind(this, index)}
          {...rest}
        >
          {renderOption ? renderOption(option, searchValue) : (
            <EuiHighlight search={searchValue}>{label}</EuiHighlight>
          )}
        </EuiComboBoxOption>
      );

      optionsList.push(renderedOption);
    });

    const classes = classNames('euiComboBoxOptionsList', positionToClassNameMap[position]);

    return (
      <EuiPanel
        paddingSize="none"
        className={classes}
        data-test-subj="comboBoxOptionsList"
        panelRef={this.listRef}
        {...rest}
      >
        <div className="euiComboBoxOptionsList__rowWrap">
          {emptyState || optionsList}
        </div>
      </EuiPanel>
    );
  }
}
