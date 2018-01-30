import React from 'react';
import { IsFilter, IsFilterConfigType } from './is_filter';
import { FieldValueSelectionFilter, FieldValueSelectionFilterConfigType } from './field_value_selection_filter';
import PropTypes from 'prop-types';

export const createFilter = (index, config, query, onChange) => {
  const props = { index, config, query, onChange };
  switch (config.type) {
    case 'is':
      return <IsFilter {...props} />;
    case 'field_value_selection':
      return <FieldValueSelectionFilter {...props} />;
    default:
      throw new Error(`Unknown search filter type [${config.type}]`);
  }
};

export const FilterConfigType = PropTypes.oneOfType([
  IsFilterConfigType,
  FieldValueSelectionFilterConfigType
]);
