import React, { Component, HTMLAttributes, ReactNode, createRef } from 'react';
import classNames from 'classnames';
import { orderBy } from 'lodash';
import { CommonProps, Omit } from '../common';
import { EuiSelectableSearch } from './selectable_search';
import { EuiSelectableMessage } from './selectable_message';
import { EuiSelectableList } from './selectable_list';
// @ts-ignore
import { EuiLoadingChart } from '../loading';
// @ts-ignore
import { getMatchingOptions } from '../combo_box/matching_options';
import { comboBoxKeyCodes } from '../../services';
import { TAB } from '../../services/key_codes';
import { EuiI18n } from '../i18n';
import { Option } from './types';
import {
  EuiSelectableOptionsListProps,
  EuiSelectableSingleOptionProps,
} from './selectable_list/selectable_list';

export type EuiSelectableProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> &
  CommonProps & {
    children?: (search: ReactNode, list: ReactNode) => ReactNode;
    options: Option[];
    selectedOptions: Option[];
    onChange?: (selectedOptions: Option[]) => void;
    searchable?: boolean;
    searchProps?: {};
    singleSelection?: EuiSelectableSingleOptionProps;
    sortSelectedToTop: boolean;
    isLoading?: boolean;
    async?: boolean;
    listProps?: EuiSelectableOptionsListProps;
    /**
     * returns (option, searchValue)
     */
    renderOption?: (option: Option, searchValue?: string) => {};
  };

export interface EuiSelectableState {
  activeOptionIndex?: number;
  searchValue: string;
  visibleOptions: Option[];
  selectedOptions: Option[];
  options: Option[];
}

export class EuiSelectable extends Component<
  EuiSelectableProps,
  EuiSelectableState
