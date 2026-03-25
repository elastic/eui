/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, FC } from 'react';
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
   * See {@link FieldValueToggleGroupFilterItemType}
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

export const FieldValueToggleGroupFilter: FC<
  FieldValueToggleGroupFilterProps
> = (props) => {
  const resolveDisplay = (
    config: FieldValueToggleGroupFilterConfigType,
    query: Query,
    item: FieldValueToggleGroupFilterItemType
  ) => {
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
  };

  const valueChanged = (
    item: FieldValueToggleGroupFilterItemType,
    active: boolean
  ) => {
    const { field } = props.config;
    const { value, operator } = item;
    const query = active
      ? props.query.removeSimpleFieldClauses(field)
      : props.query
          .removeSimpleFieldClauses(field)
          .addSimpleFieldValue(field, value, true, operator);
    props.onChange(query);
  };

  const { config, query } = props;

  return config.items.map((item, index) => {
    const { active, name } = resolveDisplay(config, query, item);
    const onClick = () => {
      valueChanged(item, active);
    };
    const key = `field_value_toggle_filter_item_${index}`;
    const isLastItem = index === config.items.length - 1;
    return (
      <EuiFilterButton
        key={key}
        onClick={onClick}
        isSelected={active}
        hasActiveFilters={active}
        aria-pressed={!!active}
        withNext={!isLastItem}
        isToggle
      >
        {name}
      </EuiFilterButton>
    );
  });
};
