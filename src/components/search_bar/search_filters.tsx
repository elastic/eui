/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, Fragment, ReactElement } from 'react';
import { createFilter, SearchFilterConfig } from './filters';
import { Query } from './query';
import { EuiFilterGroup } from '../filter_group';

export { SearchFilterConfig } from './filters';

interface EuiSearchFiltersProps {
  query: Query;
  onChange: (query: Query) => void;
  filters: SearchFilterConfig[];
}

type DefaultProps = Pick<EuiSearchFiltersProps, 'filters'>;

export class EuiSearchFilters extends Component<EuiSearchFiltersProps> {
  static defaultProps: DefaultProps = {
    filters: [],
  };

  render() {
    const { filters = [], query, onChange } = this.props;

    const items: ReactElement[] = [];

    filters.forEach((filterConfig, index) => {
      if (filterConfig.available && !filterConfig.available()) {
        return;
      }
      const key = `filter_${index}`;
      const control = createFilter(index, filterConfig, query, onChange);
      items.push(<Fragment key={key}>{control}</Fragment>);
    });

    return <EuiFilterGroup>{items}</EuiFilterGroup>;
  }
}
