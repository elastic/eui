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
import { isBoolean, isString } from '../../services/predicate';
import { get } from '../../services/objects';
import { Comparators } from '../../services/sort';
import {
  Query,
  QueryType,
  SearchBoxConfigPropTypes,
  SearchFiltersFiltersType
} from '../search_bar';
import { EuiSpacer } from '../spacer/spacer';
import { Toolbar } from './toolbar';
import {  } from '../search_bar/search_bar';

const InMemoryTablePropTypes = {
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  items: PropTypes.array,
  loading: PropTypes.bool,
  message: PropTypes.string,
  error: PropTypes.string,
  toolbar: PropTypes.shape({
    ...Toolbar.propTypes,
    search: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        defaultQuery: QueryType,
        box: PropTypes.shape(SearchBoxConfigPropTypes),
        filters: SearchFiltersFiltersType
      })
    ])
  }),
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
  const { toolbar } = props;
  if (!toolbar || !toolbar.search) {
    return undefined;
  }
  const query = toolbar.search.defaultQuery || '';
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

  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps);
  }

  onCriteriaChange(criteria) {
    this.refresh(this.props, { criteria });
  }

  onQueryChange(query) {
    this.refresh(this.props, { query, selection: [] });
  }

  onSelectionChange(selection) {
    this.setState({ selection });
  }

  refresh(props, overrideState = {}) {
    const itemId = props.selection && !isString(props.selection.itemId) ?
      props.selection.itemId :
      (item) => get(item, props.selection.itemId);
    this.setState(prevState => {
      const selection = !props.selection || !prevState.selection ? undefined : prevState.selection.filter(selectedItem => {
        return props.items.findIndex(item => itemId(item) === itemId(selectedItem)) >= 0;
      });
      const criteria = overrideState.criteria || prevState.criteria;
      const query = overrideState.query || prevState.query;
      return {
        data: this.computeData(props.items, criteria, query),
        selection,
        ...overrideState,
      };
    });
  }

  render() {
    const { criteria, data } = this.state;
    const { loading, message, error } = this.props;
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
    const selection = !this.props.selection ? undefined : {
      ...this.props.selection,
      onSelectionChange: (selection) => {
        this.onSelectionChange(selection);
        if (this.props.selection.onSelectionChange) {
          this.props.selection.onSelectionChange(selection);
        }
      }
    };
    const toolbar = this.resolveToolbar();
    const table = (
      <EuiBasicTable
        ref={table => this.table = table}
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

    if (!toolbar) {
      return table;
    }

    return (
      <div>
        {toolbar}
        <EuiSpacer size="l"/>
        {table}
      </div>
    );
  }

  resolveToolbar() {
    const toolbar =  this.props.toolbar && { ...this.props.toolbar };
    if (!toolbar) {
      return;
    }
    if (toolbar.search) {
      if (isBoolean(toolbar.search)) {
        toolbar.search = {};
      }
      toolbar.search.onChange = (query) => {
        this.onQueryChange(query);
      };
    }
    const table = {
      ...this.state,
      refresh: () => this.refresh(this.props)
    };
    return <Toolbar table={table} {...toolbar}/>;
  }

}
