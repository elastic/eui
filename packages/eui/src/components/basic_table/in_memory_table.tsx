/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ReactNode } from 'react';
import {
  EuiBasicTable,
  Criteria,
  EuiBasicTableProps,
  EuiBasicTableColumn,
  CriteriaWithPagination,
} from './basic_table';
import {
  EuiTableFieldDataColumnType,
  EuiTableDataType,
  EuiTableSortingType,
} from './table_types';
import { PropertySort } from '../../services';
import { Pagination as PaginationBarType } from './pagination_bar';
import { isString } from '../../services/predicate';
import { Comparators, Direction } from '../../services/sort';
import {
  EuiSearchBar,
  EuiSearchBarProps,
  Query,
  SchemaType,
} from '../search_bar/search_bar';
import { EuiSearchBox } from '../search_bar/search_box';
import { EuiSpacer } from '../spacer';
import { CommonProps } from '../common';
import {
  EuiTablePaginationProps,
  euiTablePaginationDefaults,
} from '../table/table_pagination';
import {
  EuiComponentDefaultsContext,
  EuiComponentDefaults,
} from '../provider/component_defaults';

interface onChangeArgument {
  query: Query | null;
  queryText: string;
  error: Error | null;
}

function isEuiSearchBarProps<T extends object>(
  x: EuiInMemoryTableProps<T>['search']
): x is EuiSearchBarProps {
  return typeof x !== 'boolean';
}

export type Search = boolean | EuiSearchBarProps;

interface PaginationOptions extends EuiTablePaginationProps {
  pageSizeOptions?: number[];
  initialPageIndex?: number;
  initialPageSize?: number;
  pageIndex?: number;
  pageSize?: number;
}

type Pagination = boolean | PaginationOptions;

interface SortingOptions {
  sort: PropertySort;
}

type Sorting = boolean | SortingOptions;

type InMemoryTableProps<T extends object> = Omit<
  EuiBasicTableProps<T>,
  'pagination' | 'sorting' | 'noItemsMessage' | 'onChange'
> & {
  /**
   * Message to display if table is empty
   * @deprecated Use `noItemsMessage` instead.
   */
  message?: ReactNode;
  /**
   * Message to display if table is empty
   */
  noItemsMessage?: ReactNode;
  /**
   * Configures {@link Search}.
   */
  search?: Search;
  /**
   * By default, tables use `eql` format for search which allows using advanced filters.
   *
   * However, certain special characters (such as quotes, parentheses, and colons)
   * are reserved for EQL syntax and will error if used.
   * If your table does not require filter search and instead requires searching for certain
   * symbols, use a plain `text` search format instead (note that filters will be ignored
   * in this format).
   *
   * @default "eql"
   */
  searchFormat?: 'eql' | 'text';
  /**
   * Configures {@link Pagination}
   */
  pagination?: undefined;
  /**
   * Configures {@link EuiTableSortingType}
   */
  sorting?: Sorting;
  /**
   * Set `allowNeutralSort` to false to force column sorting. Defaults to true.
   */
  allowNeutralSort?: boolean;
  /**
   * `onChange` is not required when `pagination` and/or `sorting` are configured,
   * but if `onChange` is present it is responsible for handling state for each/both.
   * See {@link Criteria} or {@link CriteriaWithPagination}
   */
  onChange?: EuiBasicTableProps<T>['onChange'];
  /**
   * Callback for when table pagination or sorting is changed. This is meant to be informational only,
   * and not used to set any state as the in-memory table already manages this state.
   * See {@link Criteria} or {@link CriteriaWithPagination}.
   */
  onTableChange?: (nextValues: Criteria<T>) => void;
  executeQueryOptions?: {
    defaultFields?: string[];
    isClauseMatcher?: (...args: any) => boolean;
    explain?: boolean;
    /**
     * When the search bar Query is controlled and passed to the `search` prop it is by default executed against the items passed to the table to filter them out.
     * If the filtering is already done before passing the `items` to the table we can disable the execution by setting `enabled` to `false`.
     */
    enabled?: boolean;
  };
  /**
   * Insert content between the search bar and table components.
   */
  childrenBetween?: ReactNode;
};

