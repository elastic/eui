/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  ComponentProps,
  ReactNode,
  RefCallback,
} from 'react';
import classNames from 'classnames';
import {
  FixedSizeList,
  ListProps,
  ListChildComponentProps,
} from 'react-window';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiHighlight } from '../../highlight';
import { EuiPanel } from '../../panel';
import { EuiText } from '../../text';
import { EuiLoadingSpinner } from '../../loading';
import { EuiComboBoxTitle } from './combo_box_title';
import { EuiI18n } from '../../i18n';
import {
  EuiFilterSelectItem,
  FilterChecked,
} from '../../filter_group/filter_select_item';
import { htmlIdGenerator } from '../../../services';
import {
  EuiComboBoxOptionOption,
  EuiComboBoxOptionsListPosition,
  EuiComboBoxSingleSelectionShape,
  OptionHandler,
  RefInstance,
  UpdatePositionHandler,
} from '../types';
import { CommonProps } from '../../common';
import { EuiBadge } from '../../badge/';

const OPTION_CONTENT_CLASSNAME = 'euiComboBoxOption__content';

export type EuiComboBoxOptionsListProps<T> = CommonProps &
  ComponentProps<typeof EuiPanel> & {
    'data-test-subj': string;
    activeOptionIndex?: number;
    areAllOptionsSelected?: boolean;
    /**
     * Creates a custom text option. You can use `{searchValue}` inside your string to better customize your text.
     * It won't show if there's no onCreateOption.
     */
    customOptionText?: string;
    fullWidth?: boolean;
    getSelectedOptionForSearchValue?: (
      searchValue: string,
      selectedOptions: any[]
    ) => EuiComboBoxOptionOption<T> | undefined;
    isLoading?: boolean;
    listRef: RefCallback<HTMLDivElement>;
    matchingOptions: Array<EuiComboBoxOptionOption<T>>;
    onCloseList: (event: Event) => void;
    onCreateOption?: (
      searchValue: string,
      options: Array<EuiComboBoxOptionOption<T>>
    ) => boolean | void;
    onOptionClick?: OptionHandler<T>;
    onOptionEnterKey?: OptionHandler<T>;
    onScroll?: ListProps['onScroll'];
    optionRef: (index: number, node: RefInstance<EuiFilterSelectItem>) => void;
    /**
     * Array of EuiComboBoxOptionOption objects. See #EuiComboBoxOptionOption
     */
    options: Array<EuiComboBoxOptionOption<T>>;
    position?: EuiComboBoxOptionsListPosition;
    renderOption?: (
      option: EuiComboBoxOptionOption<T>,
      searchValue: string,
      OPTION_CONTENT_CLASSNAME: string
    ) => ReactNode;
    rootId: ReturnType<typeof htmlIdGenerator>;
    rowHeight: number;
    scrollToIndex?: number;
    searchValue: string;
    selectedOptions: Array<EuiComboBoxOptionOption<T>>;
    updatePosition: UpdatePositionHandler;
    width: number;
    singleSelection?: boolean | EuiComboBoxSingleSelectionShape;
    delimiter?: string;
    zIndex?: number;
  };

const hitEnterBadge = (
  <EuiBadge
    className="euiComboBoxOption__enterBadge"
    color="hollow"
    iconType="returnKey"
    aria-hidden="true"
  />
);

export class EuiComboBoxOptionsList<T> extends Component<
  EuiComboBoxOptionsListProps<T>