> {
  static defaultProps = {
    options: [],
    selectedOptions: [],
    singleSelection: false,
    sortSelectedToTop: true,
  };

  private optionsListRef = createRef<EuiSelectableList>();

  constructor(props: EuiSelectableProps) {
    super(props);

    const {
      options,
      selectedOptions,
      sortSelectedToTop,
      singleSelection,
      async,
    } = props;

    const initialSearchValue = '';

    const visibleOptions = getMatchingOptions(
      options,
      selectedOptions,
      initialSearchValue,
      async,
      true
    );

    let sortedOptions;
    if (sortSelectedToTop) {
      sortedOptions = orderBy(visibleOptions, ['checked'], ['asc']);
      // SOMETIMES NOT WORKING! WHY???!!
      // console.log(sortedOptions);
    }

    // ensure that the currently selected single option is active if it is in the visibleOptions
    let activeOptionIndex;
    if (singleSelection && selectedOptions.length === 1) {
      if (visibleOptions.includes(selectedOptions[0])) {
        activeOptionIndex = visibleOptions.indexOf(selectedOptions[0]);
      }
    }

    this.state = {
      options,
      activeOptionIndex,
      searchValue: initialSearchValue,
      visibleOptions: sortedOptions || visibleOptions,
      selectedOptions,
    };
  }

  hasActiveOption = () => {
    return this.state.activeOptionIndex != null;
  };

  onKeyDown = (e: any) => {
    const optionsList = this.optionsListRef.current;

    switch (e.keyCode) {
      case comboBoxKeyCodes.UP:
        e.preventDefault();
        e.stopPropagation();
        this.incrementActiveOptionIndex(-1);
        break;

      case comboBoxKeyCodes.DOWN:
        e.preventDefault();
        e.stopPropagation();
        this.incrementActiveOptionIndex(1);
        break;

      case comboBoxKeyCodes.ENTER:
        e.stopPropagation();
        if (this.state.activeOptionIndex != null && optionsList) {
          optionsList.onAddOrRemoveOption(
            this.state.visibleOptions[this.state.activeOptionIndex]
          );
        }
        break;

      case TAB:
        // Disallow tabbing when the user is navigating the options.
        // TODO: Can we force the tab to the next sibling element?
        if (this.hasActiveOption()) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;

      default:
        if (this.props.onKeyDown) {
          this.props.onKeyDown(e);
        }
        this.clearActiveOption();
    }
  };

  incrementActiveOptionIndex = (amount: number) => {
    // If there are no options available, do nothing.
    if (!this.state.visibleOptions.length) {
      return;
    }

    this.setState(({ activeOptionIndex, visibleOptions }) => {
      let nextActiveOptionIndex;

      if (activeOptionIndex == null) {
        // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
        // either the first or last item.
        nextActiveOptionIndex = amount < 0 ? visibleOptions.length - 1 : 0;
      } else {
        nextActiveOptionIndex = activeOptionIndex + amount;

        if (nextActiveOptionIndex < 0) {
          nextActiveOptionIndex = visibleOptions.length - 1;
        } else if (nextActiveOptionIndex === visibleOptions.length) {
          nextActiveOptionIndex = 0;
        }
      }

      // Group titles are included in option list but are not selectable
      // Skip group title options
      const direction = amount > 0 ? 1 : -1;
      while (visibleOptions[nextActiveOptionIndex].isGroupLabel) {
        nextActiveOptionIndex = nextActiveOptionIndex + direction;

        if (nextActiveOptionIndex < 0) {
          nextActiveOptionIndex = visibleOptions.length - 1;
        } else if (nextActiveOptionIndex === visibleOptions.length) {
          nextActiveOptionIndex = 0;
        }
      }

      return { activeOptionIndex: nextActiveOptionIndex };
    });
  };

  clearActiveOption = () => {
    this.setState({
      activeOptionIndex: undefined,
    });
  };

  onSearchChange = (visibleOptions: [], searchValue: string) => {
    this.setState({
      visibleOptions,
      searchValue,
    });
  };

  onContainerBlur = () => {
    this.clearActiveOption();
  };

  onOptionClick = (options: Option[]) => {
    const selectedOptions = options.filter(option => option.checked);

    this.setState({
      options,
      selectedOptions,
    });
    if (this.props.onChange) {
      this.props.onChange(selectedOptions);
    }
  };

  render() {
    const {
      children,
      className,
      options,
      selectedOptions,
      onChange,
      searchable,
      searchProps,
      singleSelection,
      sortSelectedToTop,
      isLoading,
      listProps,
      renderOption,
      ...rest
    } = this.props;

    const { searchValue, visibleOptions, activeOptionIndex } = this.state;

    let messageContent;

    if (isLoading) {
      messageContent = (
        <p>
          <EuiLoadingChart size="m" mono />
          <br />
          <EuiI18n
            token="euiComboBoxOptionsList.loadingOptions"
            default="Loading options"
          />
        </p>
      );
    } else if (searchValue && visibleOptions.length === 0) {
      messageContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.noMatchingOptions"
            default="{searchValue} doesn't match any options"
            values={{ searchValue: <strong>{searchValue}</strong> }}
          />
        </p>
      );
    } else if (!options.length) {
      messageContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.noAvailableOptions"
            default="No options available"
          />
        </p>
      );
    }

    const classes = classNames('euiSelectable', className);

    const search = searchable ? (
      <EuiSelectableSearch
        key="listSearch"
        options={options}
        onChange={this.onSearchChange}
        {...searchProps}
      />
    ) : (
      undefined
    );

    const list = messageContent ? (
      <EuiSelectableMessage key="listMessage">
        {messageContent}
      </EuiSelectableMessage>
    ) : (
      <EuiSelectableList
        key="list"
        options={options}
        visibleOptions={visibleOptions}
        searchValue={searchValue}
        activeOptionIndex={activeOptionIndex}
        onOptionClick={this.onOptionClick}
        singleSelection={singleSelection}
        ref={this.optionsListRef}
        renderOption={renderOption}
        {...listProps}
      />
    );

    return (
      <div
        className={classes}
        onKeyDown={this.onKeyDown}
        onBlur={this.onContainerBlur}
        {...rest}>
        {children && children(search, list)}
      </div>
    );
  }
}
