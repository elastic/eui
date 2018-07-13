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
import {
  defaults as paginationBarDefaults
} from './pagination_bar';
import { isBoolean, isString } from '../../services/predicate';
import { Comparators, PropertySortType } from '../../services/sort';
import {
  QueryType,
  SearchFiltersFiltersType,
  SearchBoxConfigPropTypes, EuiSearchBar
} from '../search_bar';
import { EuiSpacer } from '../spacer/spacer';

// same as ColumnType from EuiBasicTable, but need to modify the `sortable` type
const ColumnType = PropTypes.oneOfType([
  PropTypes.shape({
    ...FieldDataColumnTypeShape,
    sortable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  }),
  ComputedColumnType,
  ActionsColumnType
]);

const InMemoryTablePropTypes = {
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  items: PropTypes.array,
  loading: PropTypes.bool,
  message: PropTypes.node,
  error: PropTypes.string,
  compressed: PropTypes.bool,
  search: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    defaultQuery: QueryType,
    box: PropTypes.shape({
      ...SearchBoxConfigPropTypes,
      schema: PropTypes.oneOfType([
        // here we enable the user to just assign 'true' to the schema, in which case
        // we will auto-generate it out of the columns configuration
        PropTypes.bool,
        SearchBoxConfigPropTypes.schema
      ])
    }),
    filters: SearchFiltersFiltersType,
    onChange: PropTypes.func,
  })]),
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
    }),
    PropTypes.shape({
      initialPageSize: PropTypes.number,
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
    })
  ]),
  sorting: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      sort: PropertySortType
    })
  ]),
  selection: SelectionType,
  itemId: ItemIdType,
  rowProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  cellProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const getInitialQuery = (search) => {
  if (!search) {
    return;
  }

  const query = search.defaultQuery || '';
  return isString(query) ? EuiSearchBar.Query.parse(query) : query;
};

const getInitialPagination = (pagination) => {
  if (!pagination) {
    return {
      pageIndex: undefined,
      pageSize: undefined,
    };
  }

  const {
    initialPageSize,
    pageSizeOptions = paginationBarDefaults.pageSizeOptions,
  } = pagination;


  if (initialPageSize && (!pageSizeOptions || !pageSizeOptions.includes(initialPageSize))) {
    throw new Error(`EuiInMemoryTable received initialPageSize ${initialPageSize}, which wasn't provided within pageSizeOptions.`);
  }

  const defaultPageSize = pageSizeOptions ? pageSizeOptions[0] : paginationBarDefaults.pageSizeOptions[0];

  return {
    pageIndex: 0,
    pageSize: initialPageSize || defaultPageSize,
    pageSizeOptions,
  };
};

const getInitialSorting = (sorting) => {
  if (!sorting || !sorting.sort) {
    return {
      sortField: undefined,
      sortDirection: undefined,
    };
  }

  const {
    field: sortField,
    direction: sortDirection,
  } = sorting.sort;

  return {
    sortField,
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
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.items !== prevState.prevProps.items) {
      // We have new items because an external search has completed, so reset pagination state.
      return {
        prevProps: {
          items: nextProps.items,
        },
        pageIndex: 0,
      };
    } else {
      return null;
    }
  }

  constructor(props) {
    super(props);

    const { search, pagination, sorting } = props;
    const { pageIndex, pageSize, pageSizeOptions } = getInitialPagination(pagination);
    const { sortField, sortDirection } = getInitialSorting(sorting);

    this.state = {
      prevProps: {
        items: props.items,
      },
      query: getInitialQuery(search),
      pageIndex,
      pageSize,
      pageSizeOptions,
      sortField,
      sortDirection,
    };
  }

  onTableChange = ({ page = {}, sort = {} }) => {
    const {
      index: pageIndex,
      size: pageSize
    } = page;

    const {
      field: sortField,
      direction: sortDirection
    } = sort;

    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    });
  };

  onQueryChange = ({ query, queryText, error }) => {
    if (this.props.search.onChange) {
      const shouldQueryInMemory = this.props.search.onChange({ query, queryText, error });
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

      return (
        <EuiSearchBar
          onChange={this.onQueryChange}
          {...searchBarProps}
        />
      );
    }
  }

  resolveSearchSchema() {
    const { columns } = this.props;
    return columns.reduce((schema, column) => {
      if (column.field) {
        const type = column.dataType || 'string';
        schema.fields[column.field] = { type };
      }
      return schema;
    }, { strict: true, fields: {} });
  }

  getItemSorter() {
    const {
      sortField,
      sortDirection
    } = this.state;

    const { columns } = this.props;

    const sortColumn = columns.find(({ field }) => field === sortField);
    const { sortable } = sortColumn;

    if (typeof sortable === 'function') {
      return Comparators.value(sortable, Comparators.default(sortDirection));
    }

    return Comparators.property(sortField, Comparators.default(sortDirection));
  }

  getItems() {
    const { prevProps: { items } } = this.state;

    if (!items.length) {
      return {
        items: [],
        totalItemCount: 0,
      };
    }

    const {
      query,
      sortField,
      pageIndex,
      pageSize,
    } = this.state;

    const matchingItems = query ? EuiSearchBar.Query.execute(query, items) : items;

    const sortedItems =
      sortField ? matchingItems.sort(this.getItemSorter()) : matchingItems;

    const visibleItems = pageSize ? (() => {
      const startIndex = pageIndex * pageSize;
      return sortedItems.slice(startIndex, Math.min(startIndex + pageSize, sortedItems.length));
    })() : sortedItems;

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
      ...rest
    } = this.props;

    const {
      pageIndex,
      pageSize,
      pageSizeOptions,
      sortField,
      sortDirection,
    } = this.state;

    const { items, totalItemCount } = this.getItems();

    const pagination = !hasPagination ? undefined : {
      pageIndex,
      pageSize,
      pageSizeOptions,
      totalItemCount,
    };

    // Data loaded from a server can have a default sort order which is meaningful to the
    // user, but can't be reproduced with client-side sort logic. So we allow the table to display
    // rows in the order in which they're initially loaded by providing an undefined sorting prop.
    // Once a user sorts a column, this will become a fully-defined sorting prop.
    const sorting = !hasSorting ? undefined : {
      sort: (!sortField && !sortDirection) ? undefined : {
        field: sortField,
        direction: sortDirection,
      },
    };

    const searchBar = this.renderSearchBar();

    // EuiInMemoryTable's column type supports sortable as a function, but
    // EuiBasicTable requires those functions to be cast to a boolean
    const mappedColumns = columns.map(column => ({
      ...column,
      sortable: !!column.sortable
    }));

    const table = (
      <EuiBasicTable
        items={items}
        itemId={itemId}
        rowProps={rowProps}
        cellProps={cellProps}
        columns={mappedColumns}
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
        <EuiSpacer size="l"/>
        {table}
      </div>
    );
  }
}
