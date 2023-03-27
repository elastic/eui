/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  HTMLAttributes,
  ReactNode,
  memo,
  CSSProperties,
} from 'react';
import classNames from 'classnames';
import {
  FixedSizeList,
  ListProps,
  ListChildComponentProps as ReactWindowListChildComponentProps,
  areEqual,
} from 'react-window';
import { CommonProps, ExclusiveUnion } from '../../common';
import { EuiAutoSizer } from '../../auto_sizer';
import { EuiHighlight } from '../../highlight';
import { EuiSelectableOption } from '../selectable_option';
import { EuiSelectableOnChangeEvent } from '../selectable';
import {
  EuiSelectableListItem,
  EuiSelectableListItemProps,
} from './selectable_list_item';

interface ListChildComponentProps<T>
  extends Omit<ReactWindowListChildComponentProps, 'style'> {
  data: Array<EuiSelectableOption<T>>;
  style?: CSSProperties;
}

export type EuiSelectableOptionsListVirtualizedProps = ExclusiveUnion<
  {
    /**
     * Use virtualized rendering for list items with `react-window`.
     * Sets each row's height to the value of `rowHeight`.
     */
    isVirtualized?: true;
    /**
     *  The height of each option in pixels. Defaults to `32`.
     *  Has no effect if `isVirtualized=false`.
     */
    rowHeight: number;
  },
  {
    isVirtualized: false;
  }
>;

// Consumer Configurable Props via `EuiSelectable.listProps`
export type EuiSelectableOptionsListProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * The index of the option to be highlighted as pseudo-focused;
     * Good for use when only one selection is allowed and needing to open
     * directly to that option
     */
    activeOptionIndex?: number;
    /**
     * Show the check/cross selection indicator icons
     */
    showIcons?: boolean;
    singleSelection?: 'always' | boolean;
    /**
     * Any props to send specifically to the react-window `FixedSizeList`
     */
    windowProps?: Partial<ListProps>;
    /**
     * Adds a border around the list to indicate the bounds;
     * Useful when the list scrolls, otherwise use your own container
     */
    bordered?: boolean;
    /**
     * When enabled by setting to either `true` or passing custom text,
     * shows a hollow badge as an append (far right) when the item is focused.
     * The default content when `true` is `↩ to select/deselect/include/exclude`
     */
    onFocusBadge?: EuiSelectableListItemProps['onFocusBadge'];
    /**
     * Padding for the list items.
     */
    paddingSize?: EuiSelectableListItemProps['paddingSize'];
    /**
     * How to handle long text within the item.
     * Wrapping only works if virtualization is off.
     */
    textWrap?: EuiSelectableListItemProps['textWrap'];
  } & EuiSelectableOptionsListVirtualizedProps;

export type EuiSelectableListProps<T> = EuiSelectableOptionsListProps & {
  /**
   * All possible options
   */
  options: Array<EuiSelectableOption<T>>;
  /**
   * Filtered options list (if applicable)
   */
  visibleOptions?: Array<EuiSelectableOption<T>>;
  /**
   * Search value to highlight on the option render
   */
  searchValue: string;
  /**
   * Returns the array of options with altered checked state, the click/keyboard event,
   * and the option that triggered the click/keyboard event
   */
  onOptionClick: (
    options: Array<EuiSelectableOption<T>>,
    event: EuiSelectableOnChangeEvent,
    clickedOption: EuiSelectableOption<T>
  ) => void;
  /**
   * Custom render for the label portion of the option;
   * Takes (option, searchValue), returns ReactNode
   */
  renderOption?: (
    option: EuiSelectableOption<T>,
    searchValue: string
  ) => ReactNode;
  /**
   * Sets the max height in pixels or pass `full` to allow
   * the whole group to fill the height of its container and
   * allows the list grow as well
   */
  height?: number | 'full';
  /**
   * Allow cycling through the on, off and undefined state of option.checked
   * and not just on and undefined
   */
  allowExclusions?: boolean;
  searchable?: boolean;
  makeOptionId: (index: number | undefined) => string;
  listId: string;
  setActiveOptionIndex: (index: number, cb?: () => void) => void;
};

export class EuiSelectableList<T> extends Component<EuiSelectableListProps<T>> {
  static defaultProps = {
    rowHeight: 32,
    searchValue: '',
    isVirtualized: true,
  };

  listRef: FixedSizeList | null = null;
  listBoxRef: HTMLUListElement | null = null;

