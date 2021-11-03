/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import { EuiFilterButton } from '../../filter_group';
import { Query } from '../query';
import { OperatorType } from '../query/ast';

export interface FieldValueToggleGroupFilterItemType {
  value: string | number | boolean;
  name: string;
  negatedName?: string;
  operator?: OperatorType;
}

export interface FieldValueToggleGroupFilterConfigType {
  type: 'field_value_toggle_group';
  field: string;
  /**
   * See #FieldValueToggleGroupFilterItemType
   */
  items: FieldValueToggleGroupFilterItemType[];
  available?: () => boolean;
}

export interface FieldValueToggleGroupFilterProps {
  index: number;
  config: FieldValueToggleGroupFilterConfigType;
  query: Query;
  onChange: (value: Query) => void;
}

export class FieldValueToggleGroupFilter extends Component<
  FieldValueToggleGroupFilterProps
> {
  resolveDisplay(
    config: FieldValueToggleGroupFilterConfigType,
    query: Query,
    item: FieldValueToggleGroupFilterItemType
  ) {
    const clause = query.getSimpleFieldClause(config.field, item.value);
    if (clause) {
      if (Query.isMust(clause)) {
        return { active: true, name: item.name };
      }
      return {
        active: true,
        name: item.negatedName ? item.negatedName : `Not ${item.name}`,
      };
    }
    return { active: false, name: item.name };
  }

  valueChanged(item: FieldValueToggleGroupFilterItemType, active: boolean) {
    const { field } = this.props.config;
    const { value, operator } = item;
    const query = active
      ? this.props.query.removeSimpleFieldClauses(field)
      : this.props.query
          .removeSimpleFieldClauses(field)
          .addSimpleFieldValue(field, value, true, operator);
    this.props.onChange(query);
  }

  render() {
    const { config, query } = this.props;
    return config.items.map((item, index) => {
      const { active, name } = this.resolveDisplay(config, query, item);
      const onClick = () => {
        this.valueChanged(item, active);
      };
      const key = `field_value_toggle_filter_item_${index}`;
      const isLastItem = index === config.items.length - 1;
      return (
        <EuiFilterButton
          key={key}
          onClick={onClick}
          hasActiveFilters={active}
          noDivider={!isLastItem}
          aria-pressed={!!active}
          withNext={!isLastItem}
        >
          {name}
        </EuiFilterButton>
      );
    });
  }
}
