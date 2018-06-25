import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List } from 'react-virtualized';

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

const OPTION_CONTENT_CLASSNAME = 'euiComboBoxOption__content';

export class EuiComboBoxOptionsList extends Component {
  static propTypes = {
    options: PropTypes.array,
    isLoading: PropTypes.bool,
    selectedOptions: PropTypes.array,
    onCreateOption: PropTypes.func,
    searchValue: PropTypes.string,
    matchingOptions: PropTypes.array,
    optionRef: PropTypes.func,
    onOptionClick: PropTypes.func,
    onOptionEnterKey: PropTypes.func,
    areAllOptionsSelected: PropTypes.bool,
    getSelectedOptionForSearchValue: PropTypes.func,
    updatePosition: PropTypes.func.isRequired,
    position: PropTypes.oneOf(POSITIONS),
    listRef: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
    width: PropTypes.number,
    scrollToIndex: PropTypes.number,
    onScroll: PropTypes.func,
    rowHeight: PropTypes.number,
  }

  static defaultProps = {
    rowHeight: 27, // row height of default option renderer
  }

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition(this.list);
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

  componentDidUpdate(prevProps) {
    const { options, selectedOptions, searchValue } = prevProps;

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
      optionRef,
      onOptionClick,
      onOptionEnterKey,
      areAllOptionsSelected,
      getSelectedOptionForSearchValue,
      position,
      renderOption,
      listRef, // eslint-disable-line no-unused-vars
      updatePosition, // eslint-disable-line no-unused-vars
      width,
      scrollToIndex,
      onScroll,
      rowHeight,
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

    const numVisibleOptions = matchingOptions.length < 7 ? matchingOptions.length : 7;
    const height = numVisibleOptions * rowHeight;

    const optionsList = (
      <List
        tabIndex={-1}
        width={width}
        height={height}
        rowCount={matchingOptions.length}
        rowHeight={rowHeight}
        scrollToIndex={scrollToIndex}
        onScroll={onScroll}
        rowRenderer={({ key, index, style }) => {
          const option = matchingOptions[index];
          const {
            value, // eslint-disable-line no-unused-vars
            label,
            isGroupLabelOption,
            ...rest
          } = option;

          if (isGroupLabelOption) {
            return (
              <div key={key} style={style}>
                <EuiComboBoxTitle>
                  {label}
                </EuiComboBoxTitle>
              </div>
            );
          }

          return (
            <div key={key} style={style}>
              <EuiComboBoxOption
                option={option}
                key={option.label.toLowerCase()}
                onClick={onOptionClick}
                onEnterKey={onOptionEnterKey}
                optionRef={optionRef.bind(this, index)}
                {...rest}
              >
                {renderOption ? renderOption(option, searchValue, OPTION_CONTENT_CLASSNAME) : (
                  <EuiHighlight search={searchValue} className={OPTION_CONTENT_CLASSNAME}>{label}</EuiHighlight>
                )}
              </EuiComboBoxOption>
            </div>
          );
        }}
      />
    );

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
