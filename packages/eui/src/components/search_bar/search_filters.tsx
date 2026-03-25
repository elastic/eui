/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { createFilter, SearchFilterConfig } from './filters';
import { Query } from './query';
import { EuiFilterGroup } from '../filter_group';

export type { SearchFilterConfig } from './filters';

export interface EuiSearchBarFiltersProps {
  query: Query;
  onChange: (query: Query) => void;
  filters: SearchFilterConfig[];
}

export const EuiSearchBarFilters: FunctionComponent<
  EuiSearchBarFiltersProps
> = ({ filters = [], query, onChange }) => {
  const items = filters.reduce<ReactElement[]>((acc, filterConfig, index) => {
    if (filterConfig.available && !filterConfig.available()) {
      return acc;
    }
    const key = `filter_${index}`;
    const control = createFilter(index, filterConfig, query, onChange);
    acc.push(<Fragment key={key}>{control}</Fragment>);
    return acc;
  }, []);

  return <EuiFilterGroup>{items}</EuiFilterGroup>;
};
