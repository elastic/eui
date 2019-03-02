import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { List, AutoSizer } from 'react-virtualized';
// @ts-ignore
import { htmlIdGenerator, comboBoxKeyCodes } from '../../../services';
import { EuiSelectableListItem } from './selectable_list_item';
// @ts-ignore
import { EuiHighlight } from '../../highlight';

export type EuiSelectableListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    options: [];
    selectedOptions: [];
    searchValue: string;
    optionRef?: () => {};
    /**
     * returns option object
     */
    onOptionClick?: (option: {}) => {};
    /**
     * returns (option, searchValue)
     */
    renderOption?: (option: {}, searchValue?: string) => {};
    width?: number;
    activeOptionIndex?: number;
    onScroll?: () => {};
    /**
     *  row height of default option renderer
     */
    rowHeight: number;
    rootId: (appendix?: string) => {};
    showIcons?: boolean;
    singleSelection?: boolean;
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

  onAddOrRemoveOption = option => {
    if (option.disabled) {
      return;
    }

    if (option.checked === 'on' && !this.props.singleSelection) {
      this.onRemoveOption(option);
    } else {
      this.onAddOption(option);
    }
  };

  onAddOption = addedOption => {
    const { onOptionClick, selectedOptions, singleSelection } = this.props;
    addedOption.checked = 'on';
    onOptionClick(
      singleSelection ? [addedOption] : selectedOptions.concat(addedOption)
    );
  };

  onRemoveOption = removedOption => {
    const { onOptionClick, selectedOptions } = this.props;
    delete removedOption.checked;
    onOptionClick(selectedOptions.filter(option => option !== removedOption));
  };

  render() {
    const {
      className,
      options,
      searchValue,
      optionRef,
      onOptionClick,
      renderOption,
      width: forcedWidth,
      onScroll,
      rowHeight,
      activeOptionIndex,
      rootId,
      showIcons,
      selectedOptions,
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
                const { value, label, isGroupLabelOption, ...rest } = option;
                if (isGroupLabelOption) {
                  return (
                    <div key={key} style={style}>
                      {label}
                    </div>
                  );
                }
                return (
                  <EuiSelectableListItem
                    style={style}
                    key={option.label.toLowerCase()}
                    onClick={() => this.onAddOrRemoveOption(option)}
                    ref={optionRef ? optionRef.bind(this, index) : undefined}
                    isFocused={activeOptionIndex === index}
                    id={rootId(`_option-${index}`)}
                    title={label}
                    showIcons={showIcons}
                    {...rest}>
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
}
