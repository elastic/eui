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
import {
  isBoolean,
  isArray,
  isString
} from '../../services/predicate';
import { Comparators } from '../../services/sort';

const BasicTableContainerPropTypes = {
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.func
  ]).isRequired,
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
    })
  ]),
  sorting: PropTypes.bool,
  selection: SelectionType,
  noItemsMessage: PropTypes.string
};

export class EuiBasicTableContainer extends React.Component {

  static propTypes = BasicTableContainerPropTypes;
  static defaultProps = {
    pagination: false,
    sorting: false
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: undefined,
      noItemsMessage: 'Loading...',
      data: {
        items: [],
        totalCount: 0
      },
      criteria: {
        page: !this.props.pagination ? undefined : {
          index: 0,
          size: EuiBasicTableContainer.resolveInitialPageSize(this.props.pagination)
        }
      }
    };
  }

  static resolveInitialPageSize(pagination) {
    return pagination.pageSizeOptions ?
      pagination.pageSizeOptions[0] :
      paginationBarDefaults.pageSizeOptions[0];
  }

  load(criteria) {
    const load = this.resolveLoader();
    this.setState({ loading: true });
    load(criteria).then((data) => {
      if (isArray(data)) {
        data = { items: data, totalCount: data.length };
      }
      this.setState({
        data,
        criteria,
        loading: false,
        error: undefined,
        noItemsMessage: this.props.noItemsMessage
      });
    }).catch((error) => {
      this.setState({
        criteria,
        error: isString(error) ? error : error.message,
        loading: false,
        noItemsMessage: this.props.noItemsMessage
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.load(this.state.criteria);
  };

  render() {
    const { criteria, error, loading, data, noItemsMessage } = this.state;
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
    const selection = this.props.selection;
    return (
      <EuiBasicTable
        items={items}
        columns={this.props.columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        onChange={this.load.bind(this)}
        error={error}
        loading={loading}
        noItemsMessage={noItemsMessage}
      />
    );
  }

  resolveLoader() {
    if (isArray(this.props.items)) {
      return (criteria) => {
        return EuiBasicTableContainer.loadInMemoryData(this.props.items, criteria);
      };
    }
    return (criteria) => {
      try {
        return Promise.resolve(this.props.items(criteria));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }

  static loadInMemoryData(items, criteria) {
    if (criteria.sort) {
      items = items.sort(Comparators.property(criteria.sort.field, Comparators.default(criteria.sort.direction)));
    }
    const totalCount = items.length;
    if (criteria.page) {
      const { index, size } = criteria.page;
      const from = index * size;
      items = items.slice(from, Math.min(from + size, items.length));
    }
    return Promise.resolve({ items, totalCount });
  }
}
