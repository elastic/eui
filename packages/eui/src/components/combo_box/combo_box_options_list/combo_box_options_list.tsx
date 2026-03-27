/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  ContextType,
  ReactNode,
  RefCallback,
  RefObject,
  createRef,
} from 'react';
import classNames from 'classnames';
import {
  ListProps,
  ListChildComponentProps,
  VariableSizeList,
  VariableSizeListProps,
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
import { FilterChecked } from '../../filter_group/filter_select_item';
import { euiSelectableListGroupLabelStyles } from '../../selectable/selectable_list/selectable_list.styles';
import { getListItemSize } from '../../selectable/selectable_list/utils/get_list_item_size';
import { EuiBadge } from '../../badge';
import { EuiTextTruncate } from '../../text_truncate';
import { EuiInputPopoverWidthContext } from '../../popover/input_popover';
import { EuiListItemLayout } from '../../list_item_layout';

import type { _EuiComboBoxProps } from '../combo_box';
import {
  EuiComboBoxOptionOption,
  EuiComboBoxSingleSelectionShape,
  OptionHandler,
} from '../types';
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
  setListOptionRefs: (ref: HTMLLIElement | null, index: number) => void;
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
  onFocusBadge?: boolean;
};

const hitEnterBadge = (
  <EuiBadge
    className="euiComboBoxOption__enterBadge"
    color="hollow"
    iconType="return"
    aria-hidden="true"
  />
);

export class EuiComboBoxOptionsList<T> extends Component<
  EuiComboBoxOptionsListProps<T>
