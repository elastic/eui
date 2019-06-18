import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EuiBasicTable,
  SelectionType,
  ItemIdType,
  FieldDataColumnTypeShape,
  ComputedColumnType,
  ActionsColumnType,
} from './basic_table';
import { defaults as paginationBarDefaults } from './pagination_bar';
import { isBoolean, isString } from '../../services/predicate';
import { Comparators, PropertySortType } from '../../services/sort';
import {
  QueryType,
  SearchFiltersFiltersType,
  SearchBoxConfigPropTypes,
  EuiSearchBar,
} from '../search_bar';
import { EuiSpacer } from '../spacer/spacer';

// same as ColumnType from EuiBasicTable, but need to modify the `sortable` type
const ColumnType = PropTypes.oneOfType([
  PropTypes.shape({
    ...FieldDataColumnTypeShape,
    sortable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  }),
  ComputedColumnType,
  ActionsColumnType,
]);

const InMemoryTablePropTypes = {
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  items: PropTypes.array,
  loading: PropTypes.bool,
  message: PropTypes.node,
  error: PropTypes.string,
  compressed: PropTypes.bool,
  search: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      defaultQuery: QueryType,
      box: PropTypes.shape({
        ...SearchBoxConfigPropTypes,
        schema: PropTypes.oneOfType([
          // here we enable the user to just assign 'true' to the schema, in which case
          // we will auto-generate it out of the columns configuration
          PropTypes.bool,
          SearchBoxConfigPropTypes.schema,
        ]),
      }),
      filters: SearchFiltersFiltersType,
      onChange: PropTypes.func,
      executeQueryOptions: PropTypes.shape({
        defaultFields: PropTypes.arrayOf(PropTypes.string),
        isClauseMatcher: PropTypes.func,
        explain: PropTypes.bool,
      }),
    }),
  ]),
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.shape({
      initialPageIndex: PropTypes.number,
      initialPageSize: PropTypes.number,
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    }),
  ]),
  sorting: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      sort: PropertySortType,
    }),
  ]),
  /**
   * Set `allowNeutralSort` to false to force column sorting. Defaults to true.
   */
  allowNeutralSort: PropTypes.bool,
  selection: SelectionType,
  itemId: ItemIdType,
  rowProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  cellProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onTableChange: PropTypes.func,
};

const getInitialQuery = search => {
  if (!search) {
    return;
  }

  const query = search.defaultQuery || '';
  return isString(query) ? EuiSearchBar.Query.parse(query) : query;
};

const getInitialPagination = pagination => {
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
  } = pagination;

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

function findColumnByProp(columns, prop, value) {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column[prop] === value) {
      return column;
    }
  }
}

const getInitialSorting = (columns, sorting) => {
  if (!sorting || !sorting.sort) {
    return {
      sortName: undefined,
      sortDirection: undefined,
    };
  }

  const { field: sortable, direction: sortDirection } = sorting.sort;

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

export class EuiInMemoryTable extends Component {
  static propTypes = InMemoryTablePropTypes;
  static defaultProps = {
    items: [],
    pagination: false,
    sorting: false,
    responsive: true,
    executeQueryOptions: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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

  constructor(props) {
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
      pageIndex,
      pageSize,
      pageSizeOptions,
      sortName,
      sortDirection,
      allowNeutralSort: allowNeutralSort === false ? false : true,
      hidePerPageOptions,
    };
  }

  onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    let { field: sortName, direction: sortDirection } = sort;

    // To keep backwards compatibility reportedSortName needs to be tracked separately
    // from sortName; sortName gets stored internally while reportedSortName is sent to the callback
    let reportedSortName = sortName;

    // EuiBasicTable returns the column's `field` if it exists instead of `name`,
    // map back to `name` if this is the case
    for (let i = 0; i < this.props.columns.length; i++) {
      const column = this.props.columns[i];
      if (column.field === sortName) {
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

  onQueryChange = ({ query, queryText, error }) => {
    if (this.props.search.onChange) {
      const shouldQueryInMemory = this.props.search.onChange({
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
      } = isBoolean(search) ? {} : search;

      if (searchBarProps.box && searchBarProps.box.schema === true) {
        searchBarProps.box.schema = this.resolveSearchSchema();
      }

      return <EuiSearchBar onChange={this.onQueryChange} {...searchBarProps} />;
    }
  }

  resolveSearchSchema() {
    const { columns } = this.props;
    return columns.reduce(
      (schema, column) => {
        if (column.field) {
          const type = column.dataType || 'string';
          schema.fields[column.field] = { type };
        }
        return schema;
      },
      { strict: true, fields: {} }
    );
  }

  getItemSorter() {
    const { sortName, sortDirection } = this.state;

    const { columns } = this.props;

    const sortColumn = columns.find(({ name }) => name === sortName);

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

    const pagination = !hasPagination
      ? undefined
      : {
          pageIndex,
          pageSize,
          pageSizeOptions,
          totalItemCount,
          hidePerPageOptions,
        };

    // Data loaded from a server can have a default sort order which is meaningful to the
    // user, but can't be reproduced with client-side sort logic. So we allow the table to display
    // rows in the order in which they're initially loaded by providing an undefined sorting prop.
    const sorting = !hasSorting
      ? undefined
      : {
          sort:
            !sortName && !sortDirection
              ? undefined
              : {
                  field: sortName,
                  direction: sortDirection,
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
