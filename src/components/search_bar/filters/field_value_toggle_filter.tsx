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

import React, { Component } from 'react';
import { EuiFilterButton } from '../../filter_group';
import { isNil } from '../../../services/predicate';
import { Query } from '../query';
import { Clause, Value } from '../query/ast';

export interface FieldValueToggleFilterConfigType {
  type: 'field_value_toggle';
  field: string;
  value: Value;
  name: string;
  negatedName?: string;
  available?: () => boolean;
  operator?: 'eq' | 'exact' | 'gt' | 'gte' | 'lt' | 'lte';
}

export interface FieldValueToggleFilterProps {
  index: number;
  config: FieldValueToggleFilterConfigType;
  query: Query;
  onChange: (value: Query) => void;
}

export class FieldValueToggleFilter extends Component<
  FieldValueToggleFilterProps
> {
  resolveDisplay(clause: Clause | undefined) {
    const { name, negatedName } = this.props.config;
    if (isNil(clause)) {
      return { hasActiveFilters: false, name };
    }
    return Query.isMust(clause)
      ? { hasActiveFilters: true, name }
      : {
          hasActiveFilters: true,
          name: negatedName ? negatedName : `Not ${name}`,
        };
  }

  valueChanged(checked: boolean) {
    const { field, value, operator } = this.props.config;
    const query = checked
      ? this.props.query.removeSimpleFieldValue(field, value)
      : this.props.query.addSimpleFieldValue(field, value, true, operator);
    this.props.onChange(query);
  }

  render() {
    const { query, config } = this.props;
    const clause = query.getSimpleFieldClause(config.field, config.value);
    const checked = !isNil(clause);
    const { hasActiveFilters, name } = this.resolveDisplay(clause);
    const onClick = () => {
      this.valueChanged(checked);
    };
    return (
      <EuiFilterButton
        onClick={onClick}
        hasActiveFilters={hasActiveFilters}
        aria-pressed={!!hasActiveFilters}>
        {name}
      </EuiFilterButton>
    );
  }
}
