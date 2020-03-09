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
import {
  defaults as paginationBarDefaults,
  Pagination as PaginationBarType,
} from './pagination_bar';
import { isString } from '../../services/predicate';
import { Comparators, Direction } from '../../services/sort';
import { EuiSearchBar, Query } from '../search_bar';
import { EuiSpacer } from '../spacer';
import { CommonProps } from '../common';
import { EuiSearchBarProps } from '../search_bar/search_bar';
import { SchemaType } from '../search_bar/search_box';

interface onChangeArgument {
  query: Query | null;
  queryText: string;
  error: Error | null;
}

function isEuiSearchBarProps<T>(
  x: EuiInMemoryTableProps<T>['search']
): x is EuiSearchBarProps {
  return typeof x !== 'boolean';
}

type Search = boolean | EuiSearchBarProps;

interface PaginationOptions {
  initialPageIndex?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  hidePerPageOptions?: boolean;
}

type Pagination = boolean | PaginationOptions;

interface SortingOptions {
  sort: PropertySort;
}

type Sorting = boolean | SortingOptions;

type InMemoryTableProps<T> = Omit<
  EuiBasicTableProps<T>,
  'pagination' | 'sorting' | 'noItemsMessage'
> & {
  message?: ReactNode;
  search?: Search;
  pagination?: undefined;
  sorting?: Sorting;
  /**
   * Set `allowNeutralSort` to false to force column sorting. Defaults to true.
   */
  allowNeutralSort?: boolean;
  onTableChange?: (nextValues: Criteria<T>) => void;
  executeQueryOptions?: {
    defaultFields?: string[];
    isClauseMatcher?: (...args: any) => boolean;
    explain?: boolean;
  };
};

type InMemoryTablePropsWithPagination<T> = Omit<
  InMemoryTableProps<T>,
  'pagination' | 'onTableChange'
> & {
  pagination: Pagination;
  onTableChange?: (nextValues: CriteriaWithPagination<T>) => void;
};

export type EuiInMemoryTableProps<T> = CommonProps &
  (InMemoryTableProps<T> | InMemoryTablePropsWithPagination<T>);

interface State<T> {
  prevProps: {
    items: T[];
    sortName: ReactNode;
    sortDirection?: Direction;
  };
  query: Query | null;
  pageIndex: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  sortName: ReactNode;
  sortDirection?: Direction;
  allowNeutralSort: boolean;
  hidePerPageOptions: boolean | undefined;
}

const getInitialQuery = (search: Search | undefined) => {
  let query: Query | string;
  if (!search) {
    query = '';
  } else {
    query = (search as EuiSearchBarProps).defaultQuery || '';
  }

  return isString(query) ? EuiSearchBar.Query.parse(query) : query;
};

const getInitialPagination = (pagination: Pagination | undefined) => {
  if (!pagination) {
    return {
      pageIndex: undefined,
      pageSize: undefined,
    };
  }

  const {
    initialPageIndex = 0,
    initialPageSize,
    pageSizeOptions = paginationBarDefaults.pageSizeOptions,
    hidePerPageOptions,
  } = pagination as PaginationOptions;

  if (
    !hidePerPageOptions &&
    initialPageSize &&
    (!pageSizeOptions || !pageSizeOptions.includes(initialPageSize))
  ) {
    throw new Error(
      `EuiInMemoryTable received initialPageSize ${initialPageSize}, which wasn't provided within pageSizeOptions.`
    );
  }

  const defaultPageSize = pageSizeOptions
    ? pageSizeOptions[0]
    : paginationBarDefaults.pageSizeOptions[0];

  return {
    pageIndex: initialPageIndex,
    pageSize: initialPageSize || defaultPageSize,
    pageSizeOptions,
    hidePerPageOptions,
  };
};

