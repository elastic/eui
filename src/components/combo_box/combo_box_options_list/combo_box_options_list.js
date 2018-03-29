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


import {
  COLORS,
} from '../../badge/badge';

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
    style: PropTypes.object,
    listRef: PropTypes.func.isRequired,
  }

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition(this.list.getBoundingClientRect());
    });
  };

  componentDidMount() {
    document.body.classList.add('euiBody-hasPortalContent');

    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);
    window.addEventListener('scroll', this.updatePosition);
  }

  componentWillUpdate(nextProps) {
    const { options, selectedOptions } = nextProps;

    if (
      options !== this.props.options
      || selectedOptions !== this.props.selectedOptions
    ) {
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasPortalContent');
    window.removeEventListener('resize', this.updatePosition);
    window.removeEventListener('scroll', this.updatePosition);
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
        color,
        ...rest
      } = option;

      const colorToClassNameMap = {
        default: 'euiComboBoxOption__swatch--default',
        primary: 'euiComboBoxOption__swatch--primary',
        secondary: 'euiComboBoxOption__swatch--secondary',
        accent: 'euiComboBoxOption__swatch--accent',
        warning: 'euiComboBoxOption__swatch--warning',
        danger: 'euiComboBoxOption__swatch--danger',
        hollow: 'euiComboBoxOption__swatch--hollow',
      };

      let optionalColorClass = null;
      let optionalCustomStyles = null;

      if (COLORS.indexOf(color) > -1) {
        optionalColorClass = colorToClassNameMap[color];
      } else {
        optionalCustomStyles = { backgroundColor: color };
      }

      const group = optionToGroupMap.get(option);

      if (group && !groupLabelToGroupMap[group.label]) {
        groupLabelToGroupMap[group.label] = true;
        optionsList.push(
          <EuiComboBoxTitle key={`group-${group.label}`}>
            {group.label}
          </EuiComboBoxTitle>
        );
      }

      const swatchClasses = classNames(
        'euiComboBoxOption__swatch',
        optionalColorClass,
      );

      let optionalColorSwatch;
      if (color) {
        optionalColorSwatch = (
          <span>
            <span
              className={swatchClasses}
              style={optionalCustomStyles}
            />
          </span>
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
          {optionalColorSwatch}
          <EuiHighlight search={searchValue}>{label}</EuiHighlight>
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
