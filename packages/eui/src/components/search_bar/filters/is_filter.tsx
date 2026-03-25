/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FC } from 'react';
import { EuiFilterButton } from '../../filter_group';
import { isNil } from '../../../services/predicate';
import { Query } from '../query';
import { Clause } from '../query/ast';

export interface IsFilterConfigType {
  type: 'is';
  field: string;
  name: string;
  negatedName?: string;
  available?: () => boolean;
}

export interface IsFilterProps {
  index: number;
  config: IsFilterConfigType;
  query: Query;
  onChange: (value: Query) => void;
}

export const IsFilter: FC<IsFilterProps> = (props) => {
  const resolveDisplay = (clause: Clause) => {
    const { name, negatedName } = props.config;
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

  const valueChanged = (field: string, checked: boolean) => {
    const query = checked
      ? props.query.removeIsClause(field)
      : props.query.addMustIsClause(field);
    props.onChange(query);
  };

  const { query, config } = props;
  const clause = query.getIsClause(config.field);
  const checked = !isNil(clause);
  const { hasActiveFilters, name } = resolveDisplay(clause);
  const onClick = () => {
    valueChanged(config.field, checked);
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
