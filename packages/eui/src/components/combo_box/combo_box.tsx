/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Elements within EuiComboBox which would normally be tabbable (inputs, buttons) have been removed
 * from the tab order with tabindex={-1} so that we can control the keyboard navigation interface.
 */
import React, {
  Component,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  RefCallback,
} from 'react';
import classNames from 'classnames';

import { RenderWithEuiTheme, htmlIdGenerator, keys } from '../../services';
import { logicalStyle } from '../../global_styling';
import { CommonProps } from '../common';
import { EuiInputPopover, EuiInputPopoverProps } from '../popover';
import { EuiI18n } from '../i18n';
import { EuiFormControlLayoutProps } from '../form';
import { euiFormMaxWidth } from '../form/form.styles';
import type { EuiTextTruncateProps } from '../text_truncate';

import {
  getMatchingOptions,
  flattenOptionGroups,
  getSelectedOptionForSearchValue,
  transformForCaseSensitivity,
  SortMatchesBy,
  createPartialStringEqualityOptionMatcher,
} from './matching_options';
import {
  EuiComboBoxInputProps,
  EuiComboBoxInput,
} from './combo_box_input/combo_box_input';
import { EuiComboBoxOptionsListProps } from './combo_box_options_list/combo_box_options_list';
import {
  OptionHandler,
  RefInstance,
  EuiComboBoxOptionOption,
  EuiComboBoxSingleSelectionShape,
  EuiComboBoxOptionMatcher,
} from './types';
import { EuiComboBoxOptionsList } from './combo_box_options_list';
import { euiComboBoxStyles as styles } from './combo_box.styles';

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
   *  The height of each option in pixels. When using a custom render (`renderOption` prop) it's recommended to set it explicitly.
   * `auto` will disable virtualization, enabling text to wrap onto multiple lines.
   */
  rowHeight?: number | 'auto';
  /**
   * When `true` only allows the user to select a single option. Set to `{ asPlainText: true }` to not render input selection as pills
   */
  singleSelection: boolean | EuiComboBoxSingleSelectionShape;
  /**
   * Display matching options by:
   * `startsWith`: moves items that start with search value to top of the list;
   * `none`: don't change the sort order of initial object
   */
  sortMatchesBy: SortMatchesBy;
  /**
   * Whether to match options with case sensitivity.
   */
  isCaseSensitive?: boolean;
  /**
   * Optional custom option matcher function
   *
   * @example
   * const exactEqualityMatcher: EuiComboBoxOptionMatcher = ({ option, searchValue }) => {
   *   return option.label === searchValue;
   * }
   */
  optionMatcher?: EuiComboBoxOptionMatcher<T>;
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
  /**
   * Specifies that the input should have focus when the component loads
   */
  autoFocus?: boolean;
  /**
   * Required when rendering without a visible label from [EuiFormRow](/#/forms/form-layouts).
   */
  'aria-label'?: string;
  /**
   * Reference ID of a text element containing the visible label for the combo box when not
   * supplied by `aria-label` or from [EuiFormRow](/#/forms/form-layouts).
   */
  'aria-labelledby'?: string;
  /**
   * By default, EuiComboBox will truncate option labels at the end of
   * the string. You can use pass in a custom truncation configuration that
   * accepts any [EuiTextTruncate](/#/utilities/text-truncation) prop,
   * except for `text` and `children`.
   *
   * Note: when searching, custom truncation props are ignored. The highlighted search
   * text will always take precedence.
   */
  truncationProps?: Partial<Omit<EuiTextTruncateProps, 'text' | 'children'>>;
  /**
   * Allows customizing the underlying EuiInputPopover component
   * (except for props that control state).
   */
  inputPopoverProps?: Partial<
    Omit<EuiInputPopoverProps, 'input' | 'isOpen' | 'closePopover'>
  >;
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
  (typeof EuiComboBox)['defaultProps'],
  'options' | 'selectedOptions' | 'optionMatcher'
