import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { List, AutoSizer, ListProps } from 'react-virtualized';
// @ts-ignore
import { htmlIdGenerator, comboBoxKeyCodes } from '../../../services';
import { EuiSelectableListItem } from './selectable_list_item';
// @ts-ignore
import { EuiHighlight } from '../../highlight';
import { Option } from '../types';

export type EuiSelectableSingleOptionProps = 'always' | boolean;

export type EuiSelectableOptionsListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * The index of the option to be highlighted as pseudo-focused.
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
   * Custom render for the label portion of the option.
   * Returns (option, searchValue)
   */
  renderOption?: (option: Option, searchValue?: string) => {};
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
  rootId: (appendix?: string) => string;
};

export class EuiSelectableList extends Component<EuiSelectableListProps> {
  static defaultProps = {
    rowHeight: 32,
    rootId: htmlIdGenerator(),
    searchValue: '',
  };

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
      ...rest
    } = this.props;

    const optionArray = visibleOptions || options;

    const heightIsFull = forcedHeight === 'full';

    let calculatedHeight: any = !heightIsFull && forcedHeight;

    // If calculatedHeight is still undefined, then calculate it
    if (!calculatedHeight && !heightIsFull) {
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
      },
      className
    );

    return (
      <div className={classes} {...rest}>
        <AutoSizer disableHeight={!heightIsFull}>
          {({ width, height }) => (
            <List
              id={rootId('listbox')}
              role="listbox"
              width={width}
              height={calculatedHeight || height}
              rowCount={optionArray.length}
              rowHeight={Number(rowHeight)}
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
                    id={rootId(`_option-${index}`)}
                    style={style}
                    key={option.label.toLowerCase()}
                    onClick={() => this.onAddOrRemoveOption(option)}
                    ref={ref ? ref.bind(this, index) : undefined}
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
    if (singleSelection) {
      options.map(option => delete option.checked);
    }
    addedOption.checked = 'on';
    onOptionClick(options);
  };

  private onRemoveOption = (removedOption: Option) => {
    const { onOptionClick, singleSelection, options } = this.props;
    if (singleSelection !== 'always') {
      delete removedOption.checked;
    }
    onOptionClick(options);
  };

  private onExcludeOption = (excludedOption: Option) => {
    const { onOptionClick, options } = this.props;
    excludedOption.checked = 'off';
    onOptionClick(options);
  };
}
