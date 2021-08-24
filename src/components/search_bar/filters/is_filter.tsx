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

export class IsFilter extends Component<IsFilterProps> {
  resolveDisplay(clause: Clause) {
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

  valueChanged(field: string, checked: boolean) {
    const query = checked
      ? this.props.query.removeIsClause(field)
      : this.props.query.addMustIsClause(field);
    this.props.onChange(query);
  }

  render() {
    const { query, config } = this.props;
    const clause = query.getIsClause(config.field);
    const checked = !isNil(clause);
    const { hasActiveFilters, name } = this.resolveDisplay(clause);
    const onClick = () => {
      this.valueChanged(config.field, checked);
    };
    return (
      <EuiFilterButton
        onClick={onClick}
        hasActiveFilters={hasActiveFilters}
        aria-pressed={!!hasActiveFilters}
      >
        {name}
      </EuiFilterButton>
    );
  }
}
