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
    id: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    isLoading: PropTypes.bool,
    async: PropTypes.bool,
    singleSelection: PropTypes.bool,
    noSuggestions: PropTypes.bool,
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    onChange: PropTypes.func,
    onSearchChange: PropTypes.func,
    onCreateOption: PropTypes.func,
    renderOption: PropTypes.func,
    isInvalid: PropTypes.bool,
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

    if (!listBounds) {
      return;
    }

    const comboBoxBounds = this.comboBox.getBoundingClientRect();

    // Cache for future calls. Assign values directly instead of destructuring because listBounds is
    // a DOMRect, not a JS object.
    this.listBounds = {
      bottom: listBounds.bottom,
      height: listBounds.height,
      left: comboBoxBounds.left,
      right: comboBoxBounds.right,
      top: listBounds.top,
      width: comboBoxBounds.width,
      x: listBounds.x,
      y: listBounds.y,
    };

    const { position, left, top } = calculatePopoverPosition(comboBoxBounds, this.listBounds, 'bottom', 0, ['bottom', 'top']);

    this.optionsList.style.top = `${top + window.scrollY}px`;
    this.optionsList.style.left = `${left}px`;
    this.optionsList.style.width = `${comboBoxBounds.width}px`;

    this.setState({
      listPosition: position,
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

  focusSearchInput = () => {
    this.clearActiveOption();
    this.searchInput.focus();
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
      const isOptionCreated = this.props.onCreateOption(this.state.searchValue, flattenOptionGroups(this.props.options));

      // Expect the consumer to be explicit in rejecting a custom option.
      if (isOptionCreated === false) {
        return;
      }

      this.clearSearchValue();
    }
  };

  doesSearchMatchOnlyOption = () => {
    const { searchValue } = this.state;
    if (this.matchingOptions.length !== 1) {
      return false;
    }
    return this.matchingOptions[0].label.toLowerCase() === searchValue.toLowerCase();
  };

  areAllOptionsSelected = () => {
    const { options, selectedOptions, async } = this.props;
    // Assume if this is async then there could be infinite options.
    if (async) {
      return false;
    }
    return flattenOptionGroups(options).length === selectedOptions.length;
  };

  onFocus = () => {
    document.addEventListener('click', this.onDocumentFocusChange);
    document.addEventListener('focusin', this.onDocumentFocusChange);
    this.openList();
  }

  onBlur = () => {
    document.removeEventListener('click', this.onDocumentFocusChange);
    document.removeEventListener('focusin', this.onDocumentFocusChange);
    this.closeList();
  }

  onDocumentFocusChange = event => {
    // Close the list if the combo box has lost focus.
    if (
      this.comboBox === event.target
      || this.comboBox.contains(event.target)
      || this.optionsList === event.target
      || this.optionsList && this.optionsList.contains(event.target)
    ) {
      return;
    }

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      if (document.activeElement === this.searchInput) {
        return;
      }

      this.onBlur();
    });
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
          this.focusSearchInput();
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

  onOptionEnterKey = (option) => {
    this.onAddOption(option);
  }

  onOptionClick = (option) => {
    this.onAddOption(option);
  }

  onAddOption = (addedOption) => {
    const { onChange, selectedOptions, singleSelection } = this.props;
    onChange(singleSelection ? [addedOption] : selectedOptions.concat(addedOption));
    this.clearSearchValue();
    this.focusSearchInput();
  };

  onRemoveOption = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.filter(option => option !== removedOption));
    this.focusSearchInput();
  };

  onComboBoxClick = () => {
    // When the user clicks anywhere on the box, enter the interaction state.
    this.searchInput.focus();
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

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentFocusChange);
    document.removeEventListener('focusin', this.onDocumentFocusChange);
  }

  render() {
    const {
      id,
      className,
      isLoading,
      options,
      selectedOptions,
      onCreateOption,
      placeholder,
      noSuggestions,
      renderOption,
      singleSelection, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onSearchChange, // eslint-disable-line no-unused-vars
      async, // eslint-disable-line no-unused-vars
      isInvalid,
      ...rest
    } = this.props;

    const { searchValue, isListOpen, listPosition } = this.state;

    const classes = classNames('euiComboBox', className, {
      'euiComboBox-isOpen': isListOpen,
      'euiComboBox-isInvalid': isInvalid,
    });

    const value = selectedOptions.map(selectedOption => selectedOption.label).join(', ');

    let optionsList;

    if (!noSuggestions && isListOpen) {
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
            renderOption={renderOption}
          />
        </EuiPortal>
      );
    }

    return (
      <div
        className={classes}
        onFocus={this.onComboBoxFocus}
        onKeyDown={this.onKeyDown}
        ref={this.comboBoxRef}
        {...rest}
      >
        <EuiComboBoxInput
          id={id}
          placeholder={placeholder}
          selectedOptions={selectedOptions}
          onRemoveOption={this.onRemoveOption}
          onClick={this.onComboBoxClick}
          onChange={this.onSearchChange}
          onFocus={this.onFocus}
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
