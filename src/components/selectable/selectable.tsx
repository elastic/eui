import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { orderBy } from 'lodash';
import { CommonProps } from '../common';
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

export type EuiSelectableProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    options: [];
    selectedOptions: [];
    onChange?: () => {};
    searchable?: boolean;
    searchProps?: {};
    singleSelection?: boolean;
    sortSelectedToTop: boolean;
    isLoading?: boolean;
  };

export class EuiSelectable extends Component<EuiSelectableProps> {
  static defaultProps = {
    options: [],
    selectedOptions: [],
    singleSelection: false,
    sortSelectedToTop: true,
  };

  constructor(props: EuiSelectableProps) {
    super(props);
    const {
      options,
      selectedOptions,
      sortSelectedToTop,
      singleSelection,
    } = props;
    const initialSearchValue = '';

    const visibleOptions = getMatchingOptions(
      options,
      selectedOptions,
      initialSearchValue,
      props.async,
      true
    );

    let sortedOptions;
    if (sortSelectedToTop) {
      sortedOptions = orderBy(visibleOptions, ['checked'], ['asc']);
      // NOT WORKING! WHY???!!
      // console.log(sortedOptions);
    }

    this.state = {
      activeOptionIndex: undefined,
      searchValue: initialSearchValue,
      visibleOptions: sortedOptions || visibleOptions,
    };

    // ensure that the currently selected single option is active if it is in the visibleOptions
    if (singleSelection && selectedOptions.length === 1) {
      if (this.state.visibleOptions.includes(selectedOptions[0])) {
        this.state.activeOptionIndex = this.state.visibleOptions.indexOf(
          selectedOptions[0]
        );
      }
    }

    // Refs.
    // this.searchInput = undefined;
    // this.options = [];
    this.optionsList = undefined;
  }

  optionsListRef = node => {
    this.optionsList = node;
  };

  hasActiveOption = () => {
    return this.state.activeOptionIndex != null;
  };

  onKeyDown = e => {
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
        if (this.hasActiveOption() && this.optionsList) {
          this.optionsList.onAddOrRemoveOption(
            this.state.visibleOptions[this.state.activeOptionIndex]
          );
        }
        break;

      case TAB:
        // Disallow tabbing when the user is navigating the options.
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
      while (visibleOptions[nextActiveOptionIndex].isGroupLabelOption) {
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

  onOptionClick = selectedOptions => {
    this.setState({
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
        selectedOptions={selectedOptions}
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
        options={visibleOptions}
        searchValue={searchValue}
        activeOptionIndex={activeOptionIndex}
        onOptionClick={this.onOptionClick}
        singleSelection={singleSelection}
        selectedOptions={selectedOptions}
        ref={this.optionsListRef}
      />
    );

    return (
      <div
        className={classes}
        onKeyDown={this.onKeyDown}
        onBlur={this.onContainerBlur}
        {...rest}>
        {children([search, list])}
      </div>
    );
  }
}