type InMemoryTablePropsWithPagination<T extends object> = Omit<
  InMemoryTableProps<T>,
  'pagination' | 'onTableChange'
> & {
  pagination: Pagination;
  onTableChange?: (nextValues: CriteriaWithPagination<T>) => void;
};

export type EuiInMemoryTableProps<T extends object = object> = CommonProps &
  (InMemoryTableProps<T> | InMemoryTablePropsWithPagination<T>);

interface State<T extends object> {
  prevProps: {
    items: T[];
    sortName: ReactNode;
    sortDirection?: Direction;
    search?: Search;
  };
  search?: Search;
  query: Query | null;
  pageIndex: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  sortName: ReactNode;
  sortDirection?: Direction;
  allowNeutralSort: boolean;
  showPerPageOptions: boolean | undefined;
}

const getQueryFromSearch = (
  search: Search | undefined,
  defaultQuery: boolean
) => {
  let query: Query | string;
  if (!search) {
    query = '';
  } else {
    query =
      (defaultQuery
        ? (search as EuiSearchBarProps).defaultQuery ||
          (search as EuiSearchBarProps).query ||
          ''
        : (search as EuiSearchBarProps).query) || '';
  }

  return isString(query) ? EuiSearchBar.Query.parse(query) : query;
};

const getInitialPagination = (
  pagination: Pagination | undefined,
  consumerDefaults: EuiComponentDefaults['EuiTablePagination']
) => {
  if (!pagination) {
    return {
      pageIndex: undefined,
      pageSize: undefined,
    };
  }

  const defaults = {
    ...euiTablePaginationDefaults,
    ...consumerDefaults,
  };

  const {
    pageSizeOptions = defaults.itemsPerPageOptions,
    showPerPageOptions = defaults.showPerPageOptions,
  } = pagination as PaginationOptions;

  const defaultPageSize = pageSizeOptions?.includes(defaults.itemsPerPage)
    ? defaults.itemsPerPage
    : pageSizeOptions[0];

  const initialPageIndex =
    pagination === true
      ? 0
      : pagination.pageIndex ?? pagination.initialPageIndex ?? 0;
  const initialPageSize =
    pagination === true
      ? defaultPageSize
      : pagination.pageSize ?? pagination.initialPageSize ?? defaultPageSize;

  if (
    showPerPageOptions &&
    initialPageSize != null &&
    !pageSizeOptions?.includes(initialPageSize)
  ) {
    throw new Error(
      `EuiInMemoryTable received initialPageSize ${initialPageSize}, which wasn't provided within pageSizeOptions.`
    );
  }

  return {
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
    pageSizeOptions,
    showPerPageOptions,
  };
};

function findColumnByProp<T extends object>(
  columns: Array<EuiBasicTableColumn<T>>,
  prop: 'field' | 'name',
  value: string | ReactNode
) {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (
      (column as Record<'field' | 'name', keyof T | string | ReactNode>)[
        prop
      ] === value
    ) {
      return column;
    }
  }
}

function findColumnByFieldOrName<T extends object>(
  columns: Array<EuiBasicTableColumn<T>>,
  value: string | ReactNode
) {
  // The passed value can be a column's `field` or its `name`
  // for backwards compatibility `field` must be checked first
  let column = findColumnByProp(columns, 'field', value);
  if (column == null) {
    column = findColumnByProp(columns, 'name', value);
  }
  return column;
}

function getInitialSorting<T extends object>(
  columns: Array<EuiBasicTableColumn<T>>,
  sorting: Sorting | undefined
) {
  if (!sorting || !(sorting as SortingOptions).sort) {
    return {
      sortName: undefined,
      sortDirection: undefined,
    };
  }

  const { field: sortable, direction: sortDirection } = (
    sorting as SortingOptions
  ).sort;

  const sortColumn = findColumnByFieldOrName(columns, sortable);

  if (sortColumn == null) {
    return {
      sortName: undefined,
      sortDirection: undefined,
    };
  }

  const sortName = sortColumn.name;

  return {
    sortName,
    sortDirection,
  };
}

