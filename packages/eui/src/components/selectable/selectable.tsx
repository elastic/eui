/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  HTMLAttributes,
  ReactNode,
  createRef,
  ReactElement,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
} from 'react';
import { Align } from 'react-window';
import classNames from 'classnames';

import { keys, htmlIdGenerator } from '../../services';
import { CommonProps, ExclusiveUnion } from '../common';
import { EuiLoadingSpinner } from '../loading';
import { EuiSpacer } from '../spacer';
import { EuiScreenReaderLive, EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

import { EuiSelectableSearch } from './selectable_search';
import { EuiSelectableSearchProps } from './selectable_search/selectable_search';
import { EuiSelectableMessage } from './selectable_message';
import {
  EuiSelectableList,
  EuiSelectableOptionsListVirtualizedProps,
} from './selectable_list';
import { EuiSelectableOptionsListProps } from './selectable_list/selectable_list';
import { EuiSelectableOption } from './selectable_option';
import {
  createPartialStringEqualityOptionMatcher,
  getMatchingOptions,
} from './matching_options';
import { euiSelectableStyles as styles } from './selectable.styles';

export type EuiSelectableOnChangeEvent = KeyboardEvent | MouseEvent;

type RequiredEuiSelectableOptionsListProps = Omit<
  EuiSelectableOptionsListProps,
  keyof (typeof EuiSelectableList)['defaultProps']
>;
type OptionalEuiSelectableOptionsListProps = Omit<
  EuiSelectableOptionsListProps,
  keyof RequiredEuiSelectableOptionsListProps
>;
type EuiSelectableOptionsListPropsWithDefaults =
  RequiredEuiSelectableOptionsListProps &
    Partial<OptionalEuiSelectableOptionsListProps>;

export interface EuiSelectableOptionMatcherArgs<TOption> {
  option: EuiSelectableOption<TOption>;
  searchValue: string;
  normalizedSearchValue: string;
}

export type EuiSelectableOptionMatcher<T> = (
  args: EuiSelectableOptionMatcherArgs<T>
) => boolean;

/**
 * The `searchable` prop has significant implications for a11y. When present, we effectively change from adhering to the
 * - ARIA `listbox` spec (@see https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox)
 * - ARIA `combobox` spec (@see https://www.w3.org/TR/wai-aria-practices-1.2/#combobox)
 *
 * and (re)implement all relevant attributes and keyboard interactions.
 * Take note of logic that relies on `searchable` to ensure that any modifications remain in alignment.
 *
 * `searchProps` can only be specified when `searchable` is `true`.
 */
export type EuiSelectableSearchableProps<T> = ExclusiveUnion<
  {
    searchable: false;
  },
  {
    /**
     * Hooks up a search box to filter the list (boolean)
     */
    searchable: true;
    /**
     * Passes props down to the `EuiFieldSearch`.
     * {@link EuiSelectableSearchProps}
     */
    searchProps?: EuiSelectableSearchableSearchProps<T>;
  }
>;

export type EuiSelectableSearchableSearchProps<T> = Partial<
  EuiSelectableSearchProps<T>
>;

export type EuiSelectableProps<T = {}> = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> &
  EuiSelectableSearchableProps<T> & {
    /**
     * Function that takes the `list` node and then
     * the `search` node (if `searchable` is applied)
     */
    children?: (
      list: ReactElement<
        typeof EuiSelectableMessage | typeof EuiSelectableList
      >,
      search: ReactElement<typeof EuiSelectableSearch> | undefined
    ) => ReactNode;
    /**
     * Array of EuiSelectableOption objects. See {@link EuiSelectableOption}
     */
    options: Array<EuiSelectableOption<T>>;
    /**
     * Passes back the altered `options` array with selected options having `checked: 'on'`.
     * Also passes back the React click/keyboard event as a second argument,
     * and the option that triggered the onChange event as a third argument.
     */
    onChange?: (
      options: Array<EuiSelectableOption<T>>,
      event: EuiSelectableOnChangeEvent,
      changedOption: EuiSelectableOption<T>
    ) => void;
    /**
     * Passes back the current active option whenever the user changes the currently
     * highlighted option via keyboard navigation or searching.
     */
    onActiveOptionChange?: (option: EuiSelectableOption | null) => void;
    /**
     * Sets the single selection policy of
     * `false`: allows multiple selection
     * `true`: only allows one selection
     * `always`: can and must have only one selection
     */
    singleSelection?: EuiSelectableOptionsListProps['singleSelection'];
    /**
     * Allows marking options as `checked='off'` as well as `'on'`
     */
    allowExclusions?: boolean;
    /**
     * Show an loading indicator while you load and hook up your data
     */
    isLoading?: boolean;
    /**
     * Sets the max height in pixels or pass `full` to allow
     * the whole group to fill the height of its container and
     * allows the list grow as well
     */
    height?: number | 'full';
    /**
     * See {@link EuiSelectableOptionsListPropsWithDefaults}
     */
    listProps?: EuiSelectableOptionsListPropsWithDefaults;
    /**
     * Custom render function for each option.
     * Returns `(option, searchValue)`
     */
    renderOption?: (
      option: EuiSelectableOption<T>,
      searchValue: string
    ) => ReactNode;
    /**
     * Customize the loading message. Pass a string to simply change the text,
     * or a node to replace the whole content.
     */
    loadingMessage?: ReactElement | string;
    /**
     * Customize the no matches message. Pass a string to simply change the text,
     * or a node to replace the whole content.
     */
    noMatchesMessage?: ReactElement | string;
    /**
     * Customize the empty message. Pass a string to simply change the text,
     * or a node to replace the whole content.
     */
    emptyMessage?: ReactElement | string;
    /**
     * Add an error message.
     * The message will be shown when the value is not `null` or `undefined`.
     * Pass a string to simply change the text, or a node to replace the whole content.
     *
     * `errorMessage={hasErrors ? 'My error message' : null}`
     */
    errorMessage?: ReactElement | string | null;
    /**
     * Control whether or not options get filtered internally (i.e., whether filtering is
     * handled by EUI or by you, the consumer).
     * If set to `true`, all passed `options` will be displayed regardless of the user's
     * search input.
     *
     * Additionally allows passing a configuration object which enables turning off
     * search highlighting if needed.
     *
     * @default false
     */
    isPreFiltered?: boolean | { highlightSearch?: boolean };
    /**
     * Optional screen reader instructions to announce upon focus/interaction. This text is read out
     * after the `EuiSelectable` label and a brief pause, but before the default keyboard instructions for
     * interacting with a selectable are read out.
     */
    selectableScreenReaderText?: string;
    /**
     * Optional custom option matcher function
     *
     * @example
     * const exactEqualityMatcher: EuiSelectableOptionMatcher = ({ option, searchValue }) => {
     *   return option.label === searchValue;
     * }
     */
    optionMatcher?: EuiSelectableOptionMatcher<T>;
  };

export interface EuiSelectableState<T> {
  activeOptionIndex?: number;
  searchValue: string;
  visibleOptions: Array<EuiSelectableOption<T>>;
  isFocused: boolean;
}

export class EuiSelectable<T = {}> extends Component<
  EuiSelectableProps<T>,
  EuiSelectableState<T>
> {
  static defaultProps = {
    options: [],
    singleSelection: false,
    searchable: false,
    isPreFiltered: false,
    optionMatcher: createPartialStringEqualityOptionMatcher(),
  };
  private inputRef: HTMLInputElement | null = null;
  private containerRef = createRef<HTMLDivElement>();
  private optionsListRef = createRef<EuiSelectableList<T>>();
  private preventOnFocus = false;
  rootId: (suffix?: string) => string;
  messageContentId: string;
  listId: string;
  constructor(props: EuiSelectableProps<T>) {
    super(props);

    this.rootId = props.id
      ? (suffix) => `${props.id}${suffix ? `_${suffix}` : ''}`
      : htmlIdGenerator();

    this.listId = this.rootId('listbox');
    this.messageContentId = this.rootId('messageContent');

    const { options, singleSelection, isPreFiltered, searchProps } = props;

    const initialSearchValue =
      searchProps?.value || String(searchProps?.defaultValue || '');

    const visibleOptions = getMatchingOptions<T>({
      options,
      searchValue: initialSearchValue,
      isPreFiltered: !!isPreFiltered,
      selectedOptions: [],
      optionMatcher: props.optionMatcher!,
    });

    searchProps?.onChange?.(initialSearchValue, visibleOptions);

    // ensure that the currently selected single option is active if it is in the visibleOptions
    const selectedOptions = options.filter((option) => option.checked);
    let activeOptionIndex;
    if (singleSelection && selectedOptions.length === 1) {
      if (visibleOptions.includes(selectedOptions[0])) {
        activeOptionIndex = visibleOptions.indexOf(selectedOptions[0]);
      }
    }

    this.state = {
      activeOptionIndex,
      searchValue: initialSearchValue,
      visibleOptions,
      isFocused: false,
    };
  }

  static getDerivedStateFromProps<T>(
    nextProps: EuiSelectableProps<T>,
    prevState: EuiSelectableState<T>
  ) {
    const { options, isPreFiltered, searchProps, optionMatcher } = nextProps;
    const { activeOptionIndex, searchValue } = prevState;

    const stateUpdate: Partial<EuiSelectableState<T>> = {
      searchValue,
      activeOptionIndex,
    };

    if (searchProps?.value != null && searchProps.value !== searchValue) {
      stateUpdate.searchValue = searchProps.value;
    }

    stateUpdate.visibleOptions = getMatchingOptions<T>({
      options,
      searchValue: stateUpdate.searchValue ?? '',
      isPreFiltered: !!isPreFiltered,
      selectedOptions: [],
      optionMatcher: optionMatcher!,
    });

    if (
      activeOptionIndex != null &&
      activeOptionIndex >= stateUpdate.visibleOptions.length
    ) {
      stateUpdate.activeOptionIndex = -1;
    }

    return stateUpdate;
  }

  componentDidUpdate<T>(
    prevProps: EuiSelectableProps<T>,
    prevState: EuiSelectableState<T>
  ) {
    if (prevState.activeOptionIndex !== this.state.activeOptionIndex) {
      const activeOption =
        this.state.activeOptionIndex != null
          ? this.state.visibleOptions[this.state.activeOptionIndex]
          : null;
      this.props.onActiveOptionChange?.(activeOption);
    }
  }

  isFocusOnSearchOrListBox = (target: EventTarget | null) => {
    const searchHasFocus = this.props.searchable && target === this.inputRef;

    const listBox = this.optionsListRef.current?.listBoxRef?.parentElement;
    const listBoxContainsFocus =
      target instanceof Node && listBox?.contains(target);
    const listBoxHasFocus = target === listBox || listBoxContainsFocus;

    return searchHasFocus || listBoxHasFocus;
  };

  onMouseDown = () => {
    // Bypass onFocus when a click event originates from this.containerRef.
    // Prevents onFocus from scrolling away from a clicked option and negating the selection event.
    // https://github.com/elastic/eui/issues/4147
    this.preventOnFocus = true;
  };

  onFocus = (event?: FocusEvent) => {
    if (this.preventOnFocus) {
      this.preventOnFocus = false;
      return;
    }

    if (
      !this.state.visibleOptions.length ||
      this.state.activeOptionIndex != null
    ) {
      return;
    }

    if (event && !this.isFocusOnSearchOrListBox(event.target)) {
      return;
    }

    const firstSelected = this.state.visibleOptions.findIndex(
      (option) => option.checked && !option.disabled && !option.isGroupLabel
    );

    if (firstSelected > -1) {
      this.setState({ activeOptionIndex: firstSelected, isFocused: true });
    } else {
      this.setState({
        activeOptionIndex: this.state.visibleOptions.findIndex(
          (option) => !option.disabled && !option.isGroupLabel
        ),
        isFocused: true,
      });
    }
  };

  onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const optionsList = this.optionsListRef.current;

    // Check if the user is interacting with something other than the
    // searchbox or selection list. If so, the user may be attempting to
    // interact with the search clear button or a totally custom button,
    // and listbox keyboard navigation/selection should not be triggered.
    if (!this.isFocusOnSearchOrListBox(event.target)) {
      this.setState({ activeOptionIndex: undefined, isFocused: false });
      return;
    }

    switch (event.key) {
      case keys.ARROW_UP:
        event.preventDefault();
        event.stopPropagation();
        this.incrementActiveOptionIndex(-1);
        break;

      case keys.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        this.incrementActiveOptionIndex(1);
        break;

      // For non-searchable instances, SPACE interaction should align with
      // the user expectation of selection toggling (e.g., input[type=checkbox]).
      // ENTER is also a valid selection mechanism in this case.
      case keys.ENTER:
      case keys.SPACE:
        if (this.props.searchable) {
          // For searchable instances, SPACE is reserved as a character for filtering
          // via the input box, and as such only ENTER will toggle selection.
          if (event.target === this.inputRef && event.key === keys.SPACE) {
            return;
          }
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.state.activeOptionIndex != null && optionsList) {
          event.persist(); // NOTE: This is needed for React v16 backwards compatibility
          optionsList.onAddOrRemoveOption(
            this.state.visibleOptions[this.state.activeOptionIndex],
            event
          );
        }
        break;

      case keys.ALT:
      case keys.SHIFT:
      case keys.CTRL:
      case keys.META:
        break;

      default:
        this.setState({ activeOptionIndex: undefined }, this.onFocus);
        break;
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

      // Group titles and disabled options are included in option list but are not selectable
      const direction = amount > 0 ? 1 : -1;
      while (
        visibleOptions[nextActiveOptionIndex].isGroupLabel ||
        visibleOptions[nextActiveOptionIndex].disabled
      ) {
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

  onSearchChange = (
    searchValue: string,
    visibleOptions: Array<EuiSelectableOption<T>>
  ) => {
    this.setState(
      {
        searchValue,
        visibleOptions,
        activeOptionIndex: undefined,
      },
      () => {
        if (this.state.isFocused) {
          this.onFocus();
        }
      }
    );
    this.props.searchProps?.onChange?.(searchValue, visibleOptions);
  };

  onContainerBlur = (e: React.FocusEvent) => {
    // Ignore blur events when moving from search to option to avoid activeOptionIndex conflicts
    if (this.isFocusOnSearchOrListBox(e.relatedTarget)) {
      return;
    }

    this.setState({
      activeOptionIndex: undefined,
      isFocused: false,
    });
  };

  onOptionClick = (
    options: Array<EuiSelectableOption<T>>,
    event: EuiSelectableOnChangeEvent,
    clickedOption: EuiSelectableOption<T>
  ) => {
    const { isPreFiltered, onChange, optionMatcher } = this.props;
    const { searchValue } = this.state;
    const visibleOptions = getMatchingOptions({
      options,
      searchValue: searchValue ?? '',
      isPreFiltered: !!isPreFiltered,
      selectedOptions: [],
      optionMatcher: optionMatcher!,
    });

    this.setState({ visibleOptions });

    if (onChange) {
      onChange(options, event, clickedOption);
    }
  };

  scrollToItem = (index: number, align?: Align) => {
    this.optionsListRef.current?.listRef?.scrollToItem(index, align);
  };

  makeOptionId = (index?: number) =>
    index != null ? `${this.listId}_option-${index}` : '';

  render() {
    const {
      children,
      className,
      options,
      onChange,
      onActiveOptionChange,
      searchable,
      searchProps,
      singleSelection,
      isLoading,
      listProps,
      renderOption,
      height,
      allowExclusions,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      loadingMessage,
      noMatchesMessage,
      emptyMessage,
      errorMessage,
      selectableScreenReaderText,
      isPreFiltered,
      optionMatcher,
      ...rest
    } = this.props;

    const { searchValue, visibleOptions, activeOptionIndex } = this.state;

    // Some messy destructuring here to remove aria-label/describedby from searchProps and listProps
    // Made messier by some TS requirements
    // The aria attributes are then used in getAccessibleName() to place them where they need to go
    const unknownAccessibleName = {
      'aria-label': undefined,
      'aria-describedby': undefined,
    };
    const {
      'aria-label': searchAriaLabel,
      'aria-describedby': searchAriaDescribedby,
      onChange: propsOnChange,
      defaultValue, // Because we control the underlying EuiFieldSearch value state with state.searchValue, we cannot pass a defaultValue prop without a React error
      inputRef, // We need to store the inputRef before passing it back to consuming applications
      ...cleanedSearchProps
    } = (searchProps || unknownAccessibleName) as typeof searchProps &
      typeof unknownAccessibleName;
    const {
      'aria-label': listAriaLabel,
      'aria-describedby': listAriaDescribedby,
      isVirtualized,
      rowHeight,
      ...cleanedListProps
    } = (listProps || unknownAccessibleName) as typeof listProps &
      typeof unknownAccessibleName;

    let virtualizedProps: EuiSelectableOptionsListVirtualizedProps;

    if (isVirtualized === false) {
      virtualizedProps = {
        isVirtualized,
      };
    } else if (rowHeight != null) {
      virtualizedProps = {
        rowHeight,
      };
    }

    const classes = classNames('euiSelectable', className);
    const cssStyles = [
      styles.euiSelectable,
      height === 'full' && styles.fullHeight,
    ];

    /** Create message content that replaces the list if no options are available (yet) */
    let messageContent: ReactNode | undefined;
    if (errorMessage != null) {
      messageContent =
        typeof errorMessage === 'string' ? <p>{errorMessage}</p> : errorMessage;
    } else if (isLoading) {
      if (loadingMessage === undefined || typeof loadingMessage === 'string') {
        messageContent = (
          <>
            <EuiLoadingSpinner size="m" />
            <EuiSpacer size="xs" />
            <p>
              {loadingMessage || (
                <EuiI18n
                  token="euiSelectable.loadingOptions"
                  default="Loading options"
                />
              )}
            </p>
          </>
        );
      } else {
        messageContent = React.cloneElement(loadingMessage, {
          id: this.messageContentId,
          ...loadingMessage.props,
        });
      }
    } else if (searchValue && visibleOptions.length === 0) {
      if (
        noMatchesMessage === undefined ||
        typeof noMatchesMessage === 'string'
      ) {
        messageContent = (
          <p>
            {noMatchesMessage || (
              <EuiI18n
                token="euiSelectable.noMatchingOptions"
                default="{searchValue} doesn't match any options"
                values={{ searchValue: <strong>{searchValue}</strong> }}
              />
            )}
          </p>
        );
      } else {
        messageContent = React.cloneElement(noMatchesMessage, {
          id: this.messageContentId,
          ...noMatchesMessage.props,
        });
      }
    } else if (!options.length) {
      if (emptyMessage === undefined || typeof emptyMessage === 'string') {
        messageContent = (
          <p>
            {emptyMessage || (
              <EuiI18n
                token="euiSelectable.noAvailableOptions"
                default="No options available"
              />
            )}
          </p>
        );
      } else {
        messageContent = React.cloneElement(emptyMessage, {
          id: this.messageContentId,
          ...emptyMessage.props,
        });
      }
    }

    /**
     * There are lots of ways to add an accessible name
     * Usually we want the same name for the input and the listbox (which is added by aria-label/describedby)
     * But you can always override it using searchProps or listProps
     * This finds the correct name to use
     *
     * TODO: This doesn't handle being labelled (<label for="idOfInput">)
     */
    const getAccessibleName = (
      props:
        | EuiSelectableSearchableSearchProps<T>
        | EuiSelectableOptionsListPropsWithDefaults
        | undefined,
      messageContentId?: string
    ) => {
      if (props && props['aria-label']) {
        return { 'aria-label': props['aria-label'] };
      }

      const messageContentIdString = messageContentId
        ? ` ${messageContentId}`
        : '';

      if (props && props['aria-describedby']) {
        return {
          'aria-describedby': `${props['aria-describedby']}${messageContentIdString}`,
        };
      }

      if (ariaLabel) {
        return { 'aria-label': ariaLabel };
      }

      if (ariaDescribedby) {
        return {
          'aria-describedby': `${ariaDescribedby}${messageContentIdString}`,
        };
      }

      return {};
    };

    const searchAccessibleName = getAccessibleName(
      searchProps,
      this.messageContentId
    );
    const searchHasAccessibleName = Boolean(
      Object.keys(searchAccessibleName).length
    );
    const search = searchable ? (
      <EuiI18n
        tokens={[
          'euiSelectable.screenReaderInstructions',
          'euiSelectable.placeholderName',
        ]}
        defaults={[
          'Use the Up and Down arrow keys to move focus over options. Press Enter to select. Press Escape to collapse options.',
          'Filter options',
        ]}
      >
        {([screenReaderInstructions, placeholderName]: string[]) => (
          <>
            <EuiSelectableSearch<T>
              aria-describedby={listAriaDescribedbyId}
              key="listSearch"
              options={options}
              value={searchValue}
              onChange={this.onSearchChange}
              listId={this.optionsListRef.current ? this.listId : undefined} // Only pass the listId if it exists on the page
              aria-activedescendant={this.makeOptionId(activeOptionIndex)} // the current faux-focused option
              placeholder={placeholderName}
              isPreFiltered={!!isPreFiltered}
              optionMatcher={optionMatcher!}
              inputRef={(node) => {
                this.inputRef = node;
                searchProps?.inputRef?.(node);
              }}
              {...(searchHasAccessibleName
                ? searchAccessibleName
                : { 'aria-label': placeholderName })}
              {...cleanedSearchProps}
            />

            <EuiScreenReaderOnly>
              <p id={listAriaDescribedbyId}>
                {selectableScreenReaderText} {screenReaderInstructions}
              </p>
            </EuiScreenReaderOnly>
          </>
        )}
      </EuiI18n>
    ) : undefined;

    const resultsLength = visibleOptions.filter(
      (option) => !option.disabled
    ).length;
    const listScreenReaderStatus = searchable && (
      <EuiI18n
        token="euiSelectable.searchResults"
        default={({ resultsLength }) =>
          `${resultsLength} result${resultsLength === 1 ? '' : 's'} available`
        }
        values={{ resultsLength }}
      />
    );

    const listAriaDescribedbyId = this.rootId('instructions');
    const listAccessibleName = getAccessibleName(
      listProps,
      listAriaDescribedbyId
    );
    const listHasAccessibleName = Boolean(
      Object.keys(listAccessibleName).length
    );
    const list = (
      <EuiI18n token="euiSelectable.placeholderName" default="Filter options">
        {(placeholderName: string) => (
          <>
            {searchable && (
              <EuiScreenReaderLive
                isActive={messageContent != null || activeOptionIndex != null}
              >
                {messageContent || listScreenReaderStatus}
              </EuiScreenReaderLive>
            )}

            {messageContent ? (
              <EuiSelectableMessage
                data-test-subj="euiSelectableMessage"
                id={this.messageContentId}
                bordered={listProps && listProps.bordered}
              >
                {messageContent}
              </EuiSelectableMessage>
            ) : (
              <EuiSelectableList<T>
                data-test-subj="euiSelectableList"
                key="list"
                options={options}
                visibleOptions={visibleOptions}
                searchValue={searchValue}
                isPreFiltered={isPreFiltered}
                activeOptionIndex={activeOptionIndex}
                setActiveOptionIndex={(index, cb) => {
                  this.setState({ activeOptionIndex: index }, cb);
                }}
                onOptionClick={this.onOptionClick}
                singleSelection={singleSelection}
                ref={this.optionsListRef}
                renderOption={renderOption}
                height={height}
                allowExclusions={allowExclusions}
                searchable={searchable}
                makeOptionId={this.makeOptionId}
                listId={this.listId}
                {...(listHasAccessibleName
                  ? listAccessibleName
                  : searchable && { 'aria-label': placeholderName })}
                {...cleanedListProps}
                {...virtualizedProps}
              />
            )}
          </>
        )}
      </EuiI18n>
    );

    return (
      <div
        ref={this.containerRef}
        css={cssStyles}
        className={classes}
        onKeyDown={this.onKeyDown}
        onBlur={this.onContainerBlur}
        onFocus={this.onFocus}
        onMouseDown={this.onMouseDown}
        {...rest}
      >
        {children && children(list, search)}
      </div>
    );
  }
}
