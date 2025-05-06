/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ReactNode, createRef } from 'react';

import { RenderWithEuiTheme } from '../../../services';
import { isArray, isNil } from '../../../services/predicate';
import { ExclusiveUnion } from '../../common';
import { EuiPopover, EuiPopoverTitle } from '../../popover';
import { EuiFilterButton } from '../../filter_group';
import { euiFilterGroupStyles } from '../../filter_group/filter_group.styles';
import { EuiSelectable, EuiSelectableProps } from '../../selectable';
import { EuiSelectableOptionCheckedType } from '../../../components/selectable/selectable_option';
import { EuiI18n } from '../../i18n';
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
   * See {@link FieldValueOptionType}
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
  autoSortOptions?: boolean;
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
    searchThreshold: 10,
    autoSortOptions: true,
  },
};

interface State {
  popoverOpen: boolean;
  error: string | null;
  options: {
    unsorted: FieldValueOptionType[];
    sorted: FieldValueOptionType[];
  } | null;
  cachedOptions?: FieldValueOptionType[] | null;
  activeItemsCount: number;
  lastCheckedValue?: Value;
}

export class FieldValueSelectionFilter extends Component<
  FieldValueSelectionFilterProps,
  State
> {
  selectableClassRef = createRef<EuiSelectable>();
  cacheTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(props: FieldValueSelectionFilterProps) {
    super(props);
    const { options } = props.config;

    const preloadedOptions = isArray(options)
      ? {
          unsorted: options,
          sorted: options,
        }
      : null;
    this.state = {
      popoverOpen: false,
      error: null,
      options: preloadedOptions,
      activeItemsCount: 0,
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

  loadOptions = async () => {
    let loadedOptions: FieldValueOptionType[];
    this.setState({ options: null, error: null });

    const { options, cache } = this.props.config;
    try {
      if (isArray(options)) {
        // Synchronous options, already loaded
        loadedOptions = options;
      } else {
        // Async options loader fn, potentially with a cache
        loadedOptions = this.state.cachedOptions ?? (await options());

        // If a cache time is set, populate the cache and schedule a cache reset
        if (cache != null && cache > 0) {
          this.setState({ cachedOptions: loadedOptions });
          this.cacheTimeout = setTimeout(() => {
            this.setState({ cachedOptions: null });
          }, cache);
        }
      }
    } catch {
      return this.setState({ options: null, error: 'Could not load options' });
    }

    const items: Record<string, FieldValueOptionType[]> = {
      on: [],
      off: [],
      rest: [],
    };

    const { query, config } = this.props;

    if (loadedOptions) {
      loadedOptions.forEach((op) => {
        const optionField = op.field || config.field;
        if (optionField) {
          const clause =
            this.multiSelect === 'or'
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

    this.setState(
      {
        error: null,
        activeItemsCount: items.on.length,
        options: {
          unsorted: loadedOptions,
          sorted: [...items.on, ...items.off, ...items.rest],
        },
      },
      this.scrollToAutoSortedOption
    );
  };

  scrollToAutoSortedOption = () => {
    if (!this.autoSortOptions) return;

    const { lastCheckedValue, options } = this.state;
    if (lastCheckedValue) {
      const sortedIndex = options!.sorted.findIndex(
        (option) => option.value === lastCheckedValue
      );
      if (sortedIndex >= 0) {
        // EuiSelectable should automatically handle scrolling its list to the new index
        this.selectableClassRef.current?.setState({
          activeOptionIndex: sortedIndex,
        });
      }
      this.setState({ lastCheckedValue: undefined });
    }
  };

  resolveOptionName(option: FieldValueOptionType) {
    return option.name || option.value.toString();
  }

  onOptionClick(
    field: string,
    value: Value,
    checked?: Omit<EuiSelectableOptionCheckedType, 'mixed'>
  ) {
    const {
      config: { autoClose, operator = Operator.EQ },
    } = this.props;

    if (checked && this.autoSortOptions) {
      this.setState({ lastCheckedValue: value });
    }

    // If the consumer explicitly sets `autoClose`, always defer to that.
    // Otherwise, default to auto-closing for single selections and leaving the
    // popover open for multi-select (so users can continue selecting options)
    const shouldClosePopover = autoClose ?? !this.multiSelect;
    if (shouldClosePopover) {
      this.closePopover();
    }

    if (!this.multiSelect) {
      const query = checked
        ? this.props.query
            .removeSimpleFieldClauses(field)
            .addSimpleFieldValue(field, value, true, operator)
        : this.props.query.removeSimpleFieldClauses(field);

      this.props.onChange(query);
    } else if (this.multiSelect === 'or') {
      const query = checked
        ? this.props.query.addOrFieldValue(field, value, true, operator)
        : this.props.query.removeOrFieldValue(field, value);

      this.props.onChange(query);
    } else {
      const query = checked
        ? this.props.query.addSimpleFieldValue(field, value, true, operator)
        : this.props.query.removeSimpleFieldValue(field, value);

      this.props.onChange(query);
    }
  }

  get autoSortOptions() {
    return this.props.config.autoSortOptions ?? defaults.config.autoSortOptions;
  }

  get multiSelect(): MultiSelect {
    return this.props.config.multiSelect ?? defaults.config.multiSelect;
  }

  componentDidMount() {
    if (this.props.query.text.length) this.loadOptions();
  }

  componentDidUpdate(prevProps: FieldValueSelectionFilterProps) {
    if (this.props.query !== prevProps.query) this.loadOptions();
  }

  componentWillUnmount() {
    clearTimeout(this.cacheTimeout);
  }

  render() {
    const { query, config } = this.props;

    const options = this.autoSortOptions
      ? this.state.options?.sorted
      : this.state.options?.unsorted;

    const activeTop = this.isActiveField(config.field);
    const activeItem = options
      ? options.some((item) => this.isActiveField(item.field))
      : false;

    const { activeItemsCount } = this.state;
    const active = (activeTop || activeItem) && activeItemsCount > 0;

    const button = (
      <EuiI18n
        token="euiFieldValueSelectionFilter.buttonLabelHint"
        default="Selection"
      >
        {(buttonLabelHint: string) => {
          const ariaLabel = `${config.name} ${buttonLabelHint}`;
          return (
            <EuiFilterButton
              iconType="arrowDown"
              iconSide="right"
              hasActiveFilters={active}
              numActiveFilters={active ? activeItemsCount : undefined}
              grow
              aria-label={ariaLabel}
              onClick={this.onButtonClick.bind(this)}
            >
              {config.name}
            </EuiFilterButton>
          );
        }}
      </EuiI18n>
    );

    const items = options
      ? options.map((option) => {
          const optionField = option.field || config.field;

          if (optionField == null) {
            throw new Error(
              'option.field or field should be provided in <FieldValueSelectionFilter/>'
            );
          }

          const clause =
            this.multiSelect === 'or'
              ? query.getOrFieldClause(optionField, option.value)
              : query.getSimpleFieldClause(optionField, option.value);

          const label = this.resolveOptionName(option);

          const checked = this.resolveChecked(clause);
          return {
            label,
            checked,
            data: {
              view: option.view ?? label,
              value: option.value,
              optionField,
            },
          };
        })
      : [];

    const threshold = config.searchThreshold || defaults.config.searchThreshold;
    const isOverSearchThreshold = options && options.length >= threshold;

    let searchProps: ExclusiveUnion<
      { searchable: false },
      {
        searchable: true;
        searchProps: EuiSelectableProps['searchProps'];
      }
    > = {
      searchable: false,
    };

    if (isOverSearchThreshold) {
      searchProps = {
        searchable: true,
        searchProps: {
          compressed: true,
          disabled: this.state.error != null,
        },
      };
    }

    return (
      <RenderWithEuiTheme>
        {(euiThemeContext) => (
          <EuiPopover
            button={button}
            isOpen={this.state.popoverOpen}
            closePopover={this.closePopover.bind(this)}
            panelPaddingSize="none"
            anchorPosition="downCenter"
            panelProps={{
              css: euiFilterGroupStyles(euiThemeContext)
                .euiFilterGroup__popoverPanel,
            }}
          >
            <EuiSelectable<Partial<(typeof items)[number]['data']>>
              ref={this.selectableClassRef}
              singleSelection={!this.multiSelect}
              aria-label={config.name}
              options={items}
              renderOption={(option) => option.view}
              isLoading={isNil(options)}
              loadingMessage={config.loadingMessage}
              emptyMessage={config.noOptionsMessage}
              errorMessage={this.state.error}
              noMatchesMessage={config.noOptionsMessage}
              listProps={{
                isVirtualized: isOverSearchThreshold || false,
                autoFocus: true,
              }}
              onChange={(options, event, changedOption) => {
                if (changedOption.data) {
                  this.onOptionClick(
                    changedOption.data.optionField,
                    changedOption.data.value,
                    changedOption.checked
                  );
                }
              }}
              {...searchProps}
            >
              {(list, search) => (
                <>
                  {isOverSearchThreshold && (
                    <EuiPopoverTitle paddingSize="s">{search}</EuiPopoverTitle>
                  )}
                  {list}
                </>
              )}
            </EuiSelectable>
          </EuiPopover>
        )}
      </RenderWithEuiTheme>
    );
  }

  resolveChecked(clause: Clause | undefined): 'on' | 'off' | undefined {
    if (clause) {
      return Query.isMust(clause) ? 'on' : 'off';
    }
  }

  isActiveField(field: string | undefined): boolean {
    if (typeof field !== 'string') {
      return false;
    }

    const { query } = this.props;

    if (this.multiSelect === 'or') {
      return query.hasOrFieldClause(field);
    }

    return query.hasSimpleFieldClause(field);
  }
}