  setListRef = (ref: FixedSizeList | null) => {
    this.listRef = ref;

    if (ref && this.props.activeOptionIndex) {
      ref.scrollToItem(this.props.activeOptionIndex, 'auto');
    }
  };

  removeScrollableTabStop = (ref: HTMLDivElement | null) => {
    // Firefox adds a tab stop for scrollable containers
    // We handle this inside so need to stop firefox from doing its thing
    if (ref) {
      ref.setAttribute('tabindex', '-1');
    }
  };

  setListBoxRef = (ref: HTMLUListElement | null) => {
    this.listBoxRef = ref;
    const {
      listId,
      searchable,
      singleSelection,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
    } = this.props;

    if (ref) {
      ref.setAttribute('id', listId);
      ref.setAttribute('role', 'listbox');

      if (searchable !== true) {
        ref.setAttribute('tabindex', '0');

        if (singleSelection !== 'always' && singleSelection !== true) {
          ref.setAttribute('aria-multiselectable', 'true');
        }
      }

      if (typeof ariaLabel === 'string') {
        ref.setAttribute('aria-label', ariaLabel);
      } else if (typeof ariaLabelledby === 'string') {
        ref.setAttribute('aria-labelledby', ariaLabelledby);
      }

      if (typeof ariaDescribedby === 'string') {
        ref.setAttribute('aria-describedby', ariaDescribedby);
      }
    }
  };

  componentDidUpdate() {
    const { activeOptionIndex } = this.props;

    if (this.listBoxRef && this.props.searchable !== true) {
      this.listBoxRef.setAttribute(
        'aria-activedescendant',
        `${this.props.makeOptionId(activeOptionIndex)}`
      );
    }

    if (this.listRef && typeof this.props.activeOptionIndex !== 'undefined') {
      this.listRef.scrollToItem(this.props.activeOptionIndex, 'auto');
    }
  }

  constructor(props: EuiSelectableListProps<T>) {
    super(props);
  }

  ariaSetSize = 0;
  ariaPosInSetMap: Record<number, number> = {};

  calculateAriaSetAttrs = (optionArray: Array<EuiSelectableOption<T>>) => {
    this.ariaPosInSetMap = {};
    let latestAriaPosIndex = 0;

    optionArray.forEach((option, index) => {
      if (!option.isGroupLabel) {
        latestAriaPosIndex++;
        this.ariaPosInSetMap[index] = latestAriaPosIndex;
      }
    });

    this.ariaSetSize = latestAriaPosIndex;
  };

  ListRow = memo(({ data, index, style }: ListChildComponentProps<T>) => {
    const option = data[index];
    const { data: optionData, ..._option } = option;
    const {
      label,
      isGroupLabel,
      checked,
      disabled,
      prepend,
      append,
      ref,
      key,
      searchableLabel,
      data: _data,
      ...optionRest
    } = option;

    const {
      activeOptionIndex,
      allowExclusions,
      onFocusBadge,
      paddingSize,
      searchValue,
      showIcons,
      makeOptionId,
      renderOption,
      setActiveOptionIndex,
      searchable,
      textWrap,
    } = this.props;

    if (isGroupLabel) {
      return (
        <li
          role="presentation"
          className="euiSelectableList__groupLabel"
          style={style}
          // @ts-ignore complex
          {...(optionRest as HTMLAttributes<HTMLLIElement>)}
        >
          {prepend}
          {label}
          {append}
        </li>
      );
    }

    const id = makeOptionId(index);

    return (
      <EuiSelectableListItem
        key={id}
        id={id}
        style={style}
        onMouseDown={() => {
          setActiveOptionIndex(index);
        }}
        onClick={(event) => {
          event.persist(); // NOTE: This is needed for React v16 backwards compatibility
          this.onAddOrRemoveOption(option, event);
        }}
        ref={ref ? ref.bind(null, index) : undefined}
        isFocused={activeOptionIndex === index}
        title={searchableLabel || label}
        checked={checked}
        disabled={disabled}
        prepend={prepend}
        append={append}
        aria-posinset={this.ariaPosInSetMap[index]}
        aria-setsize={this.ariaSetSize}
        onFocusBadge={onFocusBadge}
        allowExclusions={allowExclusions}
        showIcons={showIcons}
        paddingSize={paddingSize}
        searchable={searchable}
        textWrap={textWrap}
        {...(optionRest as EuiSelectableListItemProps)}
      >
        {renderOption ? (
          renderOption(
            // @ts-ignore complex
            { ..._option, ...optionData },
            this.props.searchValue
          )
        ) : (
          <EuiHighlight search={searchValue}>{label}</EuiHighlight>
        )}
      </EuiSelectableListItem>
    );
  }, areEqual);

