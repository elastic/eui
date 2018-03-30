/**
 * Elements within EuiComboBox which would normally be tabbable (inputs, buttons) have been removed
 * from the tab order with tabindex="-1" so that we can control the keyboard navigation interface.
 */

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tabbable from 'tabbable';

import { comboBoxKeyCodes, calculatePopoverPosition } from '../../services';
import { BACKSPACE, TAB, ESCAPE } from '../../services/key_codes';
import { EuiPortal } from '../portal';
import { EuiComboBoxInput } from './combo_box_input';
import { EuiComboBoxOptionsList } from './combo_box_options_list';

import {
  getMatchingOptions,
  flattenOptionGroups,
  getSelectedOptionForSearchValue,
} from './matching_options';

export class EuiComboBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    async: PropTypes.bool,
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    onChange: PropTypes.func,
    onSearchChange: PropTypes.func,
    onCreateOption: PropTypes.func,
  }

  static defaultProps = {
    options: [],
    selectedOptions: [],
  }

  constructor(props) {
    super(props);

    const initialSearchValue = '';
    const { options, selectedOptions } = props;
    const { matchingOptions, optionToGroupMap } = this.getMatchingOptions(options, selectedOptions, initialSearchValue);

    this.state = {
      searchValue: initialSearchValue,
      isListOpen: false,
      listPosition: 'bottom',
      listStyles: {},
    };

    // Cached derived state.
    this.matchingOptions = matchingOptions;
    this.optionToGroupMap = optionToGroupMap;
    this.activeOptionIndex = undefined;
    this.listBounds = undefined;

    // Refs.
    this.comboBox = undefined;
    this.autoSizeInput = undefined;
    this.searchInput = undefined;
    this.optionsList = undefined;
    this.options = [];
  }

  getMatchingOptions = (options, selectedOptions, searchValue) => {
    // Assume the consumer has already filtered the options against the search value.
    const isPreFiltered = this.props.async;
    return getMatchingOptions(options, selectedOptions, searchValue, isPreFiltered);
  };

  openList = () => {
    this.setState({
      isListOpen: true,
    });
  };

  closeList = () => {
    this.clearActiveOption();
    this.setState({
      isListOpen: false,
    });
  };

  updateListPosition = (listBounds = this.listBounds) => {
    if (!this.state.isListOpen) {
      return;
    }

    // Cache for future calls.
    this.listBounds = listBounds;
    const comboBoxBounds = this.comboBox.getBoundingClientRect();
    const { position, left, top } = calculatePopoverPosition(comboBoxBounds, listBounds, 'bottom', 0, ['bottom', 'top']);

    const listStyles = {
      top: top + window.scrollY,
      left,
    };

    this.setState({
      listPosition: position,
      listStyles,
    });
  };

  tabAway = amount => {
    const tabbableItems = tabbable(document);
    const comboBoxIndex = tabbableItems.indexOf(this.searchInput);

    // Wrap to last tabbable if tabbing backwards.
    if (amount < 0) {
      if (comboBoxIndex === 0) {
        tabbableItems[tabbableItems.length - 1].focus();
        return;
      }
    }

    // Wrap to first tabbable if tabbing forwards.
    if (amount > 0) {
      if (comboBoxIndex === tabbableItems.length - 1) {
        tabbableItems[0].focus();
        return;
      }
    }

    tabbableItems[comboBoxIndex + amount].focus();
  };

  incrementActiveOptionIndex = amount => {
    // If there are no options available, reset the focus.
    if (!this.matchingOptions.length) {
      this.clearActiveOption();
      return;
    }

    let nextActiveOptionIndex;

    if (!this.hasActiveOption()) {
      // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
      // either the first or last item.
      nextActiveOptionIndex = amount < 0 ? this.options.length - 1 : 0;
    } else {
      nextActiveOptionIndex = this.activeOptionIndex + amount;

      if (nextActiveOptionIndex < 0) {
        nextActiveOptionIndex = this.options.length - 1;
      } else if (nextActiveOptionIndex === this.options.length) {
        nextActiveOptionIndex = 0;
      }
    }

    this.activeOptionIndex = nextActiveOptionIndex;
    this.focusActiveOption();
  };

  hasActiveOption = () => {
    return this.activeOptionIndex !== undefined;
  };

  clearActiveOption = () => {
    this.activeOptionIndex = undefined;
  };

  focusActiveOption = () => {
    // If an item is focused, focus it.
    if (this.hasActiveOption()) {
      this.options[this.activeOptionIndex].focus();
    }
  };

  clearSearchValue = () => {
    this.onSearchChange('');
  };

  removeLastOption = () => {
    if (this.hasActiveOption()) {
      return;
    }

    if (!this.props.selectedOptions.length) {
      return;
    }

    // Backspace will be used to delete the input, not a pill.
    if (this.state.searchValue.length) {
      return;
    }

    // Delete last pill.
    this.onRemoveOption(this.props.selectedOptions[this.props.selectedOptions.length - 1]);
  };

  addCustomOption = () => {
    if (this.doesSearchMatchOnlyOption()) {
      this.options[0].click();
      return;
    }

    if (!this.props.onCreateOption) {
      return;
    }

    // Don't create the value if it's already been selected.
    if (getSelectedOptionForSearchValue(this.state.searchValue, this.props.selectedOptions)) {
      return;
    }

    // Add new custom pill if this is custom input, even if it partially matches an option..
    if (!this.hasActiveOption() || this.doesSearchMatchOnlyOption()) {
      this.props.onCreateOption(this.state.searchValue, flattenOptionGroups(this.props.options));
      this.clearSearchValue();
    }
  };

  doesSearchMatchOnlyOption = () => {
    const { searchValue } = this.state;
    if (this.matchingOptions.length !== 1) {
      return false;
    }
    return this.matchingOptions[0].value.toLowerCase() === searchValue.toLowerCase();
  };

  areAllOptionsSelected = () => {
    const { options, selectedOptions, async } = this.props;
    // Assume if this is async then there could be infinite options.
    if (async) {
      return false;
    }
    return flattenOptionGroups(options).length === selectedOptions.length;
  };

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case comboBoxKeyCodes.UP:
        e.preventDefault();
        this.incrementActiveOptionIndex(-1);
        break;

      case comboBoxKeyCodes.DOWN:
        e.preventDefault();
        this.incrementActiveOptionIndex(1);
        break;

      case BACKSPACE:
        this.removeLastOption();
        break;

      case ESCAPE:
        // Move focus from options list to input.
        if (this.hasActiveOption()) {
          this.clearActiveOption();
          this.searchInput.focus();
        }
        break;

      case comboBoxKeyCodes.ENTER:
        this.addCustomOption();
        break;

      case TAB:
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) {
          this.tabAway(-1);
        } else {
          this.tabAway(1);
        }
        break;
    }
  };

  onComboBoxClick = () => {
    // When the user clicks anywhere on the box, enter the interaction state.
    this.searchInput.focus();
  };

  onOptionEnterKey = (option) => {
    this.onAddOption(option);
  }

  onOptionClick = (option) => {
    this.onAddOption(option);
  }

  onAddOption = (addedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.concat(addedOption));
    this.clearActiveOption();
    this.clearSearchValue();
    this.searchInput.focus();
  };

  onRemoveOption = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.filter(option => option !== removedOption));
  };

  onComboBoxFocus = (e) => {
    // If the user has tabbed to the combo box, open it.
    if (e.target === this.searchInput) {
      this.searchInput.focus();
      return;
    }

    // If a user clicks on an option without selecting it, then it will take focus
    // and we need to update the index.
    const optionIndex = this.options.indexOf(e.target);
    if (optionIndex !== -1) {
      this.activeOptionIndex = optionIndex;
    }
  };

  onComboBoxBlur = (e) => {
    if (e.relatedTarget && this.comboBox.contains(e.relatedTarget)) return;
    // This callback generally handles cases when the user has taken focus away by clicking outside
    // of the combo box.

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      // If the user has placed focus somewhere outside of the combo box, close it.
      const hasFocus = this.comboBox.contains(document.activeElement) || this.optionsList.contains(document.activeElement);
      if (!hasFocus) {
        this.closeList();
      }
    });
  };

  onSearchChange = (searchValue) => {
    if (this.props.onSearchChange) {
      this.props.onSearchChange(searchValue);
    }
    this.setState({ searchValue });
  };

  comboBoxRef = node => {
    this.comboBox = node;
  };

  autoSizeInputRef = node => {
    this.autoSizeInput = node;
  };

  searchInputRef = node => {
    this.searchInput = node;
  };

  optionsListRef = node => {
    this.optionsList = node;
  };

  optionRef = (index, node) => {
    // Sometimes the node is null.
    if (node) {
      // Store all options.
      this.options[index] = node;
    }
  };

  componentDidMount() {
    // TODO: This will need to be called once the actual stylesheet loads.
    setTimeout(() => {
      this.autoSizeInput.copyInputStyles();
    }, 100);
  }

  componentWillUpdate(nextProps, nextState) {
    const { options, selectedOptions } = nextProps;
    const { searchValue } = nextState;

    if (
      options !== this.props.options
      || selectedOptions !== this.props.selectedOptions
      || searchValue !== this.props.searchValue
    ) {
      // Clear refs to options if the ones we can display changes.
      this.options = [];
    }

    // Calculate and cache the options which match the searchValue, because we use this information
    // in multiple places and it would be expensive to calculate repeatedly.
    const { matchingOptions, optionToGroupMap } = this.getMatchingOptions(options, selectedOptions, nextState.searchValue);
    this.matchingOptions = matchingOptions;
    this.optionToGroupMap = optionToGroupMap;

    if (!matchingOptions.length) {
      this.clearActiveOption();
    }
  }

  componentDidUpdate() {
    this.focusActiveOption();
  }

  render() {
    const {
      className,
      isLoading,
      options,
      selectedOptions,
      onCreateOption,
      onChange, // eslint-disable-line no-unused-vars
      onSearchChange, // eslint-disable-line no-unused-vars
      async, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const { searchValue, isListOpen, listStyles, listPosition } = this.state;

    const classes = classNames('euiComboBox', className, {
      'euiComboBox-isOpen': isListOpen,
    });

    const value = selectedOptions.map(selectedOption => selectedOption.label).join(', ');

    let optionsList;

    if (onChange && isListOpen) {
      optionsList = (
        <EuiPortal>
          <EuiComboBoxOptionsList
            isLoading={isLoading}
            options={options}
            selectedOptions={selectedOptions}
            onCreateOption={onCreateOption}
            searchValue={searchValue}
            matchingOptions={this.matchingOptions}
            optionToGroupMap={this.optionToGroupMap}
            listRef={this.optionsListRef}
            optionRef={this.optionRef}
            onOptionClick={this.onOptionClick}
            onOptionEnterKey={this.onOptionEnterKey}
            areAllOptionsSelected={this.areAllOptionsSelected()}
            getSelectedOptionForSearchValue={getSelectedOptionForSearchValue}
            updatePosition={this.updateListPosition}
            position={listPosition}
            style={listStyles}
          />
        </EuiPortal>
      );
    }

    return (
      <div
        className={classes}
        onBlur={this.onComboBoxBlur}
        onFocus={this.onComboBoxFocus}
        onKeyDown={this.onKeyDown}
        ref={this.comboBoxRef}
        {...rest}
      >
        <EuiComboBoxInput
          selectedOptions={selectedOptions}
          onRemoveOption={this.onRemoveOption}
          onClick={this.onComboBoxClick}
          onChange={this.onSearchChange}
          onFocus={this.openList}
          value={value}
          searchValue={searchValue}
          autoSizeInputRef={this.autoSizeInputRef}
          inputRef={this.searchInputRef}
          updatePosition={this.updateListPosition}
        />

        {optionsList}
      </div>
    );
  }
}
