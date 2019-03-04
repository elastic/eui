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

export type EuiSelectableListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    options: Option[];
    selectedOptions: Option[];
    searchValue: string;
    optionRef?: () => void;
    /**
     * returns array of selectedOptions
     */
    onOptionClick: (selectedOptions: Option[]) => void;
    /**
     * returns (option, searchValue)
     */
    renderOption?: (option: Option, searchValue?: string) => {};
    width?: number;
    activeOptionIndex?: number;
    onScroll?: () => void;
    /**
     *  row height of default option renderer
     */
    rowHeight: number;
    rootId: (appendix?: string) => void;
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
              // @ts-ignore
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
                  ...rest
                } = option;
                if (isGroupLabel) {
                  return (
                    <div key={key} style={style} {...rest}>
                      {label}
                    </div>
                  );
                }
                return (
                  <EuiSelectableListItem
                    // @ts-ignore
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
    const { onOptionClick, selectedOptions, singleSelection } = this.props;
    if (singleSelection) {
      // @ts-ignore
      selectedOptions.map(option => delete option.checked);
    }
    addedOption.checked = 'on';
    onOptionClick(
      // @ts-ignore
      singleSelection ? [addedOption] : selectedOptions.concat(addedOption)
    );
  };

  private onRemoveOption = (removedOption: Option) => {
    const { onOptionClick, selectedOptions } = this.props;
    delete removedOption.checked;
    onOptionClick(selectedOptions.filter(option => option !== removedOption));
  };
}
