import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiSelectableSearch } from './selectable_search';
import { EuiSelectableMessage } from './selectable_message';
import { EuiSelectableList } from './selectable_list';
// @ts-ignore
import { getMatchingOptions } from '../combo_box/matching_options';
import { comboBoxKeyCodes } from '../../services';
import { TAB } from '../../services/key_codes';

export type EuiSelectableProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    options: [];
    selectedOptions: [];
    onChange?: () => {};
    searchable?: boolean;
    searchProps?: {};
    singleSelection?: boolean;
  };

export class EuiSelectable extends Component<EuiSelectableProps> {
  static defaultProps = {
    singleSelection: false,
    options: [],
    selectedOptions: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { options, selectedOptions, singleSelection } = nextProps;
    const { searchValue } = prevState;

    // Calculate and cache the options which match the searchValue, because we use this information
    // in multiple places and it would be expensive to calculate repeatedly.
    const visibleOptions = getMatchingOptions(
      options,
      selectedOptions,
      searchValue,
      nextProps.async,
      true
    );
    return { visibleOptions };
  }

  constructor(props: EuiSelectableProps) {
    super(props);
    const { options, selectedOptions, singleSelection } = props;

    this.state = {
      activeOptionIndex: undefined,
      searchValue: '',
      visibleOptions: getMatchingOptions(
        options,
        selectedOptions,
        '',
        props.async,
        true
      ),
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
    this.options = [];
  }

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

      case TAB:
        // Disallow tabbing when the user is navigating the options.
        if (this.hasActiveOption() && this.state.isListOpen) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;

      default:
        if (this.props.onKeyDown) {
          this.props.onKeyDown(e);
        }
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
      ...rest
    } = this.props;

    const { searchValue, visibleOptions, activeOptionIndex } = this.state;

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

    const list = options.length ? (
      <EuiSelectableList
        key="list"
        options={visibleOptions}
        searchValue={searchValue}
        activeOptionIndex={activeOptionIndex}
        onOptionClick={this.onOptionClick}
        singleSelection={singleSelection}
        selectedOptions={selectedOptions}
      />
    ) : (
      <EuiSelectableMessage key="listMessage">Message</EuiSelectableMessage>
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
