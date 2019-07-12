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
import { EuiComboBoxTitle } from './combo_box_title';
import { EuiI18n } from '../../i18n';
import { EuiFilterSelectItem } from '../../filter_group/filter_select_item';

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
    fullWidth: PropTypes.bool,
    activeOptionIndex: PropTypes.number,
    rootId: PropTypes.func.isRequired,
    onCloseList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    rowHeight: 27, // row height of default option renderer
    'data-test-subj': '',
  };

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

    // Firefox will trigger a scroll event in many common situations when the options list div is appended
    // to the DOM; in testing it was always within 100ms, but setting a timeout here for 500ms to be safe
    setTimeout(() => {
      window.addEventListener('scroll', this.closeListOnScroll, {
        passive: true, // for better performance as we won't call preventDefault
        capture: true, // scroll events don't bubble, they must be captured instead
      });
    }, 500);
  }

  componentDidUpdate(prevProps) {
    const { options, selectedOptions, searchValue } = prevProps;

    // We don't compare matchingOptions because that will result in a loop.
    if (
      searchValue !== this.props.searchValue ||
      options !== this.props.options ||
      selectedOptions !== this.props.selectedOptions
    ) {
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasPortalContent');
    window.removeEventListener('resize', this.updatePosition);
    window.removeEventListener('scroll', this.closeListOnScroll, {
      passive: true,
      capture: true,
    });
  }

  closeListOnScroll = e => {
    // close the list when a scroll event happens, but not if the scroll happened in the options list
    // this mirrors Firefox's approach of auto-closing `select` elements onscroll
    if (this.list && this.list.contains(e.target) === false) {
      this.props.onCloseList();
    }
  };

  listRef = node => {
    this.props.listRef(node);
    this.list = node;
  };

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
      listRef,
      updatePosition,
      width,
      scrollToIndex,
      onScroll,
      rowHeight,
      fullWidth,
      'data-test-subj': dataTestSubj,
      activeOptionIndex,
      rootId,
      onCloseList,
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
            <EuiI18n
              token="euiComboBoxOptionsList.loadingOptions"
              default="Loading options"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    } else if (searchValue && matchingOptions.length === 0) {
      if (onCreateOption) {
        const selectedOptionForValue = getSelectedOptionForSearchValue(
          searchValue,
          selectedOptions
        );
        if (selectedOptionForValue) {
          // Disallow duplicate custom options.
          emptyStateContent = (
            <p>
              <EuiI18n
                token="euiComboBoxOptionsList.alreadyAdded"
                default="{label} has already been added"
                values={{
                  label: <strong>{selectedOptionForValue.label}</strong>,
                }}
              />
            </p>
          );
        } else {
          emptyStateContent = (
            <p>
              <EuiI18n
                token="euiComboBoxOptionsList.createCustomOption"
                default="Hit {key} to add {searchValue} as a custom option"
                values={{
                  key: <EuiCode>ENTER</EuiCode>,
                  searchValue: <strong>{searchValue}</strong>,
                }}
              />
            </p>
          );
        }
      } else {
        emptyStateContent = (
          <p>
            <EuiI18n
              token="euiComboBoxOptionsList.noMatchingOptions"
              default="{searchValue} doesn't match any options"
              values={{ searchValue: <strong>{searchValue}</strong> }}
            />
          </p>
        );
      }
    } else if (!options.length) {
      emptyStateContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.noAvailableOptions"
            default="There aren't any options available"
          />
        </p>
      );
    } else if (areAllOptionsSelected) {
      emptyStateContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.allOptionsSelected"
            default="You've selected all available options"
          />
        </p>
      );
    }

    const emptyState = emptyStateContent ? (
      <EuiText size="xs" className="euiComboBoxOptionsList__empty">
        {emptyStateContent}
      </EuiText>
    ) : (
      undefined
    );

    const numVisibleOptions =
      matchingOptions.length < 7 ? matchingOptions.length : 7;
    const height = numVisibleOptions * rowHeight;

    const optionsList = (
      <List
        id={rootId('listbox')}
        role="listbox"
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
                <EuiComboBoxTitle>{label}</EuiComboBoxTitle>
              </div>
            );
          }

          return (
            <EuiFilterSelectItem
              style={style}
              key={option.label.toLowerCase()}
              onClick={() => onOptionClick(option)}
              // onEnterKey={onOptionEnterKey}
              ref={optionRef.bind(this, index)}
              isFocused={activeOptionIndex === index}
              id={rootId(`_option-${index}`)}
              title={label}
              showIcons={false}
              {...rest}>
              {renderOption ? (
                renderOption(option, searchValue, OPTION_CONTENT_CLASSNAME)
              ) : (
                <EuiHighlight
                  search={searchValue}
                  className={OPTION_CONTENT_CLASSNAME}>
                  {label}
                </EuiHighlight>
              )}
            </EuiFilterSelectItem>
          );
        }}
      />
    );

    const classes = classNames(
      'euiComboBoxOptionsList',
      positionToClassNameMap[position],
      {
        'euiComboBoxOptionsList--fullWidth': fullWidth,
      }
    );

    return (
      <EuiPanel
        paddingSize="none"
        className={classes}
        panelRef={this.listRef}
        data-test-subj={`comboBoxOptionsList ${dataTestSubj}`}
        {...rest}>
        <div className="euiComboBoxOptionsList__rowWrap">
          {emptyState || optionsList}
        </div>
      </EuiPanel>
    );
  }
}
