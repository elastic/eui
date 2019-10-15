import React, { Component, ReactNode } from 'react';
import { EuiBasicTable } from './basic_table';
import {
  SelectionType,
  Item,
  ItemId,
  FieldDataColumnType,
  ComputedColumnType,
  ActionsColumnType,
  DataType,
  SortingType,
} from './table_types';
import { PropertySort } from '../../services';
import {
  defaults as paginationBarDefaults,
  Pagination as PaginationBarType,
} from './pagination_bar';
import { isBoolean, isString } from '../../services/predicate';
import { Comparators, Direction } from '../../services/sort';
// @ts-ignore
import { EuiSearchBar } from '../search_bar';
import { EuiSpacer } from '../spacer/spacer';

// Search bar types. Should be moved when it is typescriptified.
interface SchemaType {
  strict?: boolean;
  fields?: object;
  flags?: string[];
}

interface IsFilterConfigType {
  type: 'is';
  field: string;
  name: string;
  negatedName?: string;
  available?: () => boolean;
}

interface FieldValueSelectionFilterConfigType {
  type: 'field_value_selection';
  field?: string;
  autoClose?: boolean;
  name: string;
  options: {
    field?: string;
    value: any;
    name?: string;
    view?: ReactNode;
  };
  filterWith?: ((...args: any) => any) | 'prefix' | 'includes';
  cache?: number;
  multiSelect?: boolean | 'and' | 'or';
  loadingMessage?: string;
  noOptionsMessage?: string;
  searchThreshold?: number;
  available?: () => boolean;
}

interface FieldValueToggleFilterConfigType {
  type: 'field_value_toggle';
  field: string;
  value: string | number | boolean;
  name: string;
  negatedName?: string;
  available?: () => boolean;
  operator?: 'eq' | 'exact' | 'gt' | 'gte' | 'lt' | 'lte';
}

interface FieldValueToggleGroupFilterItem {
  value: string | number | boolean;
  name: string;
  negatedName?: string;
  operator?: 'eq' | 'exact' | 'gt' | 'gte' | 'lt' | 'lte';
}

interface FieldValueToggleGroupFilterConfigType {
  type: 'field_value_toggle_group';
  field: string;
  items: FieldValueToggleGroupFilterItem[];
  available?: () => boolean;
}

export type FilterConfig =
  | IsFilterConfigType
  | FieldValueSelectionFilterConfigType
  | FieldValueToggleFilterConfigType
  | FieldValueToggleGroupFilterConfigType;

type Column = FieldDataColumnType | ComputedColumnType | ActionsColumnType;

interface SearchBox {
  placeholder?: string;
  incremental?: boolean;
  schema?: boolean | SchemaType;
}

/*
Use below when TypeScript > 3.5.1

interface SearchBoxConfig {
  placeholder?: string;
  incremental?: boolean;
  schema?: SchemaType;
}

type SearchBox = Omit<SearchBoxConfig, 'schema'> & {
  schema?: boolean | SchemaType;
};
//*/

type CellPropsCallback = (item: Item, column: Column) => object;
type RowPropsCallback = (item: Item) => object;

interface SearchOptions {
  defaultQuery?: any /* Query */;
  box?: SearchBox;
  filters?: FilterConfig[];
  onChange?: (...args: any) => any;
  executeQueryOptions?: {
    defaultFields?: string[];
    isClauseMatcher?: (...args: any) => boolean;
    explain?: boolean;
  };
}

type Search = boolean | SearchOptions;

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

interface Props {
  columns: Column[];
  items: Item[];
  loading?: boolean;
  message?: ReactNode;
  error?: string;
  compressed?: boolean;
  search?: Search;
  pagination?: Pagination;
  sorting?: Sorting;
  /**
   * Set `allowNeutralSort` to false to force column sorting. Defaults to true.
   */
  allowNeutralSort?: boolean;
  selection?: SelectionType;
  itemId?: ItemId;
  rowProps?: object | RowPropsCallback;
  cellProps?: object | CellPropsCallback;
  onTableChange?: (...args: any) => void;
  executeQueryOptions?: any;
  isSelectable?: boolean;
  hasActions?: boolean;
  itemIdToExpandedRowMap?: any;
}

