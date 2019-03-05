import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { List, AutoSizer } from 'react-virtualized';
// @ts-ignore
import { htmlIdGenerator, comboBoxKeyCodes } from '../../../services';
import { EuiSelectableListItem } from './selectable_list_item';
// @ts-ignore
import { EuiHighlight } from '../../highlight';
import { Option } from '../types';

export type EuiSelectableOptionsListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    width?: number;
    activeOptionIndex?: number;
    onScroll?: () => void;
    /**
     *  row height of default option renderer
     */
    rowHeight: number;
    showIcons?: boolean;
    singleSelection?: boolean;
  };

export type EuiSelectableListProps = EuiSelectableOptionsListProps & {
  options: Option[];
  searchValue: string;
  /**
   * returns array the array of options with altered checked state
   */
  onOptionClick: (options: Option[]) => void;
  /**
   * returns (option, searchValue)
   */
  renderOption?: (option: Option, searchValue?: string) => {};
  /**
   *  row height of default option renderer
   */
  rootId: (appendix?: string) => string;
};

export class EuiSelectableList extends Component<EuiSelectableListProps> {
  static defaultProps = {
    rowHeight: 30,
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
      width: forcedWidth,
      onScroll,
      rowHeight,
      activeOptionIndex,
      rootId,
      showIcons,
      singleSelection,
      ...rest
    } = this.props;

    const classes = classNames('euiSelectableList', className);

    const numVisibleOptions = options.length < 7 ? options.length : 7;
    const forcedHeight = (numVisibleOptions + 0.5) * rowHeight;

    return (
      <div className={classes} {...rest}>
        <AutoSizer disableHeight={!!forcedHeight} disableWidth={!!forcedWidth}>
          {({ width, height }) => (
            <List
              id={rootId('listbox')}
              role="listbox"
              width={forcedWidth || width}
              height={forcedHeight || height}
              rowCount={options.length}
              rowHeight={Number(rowHeight)}
              scrollToIndex={activeOptionIndex}
              onScroll={onScroll}
              rowRenderer={({ key, index, style }) => {
                const option = options[index];
                const {
                  label,
                  isGroupLabel,
                  checked,
                  disabled,
                  prepend,
                  append,
                  optionRef,
                  ...optionRest
                } = option;
                if (isGroupLabel) {
                  return (
                    <div key={key} style={style} {...optionRest}>
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
                    ref={optionRef ? optionRef.bind(this, index) : undefined}
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

    if (option.checked === 'on') {
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
    const { onOptionClick, options } = this.props;
    delete removedOption.checked;
    onOptionClick(options);
  };
}
