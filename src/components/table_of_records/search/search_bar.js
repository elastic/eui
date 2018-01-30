import React from 'react';
import { EuiFlexGroup } from '../../flex/flex_group';
import { SearchBox } from './search_box';

export const SearchBar = ({ config, model, onQueryChange }) => {
  return (
    <EuiFlexGroup gutterSize="m">
      <SearchBox config={config.search.box} model={model} onQueryChange={onQueryChange}/>
    </EuiFlexGroup>
  );
};