interface State {
  prevProps: {
    items: Item[];
    sortName: ReactNode;
    sortDirection?: Direction;
  };
  query: any /* Query */;
  pageIndex: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  sortName: ReactNode;
  sortDirection?: Direction;
  allowNeutralSort: boolean;
  hidePerPageOptions: any;
}

const getInitialQuery = (search: Search | undefined) => {
  if (!search) {
    return;
  }

  const query = (search as SearchOptions).defaultQuery || '';
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

function findColumnByProp(columns: Column[], prop: string, value: any) {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if ((column as any)[prop] === value) {
      return column;
    }
  }
}

const getInitialSorting = (columns: Column[], sorting: Sorting | undefined) => {
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
};

export class EuiInMemoryTable extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
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

  constructor(props: Props) {
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
      allowNeutralSort: allowNeutralSort === false ? false : true,
      hidePerPageOptions,
    };
  }

  onTableChange = ({ page = {}, sort = {} }: any) => {
    const { index: pageIndex, size: pageSize } = page;

    let { field: sortName, direction: sortDirection } = sort;

    // To keep backwards compatibility reportedSortName needs to be tracked separately
    // from sortName; sortName gets stored internally while reportedSortName is sent to the callback
    let reportedSortName = sortName;

    // EuiBasicTable returns the column's `field` if it exists instead of `name`,
    // map back to `name` if this is the case
    for (let i = 0; i < this.props.columns.length; i++) {
      const column = this.props.columns[i];
      if ((column as FieldDataColumnType).field === sortName) {
        sortName = column.name;
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
      sortName = '';
      reportedSortName = '';
      sortDirection = '';
    }

    if (this.props.onTableChange) {
      this.props.onTableChange({
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

  onQueryChange = ({ query, queryText, error }: any) => {
    if (this.props.search && (this.props.search as SearchOptions).onChange) {
      const search = this.props.search as SearchOptions;
      const shouldQueryInMemory = (search as any).onChange({
        query,
        queryText,
        error,
      });
      if (!shouldQueryInMemory) {
        return;
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
      const {
        onChange, // eslint-disable-line no-unused-vars
        ...searchBarProps
      } = isBoolean(search) ? { onChange: undefined } : search;

      if (searchBarProps.box && searchBarProps.box.schema === true) {
        searchBarProps.box.schema = this.resolveSearchSchema();
      }

      return <EuiSearchBar onChange={this.onQueryChange} {...searchBarProps} />;
    }
  }

  resolveSearchSchema() {
    const { columns } = this.props;
    return columns.reduce<{
      strict: boolean;
      fields: Record<string, { type: DataType }>;
    }>(
      (schema, column) => {
        const { field, dataType } = column as FieldDataColumnType;
        if (field) {
          const type = dataType || 'string';
          schema.fields[field] = { type };
        }
        return schema;
      },
      { strict: true, fields: {} }
    );
  }

  getItemSorter() {
    const { sortName, sortDirection } = this.state;

    const { columns } = this.props;

    const sortColumn = columns.find(
      ({ name }) => name === sortName
    ) as FieldDataColumnType;

    if (sortColumn == null) {
      // can't return a non-function so return a function that says everything is the same
      return () => () => 0;
    }

    const sortable = sortColumn.sortable;

    if (typeof sortable === 'function') {
      return Comparators.value(sortable, Comparators.default(sortDirection));
    }

    return Comparators.property(
      sortColumn.field,
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
      items: _unuseditems, // eslint-disable-line no-unused-vars
      search, // eslint-disable-line no-unused-vars
      onTableChange, // eslint-disable-line no-unused-vars
      executeQueryOptions, // eslint-disable-line no-unused-vars
      allowNeutralSort, // eslint-disable-line no-unused-vars
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
    const sorting: SortingType | undefined = !hasSorting
      ? undefined
      : {
          sort:
            !sortName && !sortDirection
              ? undefined
              : {
                  field: sortName as string,
                  direction: sortDirection as Direction,
                },
          allowNeutralSort: this.state.allowNeutralSort,
        };

    const searchBar = this.renderSearchBar();

    const table = (
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