function findColumnByProp<T>(
  columns: Array<EuiBasicTableColumn<T>>,
  prop: 'field' | 'name',
  value: string
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

function getInitialSorting<T>(
  columns: Array<EuiBasicTableColumn<T>>,
  sorting: Sorting | undefined
) {
  if (!sorting || !(sorting as SortingOptions).sort) {
    return {
      sortName: undefined,
      sortDirection: undefined,
    };
  }

  const {
    field: sortable,
    direction: sortDirection,
  } = (sorting as SortingOptions).sort;

  // sortable could be a column's `field` or its `name`
  // for backwards compatibility `field` must be checked first
  let sortColumn = findColumnByProp(columns, 'field', sortable);
  if (sortColumn == null) {
    sortColumn = findColumnByProp(columns, 'name', sortable);
  }

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

export class EuiInMemoryTable<T> extends Component<
  EuiInMemoryTableProps<T>,
  State<T>
> {
  static defaultProps = {
    responsive: true,
    tableLayout: 'fixed',
  };

  static getDerivedStateFromProps<T>(
    nextProps: EuiInMemoryTableProps<T>,
    prevState: State<T>
  ) {
    if (nextProps.items !== prevState.prevProps.items) {
      // We have new items because an external search has completed, so reset pagination state.
      return {
        prevProps: {
          ...prevState.prevProps,
          items: nextProps.items,
        },
        pageIndex: 0,
      };
    }
    const { sortName, sortDirection } = getInitialSorting(
      nextProps.columns,
      nextProps.sorting
    );
    if (
      sortName !== prevState.prevProps.sortName ||
      sortDirection !== prevState.prevProps.sortDirection
    ) {
      return {
        sortName,
        sortDirection,
      };
    }
    return null;
  }

  constructor(props: EuiInMemoryTableProps<T>) {
    super(props);

    const { columns, search, pagination, sorting, allowNeutralSort } = props;
    const {
      pageIndex,
      pageSize,
      pageSizeOptions,
      hidePerPageOptions,
    } = getInitialPagination(pagination);
    const { sortName, sortDirection } = getInitialSorting(columns, sorting);

    this.state = {
      prevProps: {
        items: props.items,
        sortName,
        sortDirection,
      },
      query: getInitialQuery(search),
      pageIndex: pageIndex || 0,
      pageSize,
      pageSizeOptions,
      sortName,
      sortDirection,
      allowNeutralSort: allowNeutralSort !== false,
      hidePerPageOptions,
    };
  }

  onTableChange = ({ page, sort }: Criteria<T>) => {
    const { index: pageIndex, size: pageSize } = (page || {}) as {
      index: number;
      size: number;
    };

    let { field: sortName, direction: sortDirection } = (sort || {}) as {
      field: keyof T;
      direction: Direction;
    };

    // To keep backwards compatibility reportedSortName needs to be tracked separately
    // from sortName; sortName gets stored internally while reportedSortName is sent to the callback
    let reportedSortName = sortName;

    // EuiBasicTable returns the column's `field` if it exists instead of `name`,
    // map back to `name` if this is the case
    for (let i = 0; i < this.props.columns.length; i++) {
      const column = this.props.columns[i];
      if ((column as EuiTableFieldDataColumnType<T>).field === sortName) {
        sortName = column.name as keyof T;
        break;
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
        // @ts-ignore complex relationship between pagination's existance and criteria, the code logic ensures this is correctly maintained
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
      sortName,
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
    this.setState({
      query,
      pageIndex: 0,
    });
  };

  renderSearchBar() {
    const { search } = this.props;
    if (search) {
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

      return <EuiSearchBar onChange={this.onQueryChange} {...searchBarProps} />;
    }
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

    const matchingItems = query
      ? EuiSearchBar.Query.execute(query, items, executeQueryOptions)
      : items;

    const sortedItems = sortName
      ? matchingItems
          .slice(0) // avoid mutating the source array
          .sort(this.getItemSorter()) // sort, causes mutation
      : matchingItems;

    const visibleItems = pageSize
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
      error,
      selection,
      isSelectable,
      hasActions,
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
      onTableChange,
      executeQueryOptions,
      allowNeutralSort,
      ...rest
    } = this.props;

    const {
      pageIndex,
      pageSize,
      pageSizeOptions,
      sortName,
      sortDirection,
      hidePerPageOptions,
    } = this.state;

    const { items, totalItemCount } = this.getItems();

    const pagination: PaginationBarType | undefined = !hasPagination
      ? undefined
      : {
          pageIndex,
          pageSize: pageSize || 1,
          pageSizeOptions,
          totalItemCount,
          hidePerPageOptions,
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
      // @ts-ignore complex relationship between pagination's existance and criteria, the code logic ensures this is correctly maintained
      <EuiBasicTable
        items={items}
        itemId={itemId}
        rowProps={rowProps}
        cellProps={cellProps}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        isSelectable={isSelectable}
        hasActions={hasActions}
        onChange={this.onTableChange}
        error={error}
        loading={loading}
        noItemsMessage={message}
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
        <EuiSpacer size="l" />
        {table}
      </div>
    );
  }
}
