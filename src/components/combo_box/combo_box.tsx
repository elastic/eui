/**
 * Elements within EuiComboBox which would normally be tabbable (inputs, buttons) have been removed
 * from the tab order with tabindex={-1} so that we can control the keyboard navigation interface.
 */
/* eslint-disable jsx-a11y/role-has-required-aria-props */

import React, {
  Component,
  FocusEventHandler,
  KeyboardEventHandler,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import {
  comboBoxKeyCodes,
  findPopoverPosition,
  htmlIdGenerator,
} from '../../services';
import { BACKSPACE, TAB, ESCAPE } from '../../services/key_codes';
import { EuiPortal } from '../portal';
import { EuiComboBoxOptionsList } from './combo_box_options_list';

import {
  getMatchingOptions,
  flattenOptionGroups,
  getSelectedOptionForSearchValue,
} from './matching_options';
import {
  EuiComboBoxInputProps,
  EuiComboBoxInput,
} from './combo_box_input/combo_box_input';
import { EuiComboBoxOptionsListProps } from './combo_box_options_list/combo_box_options_list';
import {
  UpdatePositionHandler,
  OptionHandler,
  RefCallback,
  RefInstance,
  EuiComboBoxOptionOption,
  EuiComboBoxOptionsListPosition,
  EuiComboBoxSingleSelectionShape,
} from './types';
import { EuiFilterSelectItem } from '../filter_group';
import AutosizeInput from 'react-input-autosize';
import { CommonProps } from '../common';

type DrillProps<T> = Pick<
  EuiComboBoxOptionsListProps<T>,
  'onCreateOption' | 'options' | 'renderOption' | 'selectedOptions'
>;

export interface EuiComboBoxProps<T>
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    DrillProps<T> {
  'data-test-subj'?: string;
  async: boolean;
  className?: string;
  compressed: boolean;
  fullWidth: boolean;
  id?: string;
  inputRef?: RefCallback<HTMLInputElement>;
  isClearable: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  noSuggestions?: boolean;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  onChange?: (options: Array<EuiComboBoxOptionOption<T>>) => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onSearchChange?: (searchValue: string, hasMatchingOptions?: boolean) => void;
  placeholder?: string;
  rowHeight?: number;
  singleSelection: boolean | EuiComboBoxSingleSelectionShape;
}

interface EuiComboBoxState<T> {
  activeOptionIndex: number;
  hasFocus: boolean;
  isListOpen: boolean;
  listElement?: RefInstance<HTMLDivElement>;
  listPosition: EuiComboBoxOptionsListPosition;
  matchingOptions: Array<EuiComboBoxOptionOption<T>>;
  searchValue: string;
  width: number;
}

const initialSearchValue = '';

export class EuiComboBox<T> extends Component<
  EuiComboBoxProps<T>,
  EuiComboBoxState<T>
> {
  static defaultProps = {
    async: false,
    compressed: false,
    fullWidth: false,
    isClearable: true,
    options: [],
    selectedOptions: [],
    singleSelection: false,
  };

  state: EuiComboBoxState<T> = {
    activeOptionIndex: -1,
    hasFocus: false,
    isListOpen: false,
    listElement: null,
    listPosition: 'bottom',
    matchingOptions: getMatchingOptions<T>(
      this.props.options,
      this.props.selectedOptions,
      initialSearchValue,
      this.props.async,
      Boolean(this.props.singleSelection)
    ),
    searchValue: initialSearchValue,
    width: 0,
  };

  _isMounted = false;
  rootId = htmlIdGenerator();

  // Refs
  comboBoxRefInstance: RefInstance<HTMLDivElement> = null;
  comboBoxRefCallback: RefCallback<HTMLDivElement> = ref => {
    // IE11 doesn't support the `relatedTarget` event property for blur events
    // but does add it for focusout. React doesn't support `onFocusOut` so here we are.
    if (this.comboBoxRefInstance) {
      this.comboBoxRefInstance.removeEventListener(
        'focusout',
        this.onContainerBlur
      );
    }

    this.comboBoxRefInstance = ref;

    if (this.comboBoxRefInstance) {
      this.comboBoxRefInstance.addEventListener(
        'focusout',
        this.onContainerBlur
      );
      const comboBoxBounds = this.comboBoxRefInstance.getBoundingClientRect();
      this.setState({
        width: comboBoxBounds.width,
      });
    }
  };
  autoSizeInputRefInstance: RefInstance<AutosizeInput & HTMLDivElement> = null;
  autoSizeInputRefCallback: RefCallback<
    AutosizeInput & HTMLDivElement
  > = ref => {
    this.autoSizeInputRefInstance = ref;
  };

  searchInputRefInstance: RefInstance<HTMLInputElement> = null;
  searchInputRefCallback: RefCallback<HTMLInputElement> = ref => {
    this.searchInputRefInstance = ref;
  };

  listRefInstance: RefInstance<HTMLDivElement> = null;
  listRefCallback: RefCallback<HTMLDivElement> = ref => {
    this.listRefInstance = ref;
  };

  toggleButtonRefInstance: RefInstance<
    HTMLButtonElement | HTMLSpanElement
  > = null;
  toggleButtonRefCallback: RefCallback<
    HTMLButtonElement | HTMLSpanElement
  > = ref => {
    this.toggleButtonRefInstance = ref;
  };

  optionsRefInstances: Array<RefInstance<EuiFilterSelectItem>> = [];
  optionRefCallback: EuiComboBoxOptionsListProps<T>['optionRef'] = (
    index,
    ref
  ) => {
    this.optionsRefInstances[index] = ref;
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

  updatePosition: UpdatePositionHandler = (
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

    // it's possible that updateListPosition is called when listElement is becoming visible, but isn't yet
    const listElementBounds = listElement.getBoundingClientRect();
    if (listElementBounds.width === 0 || listElementBounds.height === 0) {
      return;
    }

    if (!this.comboBoxRefInstance) {
      return;
    }

    const comboBoxBounds = this.comboBoxRefInstance.getBoundingClientRect();

    const { position, top } = findPopoverPosition({
      allowCrossAxis: false,
      anchor: this.comboBoxRefInstance,
      popover: listElement,
      position: 'bottom',
    }) as { position: 'bottom'; top: number };

    if (this.listRefInstance) {
      this.listRefInstance.style.top = `${top}px`;
      // listElement doesn't have its width set until after updating the position
      // which means the popover service won't know about the correct width
      // however, we already know where to position the element
      this.listRefInstance.style.left = `${comboBoxBounds.left +
        window.pageXOffset}px`;
      this.listRefInstance.style.width = `${comboBoxBounds.width}px`;
    }

    // Cache for future calls.
    this.setState({
      listElement,
      listPosition: position,
      width: comboBoxBounds.width,
    });
  };

  incrementActiveOptionIndex = (amount: number) => {
    // If there are no options available, do nothing.
    if (!this.state.matchingOptions.length) {
      return;
    }

    this.setState(({ activeOptionIndex, matchingOptions }) => {
      let nextActiveOptionIndex;

      if (activeOptionIndex < 0) {
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
    return (
      this.state.activeOptionIndex > -1 &&
      this.state.activeOptionIndex < this.state.matchingOptions.length
    );
  };

  clearActiveOption = () => {
    this.setState({
      activeOptionIndex: -1,
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
    this.onRemoveOption(
      this.props.selectedOptions[this.props.selectedOptions.length - 1]
    );

    if (Boolean(this.props.singleSelection) && !this.state.isListOpen) {
      this.openList();
    }
  };

  addCustomOption = (isContainerBlur: boolean) => {
    const {
      onCreateOption,
      options,
      selectedOptions,
      singleSelection,
    } = this.props;

    const { searchValue, matchingOptions } = this.state;

    if (this.doesSearchMatchOnlyOption()) {
      this.onAddOption(matchingOptions[0], isContainerBlur);
      return;
    }

    if (!onCreateOption) {
      return;
    }

    // Don't bother trying to create an option if the user hasn't typed anything.
    if (!searchValue) {
      return;
    }

    // Don't create the value if it's already been selected.
    if (getSelectedOptionForSearchValue(searchValue, selectedOptions)) {
      return;
    }

    // Add new custom pill if this is custom input, even if it partially matches an option..
    const isOptionCreated = onCreateOption(
      searchValue,
      flattenOptionGroups(options)
    );

    // Expect the consumer to be explicit in rejecting a custom option.
    if (isOptionCreated === false) {
      return;
    }

    this.clearSearchValue();

    if (
      this.isSingleSelectionCustomOption() ||
      (Boolean(singleSelection) && matchingOptions.length < 1)
    ) {
      // Adding a custom option to a single select that does not appear in the list of options
      this.closeList();
    }
  };

  doesSearchMatchOnlyOption = () => {
    const { searchValue } = this.state;
    if (this.state.matchingOptions.length !== 1) {
      return false;
    }
    return (
      this.state.matchingOptions[0].label.toLowerCase() ===
      searchValue.toLowerCase()
    );
  };

  areAllOptionsSelected = () => {
    const { options, selectedOptions, async } = this.props;
    // Assume if this is async then there could be infinite options.
    if (async) {
      return false;
    }
    return flattenOptionGroups(options).length === selectedOptions.length;
  };

  isSingleSelectionCustomOption = () => {
    const {
      onCreateOption,
      options,
      selectedOptions,
      singleSelection,
    } = this.props;
    // The selected option of a single select is custom and does not appear in the list of options
    return (
      Boolean(singleSelection) &&
      onCreateOption &&
      selectedOptions.length > 0 &&
      !options.includes(selectedOptions[0])
    );
  };

  onComboBoxFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    if (!this.isSingleSelectionCustomOption()) {
      this.openList();
    }
    this.setState({ hasFocus: true });
  };

  onContainerBlur: EventListener = event => {
    // close the options list, unless the use clicked on an option

    /**
     * FireFox returns `relatedTarget` as `null` for security reasons, but provides a proprietary `explicitOriginalTarget`.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/explicitOriginalTarget
     */
    const focusEvent = event as FocusEvent & {
      explicitOriginalTarget: EventTarget;
    };
    const relatedTarget = (focusEvent.relatedTarget ||
      focusEvent.explicitOriginalTarget) as Node | null;

    const focusedInOptionsList =
      relatedTarget &&
      this.listRefInstance &&
      this.listRefInstance.contains(relatedTarget);
    const focusedInInput =
      relatedTarget &&
      this.comboBoxRefInstance &&
      this.comboBoxRefInstance.contains(relatedTarget);
    if (!focusedInOptionsList && !focusedInInput) {
      this.closeList();

      if (this.props.onBlur) {
        this.props.onBlur((event as unknown) as React.FocusEvent<
          HTMLDivElement
        >);
      }
      this.setState({ hasFocus: false });

      // If the user tabs away or changes focus to another element, take whatever input they've
      // typed and convert it into a pill, to prevent the combo box from looking like a text input.
      if (!this.hasActiveOption()) {
        this.addCustomOption(true);
      }
    }
  };

  onKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    switch (event.keyCode) {
      case comboBoxKeyCodes.UP:
        event.preventDefault();
        event.stopPropagation();
        if (this.state.isListOpen) {
          this.incrementActiveOptionIndex(-1);
        } else {
          this.openList();
        }
        break;

      case comboBoxKeyCodes.DOWN:
        event.preventDefault();
        event.stopPropagation();
        if (this.state.isListOpen) {
          this.incrementActiveOptionIndex(1);
        } else {
          this.openList();
        }
        break;

      case BACKSPACE:
        event.stopPropagation();
        this.removeLastOption();
        break;

      case ESCAPE:
        event.stopPropagation();
        this.closeList();
        break;

      case comboBoxKeyCodes.ENTER:
        event.preventDefault();
        event.stopPropagation();
        if (this.hasActiveOption()) {
          this.onAddOption(
            this.state.matchingOptions[this.state.activeOptionIndex]
          );
        } else {
          this.addCustomOption(false);
        }
        break;

      case TAB:
        // Disallow tabbing when the user is navigating the options.
        if (this.hasActiveOption() && this.state.isListOpen) {
          event.preventDefault();
          event.stopPropagation();
        }
        break;

      default:
        if (this.props.onKeyDown) {
          this.props.onKeyDown(event);
        }
    }
  };

  onOptionEnterKey: OptionHandler<T> = option => {
    this.onAddOption(option);
  };

  onOptionClick: OptionHandler<T> = option => {
    this.onAddOption(option);
  };

  onAddOption = (
    addedOption: EuiComboBoxOptionOption<T>,
    isContainerBlur?: boolean
  ) => {
    if (addedOption.disabled) {
      return;
    }

    const {
      onChange,
      selectedOptions,
      singleSelection: singleSelectionProp,
    } = this.props;
    const singleSelection = Boolean(singleSelectionProp);
    const changeOptions = singleSelection
      ? [addedOption]
      : selectedOptions.concat(addedOption);

    if (onChange) {
      onChange(changeOptions);
    }

    this.clearSearchValue();
    this.clearActiveOption();

    if (!isContainerBlur) {
      if (this.searchInputRefInstance) {
        this.searchInputRefInstance.focus();
      }
    }

    if (singleSelection) {
      requestAnimationFrame(this.closeList);
    }
  };

  onRemoveOption: OptionHandler<T> = removedOption => {
    const { onChange, selectedOptions } = this.props;
    if (onChange) {
      onChange(selectedOptions.filter(option => option !== removedOption));
    }

    this.clearActiveOption();
  };

  clearSelectedOptions = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange([]);
    }

    // Clicking the clear button will also cause it to disappear. This would result in focus
    // shifting unexpectedly to the body element so we set it to the input which is more reasonable,
    if (this.searchInputRefInstance) {
      this.searchInputRefInstance.focus();
    }

    if (!this.state.isListOpen) {
      this.openList();
    }
  };

  onComboBoxClick = () => {
    // When the user clicks anywhere on the box, enter the interaction state.
    if (this.searchInputRefInstance) {
      this.searchInputRefInstance.focus();
    }

    // If the user does this from a state in which an option has focus, then we need to reset it or clear it.
    if (
      Boolean(this.props.singleSelection) &&
      this.props.selectedOptions.length === 1
    ) {
      this.setState({
        activeOptionIndex: this.state.matchingOptions.indexOf(
          this.props.selectedOptions[0]
        ),
      });
    } else {
      this.clearActiveOption();
    }
  };

  onOpenListClick = () => {
    if (this.searchInputRefInstance) {
      this.searchInputRefInstance.focus();
    }
    if (!this.state.isListOpen) {
      this.openList();
    }
  };

  onOptionListScroll = () => {
    if (this.searchInputRefInstance) {
      this.searchInputRefInstance.focus();
    }
  };

  onCloseListClick = () => {
    this.closeList();
  };

  onSearchChange: NonNullable<
    EuiComboBoxInputProps<T>['onChange']
  > = searchValue => {
    const { onSearchChange } = this.props;
    if (onSearchChange) {
      const hasMatchingOptions = this.state.matchingOptions.length > 0;
      onSearchChange(searchValue, hasMatchingOptions);
    }

    this.setState({ searchValue }, () => {
      if (searchValue && this.state.isListOpen === false) this.openList();
    });
  };

  componentDidMount() {
    this._isMounted = true;

    // TODO: This will need to be called once the actual stylesheet loads.
    setTimeout(() => {
      if (this.autoSizeInputRefInstance) {
        this.autoSizeInputRefInstance.copyInputStyles();
      }
    }, 100);
  }

  static getDerivedStateFromProps<T>(
    nextProps: EuiComboBoxProps<T>,
    prevState: EuiComboBoxState<T>
  ) {
    const { options, selectedOptions, singleSelection } = nextProps;
    const { activeOptionIndex, searchValue } = prevState;

    // Calculate and cache the options which match the searchValue, because we use this information
    // in multiple places and it would be expensive to calculate repeatedly.
    const matchingOptions = getMatchingOptions(
      options,
      selectedOptions,
      searchValue,
      nextProps.async,
      Boolean(singleSelection)
    );

    const stateUpdate: Partial<EuiComboBoxState<T>> = { matchingOptions };

    if (activeOptionIndex >= matchingOptions.length) {
      stateUpdate.activeOptionIndex = -1;
    }

    return stateUpdate;
  }

  updateMatchingOptionsIfDifferent = (
    newMatchingOptions: Array<EuiComboBoxOptionOption<T>>
  ) => {
    const { matchingOptions, activeOptionIndex } = this.state;
    const { singleSelection, selectedOptions } = this.props;

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
      this.optionsRefInstances = [];
      let nextActiveOptionIndex = activeOptionIndex;
      // ensure that the currently selected single option is active if it is in the matchingOptions
      if (Boolean(singleSelection) && selectedOptions.length === 1) {
        if (newMatchingOptions.includes(selectedOptions[0])) {
          nextActiveOptionIndex = newMatchingOptions.indexOf(
            selectedOptions[0]
          );
        }
      }
      this.setState({
        matchingOptions: newMatchingOptions,
        activeOptionIndex: nextActiveOptionIndex,
      });

      if (!newMatchingOptions.length) {
        // Prevent endless setState -> componentWillUpdate -> setState loop.
        if (this.hasActiveOption()) {
          this.clearActiveOption();
        }
      }
    }
  };

  componentDidUpdate() {
    const { options, selectedOptions, singleSelection } = this.props;
    const { searchValue } = this.state;

    // React 16.3 has a bug (fixed in 16.4) where getDerivedStateFromProps
    // isn't called after a state change, and we track `searchValue` in state
    // instead we need to react to a change in searchValue here
    this.updateMatchingOptionsIfDifferent(
      getMatchingOptions(
        options,
        selectedOptions,
        searchValue,
        this.props.async,
        Boolean(singleSelection)
      )
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      'data-test-subj': dataTestSubj,
      async,
      className,
      compressed,
      fullWidth,
      id,
      inputRef,
      isClearable,
      isDisabled,
      isInvalid,
      isLoading,
      noSuggestions,
      onBlur,
      onChange,
      onCreateOption,
      onSearchChange,
      options,
      placeholder,
      renderOption,
      rowHeight,
      selectedOptions,
      singleSelection,
      ...rest
    } = this.props;
    const {
      activeOptionIndex,
      hasFocus,
      isListOpen,
      listPosition,
      searchValue,
      width,
    } = this.state;

    // Visually indicate the combobox is in an invalid state if it has lost focus but there is text entered in the input.
    // When custom options are disabled and the user leaves the combo box after entering text that does not match any
    // options, this tells the user that they've entered invalid input.
    const markAsInvalid =
      isInvalid ||
      ((hasFocus === false || isListOpen === false) && searchValue);

    const classes = classNames('euiComboBox', className, {
      'euiComboBox--compressed': compressed,
      'euiComboBox--fullWidth': fullWidth,
      'euiComboBox-isDisabled': isDisabled,
      'euiComboBox-isInvalid': markAsInvalid,
      'euiComboBox-isOpen': isListOpen,
    });

    const value = selectedOptions
      .map(selectedOption => selectedOption.label)
      .join(', ');

    let optionsList;

    if (!noSuggestions && isListOpen) {
      const optionsListDataTestSubj = dataTestSubj
        ? `${dataTestSubj}-optionsList`
        : undefined;

      optionsList = (
        <EuiPortal>
          <EuiComboBoxOptionsList
            activeOptionIndex={this.state.activeOptionIndex}
            areAllOptionsSelected={this.areAllOptionsSelected()}
            data-test-subj={optionsListDataTestSubj}
            fullWidth={fullWidth}
            isLoading={isLoading}
            listRef={this.listRefCallback}
            matchingOptions={this.state.matchingOptions}
            onCloseList={this.closeList}
            onCreateOption={onCreateOption}
            onOptionClick={this.onOptionClick}
            onOptionEnterKey={this.onOptionEnterKey}
            onScroll={this.onOptionListScroll}
            optionRef={this.optionRefCallback}
            options={options}
            position={listPosition}
            singleSelection={singleSelection}
            renderOption={renderOption}
            rootId={this.rootId}
            rowHeight={rowHeight}
            scrollToIndex={activeOptionIndex}
            searchValue={searchValue}
            selectedOptions={selectedOptions}
            updatePosition={this.updatePosition}
            width={width}
          />
        </EuiPortal>
      );
    }

    return (
      /**
       * Re: jsx-a11y/interactive-supports-focus
       * Focus is managed and is placed on the textbox element (`EuiComboBoxInput`)
       *
       * Re: jsx-a11y/role-has-required-aria-props
       * Expansion is managed and required `aria-controls` prop is placed on the textbox element (`EuiComboBoxInput`)
       *
       * Reference for both: https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/#combobox,
       * which verifies that this implementation follows the spec.
       */
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        {...rest}
        aria-expanded={isListOpen}
        aria-haspopup="listbox"
        className={classes}
        data-test-subj={dataTestSubj}
        onKeyDown={this.onKeyDown}
        ref={this.comboBoxRefCallback}
        role="combobox">
        <EuiComboBoxInput
          autoSizeInputRef={this.autoSizeInputRefCallback}
          compressed={compressed}
          focusedOptionId={
            this.hasActiveOption()
              ? this.rootId(`_option-${this.state.activeOptionIndex}`)
              : undefined
          }
          fullWidth={fullWidth}
          hasSelectedOptions={selectedOptions.length > 0}
          id={id}
          inputRef={this.searchInputRefCallback}
          isDisabled={isDisabled}
          isListOpen={isListOpen}
          noIcon={!!noSuggestions}
          onChange={this.onSearchChange}
          onClear={
            isClearable && !isDisabled ? this.clearSelectedOptions : undefined
          }
          onClick={this.onComboBoxClick}
          onCloseListClick={this.onCloseListClick}
          onFocus={this.onComboBoxFocus}
          onOpenListClick={this.onOpenListClick}
          onRemoveOption={this.onRemoveOption}
          placeholder={placeholder}
          rootId={this.rootId}
          searchValue={searchValue}
          selectedOptions={selectedOptions}
          singleSelection={singleSelection}
          toggleButtonRef={this.toggleButtonRefCallback}
          updatePosition={this.updatePosition}
          value={value}
        />

        {optionsList}
      </div>
    );
  }
}
