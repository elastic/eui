/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ContextType, ReactNode, RefCallback } from 'react';
import classNames from 'classnames';
import {
  FixedSizeList,
  FixedSizeListProps,
  ListProps,
  ListChildComponentProps,
} from 'react-window';

import {
  RenderWithEuiStylesMemoizer,
  htmlIdGenerator,
} from '../../../services';
import { CommonProps } from '../../common';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiHighlight } from '../../highlight';
import { EuiMark } from '../../mark';
import { EuiText } from '../../text';
import { EuiLoadingSpinner } from '../../loading';
import { EuiI18n } from '../../i18n';
import {
  EuiFilterSelectItem,
  FilterChecked,
} from '../../filter_group/filter_select_item';
import { EuiBadge } from '../../badge';
import { EuiTextTruncate } from '../../text_truncate';
import { EuiInputPopoverWidthContext } from '../../popover/input_popover';

import type { _EuiComboBoxProps } from '../combo_box';
import {
  EuiComboBoxOptionOption,
  EuiComboBoxSingleSelectionShape,
  OptionHandler,
} from '../types';
import { EuiComboBoxOptionAppendPrepend } from '../utils';
import { EuiComboBoxTitle } from './combo_box_title';
import {
  euiComboBoxOptionListStyles,
  LIST_MAX_HEIGHT,
} from './combo_box_options_list.styles';

