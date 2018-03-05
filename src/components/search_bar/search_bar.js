import React from 'react';
import { isString } from '../../services/predicate';
import { EuiFlexGroup } from '../flex/flex_group';
import {
  EuiSearchBox,
  SearchBoxConfigPropTypes
} from './search_box';
import {
  EuiSearchFilters,
  SearchFiltersFiltersType
} from './search_filters';
import PropTypes from 'prop-types';
import { Query } from './query';
import { EuiFlexItem } from '../flex/flex_item';

export const QueryType = PropTypes.oneOfType([ PropTypes.instanceOf(Query), PropTypes.string ]);

export const SearchBarPropTypes = {

  /**
   * (query: Query) => void
   */
  onChange: PropTypes.func.isRequired,

  /**
   (query?: Query, queryText: string, error?: string) => void
   */
  onParse: PropTypes.func,

  /**
   The initial query the bar will hold when first mounted
   */
  defaultQuery: QueryType,

  /**
   If you wish to use the search bar as a controlled component, continuously pass the query
   via this prop
   */
  query: QueryType,

  /**
   Configures the search box. Set `placeholder` to change the placeholder text in the box and
   `incremental` to support incremental (as you type) search.
   */
  box: PropTypes.shape(SearchBoxConfigPropTypes),

  /**
   An array of search filters.
   */
  filters: SearchFiltersFiltersType,
};

const resolveQuery = (query) => {
  if (!query) {
    return Query.parse('');
  }
  return isString(query) ? Query.parse(query) : query;
};

export class EuiSearchBar extends React.Component {

  static propTypes = SearchBoxConfigPropTypes;

  constructor(props) {
    super(props);
    const query = resolveQuery(props.defaultQuery || props.query);
    this.state = {
      query,
      queryText: query.text,
      error: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      const query = resolveQuery(nextProps.query);
      this.setState({
        query,
        queryText: query.text,
        error: null
      });
    }
  }

  onSearch = (queryText) => {
    try {
      const query = Query.parse(queryText);
      if (this.props.onParse) {
        this.props.onParse({ query, queryText });
      }
      this.setState({ query, queryText, error: null });
      this.props.onChange(query);
    } catch (e) {
      const error = { message: e.message };
      if (this.props.onParse) {
        this.props.onParse({ queryText, error });
      }
      this.setState({ queryText, error });
    }
  };

  onFiltersChange = (query) => {
    this.setState({
      query,
      queryText: query.text,
      error: null
    });
    this.props.onChange(query);
  };

  render() {
    const { query, queryText, error } = this.state;
    const { box, filters } = this.props;
    const filtersBar = !filters ? undefined : (
      <EuiFlexItem grow={false}>
        <EuiSearchFilters filters={filters} query={query} onChange={this.onFiltersChange}/>
      </EuiFlexItem>
    );
    return (
      <EuiFlexGroup gutterSize="m" alignItems="center">
        <EuiFlexItem grow={true}>
          <EuiSearchBox
            {...box}
            query={queryText}
            onSearch={this.onSearch}
            isInvalid={!!error}
            title={error ? error.message : undefined}
          />
        </EuiFlexItem>
        {filtersBar}
      </EuiFlexGroup>
    );
  }
}


