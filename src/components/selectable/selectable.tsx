import React, {
  Component,
  HTMLAttributes,
  ReactNode,
  createRef,
  Fragment,
} from 'react';
import classNames from 'classnames';
import { CommonProps, Omit } from '../common';
import { EuiSelectableSearch } from './selectable_search';
import { EuiSelectableMessage } from './selectable_message';
import { EuiSelectableList } from './selectable_list';
// @ts-ignore
import { EuiLoadingChart } from '../loading';
// @ts-ignore
import { getMatchingOptions } from '../combo_box/matching_options';
import { comboBoxKeyCodes } from '../../services';
import { TAB } from '../../services/key_codes';
import { EuiI18n } from '../i18n';
import { Option } from './types';
import {
  EuiSelectableOptionsListProps,
  EuiSelectableSingleOptionProps,
} from './selectable_list/selectable_list';

export type EuiSelectableProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> &
  CommonProps & {
    /**
     * Function that returns the `list` node and then
     * the `search` node (if `searchable` is applied)
     */
    children?: (list: ReactNode, search: ReactNode) => ReactNode;
    /**
     * Array or Option objects, see docs for props
     */
    options: Option[];
    /**
     * Passes back the altered `options` array with selected options as
     */
    onChange?: (options: Option[]) => void;
    /**
     * Hooks up a search box to filter the list
     */
    searchable?: boolean;
    /**
     * Passes props down to the `EuiFieldSearch`
     */
    searchProps?: {};
    /**
     * Sets the single selection policy of
     * `false`: allows multiple selection
     * `true`: only allows one selection
     * `always`: can and must have only one selection
     */
    singleSelection?: EuiSelectableSingleOptionProps;
    /**
     * Allows marking options as checked = 'off' as well as 'on'
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
     * See `EuiSelectableList`
     */
    listProps?: EuiSelectableOptionsListProps;
    /**
     * Custom render function for each option.
     * Returns (option, searchValue)
     */
    renderOption?: (option: Option, searchValue?: string) => {};
    async?: boolean;
  };

export interface EuiSelectableState {
  activeOptionIndex?: number;
  searchValue: string;
  visibleOptions: Option[];
  options: Option[];
}

export class EuiSelectable extends Component<
  EuiSelectableProps,
  EuiSelectableState
> {
  static defaultProps = {
    options: [],
    singleSelection: false,
  };

  private optionsListRef = createRef<EuiSelectableList>();

  constructor(props: EuiSelectableProps) {
    super(props);

    const { options, singleSelection, async } = props;

    const initialSearchValue = '';

    const visibleOptions = getMatchingOptions(
      options,
      [],
      initialSearchValue,
      async,
      true
    );

    // ensure that the currently selected single option is active if it is in the visibleOptions
    const selectedOptions = options.filter(option => option.checked);
    let activeOptionIndex;
    if (singleSelection && selectedOptions.length === 1) {
      if (visibleOptions.includes(selectedOptions[0])) {
        activeOptionIndex = visibleOptions.indexOf(selectedOptions[0]);
      }
    }

    this.state = {
      options,
      activeOptionIndex,
      searchValue: initialSearchValue,
      visibleOptions,
    };
  }

  hasActiveOption = () => {
    return this.state.activeOptionIndex != null;
  };

  onKeyDown = (e: any) => {
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

      case TAB:
        // Disallow tabbing when the user is navigating the options.
        // TODO: Can we force the tab to the next sibling element?
        if (this.hasActiveOption()) {
          e.preventDefault();
          e.stopPropagation();
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

      // Group titles are included in option list but are not selectable
      // Skip group title options
      const direction = amount > 0 ? 1 : -1;
      while (visibleOptions[nextActiveOptionIndex].isGroupLabel) {
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

  onOptionClick = (options: Option[]) => {
    this.setState({
      options,
    });
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
      async,
      ...rest
    } = this.props;

    const { searchValue, visibleOptions, activeOptionIndex } = this.state;

    let messageContent;

    if (isLoading) {
      messageContent = (
        <Fragment>
          <EuiLoadingChart size="m" mono />
          <br />
          <p>
            <EuiI18n
              token="euiComboBoxOptionsList.loadingOptions"
              default="Loading options"
            />
          </p>
        </Fragment>
      );
    } else if (searchValue && visibleOptions.length === 0) {
      messageContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.noMatchingOptions"
            default="{searchValue} doesn't match any options"
            values={{ searchValue: <strong>{searchValue}</strong> }}
          />
        </p>
      );
    } else if (!options.length) {
      messageContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.noAvailableOptions"
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

    const search = searchable ? (
      <EuiSelectableSearch
        key="listSearch"
        options={options}
        onChange={this.onSearchChange}
        async={async}
        {...searchProps}
      />
    ) : (
      undefined
    );

    const list = messageContent ? (
      <EuiSelectableMessage key="listMessage">
        {messageContent}
      </EuiSelectableMessage>
    ) : (
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
        {...listProps}
      />
    );

    return (
      <div
        className={classes}
        onKeyDown={this.onKeyDown}
        onBlur={this.onContainerBlur}
        {...rest}>
        {children && children(list, search)}
      </div>
    );
  }
}
