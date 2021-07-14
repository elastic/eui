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
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { EuiSelectableSearch } from './selectable_search';
import { EuiSelectableMessage } from './selectable_message';
import { EuiSelectableList } from './selectable_list';
import { EuiLoadingSpinner } from '../loading';
import { EuiSpacer } from '../spacer';
import { getMatchingOptions } from './matching_options';
import { keys, htmlIdGenerator } from '../../services';
import { EuiI18n } from '../i18n';
import { EuiSelectableOption } from './selectable_option';
import { EuiSelectableOptionsListProps } from './selectable_list/selectable_list';
import { EuiSelectableSearchProps } from './selectable_search/selectable_search';
import { Align } from 'react-window';

type RequiredEuiSelectableOptionsListProps = Omit<
  EuiSelectableOptionsListProps,
  keyof typeof EuiSelectableList['defaultProps']
>;
type OptionalEuiSelectableOptionsListProps = Omit<
  EuiSelectableOptionsListProps,
  keyof RequiredEuiSelectableOptionsListProps
>;
type EuiSelectableOptionsListPropsWithDefaults = RequiredEuiSelectableOptionsListProps &
  Partial<OptionalEuiSelectableOptionsListProps>;

// `searchProps` can only be specified when `searchable` is true
type EuiSelectableSearchableProps<T> = ExclusiveUnion<
  {
    searchable: false;
  },
  {
    /**
     * Hooks up a search box to filter the list (boolean)
     */
    searchable: true;
    /**
     * Passes props down to the `EuiFieldSearch`
     */
    searchProps?: Partial<EuiSelectableSearchProps<T>>;
  }
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
      search: ReactElement<EuiSelectableSearch<T>> | undefined
    ) => ReactNode;
    /**
     * Array of EuiSelectableOption objects. See #EuiSelectableOptionProps
     */
    options: Array<EuiSelectableOption<T>>;
    /**
     * Passes back the altered `options` array with selected options as
     */
    onChange?: (options: Array<EuiSelectableOption<T>>) => void;
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
     * See #EuiSelectableOptionsList
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
     * Control whether or not options get filtered internally or if consumer will filter
     * Default: false
     */
    isPreFiltered?: boolean;
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
  };
  private containerRef = createRef<HTMLDivElement>();
  private optionsListRef = createRef<EuiSelectableList<T>>();
  rootId = htmlIdGenerator();
  constructor(props: EuiSelectableProps<T>) {
    super(props);

    const { options, singleSelection, isPreFiltered } = props;

    const initialSearchValue = '';

    const visibleOptions = getMatchingOptions<T>(
      options,
      initialSearchValue,
      isPreFiltered
    );

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
    const { options, isPreFiltered } = nextProps;
    const { activeOptionIndex, searchValue } = prevState;

    const matchingOptions = getMatchingOptions<T>(
      options,
      searchValue,
      isPreFiltered
    );

    const stateUpdate = { visibleOptions: matchingOptions, activeOptionIndex };

    if (
      activeOptionIndex != null &&
      activeOptionIndex >= matchingOptions.length
    ) {
      stateUpdate.activeOptionIndex = -1;
    }

    return stateUpdate;
  }

  hasActiveOption = () => {
    return this.state.activeOptionIndex != null;
  };

  onFocus = () => {
    if (!this.state.visibleOptions.length || this.state.activeOptionIndex) {
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

      case keys.ENTER:
        event.preventDefault();
        event.stopPropagation();
        if (this.state.activeOptionIndex != null && optionsList) {
          optionsList.onAddOrRemoveOption(
            this.state.visibleOptions[this.state.activeOptionIndex]
          );
        }
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
    visibleOptions: Array<EuiSelectableOption<T>>,
    searchValue: string
  ) => {
    this.setState(
      {
        visibleOptions,
        searchValue,
        activeOptionIndex: undefined,
      },
      () => {
        if (this.state.isFocused) {
          this.onFocus();
        }
      }
    );
    if (this.props.searchProps && this.props.searchProps.onSearch) {
      this.props.searchProps.onSearch(searchValue);
    }
  };

  onContainerBlur = (e: React.FocusEvent) => {
    // Ignore blur events when moving from search to option to avoid activeOptionIndex conflicts
    if (this.containerRef.current!.contains(e.relatedTarget as Node)) return;

    this.setState({
      activeOptionIndex: undefined,
      isFocused: false,
    });
  };

  onOptionClick = (options: Array<EuiSelectableOption<T>>) => {
    const { isPreFiltered, onChange, searchProps } = this.props;
    const { searchValue } = this.state;
    const visibleOptions = getMatchingOptions(
      options,
      searchValue,
      isPreFiltered
    );

    this.setState({ visibleOptions });

    if (onChange) {
      onChange(options);
    }

    if (searchProps && searchProps.onChange) {
      searchProps.onChange(visibleOptions, searchValue);
    }
  };

  scrollToItem = (index: number, align?: Align) => {
    this.optionsListRef.current?.listRef?.scrollToItem(index, align);
  };

  render() {
    const {
      id,
      children,
      className,
      options,
      onChange,
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
      isPreFiltered,
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
      onSearch,
      ...cleanedSearchProps
    } = (searchProps || unknownAccessibleName) as typeof searchProps &
      typeof unknownAccessibleName;
    const {
      'aria-label': listAriaLabel,
      'aria-describedby': listAriaDescribedby,
      ...cleanedListProps
    } = listProps || unknownAccessibleName;

    const classes = classNames(
      'euiSelectable',
      {
        'euiSelectable-fullHeight': height === 'full',
      },
      className
    );

    /** Create Id's */
    let messageContentId = this.rootId('messageContent');
    const listId = this.rootId('listbox');
    const makeOptionId = (index: number | undefined) => {
      if (typeof index === 'undefined') {
        return '';
      }

      return `${listId}_option-${index}`;
    };

    /** Create message content that replaces the list if no options are available (yet) */
    let messageContent: ReactNode | undefined;
    if (isLoading) {
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
          id: messageContentId,
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
          id: messageContentId,
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
          id: messageContentId,
          ...emptyMessage.props,
        });
      }
    } else {
      messageContentId = '';
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
        | Partial<EuiSelectableSearchProps<T>>
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
      messageContentId
    );
    const searchHasAccessibleName = Boolean(
      Object.keys(searchAccessibleName).length
    );
    const search = searchable ? (
      <EuiI18n token="euiSelectable.placeholderName" default="Filter options">
        {(placeholderName: string) => (
          <EuiSelectableSearch<T>
            key="listSearch"
            options={options}
            onChange={this.onSearchChange}
            listId={this.optionsListRef.current ? listId : undefined} // Only pass the listId if it exists on the page
            aria-activedescendant={makeOptionId(activeOptionIndex)} // the current faux-focused option
            placeholder={placeholderName}
            isPreFiltered={isPreFiltered ?? false}
            {...(searchHasAccessibleName
              ? searchAccessibleName
              : { 'aria-label': placeholderName })}
            {...cleanedSearchProps}
          />
        )}
      </EuiI18n>
    ) : undefined;

    const listAccessibleName = getAccessibleName(listProps);
    const listHasAccessibleName = Boolean(
      Object.keys(listAccessibleName).length
    );
    const list = messageContent ? (
      <EuiSelectableMessage
        id={messageContentId}
        bordered={listProps && listProps.bordered}>
        {messageContent}
      </EuiSelectableMessage>
    ) : (
      <EuiI18n token="euiSelectable.placeholderName" default="Filter options">
        {(placeholderName: string) => (
          <EuiSelectableList<T>
            key="list"
            options={options}
            visibleOptions={visibleOptions}
            searchValue={searchValue}
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
            makeOptionId={makeOptionId}
            listId={listId}
            {...(listHasAccessibleName
              ? listAccessibleName
              : searchable && { 'aria-label': placeholderName })}
            {...cleanedListProps}
          />
        )}
      </EuiI18n>
    );

    return (
      <div
        ref={this.containerRef}
        className={classes}
        onKeyDown={this.onKeyDown}
        onBlur={this.onContainerBlur}
        onFocus={this.onFocus}
        {...rest}>
        {children && children(list, search)}
      </div>
    );
  }
}