export type EuiComboBoxOptionsListProps<T> = CommonProps & {
  activeOptionIndex?: number;
  areAllOptionsSelected?: boolean;
  listboxAriaLabel: string;
  /**
   * Creates a custom text option. You can use `{searchValue}` inside your string to better customize your text.
   * It won't show if there's no onCreateOption.
   */
  customOptionText?: string;
  fullWidth?: boolean;
  getSelectedOptionForSearchValue?: (params: {
    isCaseSensitive?: boolean;
    searchValue: string;
    selectedOptions: any[];
  }) => EuiComboBoxOptionOption<T> | undefined;
  isCaseSensitive?: boolean;
  isLoading?: boolean;
  listRef: RefCallback<HTMLDivElement>;
  setListOptionRefs: (ref: HTMLButtonElement | null, index: number) => void;
  matchingOptions: Array<EuiComboBoxOptionOption<T>>;
  onCloseList: (event: Event) => void;
  onCreateOption?: (
    searchValue: string,
    options: Array<EuiComboBoxOptionOption<T>>
  ) => boolean | void;
  onOptionClick?: OptionHandler<T>;
  onOptionEnterKey?: OptionHandler<T>;
  onScroll?: ListProps['onScroll'];
  /**
   * Array of EuiComboBoxOptionOption objects. See {@link EuiComboBoxOptionOption}
   */
  options: Array<EuiComboBoxOptionOption<T>>;
  renderOption?: (
    option: EuiComboBoxOptionOption<T>,
    searchValue: string,
    OPTION_CONTENT_CLASSNAME: string
  ) => ReactNode;
  rootId: ReturnType<typeof htmlIdGenerator>;
  rowHeight: number | 'auto';
  scrollToIndex?: number;
  searchValue: string;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
  singleSelection?: boolean | EuiComboBoxSingleSelectionShape;
  delimiter?: string;
  truncationProps?: _EuiComboBoxProps<T>['truncationProps'];
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
  listRef: FixedSizeList | null = null;

  static contextType = EuiInputPopoverWidthContext;
  declare context: ContextType<typeof EuiInputPopoverWidthContext>;

  static defaultProps = {
    'data-test-subj': '',
    rowHeight: 29, // row height of default option renderer
    isCaseSensitive: false,
  };

  componentDidUpdate(prevProps: EuiComboBoxOptionsListProps<T>) {
    if (
      this.listRef &&
      typeof this.props.activeOptionIndex !== 'undefined' &&
      this.props.activeOptionIndex !== prevProps.activeOptionIndex &&
      this.props.rowHeight !== 'auto'
    ) {
      this.listRef.scrollToItem(this.props.activeOptionIndex, 'auto');
    }
  }

  setListRef = (ref: FixedSizeList | null) => {
    this.listRef = ref;
  };

  ListInnerElement: FixedSizeListProps['innerElementType'] = ({
    children,
    ...rest
  }) => {
    return (
      <div {...rest} {...this.getListInnerElementProps()}>
        {children}
      </div>
    );
  };

  ListRow = ({ data, index, style }: ListChildComponentProps) => {
    const option = data[index];
    const {
      key,
      isGroupLabelOption,
      label,
      value,
      prepend,
      append,
      truncationProps: _truncationProps,
      ...rest
    } = option;
    const {
      singleSelection,
      selectedOptions,
      onOptionClick,
      activeOptionIndex,
      renderOption,
      searchValue,
      rootId,
      matchingOptions,
      setListOptionRefs,
      rowHeight,
    } = this.props;

    const optionIndex = matchingOptions.indexOf(option);

    const hasTruncationProps = this.props.truncationProps || _truncationProps;
    const truncationProps = hasTruncationProps
      ? // Individual truncation settings should override component prop
        { ...this.props.truncationProps, ..._truncationProps }
      : undefined;

    if (isGroupLabelOption) {
      return (
        <div key={key ?? label} style={style}>
          <EuiComboBoxTitle>
            {prepend}
            {label}
            {append}
          </EuiComboBoxTitle>
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
        key={option.key ?? option.label}
        onClick={() => {
          if (onOptionClick) {
            onOptionClick(option);
          }
        }}
        isFocused={optionIsFocused}
        checked={checked}
        showIcons={singleSelection ? true : false}
        truncateContent={rowHeight !== 'auto'}
        id={rootId(`_option-${index}`)}
        title={label}
        aria-setsize={matchingOptions.length}
        aria-posinset={optionIndex + 1}
        forwardRef={(ref) => setListOptionRefs(ref, index)}
        {...rest}
      >
        <span className="euiComboBoxOption__contentWrapper">
          <EuiComboBoxOptionAppendPrepend
            option={option}
            classNamePrefix="euiComboBoxOption"
            marginSize="s"
          >
            {/* Note for possible future refactor: `eui-textTruncate` here
            is redundant beacuse it's already applied in EuiFilterSelectItem */}
            <span
              className={classNames(
                'euiComboBoxOption__content',
                rowHeight !== 'auto' && 'eui-textTruncate'
              )}
            >
              {renderOption
                ? renderOption(
                    option,
                    searchValue,
                    'euiComboBoxOption__renderOption'
                  )
                : rowHeight === 'auto'
                ? this.renderVariableHeightOption(label)
                : this.renderTruncatedOption(label, truncationProps)}
            </span>
          </EuiComboBoxOptionAppendPrepend>
          {optionIsFocused && !optionIsDisabled ? hitEnterBadge : null}
        </span>
      </EuiFilterSelectItem>
    );
  };

  getListInnerElementProps = () => {
    return {
      'aria-label': this.props.listboxAriaLabel,
      id: this.props.rootId('listbox'),
      role: 'listbox',
      tabIndex: 0,
    };
  };

  optionWidth: number | undefined;
  setOptionWidth = (width: number) => {
    this.optionWidth = width;
  };

  renderTruncatedOption = (
    text: string,
    truncationProps?: EuiComboBoxOptionsListProps<T>['truncationProps']
  ) => {
    const searchValue = this.props.searchValue.trim();

    if (!truncationProps && !searchValue) {
      // Default to CSS text-overflow
      return text;
    }

    if (!searchValue) {
      return (
        <EuiTextTruncate
          width={this.optionWidth}
          onResize={this.setOptionWidth}
          {...truncationProps}
          text={text}
        >
          {(text) => text}
        </EuiTextTruncate>
      );
    }

    const searchPositionStart = this.props.isCaseSensitive
      ? text.indexOf(searchValue)
      : text.toLowerCase().indexOf(searchValue.toLowerCase());
    const searchPositionCenter =
      searchPositionStart + Math.floor(searchValue.length / 2);

    return (
      <EuiTextTruncate
        width={this.optionWidth}
        onResize={this.setOptionWidth}
        {...truncationProps}
        // When searching, don't allow overriding the truncation settings
        truncation="startEnd"
        truncationPosition={searchPositionCenter}
        text={text}
      >
        {(text) => this.renderHighlightedOptionText(text, searchValue)}
      </EuiTextTruncate>
    );
  };

  renderVariableHeightOption = (text: string) => {
    const searchValue = this.props.searchValue.trim();

    if (!searchValue) {
      return text;
    }

    return this.renderHighlightedOptionText(text, searchValue);
  };

  renderHighlightedOptionText = (text: string, searchValue: string) => {
    return (
      <>
        {text.length >= searchValue.length ? (
          <EuiHighlight
            search={searchValue}
            strict={this.props.isCaseSensitive}
          >
            {text}
          </EuiHighlight>
        ) : (
          // If the available truncated text is shorter than the full search string,
          // just highlight the entire truncated text
          <EuiMark>{text}</EuiMark>
        )}
      </>
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
      isCaseSensitive,
      isLoading,
      listRef,
      matchingOptions,
      onCloseList,
      onCreateOption,
      onOptionClick,
      onOptionEnterKey,
      onScroll,
      options,
      renderOption,
      rootId,
      rowHeight,
      scrollToIndex,
      searchValue,
      selectedOptions,
      singleSelection,
      delimiter,
      truncationProps,
      listboxAriaLabel,
      setListOptionRefs,
      ...rest
    } = this.props;

    let emptyStateContent: ReactNode;

    if (isLoading) {
      emptyStateContent = (
        <EuiFlexGroup gutterSize="s" justifyContent="center" responsive={false}>
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
          const selectedOptionForValue = getSelectedOptionForSearchValue({
            isCaseSensitive,
            searchValue,
            selectedOptions,
          });
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

    let boundedHeight: number = LIST_MAX_HEIGHT;

    if (rowHeight !== 'auto') {
      const numVisibleOptions =
        matchingOptions.length < 7 ? matchingOptions.length : 7;
      const height = numVisibleOptions * (rowHeight + 1); // Add one for the border
      // bounded by max-height of .euiComboBoxOptionsList
      boundedHeight = height > LIST_MAX_HEIGHT ? LIST_MAX_HEIGHT : height;
    }

    return (
      <RenderWithEuiStylesMemoizer>
        {(stylesMemoizer) => {
          const styles = stylesMemoizer(euiComboBoxOptionListStyles);
          return (
            <div
              css={[
                styles.euiComboBoxOptionList,
                rowHeight === 'auto' && styles.hasRowHeightAuto,
              ]}
              className="euiComboBoxOptionsList"
              data-test-subj={classNames('comboBoxOptionsList', dataTestSubj)}
              ref={listRef}
              {...rest}
            >
              {emptyStateContent ? (
                <EuiText
                  size="xs"
                  css={styles.euiComboBoxOptionsList__empty}
                  className="euiComboBoxOptionsList__empty"
                >
                  {emptyStateContent}
                </EuiText>
              ) : rowHeight === 'auto' ? (
                <div {...this.getListInnerElementProps()}>
                  {matchingOptions.map((_, index) => (
                    <this.ListRow
                      data={matchingOptions}
                      index={index}
                      key={index} // same as FixedSizeList's default
                      style={{}}
                    />
                  ))}
                </div>
              ) : (
                <FixedSizeList
                  css={styles.euiComboBoxOptionList__virtualization}
                  className="euiComboBoxOptionsList__virtualization"
                  height={boundedHeight}
                  onScroll={onScroll}
                  itemCount={matchingOptions.length}
                  itemSize={rowHeight}
                  itemData={matchingOptions}
                  ref={this.setListRef}
                  innerElementType={this.ListInnerElement}
                  width={this.context}
                >
                  {this.ListRow}
                </FixedSizeList>
              )}
            </div>
          );
        }}
      </RenderWithEuiStylesMemoizer>
    );
  }
}