> {
  listRef: VariableSizeList | null = null;
  listBoxRef: RefObject<HTMLUListElement> = createRef();
  optionRefs: Record<number, HTMLLIElement | null> = {};

  static contextType = EuiInputPopoverWidthContext;
  declare context: ContextType<typeof EuiInputPopoverWidthContext>;

  static defaultProps = {
    'data-test-subj': '',
    rowHeight: 29, // row height of default option renderer
    isCaseSensitive: false,
  };

  componentDidUpdate(prevProps: EuiComboBoxOptionsListProps<T>) {
    const { activeOptionIndex, rowHeight } = this.props;

    if (
      this.listRef &&
      typeof activeOptionIndex !== 'undefined' &&
      activeOptionIndex !== prevProps.activeOptionIndex &&
      rowHeight !== 'auto'
    ) {
      // NOTE: The 'auto' setting results in the item being scrolled to the top/end edge;
      // We could consider changing it to 'center' to keep items further way from the listbox edges.
      this.listRef.scrollToItem(activeOptionIndex, 'auto');
    } else if (rowHeight === 'auto') {
      this.optionRefs[activeOptionIndex ?? 0]?.scrollIntoView?.({
        block: 'nearest',
      });
    }
  }

  setListRef = (ref: VariableSizeList | null) => {
    this.listRef = ref;
  };

  setOptionRef = (ref: HTMLLIElement | null, index: number) => {
    this.optionRefs[index] = ref;
    this.props.setListOptionRefs?.(ref, index);
  };

  ListInnerElement: VariableSizeListProps['innerElementType'] = ({
    children,
    ...rest
  }) => {
    return (
      <ul {...rest} {...this.getListInnerElementProps()}>
        {children}
      </ul>
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
      toolTipContent,
      toolTipProps,
      ...rest
    } = option;
    const {
      options,
      singleSelection,
      selectedOptions,
      onOptionClick,
      activeOptionIndex,
      renderOption,
      searchValue,
      rootId,
      matchingOptions,
      onFocusBadge,
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
        <RenderWithEuiStylesMemoizer>
          {(stylesMemoizer) => {
            const styles = stylesMemoizer(euiSelectableListGroupLabelStyles);

            return (
              <li
                key={key ?? label}
                style={style}
                role="presentation"
                className="euiComboBoxTitle"
                css={styles.groupLabel}
              >
                {prepend}
                {label}
                {append}
              </li>
            );
          }}
        </RenderWithEuiStylesMemoizer>
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
    const hasOnFocusBadge =
      onFocusBadge && optionIsFocused && !optionIsDisabled;

    return (
      <EuiListItemLayout
        component="li"
        role="option"
        // uses `aria-selected` over `aria-checked` for multi-selection as the selected options are removed from the list
        selectionMode="selected"
        className="euiComboBoxOption"
        ref={(node: HTMLLIElement | null) => this.setOptionRef(node, index)}
        // uses the original `options` array for the index to ensure a stable `id`, otherwise `aria-activedescendant`
        // loses focus on selecting an option (due to actively removing it from the list)
        id={rootId(`_option-${options.indexOf(option)}`)}
        key={option.key ?? option.label}
        title={label}
        prepend={option.prepend}
        append={
          hasOnFocusBadge ? (
            <>
              {option.append}
              {hitEnterBadge}
            </>
          ) : (
            option.append
          )
        }
        checked={checked}
        isFocused={optionIsFocused}
        isSelected={!optionIsDisabled && checked !== undefined}
        isDisabled={optionIsDisabled}
        isSingleSelection={!!singleSelection}
        showIndicator={!!singleSelection}
        textWrap={rowHeight !== 'auto' ? 'truncate' : 'wrap'}
        tooltipProps={
          toolTipContent
            ? {
                ...toolTipProps,
                content: toolTipContent,
              }
            : undefined
        }
        style={style}
        aria-setsize={matchingOptions.length}
        aria-posinset={optionIndex + 1}
        contentProps={{
          className: 'euiComboBoxOption__content',
        }}
        onClick={() => {
          if (onOptionClick) {
            onOptionClick(option);
          }
        }}
        {...rest}
      >
        {renderOption
          ? renderOption(option, searchValue, 'euiComboBoxOption__renderOption')
          : rowHeight === 'auto'
          ? this.renderVariableHeightOption(label)
          : this.renderTruncatedOption(label, truncationProps)}
      </EuiListItemLayout>
    );
  };

  getListInnerElementProps = () => {
    return {
      'aria-label': this.props.listboxAriaLabel,
      id: this.props.rootId('listbox'),
      role: 'listbox',
      'aria-multiselectable':
        this.props.singleSelection === false ? true : undefined,
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

  getItemSize = (index: number): number => {
    const { rowHeight } = this.props as { rowHeight: number };
    const option = this.props.matchingOptions[index];

    return getListItemSize(index, rowHeight, !!option?.isGroupLabelOption);
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
      onFocusBadge,
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

    /* We need to consider the panel padding (2 * 8px) but should only subtract it if
    the panel width has already been set. */
    const listWidth =
      this.context && this.context > 0 ? this.context - 16 : this.context;

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
                <ul ref={this.listBoxRef} {...this.getListInnerElementProps()}>
                  {matchingOptions.map((_, index) => (
                    <this.ListRow
                      data={matchingOptions}
                      index={index}
                      key={index} // same as VariableSizeList's default
                      style={{}}
                    />
                  ))}
                </ul>
              ) : (
                <VariableSizeList
                  css={styles.euiComboBoxOptionList__virtualization}
                  className="euiComboBoxOptionsList__virtualization"
                  height={boundedHeight}
                  onScroll={onScroll}
                  itemCount={matchingOptions.length}
                  itemSize={this.getItemSize}
                  itemData={matchingOptions}
                  // Prevents scrollbar jump before VariableSizeList populates the cached size
                  estimatedItemSize={rowHeight}
                  ref={this.setListRef}
                  innerElementType={this.ListInnerElement}
                  width={listWidth}
                >
                  {this.ListRow}
                </VariableSizeList>
              )}
            </div>
          );
        }}
      </RenderWithEuiStylesMemoizer>
    );
  }
}
