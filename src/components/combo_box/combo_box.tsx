/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Elements within EuiComboBox which would normally be tabbable (inputs, buttons) have been removed
 * from the tab order with tabindex={-1} so that we can control the keyboard navigation interface.
 */
/* eslint-disable jsx-a11y/role-has-required-aria-props */

import React, {
  Component,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  RefCallback,
} from 'react';
import classNames from 'classnames';

import { findPopoverPosition, htmlIdGenerator, keys } from '../../services';
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
  RefInstance,
  EuiComboBoxOptionOption,
  EuiComboBoxOptionsListPosition,
  EuiComboBoxSingleSelectionShape,
} from './types';
import { EuiFilterSelectItem } from '../filter_group';
import AutosizeInput from 'react-input-autosize';
import { CommonProps } from '../common';
import { EuiFormControlLayoutProps } from '../form';
import { getElementZIndex } from '../../services/popover';

type DrillProps<T> = Pick<
  EuiComboBoxOptionsListProps<T>,
  | 'customOptionText'
  | 'onCreateOption'
  | 'options'
  | 'renderOption'
  | 'selectedOptions'
>;

export interface _EuiComboBoxProps<T>
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    DrillProps<T> {
  'data-test-subj'?: string;
  /**
   * Updates the list of options asynchronously
   */
  async: boolean;
  className?: string;
  /**
   * When `true` creates a shorter height input
   */
  compressed: boolean;
  /**
   * When `true` expands to the entire width available
   */
  fullWidth: boolean;
  id?: string;
  inputRef?: RefCallback<HTMLInputElement>;
  /**
   * Shows a button that quickly clears any input
   */
  isClearable: boolean;
  /**
   * Disables the input
   */
  isDisabled?: boolean;
  isInvalid?: boolean;
  /**
   * Swaps the dropdown options for a loading spinner
   */
  isLoading?: boolean;
  /**
   * Doesn't show the suggestions list/dropdown
   */
  noSuggestions?: boolean;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  /**
   * Called every time the query in the combo box is parsed
   */
  onChange?: (options: Array<EuiComboBoxOptionOption<T>>) => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  /**
   * Called every time the text query in the search box is parsed
   */
  onSearchChange?: (searchValue: string, hasMatchingOptions?: boolean) => void;
  /**
   * Sets the placeholder of the input
   */
  placeholder?: string;
  /**
   * Every option must be the same height and must be explicitly set if using a custom render
   */
  rowHeight?: number;
  /**
   * When `true` only allows the user to select a single option. Set to `{ asPlainText: true }` to not render input selection as pills
   */
  singleSelection: boolean | EuiComboBoxSingleSelectionShape;
  /**
   * Display matching options by:
   * `startsWith`: moves items that start with search value to top of the list;
   * `none`: don't change the sort order of initial object
   */
  sortMatchesBy: 'none' | 'startsWith';
  /**
   * Creates an input group with element(s) coming before input. It won't show if `singleSelection` is set to `false`.
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];
  /**
   * Creates an input group with element(s) coming after input. It won't show if `singleSelection` is set to `false`.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];
  /**
   * A special character to use as a value separator. Typically a comma `,`
   */
  delimiter?: string;
}

/**
 * Because of how TypeScript's LibraryManagedAttributes is designed to handle defaultProps (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#support-for-defaultprops-in-jsx)
 * we can't directly export the above Props definitions, as the defaulted values are not made optional
 * as it isn't processed by LibraryManagedAttributes. To get around this, we:
 * - remove the props which have default values applied
 *   - additionally re-define `options` and `selectedOptions` defaults, necessary as static members can't access generics and become never[]
 * - export (Props - Defaults) & Partial<Defaults>
 */
type DefaultProps<T> = Omit<
  typeof EuiComboBox['defaultProps'],
  'options' | 'selectedOptions'
> & {
  options: Array<EuiComboBoxOptionOption<T>>;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
};
export type EuiComboBoxProps<T> = Omit<
  _EuiComboBoxProps<T>,
  keyof DefaultProps<T>
> &
  Partial<DefaultProps<T>>;

interface EuiComboBoxState<T> {
  activeOptionIndex: number;
  hasFocus: boolean;
  isListOpen: boolean;
  listElement?: RefInstance<HTMLDivElement>;
  listPosition: EuiComboBoxOptionsListPosition;
  listZIndex: number | undefined;
  matchingOptions: Array<EuiComboBoxOptionOption<T>>;
  searchValue: string;
  width: number;
}

const initialSearchValue = '';

