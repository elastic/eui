import React, {
  Component,
  HTMLAttributes,
  ReactNode,
  createRef,
  Fragment,
  ReactElement,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { EuiSelectableSearch } from './selectable_search';
import { EuiSelectableMessage } from './selectable_message';
import { EuiSelectableList } from './selectable_list';
import { EuiLoadingChart } from '../loading';
import { getMatchingOptions } from './matching_options';
import { comboBoxKeyCodes, htmlIdGenerator } from '../../services';
import { EuiI18n } from '../i18n';
import { EuiSelectableOption } from './selectable_option';
import { EuiSelectableOptionsListProps } from './selectable_list/selectable_list';
import { EuiSelectableSearchProps } from './selectable_search/selectable_search';

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
type EuiSelectableSearchableProps = ExclusiveUnion<
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
    searchProps?: Partial<EuiSelectableSearchProps>;
  }
>;

export type EuiSelectableProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange'
> &
  CommonProps &
  EuiSelectableSearchableProps & {
    /**
     * Function that takes the `list` node and then
     * the `search` node (if `searchable` is applied)
     */
    children?: (
      list: ReactElement<
        typeof EuiSelectableMessage | typeof EuiSelectableList
      >,
      search: ReactElement<EuiSelectableSearch> | undefined
    ) => ReactNode;
    /**
     * Array of EuiSelectableOption objects. See #EuiSelectableOptionProps
     */
    options: EuiSelectableOption[];
    /**
     * Passes back the altered `options` array with selected options as
     */
    onChange?: (options: EuiSelectableOption[]) => void;
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
    renderOption?: (option: EuiSelectableOption, searchValue: string) => {};
  };

export interface EuiSelectableState {
  activeOptionIndex?: number;
  searchValue: string;
  visibleOptions: EuiSelectableOption[];
}

export class EuiSelectable extends Component<
  EuiSelectableProps,
  EuiSelectableState
> {
  static defaultProps = {
    options: [],
    singleSelection: false,
    searchable: false,
  };

  private optionsListRef = createRef<EuiSelectableList>();
  rootId = htmlIdGenerator();
  constructor(props: EuiSelectableProps) {
    super(props);

    const { options, singleSelection } = props;

    const initialSearchValue = '';

    const visibleOptions = getMatchingOptions(options, initialSearchValue);

    // ensure that the currently selected single option is active if it is in the visibleOptions
    const selectedOptions = options.filter(option => option.checked);
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
    };
  }

  static getDerivedStateFromProps(
    nextProps: EuiSelectableProps,
    prevState: EuiSelectableState
  ) {
    const { options } = nextProps;
    const { activeOptionIndex, searchValue } = prevState;

    const matchingOptions = getMatchingOptions(options, searchValue);

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
    const firstSelected = this.state.visibleOptions.findIndex(
      option => option.checked && !option.disabled
    );

    if (firstSelected > -1) {
      this.setState({ activeOptionIndex: firstSelected });
    } else {
      this.incrementActiveOptionIndex(1);
    }
  };

  onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const optionsList = this.optionsListRef.current;

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
        if (this.state.activeOptionIndex != null && optionsList) {
          optionsList.onAddOrRemoveOption(
            this.state.visibleOptions[this.state.activeOptionIndex]
          );
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

  clearActiveOption = () => {
    this.setState({
      activeOptionIndex: undefined,
    });
  };

  onSearchChange = (
    visibleOptions: EuiSelectableOption[],
    searchValue: string
  ) => {
    this.setState({
      visibleOptions,
      searchValue,
    });
  };

  onContainerBlur = () => {
    this.clearActiveOption();
  };

  onOptionClick = (options: EuiSelectableOption[]) => {
    this.setState(state => ({
      visibleOptions: getMatchingOptions(options, state.searchValue),
    }));
    if (this.props.onChange) {
      this.props.onChange(options);
    }
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
      ...cleanedSearchProps
    } = searchProps || unknownAccessibleName;
    const {
      'aria-label': listAriaLabel,
      'aria-describedby': listAriaDescribedby,
      ...cleanedListProps
    } = listProps || unknownAccessibleName;

    let messageContent;

    if (isLoading) {
      messageContent = (
        <Fragment>
          <EuiLoadingChart size="m" mono />
          <br />
          <p>
            <EuiI18n
              token="euiSelectable.loadingOptions"
              default="Loading options"
            />
          </p>
        </Fragment>
      );
    } else if (searchValue && visibleOptions.length === 0) {
      messageContent = (
        <p>
          <EuiI18n
            token="euiSelectable.noMatchingOptions"
            default="{searchValue} doesn't match any options"
            values={{ searchValue: <strong>{searchValue}</strong> }}
          />
        </p>
      );
    } else if (!options.length) {
      messageContent = (
        <p>
          <EuiI18n
            token="euiSelectable.noAvailableOptions"
            default="No options available"
          />
        </p>
      );
    }

    const classes = classNames(
      'euiSelectable',
      {
        'euiSelectable-fullHeight': height === 'full',
      },
      className
    );

    const listId = this.rootId('listbox');
    const makeOptionId = (index: number | undefined) => {
      if (typeof index === 'undefined') {
        return '';
      }

      return `${listId}_option-${index}`;
    };

    /**
     * There are lots of ways to add an accessible name
     * Usually we want the same name for the input and the listbox (which is added by aria-label/describedby)
     * But you can always override it using searchProps or listProps
     * This finds the correct name to use
     *
     * TODO: This doesn't handle being labelled (<label for="idOfInput">)
     *
     * @param props
     */
    const getAccessibleName = (
      props:
        | Partial<EuiSelectableSearchProps>
        | EuiSelectableOptionsListPropsWithDefaults
        | undefined
    ) => {
      if (props && props['aria-label']) {
        return { 'aria-label': props['aria-label'] };
      }

      if (props && props['aria-describedby']) {
        return {
          'aria-describedby': props['aria-describedby'],
        };
      }

      if (ariaLabel) {
        return { 'aria-label': ariaLabel };
      }

      if (ariaDescribedby) {
        return { 'aria-describedby': ariaDescribedby };
      }

      return {};
    };

    const searchAccessibleName = getAccessibleName(searchProps);
    const searchHasAccessibleName = Boolean(
      Object.keys(searchAccessibleName).length
    );
    const search = searchable ? (
      <EuiI18n token="euiSelectable.placeholderName" default="Filter options">
        {(placeholderName: string) => (
          <EuiSelectableSearch
            key="listSearch"
            options={options}
            onChange={this.onSearchChange}
            listId={listId}
            aria-activedescendant={makeOptionId(activeOptionIndex)} // the current faux-focused option
            placeholder={placeholderName}
            {...(searchHasAccessibleName
              ? searchAccessibleName
              : { 'aria-label': placeholderName })}
            {...cleanedSearchProps}
          />
        )}
      </EuiI18n>
    ) : (
      undefined
    );

    const listAccessibleName = getAccessibleName(listProps);
    const listHasAccessibleName = Boolean(
      Object.keys(listAccessibleName).length
    );
    const list = messageContent ? (
      <EuiSelectableMessage key="listMessage">
        {messageContent}
      </EuiSelectableMessage>
    ) : (
      <EuiI18n token="euiSelectable.placeholderName" default="Filter options">
        {(placeholderName: string) => (
          <EuiSelectableList
            key="list"
            options={options}
            visibleOptions={visibleOptions}
            searchValue={searchValue}
            activeOptionIndex={activeOptionIndex}
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
