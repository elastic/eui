import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
// eslint-disable-next-line import/named
import { List, AutoSizer, ListProps } from 'react-virtualized';
import { htmlIdGenerator } from '../../../services';
import { EuiSelectableListItem } from './selectable_list_item';
// @ts-ignore
import { EuiHighlight } from '../../highlight';
import { Option } from '../types';

export type EuiSelectableSingleOptionProps = 'always' | boolean;

// Consumer Configurable Props via `EuiSelectable.listProps`
export type EuiSelectableOptionsListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
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
    singleSelection?: EuiSelectableSingleOptionProps;
    /**
     * Any props to send specifically to the react-virtualized `List`
     */
    virtualizedProps?: ListProps;
    /**
     * Adds a border around the list to indicate the bounds;
     * Useful when the list scrolls, otherwise use your own container
     */
    bordered?: boolean;
  };

export type EuiSelectableListProps = EuiSelectableOptionsListProps & {
  /**
   * All possible options
   */
  options: Option[];
  /**
   * Filtered options list (if applicable)
   */
  visibleOptions?: Option[];
  /**
   * Search value to highlight on the option render
   */
  searchValue: string;
  /**
   * Returns the array of options with altered checked state
   */
  onOptionClick: (options: Option[]) => void;
  /**
   * Custom render for the label portion of the option;
   * Takes (option, searchValue), returns ReactNode
   */
  renderOption?: (option: Option, searchValue: string) => ReactNode;
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
  rootId?: (appendix?: string) => string;
};

export class EuiSelectableList extends Component<EuiSelectableListProps> {
  static defaultProps = {
    rowHeight: 32,
    searchValue: '',
  };

  rootId = this.props.rootId || htmlIdGenerator();

  constructor(props: EuiSelectableListProps) {
    super(props);
  }

  render() {
    const {
      className,
      options,
      searchValue,
      onOptionClick,
      renderOption,
      height: forcedHeight,
      virtualizedProps,
      rowHeight,
      activeOptionIndex,
      rootId,
      showIcons,
      singleSelection,
      visibleOptions,
      allowExclusions,
      bordered,
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
            <List
              id={this.rootId('listbox')}
              className="euiSelectableList__list"
              role="listbox"
              width={width}
              height={calculatedHeight || height}
              rowCount={optionArray.length}
              rowHeight={rowHeight}
              scrollToIndex={activeOptionIndex}
              {...virtualizedProps}
              rowRenderer={({ key, index, style }) => {
                const option = optionArray[index];
                const {
                  label,
                  isGroupLabel,
                  checked,
                  disabled,
                  prepend,
                  append,
                  ref,
                  ...optionRest
                } = option;
                if (isGroupLabel) {
                  return (
                    <div
                      className="euiSelectableList__groupLabel"
                      key={key}
                      style={style}
                      {...optionRest}>
                      {prepend}
                      {label}
                      {append}
                    </div>
                  );
                }
                return (
                  <EuiSelectableListItem
                    id={this.rootId(`_option-${index}`)}
                    style={style}
                    key={option.label.toLowerCase()}
                    onClick={() => this.onAddOrRemoveOption(option)}
                    ref={ref ? ref.bind(null, index) : undefined}
                    isFocused={activeOptionIndex === index}
                    title={label}
                    showIcons={showIcons}
                    checked={checked}
                    disabled={disabled}
                    prepend={prepend}
                    append={append}
                    {...optionRest}>
                    {renderOption ? (
                      renderOption(option, searchValue)
                    ) : (
                      <EuiHighlight search={searchValue}>{label}</EuiHighlight>
                    )}
                  </EuiSelectableListItem>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    );
  }

  onAddOrRemoveOption = (option: Option) => {
    if (option.disabled) {
      return;
    }

    const { allowExclusions } = this.props;

    if (option.checked === 'on' && allowExclusions) {
      this.onExcludeOption(option);
    } else if (option.checked === 'on' || option.checked === 'off') {
      this.onRemoveOption(option);
    } else {
      this.onAddOption(option);
    }
  };

  private onAddOption = (addedOption: Option) => {
    const { onOptionClick, options, singleSelection } = this.props;

    const updatedOptions = options.map(option => {
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

  private onRemoveOption = (removedOption: Option) => {
    const { onOptionClick, singleSelection, options } = this.props;

    const updatedOptions = options.map(option => {
      const updatedOption = { ...option };

      if (option === removedOption && singleSelection !== 'always') {
        delete updatedOption.checked;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions);
  };

  private onExcludeOption = (excludedOption: Option) => {
    const { onOptionClick, options } = this.props;
    excludedOption.checked = 'off';

    const updatedOptions = options.map(option => {
      const updatedOption = { ...option };

      if (option === excludedOption) {
        updatedOption.checked = 'off';
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions);
  };
}