export class EuiComboBox<T> extends Component<
  _EuiComboBoxProps<T>,
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
    prepend: undefined,
    append: undefined,
    sortMatchesBy: 'none' as const,
  };

  state: EuiComboBoxState<T> = {
    activeOptionIndex: -1,
    hasFocus: false,
    isListOpen: false,
    listElement: null,
    listPosition: 'bottom',
    listZIndex: undefined,
    matchingOptions: getMatchingOptions<T>(
      this.props.options,
      this.props.selectedOptions,
      initialSearchValue,
      this.props.async,
      Boolean(this.props.singleSelection),
      this.props.sortMatchesBy
    ),
    searchValue: initialSearchValue,
    width: 0,
  };

  _isMounted = false;
  rootId = htmlIdGenerator();

  // Refs
  comboBoxRefInstance: RefInstance<HTMLDivElement> = null;
  comboBoxRefCallback: RefCallback<HTMLDivElement> = (ref) => {
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
  autoSizeInputRefCallback: RefCallback<AutosizeInput & HTMLDivElement> = (
    ref
  ) => {
    this.autoSizeInputRefInstance = ref;
  };

  searchInputRefInstance: RefInstance<HTMLInputElement> = null;
  searchInputRefCallback: RefCallback<HTMLInputElement> = (ref) => {
    this.searchInputRefInstance = ref;
    if (this.props.inputRef) this.props.inputRef(ref);
  };

  listRefInstance: RefInstance<HTMLDivElement> = null;
  listRefCallback: RefCallback<HTMLDivElement> = (ref) => {
    if (this.comboBoxRefInstance) {
      // find the zIndex of the combobox relative to the page body
      // and use that to depth-position the list box
      // adds an extra `100` to provide some defense around neighboring elements' positioning
      const listZIndex =
        getElementZIndex(this.comboBoxRefInstance, document.body) + 100;
      this.setState({ listZIndex });
    }
    this.listRefInstance = ref;
  };

  toggleButtonRefInstance: RefInstance<
    HTMLButtonElement | HTMLSpanElement
  > = null;
  toggleButtonRefCallback: RefCallback<HTMLButtonElement | HTMLSpanElement> = (
    ref
  ) => {
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

  closeList = (event?: Event) => {
    if (event && event.target === this.searchInputRefInstance) {
      // really long search values / custom entries triggers a scroll event on the input
      // which the EuiComboBoxOptionsList passes through here
      return;
    }

    this.clearActiveOption();
    this.setState({
      listZIndex: undefined,
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
      this.listRefInstance.style.left = `${
        comboBoxBounds.left + window.pageXOffset
      }px`;
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

  addCustomOption = (isContainerBlur: boolean, searchValue: string) => {
    const {
      onCreateOption,
      options,
      selectedOptions,
      singleSelection,
    } = this.props;

    const { matchingOptions } = this.state;

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

    // Add new custom pill if this is custom input, even if it partially matches an option.
    const isOptionCreated = onCreateOption(
      searchValue,
      flattenOptionGroups(options)
    );

    // Expect the consumer to be explicit in rejecting a custom option.
    if (isOptionCreated === false) {
      return;
    }

    this.clearSearchValue();

    if (Boolean(singleSelection)) {
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

    const flattenOptions = flattenOptionGroups(options).map((option) => {
      return { ...option, label: option.label.trim().toLowerCase() };
    });

    let numberOfSelectedOptions = 0;
    selectedOptions.forEach(({ label }) => {
      const trimmedLabel = label.trim().toLowerCase();
      if (
        flattenOptions.findIndex((option) => option.label === trimmedLabel) !==
        -1
      )
        numberOfSelectedOptions += 1;
    });

    return flattenOptions.length === numberOfSelectedOptions;
  };

  onComboBoxFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this.openList();

    this.setState({ hasFocus: true });
  };

  setCustomOptions = (isContainerBlur: boolean) => {
    const { searchValue } = this.state;
    const { delimiter } = this.props;
    if (delimiter) {
      searchValue.split(delimiter).forEach((option: string) => {
        if (option.length > 0) this.addCustomOption(isContainerBlur, option);
      });
    } else {
      this.addCustomOption(isContainerBlur, searchValue);
    }
  };

  onContainerBlur: EventListener = (event) => {
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
        this.props.onBlur(
          (event as unknown) as React.FocusEvent<HTMLDivElement>
        );
      }
      this.setState({ hasFocus: false });

      // If the user tabs away or changes focus to another element, take whatever input they've
      // typed and convert it into a pill, to prevent the combo box from looking like a text input.
      if (!this.hasActiveOption()) {
        this.setCustomOptions(true);
      }
    }
  };

  onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case keys.ARROW_UP:
        event.preventDefault();
        event.stopPropagation();
        if (this.state.isListOpen) {
          this.incrementActiveOptionIndex(-1);
        } else {
          this.openList();
        }
        break;

      case keys.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        if (this.state.isListOpen) {
          this.incrementActiveOptionIndex(1);
        } else {
          this.openList();
        }
        break;

      case keys.BACKSPACE:
        event.stopPropagation();
        this.removeLastOption();
        break;

      case keys.ESCAPE:
        if (this.state.isListOpen) {
          event.preventDefault();
          event.stopPropagation();
          this.closeList();
        }
        break;

      case keys.ENTER:
        event.preventDefault();
        event.stopPropagation();
        if (this.hasActiveOption()) {
          this.onAddOption(
            this.state.matchingOptions[this.state.activeOptionIndex]
          );
        } else {
          this.setCustomOptions(false);
        }
        break;

      case keys.TAB:
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

  onOptionEnterKey: OptionHandler<T> = (option) => {
    this.onAddOption(option);
  };

  onOptionClick: OptionHandler<T> = (option) => {
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
      requestAnimationFrame(() => this.closeList());
    } else {
      this.setState({
        activeOptionIndex: this.state.matchingOptions.indexOf(addedOption),
      });
    }
  };

  onRemoveOption: OptionHandler<T> = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    if (onChange) {
      onChange(selectedOptions.filter((option) => option !== removedOption));
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
      const selectedOptionIndex = this.state.matchingOptions.findIndex(
        (option) =>
          option.label === this.props.selectedOptions[0].label &&
          option.key === this.props.selectedOptions[0].key
      );
      this.setState({
        activeOptionIndex: selectedOptionIndex,
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

  onSearchChange: NonNullable<EuiComboBoxInputProps<T>['onChange']> = (
    searchValue
  ) => {
    const { onSearchChange, delimiter } = this.props;

    if (onSearchChange) {
      const hasMatchingOptions = this.state.matchingOptions.length > 0;
      onSearchChange(searchValue, hasMatchingOptions);
    }

    this.setState({ searchValue }, () => {
      if (searchValue && this.state.isListOpen === false) this.openList();
    });
    if (delimiter && searchValue.endsWith(delimiter)) {
      this.setCustomOptions(false);
    }
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
    nextProps: _EuiComboBoxProps<T>,
    prevState: EuiComboBoxState<T>
  ) {
    const {
      options,
      selectedOptions,
      singleSelection,
      sortMatchesBy,
    } = nextProps;
    const { activeOptionIndex, searchValue } = prevState;

    // Calculate and cache the options which match the searchValue, because we use this information
    // in multiple places and it would be expensive to calculate repeatedly.
    const matchingOptions = getMatchingOptions(
      options,
      selectedOptions,
      searchValue,
      nextProps.async,
      Boolean(singleSelection),
      sortMatchesBy
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
    const {
      options,
      selectedOptions,
      singleSelection,
      sortMatchesBy,
    } = this.props;
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
        Boolean(singleSelection),
        sortMatchesBy
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
      customOptionText,
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
      prepend,
      sortMatchesBy,
      delimiter,
      append,
      ...rest
    } = this.props;
    const {
      activeOptionIndex,
      hasFocus,
      isListOpen,
      listPosition,
      searchValue,
      width,
      matchingOptions,
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
      .map((selectedOption) => selectedOption.label)
      .join(', ');

    let optionsList;

    if (!noSuggestions && isListOpen) {
      const optionsListDataTestSubj = dataTestSubj
        ? `${dataTestSubj}-optionsList`
        : undefined;

      optionsList = (
        <EuiPortal>
          <EuiComboBoxOptionsList
            zIndex={this.state.listZIndex}
            activeOptionIndex={this.state.activeOptionIndex}
            areAllOptionsSelected={this.areAllOptionsSelected()}
            customOptionText={customOptionText}
            data-test-subj={optionsListDataTestSubj}
            fullWidth={fullWidth}
            isLoading={isLoading}
            listRef={this.listRefCallback}
            matchingOptions={matchingOptions}
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
            delimiter={delimiter}
            getSelectedOptionForSearchValue={getSelectedOptionForSearchValue}
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
          append={singleSelection ? append : undefined}
          prepend={singleSelection ? prepend : undefined}
          isLoading={isLoading}
        />
        {optionsList}
      </div>
    );
  }
}
