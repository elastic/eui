import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiBasicTable,
  ColumnType,
  SelectionType
} from './basic_table';
import {
  defaults as paginationBarDefaults
} from './pagination_bar';
import { Query } from '../../services/query';
import { isBoolean, isString } from '../../services/predicate';
import { Comparators } from '../../services/sort';
import {
  QueryType,
  SearchFiltersFiltersType,
  SearchBoxConfigPropTypes,
  EuiSearchBar,
} from '../search_bar';
import { EuiSpacer } from '../spacer/spacer';

const InMemoryTablePropTypes = {
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  items: PropTypes.array,
  loading: PropTypes.bool,
  message: PropTypes.string,
  error: PropTypes.string,
  search: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    defaultQuery: QueryType,
    box: PropTypes.shape(SearchBoxConfigPropTypes),
    filters: SearchFiltersFiltersType,
  })]),
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
    })
  ]),
  sorting: PropTypes.bool,
  selection: SelectionType
};

const initialQuery = (props) => {
  const { search } = props;
  if (!search) {
    return undefined;
  }
  const query = search.defaultQuery || '';
  return isString(query) ? Query.parse(query) : query;
};

const initialCriteria = (props) => {
  const { pagination } = props;
  return {
    page: !pagination ? undefined : {
      index: 0,
      size: pagination.pageSizeOptions ? pagination.pageSizeOptions[0] : paginationBarDefaults.pageSizeOptions[0]
    }
  };
};

export class EuiInMemoryTable extends React.Component {

  static propTypes = InMemoryTablePropTypes;
  static defaultProps = {
    pagination: false,
    sorting: false
  };

  constructor(props) {
    super(props);
    const criteria = initialCriteria(props);
    const query = initialQuery(props);
    this.state = {
      data: this.computeData(props.items, criteria, query),
      query,
      criteria,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      const data = this.computeData(nextProps.items, prevState.criteria);
      return { data };
    });
  }

  computeData(items, criteria, query) {
    if (!items) {
      return { items: [], totalCount: 0 };
    }
    if (query) {
      items = Query.execute(query, items);
    }
    if (criteria.sort) {
      items = items.sort(Comparators.property(criteria.sort.field, Comparators.default(criteria.sort.direction)));
    }
    const totalCount = items.length;
    if (criteria.page) {
      const { index, size } = criteria.page;
      const from = index * size;
      items = items.slice(from, Math.min(from + size, items.length));
    }
    return { items, totalCount };
  }

  onCriteriaChange(criteria) {
    this.setState(prevState => ({
      criteria,
      data: this.computeData(this.props.items, criteria, prevState.query)
    }));
  }

  onQueryChange(query) {
    this.setState(prevState => ({
      query,
      data: this.computeData(this.props.items, prevState.criteria, query)
    }));
  }

  render() {
    const { criteria, data } = this.state;
    const { loading, message, error, selection } = this.props;
    const { items, totalCount } = data;
    const pagination = !this.props.pagination ? undefined : {
      pageIndex: criteria.page.index,
      pageSize: criteria.page.size,
      totalItemCount: totalCount,
      ...(isBoolean(this.props.pagination) ? {} : this.props.pagination)
    };
    const sorting = !this.props.sorting ? undefined : {
      sort: criteria.sort
    };
    const searchBar = this.resolveSearchBar();
    const table = (
      <EuiBasicTable
        items={message ? [] : items} // if message is configured, we force showing it instead of the items
        columns={this.props.columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        onChange={this.onCriteriaChange.bind(this)}
        error={error}
        loading={loading}
        noItemsMessage={message}
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

  resolveSearchBar() {
    const { search } = this.props;
    if (search) {
      const searchBarProps = isBoolean(search) ? {} : search;
      return (
        <EuiSearchBar
          onChange={this.onQueryChange.bind(this)}
          {...searchBarProps}
        />
      );
    }
  }
}