> {
  listRefInstance: RefInstance<HTMLDivElement> = null;
  listRef: FixedSizeList | null = null;
  listBoxRef: HTMLUListElement | null = null;

  static defaultProps = {
    'data-test-subj': '',
    rowHeight: 29, // row height of default option renderer
  };

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition(this.listRefInstance);
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

  componentDidUpdate(prevProps: EuiComboBoxOptionsListProps<T>) {
    const { options, selectedOptions, searchValue } = prevProps;

    // We don't compare matchingOptions because that will result in a loop.
    if (
      searchValue !== this.props.searchValue ||
      options !== this.props.options ||
      selectedOptions !== this.props.selectedOptions
    ) {
      this.updatePosition();
    }

    if (
      this.listRef &&
      typeof this.props.activeOptionIndex !== 'undefined' &&
      this.props.activeOptionIndex !== prevProps.activeOptionIndex
    ) {
      this.listRef.scrollToItem(this.props.activeOptionIndex, 'auto');
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasPortalContent');
    window.removeEventListener('resize', this.updatePosition);
    window.removeEventListener('scroll', this.closeListOnScroll, {
      capture: true,
    });
  }

  closeListOnScroll = (event: Event) => {
    // Close the list when a scroll event happens, but not if the scroll happened in the options list.
    // This mirrors Firefox's approach of auto-closing `select` elements onscroll.
    if (
      this.listRefInstance &&
      event.target &&
      this.listRefInstance.contains(event.target as Node) === false
    ) {
      this.props.onCloseList(event);
    }
  };

  listRefCallback: RefCallback<HTMLDivElement> = (ref) => {
    this.props.listRef(ref);
    this.listRefInstance = ref;
  };

  setListRef = (ref: FixedSizeList | null) => {
    this.listRef = ref;
  };

  setListBoxRef = (ref: HTMLUListElement | null) => {
    this.listBoxRef = ref;

    if (ref) {
      ref.setAttribute('id', this.props.rootId('listbox'));
      ref.setAttribute('role', 'listBox');
      ref.setAttribute('tabIndex', '0');
    }
  };

  ListRow = ({ data, index, style }: ListChildComponentProps) => {
    const option = data[index];
    const { key, isGroupLabelOption, label, value, ...rest } = option;
    const {
      singleSelection,
      selectedOptions,
      onOptionClick,
      optionRef,
      activeOptionIndex,
      renderOption,
      searchValue,
      rootId,
    } = this.props;

    if (isGroupLabelOption) {
      return (
        <div key={key ?? label.toLowerCase()} style={style}>
          <EuiComboBoxTitle>{label}</EuiComboBoxTitle>
        </div>
      );
    }

    let checked: FilterChecked | undefined = undefined;
    if (
      singleSelection &&
      selectedOptions.length &&
      selectedOptions[0].label === label &&
      selectedOptions[0].key === key
    ) {
      checked = 'on';
    }

    const optionIsFocused = activeOptionIndex === index;
    const optionIsDisabled =
      option.hasOwnProperty('disabled') && option.disabled === true;

    return (
      <EuiFilterSelectItem
        style={style}
        key={option.key ?? option.label.toLowerCase()}
        onClick={() => {
          if (onOptionClick) {
            onOptionClick(option);
          }
        }}
        ref={optionRef.bind(this, index)}
        isFocused={optionIsFocused}
        checked={checked}
        showIcons={singleSelection ? true : false}
        id={rootId(`_option-${index}`)}
        title={label}
        {...rest}>
        <span className="euiComboBoxOption__contentWrapper">
          {renderOption ? (
            <span className={OPTION_CONTENT_CLASSNAME}>
              {renderOption(
                option,
                searchValue,
                'euiComboBoxOption__renderOption'
              )}
            </span>
          ) : (
            <EuiHighlight
              search={searchValue}
              className={OPTION_CONTENT_CLASSNAME}>
              {label}
            </EuiHighlight>
          )}
          {optionIsFocused && !optionIsDisabled ? hitEnterBadge : null}
        </span>
      </EuiFilterSelectItem>
    );
  };

  render() {
    const {
      'data-test-subj': dataTestSubj,
      activeOptionIndex,
      areAllOptionsSelected,
      customOptionText,
      fullWidth,
      getSelectedOptionForSearchValue,
      isLoading,
      listRef,
      matchingOptions,
      onCloseList,
      onCreateOption,
      onOptionClick,
      onOptionEnterKey,
      onScroll,
      optionRef,
      options,
      position = 'bottom',
      renderOption,
      rootId,
      rowHeight,
      scrollToIndex,
      searchValue,
      selectedOptions,
      singleSelection,
      updatePosition,
      width,
      delimiter,
      zIndex,
      style,
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
    } else if (searchValue && matchingOptions && matchingOptions.length === 0) {
      if (onCreateOption && getSelectedOptionForSearchValue) {
        if (delimiter && searchValue.includes(delimiter)) {
          emptyStateContent = (
            <div className="euiComboBoxOption__contentWrapper">
              <p className="euiComboBoxOption__emptyStateText">
                <EuiI18n
                  token="euiComboBoxOptionsList.delimiterMessage"
                  default="Add each item separated by {delimiter}"
                  values={{ delimiter: <strong>{delimiter}</strong> }}
                />
              </p>
              {hitEnterBadge}
            </div>
          );
        } else {
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
            const highlightSearchValue = (
              text: string,
              searchValue: string
            ) => {
              const reg = new RegExp(/(\{searchValue})/, 'gi');
              const parts = text.split(reg);
              return (
                <p className="euiComboBoxOption__emptyStateText">
                  {parts.map((part, idx) =>
                    part.match(reg) ? (
                      <strong key={idx}>{searchValue}</strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            };

            emptyStateContent = (
              <div className="euiComboBoxOption__contentWrapper">
                {customOptionText ? (
                  highlightSearchValue(customOptionText, searchValue)
                ) : (
                  <p className="euiComboBoxOption__emptyStateText">
                    <EuiI18n
                      token="euiComboBoxOptionsList.createCustomOption"
                      default="Add {searchValue} as a custom option"
                      values={{
                        searchValue: <strong>{searchValue}</strong>,
                      }}
                    />
                  </p>
                )}
                {hitEnterBadge}
              </div>
            );
          }
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
    ) : undefined;

    const numVisibleOptions =
      matchingOptions.length < 7 ? matchingOptions.length : 7;
    const height = numVisibleOptions * (rowHeight + 1); // Add one for the border

    // bounded by max-height of euiComboBoxOptionsList__rowWrap
    const boundedHeight = height > 200 ? 200 : height;

    const optionsList = (
      <FixedSizeList
        height={boundedHeight}
        onScroll={onScroll}
        itemCount={matchingOptions.length}
        itemSize={rowHeight}
        itemData={matchingOptions}
        ref={this.setListRef}
        innerRef={this.setListBoxRef}
        width={width}>
        {this.ListRow}
      </FixedSizeList>
    );

    /**
     * Reusing the EuiPopover__panel classes to help with consistency/maintenance.
     * But this should really be converted to user the popover component.
     */
    const classes = classNames(
      'euiComboBoxOptionsList',
      'euiPopover__panel',
      'euiPopover__panel-isAttached',
      'euiPopover__panel-noArrow',
      'euiPopover__panel-isOpen',
      `euiPopover__panel--${position}`
    );

    return (
      <EuiPanel
        paddingSize="none"
        hasShadow={false}
        className={classes}
        panelRef={this.listRefCallback}
        data-test-subj={`comboBoxOptionsList ${dataTestSubj}`}
        style={{ ...style, zIndex: zIndex }}
        {...rest}>
        <div className="euiComboBoxOptionsList__rowWrap">
          {emptyState || optionsList}
        </div>
      </EuiPanel>
    );
  }
}
