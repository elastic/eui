import React from 'react';
import { IsFilter, IsFilterConfigType } from './is_filter';
import {
  FieldValueSelectionFilter,
  FieldValueSelectionFilterConfigType,
} from './field_value_selection_filter';
import {
  FieldValueToggleFilter,
  FieldValueToggleFilterConfigType,
} from './field_value_toggle_filter';
import {
  FieldValueToggleGroupFilter,
  FieldValueToggleGroupFilterConfigType,
} from './field_value_toggle_group_filter';
import { Query } from '../query';

export const createFilter = (
  index: number,
  config: FilterConfig,
  query: Query,
  onChange: (query: Query) => void
) => {
  const props = { index, query, onChange };

  // We don't put config in `props` above because TS will give it a wider
  // type that we want. Once we've checked `config.type` below, its type
  // is narrowed correctly.
  switch (config.type) {
    case 'is':
      return <IsFilter {...props} config={config} />;

    case 'field_value_selection':
      return <FieldValueSelectionFilter {...props} config={config} />;

    case 'field_value_toggle':
      return <FieldValueToggleFilter {...props} config={config} />;

    case 'field_value_toggle_group':
      return <FieldValueToggleGroupFilter {...props} config={config} />;

    default:
      // @ts-ignore TS knows that we can't get here
      throw new Error(`Unknown search filter type [${config.type}]`);
  }
};

export type FilterConfig =
  | IsFilterConfigType
  | FieldValueSelectionFilterConfigType
  | FieldValueToggleFilterConfigType
  | FieldValueToggleGroupFilterConfigType;
