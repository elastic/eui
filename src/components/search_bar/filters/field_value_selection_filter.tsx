/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ReactElement, ReactNode } from 'react';
import { isArray, isNil } from '../../../services/predicate';
import { keys } from '../../../services';
import { EuiPopover, EuiPopoverTitle } from '../../popover';
import { EuiFieldSearch } from '../../form/field_search';
import { EuiFilterButton, EuiFilterSelectItem } from '../../filter_group';
import { EuiLoadingChart } from '../../loading';
import { EuiSpacer } from '../../spacer';
import { EuiIcon } from '../../icon';
import { Query } from '../query';
import { Clause, Operator, OperatorType, Value } from '../query/ast';

export interface FieldValueOptionType {
  field?: string;
  value: Value;
  name?: string;
  view?: ReactNode;
}

type OptionsLoader = () => Promise<FieldValueOptionType[]>;

type OptionsFilter = (
  name: string,
  query: string,
  options?: FieldValueOptionType[]
) => boolean;

type MultiSelect = boolean | 'and' | 'or';

export interface FieldValueSelectionFilterConfigType {
  type: 'field_value_selection';
  field?: string;
  name: string;
  /**
   * See #FieldValueOptionType
   */
  options: FieldValueOptionType[] | OptionsLoader;
  filterWith?: 'prefix' | 'includes' | OptionsFilter;
  cache?: number;
  multiSelect?: MultiSelect;
  loadingMessage?: string;
  noOptionsMessage?: string;
  searchThreshold?: number;
  available?: () => boolean;
  autoClose?: boolean;
  operator?: OperatorType;
}

export interface FieldValueSelectionFilterProps {
  index: number;
  config: FieldValueSelectionFilterConfigType;
  query: Query;
  onChange: (query: Query) => void;
}

const defaults = {
  config: {
    multiSelect: true,
    filterWith: 'prefix',
    loadingMessage: 'Loading...',
    noOptionsMessage: 'No options found',
    searchThreshold: 10,
  },
};

interface State {
  popoverOpen: boolean;
  error: string | null;
  options: {
    all: FieldValueOptionType[];
    shown: FieldValueOptionType[];
  } | null;
  cachedOptions?: FieldValueOptionType[] | null;
  activeItems: FieldValueOptionType[];
}

export class FieldValueSelectionFilter extends Component<
  FieldValueSelectionFilterProps,
  State