  render() {
    const {
      className,
      options,
      searchValue,
      onOptionClick,
      renderOption,
      height: forcedHeight,
      windowProps,
      rowHeight,
      activeOptionIndex,
      makeOptionId,
      showIcons,
      singleSelection,
      visibleOptions,
      allowExclusions,
      bordered,
      paddingSize,
      searchable,
      onFocusBadge,
      listId,
      setActiveOptionIndex,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      role,
      isVirtualized,
      textWrap,
      ...rest
    } = this.props;

    const optionArray = visibleOptions || options;

    this.calculateAriaSetAttrs(optionArray);

    const heightIsFull = forcedHeight === 'full';

    let calculatedHeight = (heightIsFull ? false : forcedHeight) as
      | false
      | number
      | undefined;

    // If calculatedHeight is still undefined, then calculate it
    if (calculatedHeight === undefined) {
      const maxVisibleOptions = 7;
      const numVisibleOptions = optionArray.length;
      const numVisibleMoreThanMax = optionArray.length > maxVisibleOptions;

      if (numVisibleMoreThanMax) {
        // Show only half of the last one to indicate there's more to scroll to
        calculatedHeight = (maxVisibleOptions - 0.5) * rowHeight!;
      } else {
        calculatedHeight = numVisibleOptions * rowHeight!;
      }
    }

    const classes = classNames(
      'euiSelectableList',
      {
        'euiSelectableList-fullHeight': heightIsFull,
        'euiSelectableList-bordered': bordered,
      },
      className
    );

    return (
      <div className={classes} {...rest}>
        {isVirtualized ? (
          <EuiAutoSizer disableHeight={!heightIsFull}>
            {({ width, height }) => (
              <FixedSizeList
                ref={this.setListRef}
                outerRef={this.removeScrollableTabStop}
                className="euiSelectableList__list"
                data-skip-axe="scrollable-region-focusable"
                width={width}
                height={calculatedHeight || height}
                itemCount={optionArray.length}
                itemData={optionArray}
                itemSize={rowHeight!}
                innerElementType="ul"
                innerRef={this.setListBoxRef}
                {...windowProps}
              >
                {this.ListRow}
              </FixedSizeList>
            )}
          </EuiAutoSizer>
        ) : (
          <div
            className="euiSelectableList__list"
            ref={this.removeScrollableTabStop}
          >
            <ul ref={this.setListBoxRef}>
              {optionArray.map((_, index) =>
                React.createElement(
                  this.ListRow,
                  {
                    key: index,
                    data: optionArray,
                    index,
                  },
                  null
                )
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  onAddOrRemoveOption = (
    option: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    if (option.disabled) {
      return;
    }

    const { allowExclusions, options, visibleOptions = options } = this.props;

    this.props.setActiveOptionIndex(
      visibleOptions.findIndex(({ label }) => label === option.label),
      () => {
        if (option.checked === 'on' && allowExclusions) {
          this.onExcludeOption(option, event);
        } else if (option.checked === 'on' || option.checked === 'off') {
          this.onRemoveOption(option, event);
        } else {
          this.onAddOption(option, event);
        }
      }
    );
  };

  private onAddOption = (
    addedOption: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    const { onOptionClick, options, singleSelection } = this.props;
    let changedOption = { ...addedOption };

    const updatedOptions = options.map((option) => {
      // if singleSelection is enabled, uncheck any selected option(s)
      const updatedOption = { ...option };
      if (singleSelection) {
        delete updatedOption.checked;
      }

      // if this is the now-selected option, check it
      if (option === addedOption) {
        updatedOption.checked = 'on';
        changedOption = updatedOption;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions, event, changedOption);
  };

  private onRemoveOption = (
    removedOption: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    const { onOptionClick, singleSelection, options } = this.props;
    let changedOption = { ...removedOption };

    const updatedOptions = options.map((option) => {
      const updatedOption = { ...option };

      if (option === removedOption && singleSelection !== 'always') {
        delete updatedOption.checked;
        changedOption = updatedOption;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions, event, changedOption);
  };

  private onExcludeOption = (
    excludedOption: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    const { onOptionClick, options } = this.props;
    let changedOption = { ...excludedOption };

    const updatedOptions = options.map((option) => {
      const updatedOption = { ...option };

      if (option === excludedOption) {
        updatedOption.checked = 'off';
        changedOption = updatedOption;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions, event, changedOption);
  };
}
