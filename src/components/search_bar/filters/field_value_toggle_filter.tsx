/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import { EuiFilterButton } from '../../filter_group';
import { isNil } from '../../../services/predicate';
import { Query } from '../query';
import { Clause, OperatorType, Value } from '../query/ast';

export interface FieldValueToggleFilterConfigType {
  type: 'field_value_toggle';
  field: string;
  value: Value;
  name: string;
  negatedName?: string;
  available?: () => boolean;
  operator?: OperatorType;
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
