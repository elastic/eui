/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, HTMLAttributes, ReactNode, memo } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import {
  EuiSelectableListItem,
  EuiSelectableListItemProps,
} from './selectable_list_item';
import { EuiHighlight } from '../../highlight';
import { EuiSelectableOption } from '../selectable_option';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  FixedSizeList,
  ListProps,
  ListChildComponentProps as ReactWindowListChildComponentProps,
  areEqual,
} from 'react-window';

interface ListChildComponentProps<T>
  extends ReactWindowListChildComponentProps {
  data: Array<EuiSelectableOption<T>>;
}

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
     *  The height of each option in pixels. Defaults to `32`
     */
    rowHeight: number;
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
  };

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
   * Returns the array of options with altered checked state
   */
  onOptionClick: (options: Array<EuiSelectableOption<T>>) => void;
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
        ref.setAttribute('aria-labelledby', ariaDescribedby);
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

  ListRow = memo(({ data, index, style }: ListChildComponentProps<T>) => {
    const option = data[index];
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
      ...optionRest
    } = option;

    if (isGroupLabel) {
      return (
        <li
          role="presentation"
          className="euiSelectableList__groupLabel"
          style={style}
          // @ts-ignore complex
          {...(optionRest as HTMLAttributes<HTMLLIElement>)}>
          {prepend}
          {label}
          {append}
        </li>
      );
    }

    const labelCount = data.filter((option) => option.isGroupLabel).length;

    return (
      <EuiSelectableListItem
        id={this.props.makeOptionId(index)}
        style={style}
        key={key || label.toLowerCase()}
        onMouseDown={() => {
          this.props.setActiveOptionIndex(index);
        }}
        onClick={() => this.onAddOrRemoveOption(option)}
        ref={ref ? ref.bind(null, index) : undefined}
        isFocused={this.props.activeOptionIndex === index}
        title={searchableLabel || label}
        checked={checked}
        disabled={disabled}
        prepend={prepend}
        append={append}
        aria-posinset={index + 1 - labelCount}
        aria-setsize={data.length - labelCount}
        onFocusBadge={this.props.onFocusBadge}
        allowExclusions={this.props.allowExclusions}
        showIcons={this.props.showIcons}
        {...(optionRest as EuiSelectableListItemProps)}>
        {this.props.renderOption ? (
          this.props.renderOption(option, this.props.searchValue)
        ) : (
          <EuiHighlight search={this.props.searchValue}>{label}</EuiHighlight>
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
      searchable,
      onFocusBadge,
      listId,
      setActiveOptionIndex,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      ...rest
    } = this.props;

    const optionArray = visibleOptions || options;

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
        calculatedHeight = (maxVisibleOptions - 0.5) * rowHeight;
      } else {
        calculatedHeight = numVisibleOptions * rowHeight;
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
        <AutoSizer disableHeight={!heightIsFull}>
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
              itemSize={rowHeight}
              innerElementType="ul"
              innerRef={this.setListBoxRef}
              {...windowProps}>
              {this.ListRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    );
  }

  onAddOrRemoveOption = (option: EuiSelectableOption<T>) => {
    if (option.disabled) {
      return;
    }

    const { allowExclusions, options, visibleOptions = options } = this.props;

    this.props.setActiveOptionIndex(
      visibleOptions.findIndex(({ label }) => label === option.label),
      () => {
        if (option.checked === 'on' && allowExclusions) {
          this.onExcludeOption(option);
        } else if (option.checked === 'on' || option.checked === 'off') {
          this.onRemoveOption(option);
        } else {
          this.onAddOption(option);
        }
      }
    );
  };

  private onAddOption = (addedOption: EuiSelectableOption<T>) => {
    const { onOptionClick, options, singleSelection } = this.props;

    const updatedOptions = options.map((option) => {
      // if singleSelection is enabled, uncheck any selected option(s)
      const updatedOption = { ...option };
      if (singleSelection) {
        delete updatedOption.checked;
      }

      // if this is the now-selected option, check it
      if (option === addedOption) {
        updatedOption.checked = 'on';
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions);
  };

  private onRemoveOption = (removedOption: EuiSelectableOption<T>) => {
    const { onOptionClick, singleSelection, options } = this.props;

    const updatedOptions = options.map((option) => {
      const updatedOption = { ...option };

      if (option === removedOption && singleSelection !== 'always') {
        delete updatedOption.checked;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions);
  };

  private onExcludeOption = (excludedOption: EuiSelectableOption<T>) => {
    const { onOptionClick, options } = this.props;
    excludedOption.checked = 'off';

    const updatedOptions = options.map((option) => {
      const updatedOption = { ...option };

      if (option === excludedOption) {
        updatedOption.checked = 'off';
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions);
  };
}
