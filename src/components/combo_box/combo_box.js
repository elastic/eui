/**
 * Elements within EuiComboBox which would normally be tabbable (inputs, buttons) have been removed
 * from the tab order with tabindex="-1" so that we can control the keyboard navigation interface.
 */

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { comboBoxKeyCodes, findPopoverPosition, htmlIdGenerator } from '../../services';
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
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    isLoading: PropTypes.bool,
    async: PropTypes.bool,
    singleSelection: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        asPlainText: PropTypes.bool,
      }),
    ]),
    noSuggestions: PropTypes.bool,
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    onChange: PropTypes.func,
    onSearchChange: PropTypes.func,
    onCreateOption: PropTypes.func,
    renderOption: PropTypes.func,
    isInvalid: PropTypes.bool,
    rowHeight: PropTypes.number,
    isClearable: PropTypes.bool,
    fullWidth: PropTypes.bool,
    compressed: PropTypes.bool,
  }

  static defaultProps = {
    options: [],
    selectedOptions: [],
    isClearable: true,
    singleSelection: false,
    fullWidth: false,
    compressed: false,
  }

  constructor(props) {
    super(props);

    const initialSearchValue = '';
    const { options, selectedOptions } = props;

    this.state = {
      matchingOptions: getMatchingOptions(options, selectedOptions, initialSearchValue, props.async),
      listElement: undefined,
      searchValue: initialSearchValue,
      isListOpen: false,
      listPosition: 'bottom',
      activeOptionIndex: undefined,
    };

    this.rootId = htmlIdGenerator();

    // Refs.
    this.comboBox = undefined;
    this.autoSizeInput = undefined;
    this.searchInput = undefined;
    this.optionsList = undefined;
    this.options = [];
  }

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

  updateListPosition = (
    listElement = this.state.listElement
  ) => {
    if (!this._isMounted) {
      return;
    }

    if (!this.state.isListOpen) {
      return;
    }

    if (!listElement) {
      return;
    }

    const comboBoxBounds = this.comboBox.getBoundingClientRect();

    const { position, top } = findPopoverPosition({
      anchor: this.comboBox,
      popover: listElement,
      position: 'bottom',
      allowCrossAxis: false
    });

    this.optionsList.style.top = `${top}px`;
    // listElement doesn't have its width set until after updating the position
    // which means the popover service won't know about the correct width
    // however, we already know where to position the element
    this.optionsList.style.left = `${comboBoxBounds.left + window.pageXOffset}px`;
    this.optionsList.style.width = `${comboBoxBounds.width}px`;

    // Cache for future calls.
    this.setState({
      listElement,
      width: comboBoxBounds.width,
      listPosition: position,
    });
  };

  incrementActiveOptionIndex = amount => {
    // If there are no options available, do nothing.
    if (!this.state.matchingOptions.length) {
      return;
    }

    this.setState(({ activeOptionIndex, matchingOptions }) => {
      let nextActiveOptionIndex;

      if (activeOptionIndex == null) {
        // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
        // either the first or last item.
        nextActiveOptionIndex = amount < 0 ? matchingOptions.length - 1 : 0;
      } else {
        nextActiveOptionIndex = activeOptionIndex + amount;

        if (nextActiveOptionIndex < 0) {
          nextActiveOptionIndex = matchingOptions.length - 1;
        } else if (nextActiveOptionIndex === matchingOptions.length) {
          nextActiveOptionIndex = 0;
        }
      }

      // Group titles are included in option list but are not selectable
      // Skip group title options
      const direction = amount > 0 ? 1 : -1;
      while (matchingOptions[nextActiveOptionIndex].isGroupLabelOption) {
        nextActiveOptionIndex = nextActiveOptionIndex + direction;

        if (nextActiveOptionIndex < 0) {
          nextActiveOptionIndex = matchingOptions.length - 1;
        } else if (nextActiveOptionIndex === matchingOptions.length) {
          nextActiveOptionIndex = 0;
        }
      }

      return { activeOptionIndex: nextActiveOptionIndex };
    });
  };

  hasActiveOption = () => {
    return this.state.activeOptionIndex != null;
  };

  clearActiveOption = () => {
    this.setState({
      activeOptionIndex: undefined,
    });
  };

  clearSearchValue = () => {
    this.onSearchChange('');
  };

  removeLastOption = () => {
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
      this.onAddOption(this.state.matchingOptions[0]);
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
    const isOptionCreated = this.props.onCreateOption(this.state.searchValue, flattenOptionGroups(this.props.options));

    // Expect the consumer to be explicit in rejecting a custom option.
    if (isOptionCreated === false) {
      return;
    }

    this.clearSearchValue();
  };

  doesSearchMatchOnlyOption = () => {
    const { searchValue } = this.state;
    if (this.state.matchingOptions.length !== 1) {
      return false;
    }
    return this.state.matchingOptions[0].label.toLowerCase() === searchValue.toLowerCase();
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
    this.openList();
  }

  onBlur = (e) => {
    // close the options list, unless the use clicked on an option
    const focusedInOptionsList = this.optionsList && this.optionsList.contains(e.relatedTarget);
    const focusedInInput = this.comboBox && this.comboBox.contains(e.relatedTarget);
    if (!focusedInOptionsList && !focusedInInput) {
      this.closeList();
    }

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onComboBoxLoseFocus = e => {
    if (!this.comboBox || !this.comboBox.contains(e.relatedTarget)) {
      this.closeList();
    }
  }

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case comboBoxKeyCodes.UP:
        e.preventDefault();
        e.stopPropagation();
        if (this.state.isListOpen) {
          this.incrementActiveOptionIndex(-1);
        } else {
          this.openList();
        }
        break;

      case comboBoxKeyCodes.DOWN:
        e.preventDefault();
        e.stopPropagation();
        if (this.state.isListOpen) {
          this.incrementActiveOptionIndex(1);
        } else {
          this.openList();
        }
        break;

      case BACKSPACE:
        e.stopPropagation();
        this.removeLastOption();
        break;

      case ESCAPE:
        e.stopPropagation();
        this.closeList();
        break;

      case comboBoxKeyCodes.ENTER:
        e.stopPropagation();
        if (this.hasActiveOption()) {
          this.onAddOption(this.state.matchingOptions[this.state.activeOptionIndex]);
        } else {
          this.addCustomOption();
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
    }
  };

  onOptionEnterKey = (option) => {
    this.onAddOption(option);
  }

  onOptionClick = (option) => {
    this.onAddOption(option);
  }

  onAddOption = (addedOption) => {
    if (addedOption.disabled) {
      return;
    }

    const { onChange, selectedOptions, singleSelection } = this.props;
    onChange(singleSelection ? [addedOption] : selectedOptions.concat(addedOption));

    this.clearSearchValue();

    if (singleSelection) {
      this.closeList();
      this.searchInput.blur();
      return;
    }

    this.clearActiveOption();
    this.searchInput.focus();
  };

  onRemoveOption = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.filter(option => option !== removedOption));

    this.clearActiveOption();
  };

  clearSelectedOptions = () => {
    this.props.onChange([]);
    // Clicking the clear button will also cause it to disappear. This would result in focus
    // shifting unexpectedly to the body element so we set it to the input which is more reasonable,
    this.searchInput.focus();
  }

  onComboBoxClick = () => {
    // When the user clicks anywhere on the box, enter the interaction state.
    this.searchInput.focus();
    // If the user does this from a state in which an option has focus, then we need to clear it.
    this.clearActiveOption();
  };

  onOpenListClick = () => {
    this.searchInput.focus();
  };

  onCloseListClick = () => {
    this.closeList();
  };

  onSearchChange = (searchValue) => {
    if (this.props.onSearchChange) {
      this.props.onSearchChange(searchValue);
    }
    this.setState({ searchValue });
  };

  comboBoxRef = node => {
    this.comboBox = node;
    if (this.comboBox) {
      const comboBoxBounds = this.comboBox.getBoundingClientRect();
      this.setState({
        width: comboBoxBounds.width,
      });
    }
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
    this.options[index] = node;
  };

  toggleButtonRef = node => {
    this.toggleButton = node;
  };

  componentDidMount() {
    this._isMounted = true;

    // TODO: This will need to be called once the actual stylesheet loads.
    setTimeout(() => {
      if (this.autoSizeInput) {
        this.autoSizeInput.copyInputStyles();
      }
    }, 100);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { options, selectedOptions } = nextProps;
    const { searchValue } = prevState;

    // Calculate and cache the options which match the searchValue, because we use this information
    // in multiple places and it would be expensive to calculate repeatedly.
    const matchingOptions = getMatchingOptions(options, selectedOptions, searchValue, nextProps.async);

    return { matchingOptions };
  }

  updateMatchingOptionsIfDifferent(newMatchingOptions) {
    const { matchingOptions } = this.state;

    let areOptionsDifferent = false;

    if (matchingOptions.length !== newMatchingOptions.length) {
      areOptionsDifferent = true;
    } else {
      for (let i = 0; i < matchingOptions.length; i++) {
        if (matchingOptions[i].label !== newMatchingOptions[i].label) {
          areOptionsDifferent = true;
          break;
        }
      }
    }

    if (areOptionsDifferent) {
      this.options = [];
      this.setState({ matchingOptions: newMatchingOptions });

      if (!newMatchingOptions.length) {
        // Prevent endless setState -> componentWillUpdate -> setState loop.
        if (this.hasActiveOption()) {
          this.clearActiveOption();
        }
      }
    }
  }

  componentDidUpdate() {
    const { options, selectedOptions } = this.props;
    const { searchValue } = this.state;

    // React 16.3 has a bug (fixed in 16.4) where getDerivedStateFromProps
    // isn't called after a state change, and we track `searchValue` in state
    // instead we need to react to a change in searchValue here
    this.updateMatchingOptionsIfDifferent(getMatchingOptions(options, selectedOptions, searchValue, this.props.async));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      id,
      isDisabled,
      className,
      isLoading,
      options,
      selectedOptions,
      onCreateOption,
      placeholder,
      noSuggestions,
      renderOption,
      singleSelection,
      onChange, // eslint-disable-line no-unused-vars
      onSearchChange, // eslint-disable-line no-unused-vars
      async, // eslint-disable-line no-unused-vars
      isInvalid,
      rowHeight,
      isClearable,
      fullWidth,
      compressed,
      'data-test-subj': dataTestSubj,
      ...rest
    } = this.props;

    const { searchValue, isListOpen, listPosition, width, activeOptionIndex } = this.state;

    const classes = classNames('euiComboBox', className, {
      'euiComboBox-isOpen': isListOpen,
      'euiComboBox-isInvalid': isInvalid,
      'euiComboBox-isDisabled': isDisabled,
      'euiComboBox--fullWidth': fullWidth,
      'euiComboBox--compressed': compressed,
    });

    const value = selectedOptions.map(selectedOption => selectedOption.label).join(', ');

    let optionsList;

    if (!noSuggestions && isListOpen) {
      const optionsListDataTestSubj = dataTestSubj ? `${dataTestSubj}-optionsList` : undefined;

      optionsList = (
        <EuiPortal>
          <EuiComboBoxOptionsList
            isLoading={isLoading}
            options={options}
            selectedOptions={selectedOptions}
            onCreateOption={onCreateOption}
            searchValue={searchValue}
            matchingOptions={this.state.matchingOptions}
            activeOptionIndex={this.state.activeOptionIndex}
            listRef={this.optionsListRef}
            optionRef={this.optionRef}
            onOptionClick={this.onOptionClick}
            onOptionEnterKey={this.onOptionEnterKey}
            areAllOptionsSelected={this.areAllOptionsSelected()}
            getSelectedOptionForSearchValue={getSelectedOptionForSearchValue}
            updatePosition={this.updateListPosition}
            position={listPosition}
            renderOption={renderOption}
            width={width}
            scrollToIndex={activeOptionIndex}
            rowHeight={rowHeight}
            data-test-subj={optionsListDataTestSubj}
            fullWidth={fullWidth}
            rootId={this.rootId}
          />
        </EuiPortal>
      );
    }

    return (
      <div
        {...rest}
        className={classes}
        onKeyDown={this.onKeyDown}
        ref={this.comboBoxRef}
        data-test-subj={dataTestSubj}
        onBlur={this.onBlur}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isListOpen}
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
          onClear={isClearable && !isDisabled ? this.clearSelectedOptions : undefined}
          hasSelectedOptions={selectedOptions.length > 0}
          isListOpen={isListOpen}
          onOpenListClick={this.onOpenListClick}
          onCloseListClick={this.onCloseListClick}
          singleSelection={singleSelection}
          isDisabled={isDisabled}
          toggleButtonRef={this.toggleButtonRef}
          fullWidth={fullWidth}
          noIcon={!!noSuggestions}
          rootId={this.rootId}
          focusedOptionId={this.hasActiveOption() ? this.rootId(`_option-${this.state.activeOptionIndex}`) : null}
          compressed={compressed}
        />

        {optionsList}
      </div>
    );
  }
}