> {
  private readonly selectItems: EuiFilterSelectItem[];
  private searchInput: HTMLInputElement | null = null;

  constructor(props: FieldValueSelectionFilterProps) {
    super(props);
    const { options } = props.config;

    const preloadedOptions = isArray(options)
      ? {
          all: options,
          shown: options,
        }
      : null;

    this.selectItems = [];
    this.state = {
      popoverOpen: false,
      error: null,
      options: preloadedOptions,
      activeItems: [],
    };
  }

  closePopover() {
    this.setState({ popoverOpen: false });
  }

  onButtonClick() {
    this.setState((prevState) => {
      if (!prevState.popoverOpen) {
        // loading options updates the state, so we'll do that in the animation frame
        window.requestAnimationFrame(() => {
          this.loadOptions();
        });
      }
      return {
        options: null,
        error: null,
        popoverOpen: !prevState.popoverOpen,
      };
    });
  }

  loadOptions() {
    const loader = this.resolveOptionsLoader();
    this.setState({ options: null, error: null });
    loader()
      .then((options) => {
        const items: {
          on: FieldValueOptionType[];
          off: FieldValueOptionType[];
          rest: FieldValueOptionType[];
        } = {
          on: [],
          off: [],
          rest: [],
        };

        const { query, config } = this.props;

        const multiSelect = this.resolveMultiSelect();

        if (options) {
          options.forEach((op) => {
            const optionField = op.field || config.field;
            if (optionField) {
              const clause =
                multiSelect === 'or'
                  ? query.getOrFieldClause(optionField, op.value)
                  : query.getSimpleFieldClause(optionField, op.value);
              const checked = this.resolveChecked(clause);
              if (!checked) {
                items.rest.push(op);
              } else if (checked === 'on') {
                items.on.push(op);
              } else {
                items.off.push(op);
              }
            }
            return;
          });
        }

        this.setState({
          error: null,
          activeItems: items.on,
          options: {
            all: options,
            shown: [...items.on, ...items.off, ...items.rest],
          },
        });
      })
      .catch(() => {
        this.setState({ options: null, error: 'Could not load options' });
      });
  }

  filterOptions(q = '') {
    this.setState((prevState) => {
      if (isNil(prevState.options)) {
        return {};
      }

      const predicate = this.getOptionFilter();

      return {
        ...prevState,
        options: {
          ...prevState.options,
          shown: prevState.options.all.filter((option, i, options) => {
            const name = this.resolveOptionName(option).toLowerCase();
            const query = q.toLowerCase();
            return predicate(name, query, options);
          }),
        },
      };
    });
  }

  getOptionFilter(): OptionsFilter {
    const filterWith =
      this.props.config.filterWith || defaults.config.filterWith;

    if (typeof filterWith === 'function') {
      return filterWith;
    }

    if (filterWith === 'includes') {
      return (name, query) => name.includes(query);
    }

    return (name, query) => name.startsWith(query);
  }

  resolveOptionsLoader: () => OptionsLoader = () => {
    const options = this.props.config.options;
    if (isArray(options)) {
      return () => Promise.resolve(options);
    }

    return () => {
      const cachedOptions = this.state.cachedOptions;
      if (cachedOptions) {
        return Promise.resolve(cachedOptions);
      }

      return (options as OptionsLoader)().then((opts) => {
        // If a cache time is set, populate the cache and also schedule a
        // cache reset.
        if (this.props.config.cache != null && this.props.config.cache > 0) {
          this.setState({ cachedOptions: opts });
          setTimeout(() => {
            this.setState({ cachedOptions: null });
          }, this.props.config.cache);
        }

        return opts;
      });
    };
  };

  resolveOptionName(option: FieldValueOptionType) {
    return option.name || option.value.toString();
  }

  onOptionClick(
    field: string,
    value: Value,
    checked: 'on' | 'off' | undefined
  ) {
    const multiSelect = this.resolveMultiSelect();
    const {
      config: { autoClose = true, operator = Operator.EQ },
    } = this.props;

    // we're closing popover only if the user can only select one item... if the
    // user can select more, we'll leave it open so she can continue selecting

    if (!multiSelect && autoClose) {
      this.closePopover();
      const query = checked
        ? this.props.query.removeSimpleFieldClauses(field)
        : this.props.query
            .removeSimpleFieldClauses(field)
            .addSimpleFieldValue(field, value, true, operator);

      this.props.onChange(query);
    } else {
      if (multiSelect === 'or') {
        const query = checked
          ? this.props.query.removeOrFieldValue(field, value)
          : this.props.query.addOrFieldValue(field, value, true, operator);

        this.props.onChange(query);
      } else {
        const query = checked
          ? this.props.query.removeSimpleFieldValue(field, value)
          : this.props.query.addSimpleFieldValue(field, value, true, operator);

        this.props.onChange(query);
      }
    }
  }

  onKeyDown(
    index: number,
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) {
    switch (event.key) {
      case keys.ARROW_DOWN:
        if (index < this.selectItems.length - 1) {
          event.preventDefault();
          this.selectItems[index + 1].focus();
        }
        break;

      case keys.ARROW_UP:
        if (index < 0) {
          return; // it's coming from the search box... nothing to do... nowhere to go
        }
        if (index === 0 && this.searchInput) {
          event.preventDefault();
          this.searchInput.focus();
        } else if (index > 0) {
          event.preventDefault();
          this.selectItems[index - 1].focus();
        }
    }
  }

  resolveMultiSelect(): MultiSelect {
    const { config } = this.props;
    return !isNil(config.multiSelect)
      ? config.multiSelect
      : defaults.config.multiSelect;
  }

  componentDidMount() {
    if (this.props.query.text.length) this.loadOptions();
  }

  componentDidUpdate(prevProps: FieldValueSelectionFilterProps) {
    if (this.props.query !== prevProps.query) this.loadOptions();
  }

  render() {
    const { index, query, config } = this.props;
    const multiSelect = this.resolveMultiSelect();

    const activeTop = this.isActiveField(config.field);
    const activeItem = this.state.options
      ? this.state.options.all.some((item) => this.isActiveField(item.field))
      : false;

    const activeItemsCount = this.state.activeItems.length;
    const active = (activeTop || activeItem) && activeItemsCount > 0;

    const button = (
      <EuiFilterButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
        hasActiveFilters={active}
        numActiveFilters={active ? activeItemsCount : undefined}
        grow>
        {config.name}
      </EuiFilterButton>
    );

    const searchBox = this.renderSearchBox();
    const content = this.renderContent(
      config.field,
      query,
      config,
      multiSelect
    );

    return (
      <EuiPopover
        id={`${config.type}_${index}`}
        button={button}
        isOpen={this.state.popoverOpen}
        closePopover={this.closePopover.bind(this)}
        panelPaddingSize="none"
        anchorPosition="downCenter"
        panelClassName="euiFilterGroup__popoverPanel">
        {searchBox}
        {content}
      </EuiPopover>
    );
  }

  renderSearchBox() {
    const threshold =
      this.props.config.searchThreshold || defaults.config.searchThreshold;
    if (this.state.options && this.state.options.all.length >= threshold) {
      const disabled = this.state.error != null;
      return (
        <EuiPopoverTitle paddingSize="s">
          <EuiFieldSearch
            inputRef={(ref) => (this.searchInput = ref)}
            disabled={disabled}
            incremental={true}
            onSearch={(query) => this.filterOptions(query)}
            onKeyDown={this.onKeyDown.bind(this, -1)}
            compressed
          />
        </EuiPopoverTitle>
      );
    }
  }

  renderContent(
    field: string | undefined,
    query: Query,
    config: FieldValueSelectionFilterConfigType,
    multiSelect: MultiSelect
  ) {
    if (this.state.error) {
      return this.renderError(this.state.error);
    }
    if (isNil(this.state.options)) {
      return this.renderLoader();
    }
    if (this.state.options.shown.length === 0) {
      return this.renderNoOptions();
    }

    if (this.state.options == null) {
      return;
    }

    const items: ReactElement[] = [];

    this.state.options.shown.forEach((option, index) => {
      const optionField = option.field || field;

      if (optionField == null) {
        throw new Error(
          'option.field or field should be provided in <FieldValueSelectionFilter/>'
        );
      }

      const clause =
        multiSelect === 'or'
          ? query.getOrFieldClause(optionField, option.value)
          : query.getSimpleFieldClause(optionField, option.value);

      const checked = this.resolveChecked(clause);
      const onClick = () => {
        // clicking a checked item will uncheck it and effective remove the filter (value = undefined)
        this.onOptionClick(optionField, option.value, checked);
      };

      const item = (
        <EuiFilterSelectItem
          key={index}
          checked={checked}
          onClick={onClick}
          ref={(ref) => (this.selectItems[index] = ref!)}
          onKeyDown={this.onKeyDown.bind(this, index)}>
          {option.view ? option.view : this.resolveOptionName(option)}
        </EuiFilterSelectItem>
      );

      items.push(item);
    });

    return <div className="euiFilterSelect__items">{items}</div>;
  }

  resolveChecked(clause: Clause | undefined): 'on' | 'off' | undefined {
    if (clause) {
      return Query.isMust(clause) ? 'on' : 'off';
    }
  }

  renderLoader() {
    const message =
      this.props.config.loadingMessage || defaults.config.loadingMessage;
    return (
      <div className="euiFilterSelect__note">
        <div className="euiFilterSelect__noteContent">
          <EuiLoadingChart size="m" />
          <EuiSpacer size="xs" />
          <p>{message}</p>
        </div>
      </div>
    );
  }

  renderError(message: string) {
    return (
      <div className="euiFilterSelect__note">
        <div className="euiFilterSelect__noteContent">
          <EuiIcon size="m" type="faceSad" color="danger" />
          <EuiSpacer size="xs" />
          <p>{message}</p>
        </div>
      </div>
    );
  }

  renderNoOptions() {
    const message =
      this.props.config.noOptionsMessage || defaults.config.noOptionsMessage;
    return (
      <div className="euiFilterSelect__note">
        <div className="euiFilterSelect__noteContent">
          <EuiIcon type="minusInCircle" />
          <EuiSpacer size="xs" />
          <p>{message}</p>
        </div>
      </div>
    );
  }

  isActiveField(field: string | undefined): boolean {
    if (typeof field !== 'string') {
      return false;
    }

    const { query } = this.props;
    const multiSelect = this.resolveMultiSelect();

    if (multiSelect === 'or') {
      return query.hasOrFieldClause(field);
    }

    return query.hasSimpleFieldClause(field);
  }
}