> & {
  options: Array<EuiComboBoxOptionOption<T>>;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
  optionMatcher: EuiComboBoxOptionMatcher<T>;
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
  matchingOptions: Array<EuiComboBoxOptionOption<T>>;
  listOptionRefs: Array<HTMLButtonElement | null>;
  searchValue: string;
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
    optionMatcher: createPartialStringEqualityOptionMatcher(),
  };

  state: EuiComboBoxState<T> = {
    activeOptionIndex: -1,
    hasFocus: false,
    isListOpen: false,
    matchingOptions: getMatchingOptions<T>({
      options: this.props.options,
      selectedOptions: this.props.selectedOptions,
      searchValue: initialSearchValue,
      optionMatcher: this.props.optionMatcher!,
      isCaseSensitive: this.props.isCaseSensitive,
      isPreFiltered: this.props.async,
      showPrevSelected: Boolean(this.props.singleSelection),
      sortMatchesBy: this.props.sortMatchesBy,
    }),
    listOptionRefs: [],
    searchValue: initialSearchValue,
  };

  rootId = htmlIdGenerator();

  // Refs
  comboBoxRefInstance: RefInstance<HTMLDivElement> = null;
  comboBoxRefCallback: RefCallback<HTMLDivElement> = (ref) => {
    this.comboBoxRefInstance = ref;
  };

  searchInputRefInstance: RefInstance<HTMLInputElement> = null;
  searchInputRefCallback: RefCallback<HTMLInputElement> = (ref) => {
    this.searchInputRefInstance = ref;
    this.props.inputRef?.(ref);
  };

  listRefInstance: RefInstance<HTMLDivElement> = null;
  listRefCallback: RefCallback<HTMLDivElement> = (ref) => {
    this.listRefInstance = ref;
  };

  setListOptionRefs = (node: HTMLButtonElement | null, index: number) => {
    this.setState(({ listOptionRefs }) => {
      const _listOptionRefs = listOptionRefs;
      _listOptionRefs[index] = node;

      return {
        listOptionRefs: _listOptionRefs,
      };
    });
  };

  openList = () => {
    this.setState({
      isListOpen: true,
    });
  };

  closeList = () => {
    this.clearActiveOption();
    this.setState({ isListOpen: false });
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

  addCustomOption = (isContainerBlur: boolean, searchValue: string) => {
    const {
      isCaseSensitive,
      onCreateOption,
      options,
      selectedOptions,
      singleSelection,
    } = this.props;

    const matchedOption = this.doesSearchMatchOnlyOption();
    if (matchedOption) {
      return this.onAddOption(matchedOption, isContainerBlur);
    }

    if (!onCreateOption) {
      return;
    }

    // Don't bother trying to create an option if the user hasn't typed anything.
    if (!searchValue) {
      return;
    }

    // Don't create the value if it's already been selected.
    if (
      getSelectedOptionForSearchValue({
        isCaseSensitive,
        searchValue,
        selectedOptions,
      })
    ) {
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
    const { isCaseSensitive } = this.props;
    const { matchingOptions, searchValue } = this.state;
    if (!matchingOptions.length) return;

    const isMatchWithGroup = matchingOptions[0].isGroupLabelOption;
    const isOnlyOption = matchingOptions.length === (isMatchWithGroup ? 2 : 1);
    if (!isOnlyOption) return;

    const matchedOption = matchingOptions[isMatchWithGroup ? 1 : 0];

    const normalizedSearchSubject = transformForCaseSensitivity(
      matchedOption.label,
      isCaseSensitive
    );
    const normalizedSearchValue = transformForCaseSensitivity(
      searchValue,
      isCaseSensitive
    );

    if (normalizedSearchSubject === normalizedSearchValue) {
      return matchedOption;
    }
  };

  areAllOptionsSelected = () => {
    const { options, selectedOptions, async, isCaseSensitive } = this.props;
    // Assume if this is async then there could be infinite options.
    if (async) {
      return false;
    }

    const flattenOptions = flattenOptionGroups(options).map((option) => {
      return {
        ...option,
        label: transformForCaseSensitivity(
          option.label.trim(),
          isCaseSensitive
        ),
      };
    });

    let numberOfSelectedOptions = 0;
    selectedOptions.forEach(({ label }) => {
      const trimmedLabel = transformForCaseSensitivity(
        label.trim(),
        isCaseSensitive
      );
      if (
        flattenOptions.findIndex((option) => option.label === trimmedLabel) !==
        -1
      )
        numberOfSelectedOptions += 1;
    });

    return flattenOptions.length === numberOfSelectedOptions;
  };

  onComboBoxFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    this.props.onFocus?.(event);
    this.openList();
    this.setState({ hasFocus: true });
  };

  setCustomOptions = (isContainerBlur: boolean) => {
    const { searchValue } = this.state;
    const { delimiter } = this.props;
    if (delimiter) {
      const trimmed = searchValue.split(delimiter).map((value) => value.trim());
      const values = [...new Set([...trimmed])];

      values.forEach((option: string) => {
        if (option.length > 0) this.addCustomOption(isContainerBlur, option);
      });
    } else {
      this.addCustomOption(isContainerBlur, searchValue);
    }
  };

  onContainerBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    // close the options list, unless the user clicked on an option
    const { relatedTarget } = event;

    const focusedInOptionsList =
      relatedTarget &&
      this.listRefInstance &&
      this.listRefInstance.contains(relatedTarget);
    const focusedInInput =
      relatedTarget &&
      this.comboBoxRefInstance &&
      this.comboBoxRefInstance.contains(relatedTarget);

    if (!focusedInOptionsList && !focusedInInput) {
      this.props.onBlur?.(event);
      this.closeList();
      this.setState({ hasFocus: false });

      // If the user tabs away or changes focus to another element, take whatever input they've
      // typed and convert it into a pill, to prevent the combo box from looking like a text input.
      if (!this.hasActiveOption()) {
        this.setCustomOptions(true);
      }
    } else if (focusedInOptionsList) {
      // https://github.com/elastic/eui/issues/5179
      // need to restore focus to the input box when clicking non-interactive elements

      // firefox doesn't support calling .focus() during a blur event
      // https://bugzilla.mozilla.org/show_bug.cgi?id=53579
      requestAnimationFrame(() => {
        this.searchInputRefInstance?.focus();
      });
    }
  };

  onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (this.props.isDisabled) return;
    event.persist(); // TODO: Remove once React 16 support is dropped
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

      case keys.ESCAPE:
        if (this.state.isListOpen) {
          event.preventDefault();
          event.stopPropagation();
          this.closeList();
        }
        break;

      case keys.ENTER:
        // Do not block enter keypresses for the clear button or delete selection buttons
        if (event.target === this.searchInputRefInstance) {
          event.preventDefault();
          event.stopPropagation();
          if (this.hasActiveOption()) {
            this.onAddOption(
              this.state.matchingOptions[this.state.activeOptionIndex]
            );
          } else {
            this.setCustomOptions(false);
          }
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
        this.props.onKeyDown?.(event);
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

    onChange?.(changeOptions);

    this.clearSearchValue();
    this.clearActiveOption();

    if (!isContainerBlur) {
      this.searchInputRefInstance?.focus();
    }

    if (singleSelection) {
      requestAnimationFrame(() => this.closeList());
    } else {
      this.setState(({ listOptionRefs, matchingOptions }) => ({
        listOptionRefs: listOptionRefs.slice(0, matchingOptions.length - 1),
        activeOptionIndex: matchingOptions.indexOf(addedOption),
      }));
    }
  };

  onRemoveOption: OptionHandler<T> = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange?.(selectedOptions.filter((option) => option !== removedOption));

    this.clearActiveOption();
  };

  clearSelectedOptions = () => {
    this.props.onChange?.([]);

    // Clicking the clear button will also cause it to disappear. This would result in focus
    // shifting unexpectedly to the body element so we set it to the input which is more reasonable,
    this.searchInputRefInstance?.focus();

    if (!this.state.isListOpen) {
      this.openList();
    }
  };

  onComboBoxClick = () => {
    // When the user clicks anywhere on the box, enter the interaction state.
    this.searchInputRefInstance?.focus();

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
    this.searchInputRefInstance?.focus();

    if (!this.state.isListOpen) {
      this.openList();
    }
  };

  onOptionListScroll = () => {
    this.searchInputRefInstance?.focus();
  };

  onSearchChange: NonNullable<EuiComboBoxInputProps<T>['onChange']> = (
    searchValue
  ) => {
    const { onSearchChange, delimiter } = this.props;

    this.setState({ searchValue }, () => {
      if (searchValue && this.state.isListOpen === false) {
        this.openList();
      }
      if (onSearchChange) {
        const hasMatchingOptions = this.state.matchingOptions.length > 0;
        onSearchChange(searchValue, hasMatchingOptions);
      }
    });
    if (delimiter && searchValue.endsWith(delimiter)) {
      this.setCustomOptions(false);
    }
  };

  static getDerivedStateFromProps<T>(
    nextProps: _EuiComboBoxProps<T>,
    prevState: EuiComboBoxState<T>
  ) {
    const {
      async,
      isCaseSensitive,
      options,
      selectedOptions,
      singleSelection,
      sortMatchesBy,
      optionMatcher,
    } = nextProps;
    const { activeOptionIndex, searchValue } = prevState;

    // Calculate and cache the options which match the searchValue, because we use this information
    // in multiple places and it would be expensive to calculate repeatedly.
    const matchingOptions = getMatchingOptions({
      options,
      selectedOptions,
      searchValue,
      isCaseSensitive,
      isPreFiltered: async,
      showPrevSelected: Boolean(singleSelection),
      sortMatchesBy,
      optionMatcher: optionMatcher!,
    });

    const stateUpdate: Partial<EuiComboBoxState<T>> = { matchingOptions };

    if (activeOptionIndex >= matchingOptions.length) {
      stateUpdate.activeOptionIndex = -1;
    }

    return stateUpdate;
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
      isCaseSensitive,
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
      autoFocus,
      truncationProps,
      inputPopoverProps,
      optionMatcher,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      ...rest
    } = this.props;
    const {
      activeOptionIndex,
      hasFocus,
      isListOpen,
      searchValue,
      matchingOptions,
    } = this.state;

    // Make sure we have a valid ID if users don't pass one as a prop
    const inputId = id ?? this.rootId('_eui-combobox-id');

    // Visually indicate the combobox is in an invalid state if it has lost focus but there is text entered in the input.
    // When custom options are disabled and the user leaves the combo box after entering text that does not match any
    // options, this tells the user that they've entered invalid input.
    const markAsInvalid = !!(
      isInvalid ||
      ((hasFocus === false || isListOpen === false) && searchValue)
    );

    const classes = classNames('euiComboBox', className, {
      'euiComboBox-isDisabled': isDisabled,
      'euiComboBox-isInvalid': markAsInvalid,
      'euiComboBox-isOpen': isListOpen,
    });

    const value = selectedOptions
      .map((selectedOption) => selectedOption.label)
      .join(', ');

    let optionsList: React.ReactElement;

    if (!noSuggestions && isListOpen) {
      const optionsListDataTestSubj = dataTestSubj
        ? `${dataTestSubj}-optionsList`
        : undefined;

      optionsList = (
        <EuiI18n
          token="euiComboBox.listboxAriaLabel"
          default="Choose from the following options"
        >
          {(listboxAriaLabel: string) => (
            <EuiComboBoxOptionsList
              activeOptionIndex={this.state.activeOptionIndex}
              areAllOptionsSelected={this.areAllOptionsSelected()}
              customOptionText={customOptionText}
              data-test-subj={optionsListDataTestSubj}
              fullWidth={fullWidth}
              isCaseSensitive={isCaseSensitive}
              isLoading={isLoading}
              listRef={this.listRefCallback}
              setListOptionRefs={this.setListOptionRefs}
              matchingOptions={matchingOptions}
              onCloseList={this.closeList}
              onCreateOption={onCreateOption}
              onOptionClick={this.onOptionClick}
              onOptionEnterKey={this.onOptionEnterKey}
              onScroll={this.onOptionListScroll}
              options={options}
              singleSelection={singleSelection}
              renderOption={renderOption}
              rootId={this.rootId}
              rowHeight={rowHeight}
              scrollToIndex={activeOptionIndex}
              searchValue={searchValue}
              selectedOptions={selectedOptions}
              delimiter={delimiter}
              getSelectedOptionForSearchValue={getSelectedOptionForSearchValue}
              listboxAriaLabel={listboxAriaLabel}
              truncationProps={truncationProps}
            />
          )}
        </EuiI18n>
      );
    }

    return (
      /**
       * EuiComboBox follows the WAI-ARIA 1.2 spec for editable comboboxes
       * with list autocomplete. This pattern is an improvement on the user
       * experience for screen readers over the WAI-ARIA 1.1 pattern.
       *
       * https://www.w3.org/TR/wai-aria-practices-1.2/examples/combobox/combobox-autocomplete-list.html
       */
      <RenderWithEuiTheme>
        {(euiTheme) => {
          const cssStyles = [
            styles.euiComboBox,
            fullWidth
              ? styles.fullWidth
              : logicalStyle('max-width', euiFormMaxWidth(euiTheme)),
          ];
          return (
            <div
              css={cssStyles}
              {...rest}
              className={classes}
              data-test-subj={dataTestSubj}
              onKeyDown={this.onKeyDown}
              onBlur={this.onContainerBlur}
              ref={this.comboBoxRefCallback}
            >
              <EuiInputPopover
                fullWidth={fullWidth}
                panelPaddingSize="none"
                disableFocusTrap={true}
                closeOnScroll={true}
                {...inputPopoverProps}
                isOpen={isListOpen}
                closePopover={this.closeList}
                /* we don't want content changes to be announced via aria-live 
                because ComboBox uses a virtualized list that updates itself
                on scroll and would result in unexpected screen reader output */
                aria-live="off"
                input={
                  <EuiComboBoxInput
                    compressed={compressed}
                    focusedOptionId={
                      this.hasActiveOption()
                        ? this.state.listOptionRefs[
                            this.state.activeOptionIndex
                          ]?.id ??
                          this.rootId(`_option-${this.state.activeOptionIndex}`)
                        : undefined
                    }
                    fullWidth={fullWidth}
                    hasSelectedOptions={selectedOptions.length > 0}
                    id={inputId}
                    inputRef={this.searchInputRefCallback}
                    isDisabled={isDisabled}
                    isListOpen={isListOpen}
                    noIcon={!!noSuggestions}
                    onChange={this.onSearchChange}
                    onClear={
                      isClearable && !isDisabled
                        ? this.clearSelectedOptions
                        : undefined
                    }
                    onClick={this.onComboBoxClick}
                    onCloseListClick={this.closeList}
                    onFocus={this.onComboBoxFocus}
                    onOpenListClick={this.onOpenListClick}
                    onRemoveOption={this.onRemoveOption}
                    placeholder={placeholder}
                    rootId={this.rootId}
                    searchValue={searchValue}
                    selectedOptions={selectedOptions}
                    singleSelection={singleSelection}
                    value={value}
                    append={singleSelection ? append : undefined}
                    prepend={singleSelection ? prepend : undefined}
                    isLoading={isLoading}
                    isInvalid={markAsInvalid}
                    autoFocus={autoFocus}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    aria-describedby={ariaDescribedby}
                  />
                }
              >
                {optionsList}
              </EuiInputPopover>
            </div>
          );
        }}
      </RenderWithEuiTheme>
    );
  }
}
