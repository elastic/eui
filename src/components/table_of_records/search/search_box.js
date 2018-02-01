import React from 'react';
import { EuiFlexItem } from '../../flex/flex_item';
import { EuiFieldSearch } from '../../form/field_search/field_search';
import { ENTER } from '../../../services/key_codes';

const defaults = {
  placeholder: 'Search...',
  value: '',
  asYouType: true
};

export const SearchBox = ({ config, model, onQueryChange }) => {
  const placeholder = config.placeholder || defaults.placeholder;
  const value = model.criteria.search && model.criteria.search.query ? model.criteria.search.query : defaults.value;
  const asYouType = config.asYouType || defaults.asYouType;
  const onKeyUp = (event) => {
    if ((asYouType && event.keyCode !== ENTER) || (!asYouType && event.keyCode === ENTER)) {
      onQueryChange(event.target.value);
    }
  };
  return (
    <EuiFlexItem>
      <EuiFieldSearch fullWidth placeholder={placeholder} defaultValue={value} onKeyUp={onKeyUp} />
    </EuiFlexItem>
  );
};
