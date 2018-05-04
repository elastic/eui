import React, { Component } from 'react';
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

  /**
   * Tools which go to the left of the search bar.
   */
  toolsLeft: PropTypes.node,

  /**
   * Tools which go to the right of the search bar.
   */
  toolsRight: PropTypes.node,
};

const parseQuery = (query, props) => {
  const parseDate = props.box ? props.box.parseDate : undefined;
  const schema = props.box ? props.box.schema : undefined;
  const parseOptions = {
    parseDate,
    schema
  };
  if (!query) {
    return Query.parse('', parseOptions);
  }
  return isString(query) ? Query.parse(query, parseOptions) : query;
};

export class EuiSearchBar extends Component {

  static propTypes = SearchBoxConfigPropTypes;

  static Query = Query;

  constructor(props) {
    super(props);
    const query = parseQuery(props.defaultQuery || props.query, props);
    this.state = {
      query,
      queryText: query.text,
      error: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      const query = parseQuery(nextProps.query, this.props);
      this.setState({
        query,
        queryText: query.text,
        error: null
      });
    }
  }

  onSearch = (queryText) => {
    try {
      const query = parseQuery(queryText, this.props);
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

  renderTools(tools) {
    if (!tools) {
      return undefined;
    }

    if (Array.isArray(tools)) {
      return tools.map(tool => (
        <EuiFlexItem grow={false} key={tool.key}>
          {tool}
        </EuiFlexItem>
      ));
    }

    return <EuiFlexItem grow={false}>{tools}</EuiFlexItem>;
  }

  render() {
    const { query, queryText, error } = this.state;
    const { box, filters, toolsLeft, toolsRight } = this.props;

    const toolsLeftEl = this.renderTools(toolsLeft);

    const filtersBar = !filters ? undefined : (
      <EuiFlexItem grow={false}>
        <EuiSearchFilters filters={filters} query={query} onChange={this.onFiltersChange} />
      </EuiFlexItem>
    );

    const toolsRightEl = this.renderTools(toolsRight);

    return (
      <EuiFlexGroup gutterSize="m" alignItems="center">
        {toolsLeftEl}
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
        {toolsRightEl}
      </EuiFlexGroup>
    );
  }
}


