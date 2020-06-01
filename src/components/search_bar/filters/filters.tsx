/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
  config: SearchFilterConfig,
  query: Query,
  onChange: (query: Query) => void
) => {
  const props = { index, query, onChange };

  // We don't put `config` into `props` above because until we check
  // `config.type`, TS only knows that it's a `FilterConfig`, and that type
  // is used to define `props` as well. Once we've checked `config.type`
  // below, its type is narrowed correctly, hence we pass down `config`
  // separately.
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
      // @ts-ignore TS knows that we've checked `config.type` exhaustively
      throw new Error(`Unknown search filter type [${config.type}]`);
  }
};

export type SearchFilterConfig =
  | IsFilterConfigType
  | FieldValueSelectionFilterConfigType
  | FieldValueToggleFilterConfigType
  | FieldValueToggleGroupFilterConfigType;
