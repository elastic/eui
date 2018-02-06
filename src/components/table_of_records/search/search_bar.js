import React from 'react';
import { isString } from '../../../services/predicate';
import { EuiFlexGroup } from '../../flex/flex_group';
import { SearchBox, SearchBoxConfigType } from './search_box';
import { FilterBar, FilterBarConfigType } from './filter_bar';
import PropTypes from 'prop-types';
import { Query } from './query';
import { EuiFlexItem } from '../../flex/flex_item';
import { EuiFilterGroup } from '../../filter_group';

export const SearchConfigType = PropTypes.shape({
  box: SearchBoxConfigType,
  filters: FilterBarConfigType
});

const resolveQuery = (query) => {
  if (!query) {
    return Query.parse('');
  }
  return isString(query) ? Query.parse(query) : query;
};

export const SearchBar = ({ config, query, onChange }) => {
  query = resolveQuery(query);
  const filters = !config.filters ? undefined : (
    <EuiFlexItem grow={false}>
      <EuiFilterGroup>
        <FilterBar config={config.filters} query={query} onChange={onChange}/>
      </EuiFilterGroup>
    </EuiFlexItem>
  );
  return (
    <EuiFlexGroup gutterSize="m" alignItems="center">
      <EuiFlexItem grow={true}>
        <SearchBox config={config.box} query={query} onChange={onChange}/>
      </EuiFlexItem>
      {filters}
    </EuiFlexGroup>
  );
};

SearchBar.propTypes = {
  config: SearchConfigType.isRequired,
  onChange: PropTypes.func.isRequired, // (query: Query) => void
  query: PropTypes.oneOfType([ PropTypes.instanceOf(Query), PropTypes.string ])
};
