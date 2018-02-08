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

const resolveQuery = (query) => {
  return isString(query) ? Query.parse(query) : query;
};

export class EuiSearchBar extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired, // (query: Query) => void
    query: PropTypes.oneOfType([ PropTypes.instanceOf(Query), PropTypes.string ]),
    box: PropTypes.shape(SearchBoxConfigPropTypes),
    filters: SearchFiltersFiltersType,
  };

  static defaultProps = {
    query: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      query: resolveQuery(props.query)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ query: resolveQuery(nextProps.query) });
  }

  onChange = (query) => {
    this.setState({ query });
    this.props.onChange(query);
  };

  render() {
    const query = this.state.query;
    const { box, filters } = this.props;
    const filtersBar = !filters ? undefined : (
      <EuiFlexItem grow={false}>
        <EuiSearchFilters filters={filters} query={query} onChange={this.onChange}/>
      </EuiFlexItem>
    );
    return (
      <EuiFlexGroup gutterSize="m" alignItems="center">
        <EuiFlexItem grow={true}>
          <EuiSearchBox {...box} query={query} onChange={this.onChange}/>
        </EuiFlexItem>
        {filtersBar}
      </EuiFlexGroup>
    );
  }
}