export class EuiInMemoryTable<T extends object = object> extends Component<
  EuiInMemoryTableProps<T>,
  State<T>
> {
  static contextType = EuiComponentDefaultsContext;

  static defaultProps = {
    tableLayout: 'fixed',
    searchFormat: 'eql',
  };

  static getDerivedStateFromProps<T extends object>(
    nextProps: EuiInMemoryTableProps<T>,
    prevState: State<T>
  ) {
    let updatedPrevState = prevState;
    if (nextProps.items !== prevState.prevProps.items) {
      // We have new items because an external search has completed, so reset pagination state.

      let nextPageIndex = 0;
      if (
        nextProps.pagination != null &&
        typeof nextProps.pagination !== 'boolean'
      ) {
        nextPageIndex = nextProps.pagination.pageIndex || 0;
      }

      updatedPrevState = {
        ...updatedPrevState,
        prevProps: {
          ...updatedPrevState.prevProps,
          items: nextProps.items,
        },
        pageIndex: nextPageIndex,
      };
    }

    // apply changes to controlled pagination
    if (
      nextProps.pagination != null &&
      typeof nextProps.pagination !== 'boolean'
    ) {
      if (
        nextProps.pagination.pageSize != null &&
        nextProps.pagination.pageSize !== updatedPrevState.pageIndex
      ) {
        updatedPrevState = {
          ...updatedPrevState,
          pageSize: nextProps.pagination.pageSize,
        };
      }
      if (
        nextProps.pagination.pageIndex != null &&
        nextProps.pagination.pageIndex !== updatedPrevState.pageIndex
      ) {
        updatedPrevState = {
          ...updatedPrevState,
          pageIndex: nextProps.pagination.pageIndex,
        };
      }
    }

    const { sortName, sortDirection } = getInitialSorting(
      nextProps.columns,
      nextProps.sorting
    );
    if (
      sortName !== prevState.prevProps.sortName ||
      sortDirection !== prevState.prevProps.sortDirection
    ) {
      updatedPrevState = {
        ...updatedPrevState,
        prevProps: {
          ...updatedPrevState.prevProps,
          sortName,
          sortDirection,
        },
        sortName,
        sortDirection,
      };
    }

    const nextQuery = nextProps.search
      ? (nextProps.search as EuiSearchBarProps).query
      : '';
    const prevQuery = prevState.prevProps.search
      ? (prevState.prevProps.search as EuiSearchBarProps).query
      : '';

    if (nextQuery !== prevQuery) {
      updatedPrevState = {
        ...updatedPrevState,
        prevProps: {
          ...updatedPrevState.prevProps,
          search: nextProps.search,
        },
        query: getQueryFromSearch(nextProps.search, false),
      };
    }
    if (updatedPrevState !== prevState) {
      return updatedPrevState;
    }
    return null;
  }

  constructor(props: EuiInMemoryTableProps<T>, context: EuiComponentDefaults) {
    super(props);

    const { columns, search, pagination, sorting, allowNeutralSort } = props;
    const { pageIndex, pageSize, pageSizeOptions, showPerPageOptions } =
      getInitialPagination(pagination, context.EuiTablePagination);
    const { sortName, sortDirection } = getInitialSorting(columns, sorting);

    this.state = {
      prevProps: {
        items: props.items,
        sortName,
        sortDirection,
        search,
      },
      search: search,
      query: getQueryFromSearch(search, true),
      pageIndex: pageIndex || 0,
      pageSize,
      pageSizeOptions,
      sortName,
      sortDirection,
      allowNeutralSort: allowNeutralSort !== false,
      showPerPageOptions,
    };
  }

  onTableChange = ({ page, sort }: Criteria<T>) => {
    let { index: pageIndex, size: pageSize } = (page || {}) as {
      index: number;
      size: number;
    };

    // don't apply pagination changes that are otherwise controlled
    // `page` is left unchanged as it goes to the consumer's `onTableChange` callback, allowing the app to respond
    const { pagination } = this.props;
    if (pagination != null && typeof pagination !== 'boolean') {
      if (pagination.pageSize != null) pageSize = pagination.pageSize;
      if (pagination.pageIndex != null) pageIndex = pagination.pageIndex;
    }

    let { field: sortName, direction: sortDirection } = (sort || {}) as {
      field: keyof T;
      direction: Direction;
    };

    // To keep backwards compatibility reportedSortName needs to be tracked separately
    // from sortName; sortName gets stored internally while reportedSortName is sent to the callback
    let reportedSortName = sortName;

    // EuiBasicTable returns the column's `field` instead of `name` on sort
    // and the column's `name` instead of `field` on pagination
    if (sortName) {
      const sortColumn = findColumnByFieldOrName(
        this.props.columns,
        sortName as ReactNode
      );
      if (sortColumn) {
        // Ensure sortName uses `name`
        sortName = sortColumn.name as keyof T;

        // Ensure reportedSortName uses `field` if it exists
        const sortField = (sortColumn as EuiTableFieldDataColumnType<T>).field;
        if (sortField) reportedSortName = sortField as keyof T;
      }
    }

    // Allow going back to 'neutral' sorting
    if (
      this.state.allowNeutralSort &&
      this.state.sortName === sortName &&
      this.state.sortDirection === 'desc' &&
      sortDirection === 'asc'
    ) {
      sortName = '' as keyof T;
      reportedSortName = '' as keyof T;
      sortDirection = 'asc'; // Default sort direction.
    }

    if (this.props.onTableChange) {
      this.props.onTableChange({
        // @ts-ignore complex relationship between pagination's existence and criteria, the code logic ensures this is correctly maintained
        page,
        sort: {
          field: reportedSortName,
          direction: sortDirection,
        },
      });
    }

    this.setState({
      pageIndex,
      pageSize,
      sortName: sortName as ReactNode,
      sortDirection,
    });
  };

  onQueryChange = ({ query, queryText, error }: onChangeArgument) => {
    const { search } = this.props;
    if (isEuiSearchBarProps(search)) {
      if (search.onChange) {
        const shouldQueryInMemory =
          error == null
            ? search.onChange({
                query: query!,
                queryText,
                error: null,
              })
            : search.onChange({
                query: null,
                queryText,
                error,
              });
        if (!shouldQueryInMemory) {
          return;
        }
      }
    }

    // Reset pagination state.
    this.setState((state) => ({
      prevProps: {
        ...state.prevProps,
        search,
      },
      query,
      pageIndex: 0,
    }));
  };

  // Alternative to onQueryChange - allows consumers to specify they want the
  // search bar to ignore EQL syntax and only use the searchbar for plain text
  onPlainTextSearch = (searchValue: string) => {
    const escapedQueryText = searchValue.replace(/["\\]/g, '\\$&');
    const finalQuery = `"${escapedQueryText}"`;
    this.setState({
      query: EuiSearchBar.Query.parse(finalQuery),
    });
  };

  renderSearchBar() {
    const { search, searchFormat } = this.props;
    if (!search) return;

    let searchBar: ReactNode;

    if (searchFormat === 'text') {
      const _searchBoxProps = (search as EuiSearchBarProps)?.box || {}; // Work around | boolean type
      const { schema, ...searchBoxProps } = _searchBoxProps; // Destructure `schema` so it doesn't get rendered to DOM

      searchBar = (
        <EuiSearchBox
          query="" // Unused, passed to satisfy Typescript
          {...searchBoxProps}
          onSearch={this.onPlainTextSearch}
        />
      );
    } else {
      let searchBarProps: Omit<EuiSearchBarProps, 'onChange'> = {};

      if (isEuiSearchBarProps(search)) {
        const { onChange, ..._searchBarProps } = search;
        searchBarProps = _searchBarProps;

        if (searchBarProps.box && searchBarProps.box.schema === true) {
          searchBarProps.box = {
            ...searchBarProps.box,
            schema: this.resolveSearchSchema(),
          };
        }
      }

      searchBar = (
        <EuiSearchBar onChange={this.onQueryChange} {...searchBarProps} />
      );
    }

    return (
      <>
        {searchBar}
        <EuiSpacer size="l" />
      </>
    );
  }

  resolveSearchSchema(): SchemaType {
    const { columns } = this.props;
    return columns.reduce<{
      strict: boolean;
      fields: Record<string, { type: EuiTableDataType }>;
    }>(
      (schema, column) => {
        const { field, dataType } = column as EuiTableFieldDataColumnType<T>;
        if (field) {
          const type = dataType || 'string';
          schema.fields[field as string] = { type };
        }
        return schema;
      },
      { strict: true, fields: {} }
    );
  }

  getItemSorter(): (a: T, b: T) => number {
    const { sortName, sortDirection } = this.state;

    const { columns } = this.props;

    const sortColumn = columns.find(
      ({ name }) => name === sortName
    ) as EuiTableFieldDataColumnType<T>;

    if (sortColumn == null) {
      // can't return a non-function so return a function that says everything is the same
      return () => 0;
    }

    const sortable = sortColumn.sortable;

    if (typeof sortable === 'function') {
      return Comparators.value(sortable, Comparators.default(sortDirection));
    }

    return Comparators.property(
      sortColumn.field as string,
      Comparators.default(sortDirection)
    );
  }

  getItems() {
    const { executeQueryOptions } = this.props;
    const {
      prevProps: { items },
    } = this.state;

    if (!items.length) {
      return {
        items: [],
        totalItemCount: 0,
      };
    }

    const { query, sortName, pageIndex, pageSize } = this.state;

    const matchingItems =
      query !== null && executeQueryOptions?.enabled !== false
        ? EuiSearchBar.Query.execute(query, items, executeQueryOptions)
        : items;

    const sortedItems = sortName
      ? matchingItems
          .slice(0) // avoid mutating the source array
          .sort(this.getItemSorter()) // sort, causes mutation
      : matchingItems;

    const visibleItems =
      pageSize && this.props.pagination
        ? (() => {
            const startIndex = pageIndex * pageSize;
            return sortedItems.slice(
              startIndex,
              Math.min(startIndex + pageSize, sortedItems.length)
            );
          })()
        : sortedItems;

    return {
      items: visibleItems,
      totalItemCount: matchingItems.length,
    };
  }

  render() {
    const {
      columns,
      loading,
      message,
      noItemsMessage,
      error,
      selection,
      compressed,
      pagination: hasPagination,
      sorting: hasSorting,
      itemIdToExpandedRowMap,
      itemId,
      rowProps,
      cellProps,
      tableLayout,
      items: _unuseditems,
      search,
      searchFormat,
      onTableChange,
      executeQueryOptions,
      allowNeutralSort,
      childrenBetween,
      ...rest
    } = this.props;

    const {
      pageIndex,
      pageSize,
      pageSizeOptions,
      sortName,
      sortDirection,
      showPerPageOptions,
    } = this.state;

    const { items, totalItemCount } = this.getItems();

    const pagination: PaginationBarType | undefined = !hasPagination
      ? undefined
      : {
          pageIndex,
          pageSize: pageSize ?? 1,
          pageSizeOptions,
          totalItemCount,
          showPerPageOptions,
        };

    // Data loaded from a server can have a default sort order which is meaningful to the
    // user, but can't be reproduced with client-side sort logic. So we allow the table to display
    // rows in the order in which they're initially loaded by providing an undefined sorting prop.
    const sorting: EuiTableSortingType<T> | undefined = !hasSorting
      ? undefined
      : {
          sort:
            !sortName && !sortDirection
              ? undefined
              : {
                  field: sortName as keyof T,
                  direction: sortDirection as Direction,
                },
          allowNeutralSort: this.state.allowNeutralSort,
        };

    const searchBar = this.renderSearchBar();

    const table = (
      // @ts-ignore complex relationship between pagination's existence and criteria, the code logic ensures this is correctly maintained
      <EuiBasicTable
        items={items}
        itemId={itemId}
        rowProps={rowProps}
        cellProps={cellProps}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        onChange={this.onTableChange}
        error={error}
        loading={loading}
        noItemsMessage={noItemsMessage || message}
        tableLayout={tableLayout}
        compressed={compressed}
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        {...rest}
      />
    );

    if (!searchBar) {
      return table;
    }

    return (
      <div>
        {searchBar}
        {childrenBetween}
        {table}
      </div>
    );
  }
}
