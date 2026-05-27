/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
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

export const FieldValueToggleFilter: FunctionComponent<
  FieldValueToggleFilterProps
> = ({ config, query, onChange }) => {
  const clause = query.getSimpleFieldClause(config.field, config.value);
  const checked = !isNil(clause);

  const resolveDisplay = (clause: Clause | undefined) => {
    const { name, negatedName } = config;
    if (isNil(clause)) {
      return { hasActiveFilters: false, name };
    }
    return Query.isMust(clause)
      ? { hasActiveFilters: true, name }
      : {
          hasActiveFilters: true,
          name: negatedName ? negatedName : `Not ${name}`,
        };
  };

  const { hasActiveFilters, name } = resolveDisplay(clause);

  const onClick = () => {
    const { field, value, operator } = config;
    const newQuery = checked
      ? query.removeSimpleFieldValue(field, value)
      : query.addSimpleFieldValue(field, value, true, operator);
    onChange(newQuery);
  };

  return (
    <EuiFilterButton
      onClick={onClick}
      isSelected={hasActiveFilters}
      hasActiveFilters={hasActiveFilters}
      aria-pressed={!!hasActiveFilters}
      isToggle
    >
      {name}
    </EuiFilterButton>
  );
};

FieldValueToggleFilter.displayName = 'FieldValueToggleFilter';
