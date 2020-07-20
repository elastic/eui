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
