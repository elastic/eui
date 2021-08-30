/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiButtonGroup, EuiButtonIcon } from '../button';
import { EuiDraggable } from '../drag_and_drop';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiI18n } from '../i18n';
import { EuiIcon } from '../icon';
import { EuiText } from '../text';
import { EuiToken } from '../token';
import { getDetailsForSchema } from './data_grid_schema';
import { EuiDataGridColumnSortingDraggableProps } from './data_grid_types';

export const defaultSortAscLabel = (
  <EuiI18n token="euiColumnSortingDraggable.defaultSortAsc" default="A-Z" />
);
export const defaultSortDescLabel = (
  <EuiI18n token="euiColumnSortingDraggable.defaultSortDesc" default="Z-A" />
);

export const EuiDataGridColumnSortingDraggable: FunctionComponent<EuiDataGridColumnSortingDraggableProps> = ({
  id,
  display,
  direction,
  index,
  sorting,
  schema,
  schemaDetectors,
  ...rest
}) => {
  const schemaDetails =
    schema.hasOwnProperty(id) && schema[id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
      : null;

  const textSortAsc =
    schemaDetails != null ? schemaDetails.sortTextAsc : defaultSortAscLabel;

  const textSortDesc =
    schemaDetails != null ? schemaDetails.sortTextDesc : defaultSortDescLabel;

  const toggleOptions = [
    {
      id: `${id}Asc`,
      value: 'asc',
      label: textSortAsc,
      'data-test-subj': `euiDataGridColumnSorting-sortColumn-${id}-asc`,
    },
    {
      id: `${id}Desc`,
      value: 'desc',
      label: textSortDesc,
      'data-test-subj': `euiDataGridColumnSorting-sortColumn-${id}-desc`,
    },
  ];

  return (
    <EuiDraggable draggableId={id} index={index} {...rest}>
      {(provided, state) => (
        <div
          className={`euiDataGridColumnSorting__item ${
            state.isDragging && 'euiDataGridColumnSorting__item-isDragging'
          }`}
        >
          <EuiScreenReaderOnly>
            <p>
              <EuiI18n
                token="euiColumnSortingDraggable.activeSortLabel"
                default="{display} is sorting this data grid"
                values={{ display }}
              >
                {(activeSortLabel: string) => activeSortLabel}
              </EuiI18n>
            </p>
          </EuiScreenReaderOnly>
          <EuiFlexGroup
            gutterSize="xs"
            alignItems="center"
            responsive={false}
            data-test-subj={`euiDataGridColumnSorting-sortColumn-${id}`}
          >
            <EuiFlexItem grow={false}>
              <EuiI18n
                token="euiColumnSortingDraggable.removeSortLabel"
                default="Remove {display} from data grid sort"
                values={{ display }}
              >
                {(removeSortLabel: string) => (
                  <EuiButtonIcon
                    color="text"
                    className="euiDataGridColumnSorting__button"
                    aria-label={removeSortLabel}
                    iconType="cross"
                    onClick={() => {
                      const nextColumns = [...sorting.columns];
                      const columnIndex = nextColumns
                        .map(({ id }) => id)
                        .indexOf(id);
                      nextColumns.splice(columnIndex, 1);
                      sorting.onSort(nextColumns);
                    }}
                  />
                )}
              </EuiI18n>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiToken
                color={schemaDetails != null ? schemaDetails.color : undefined}
                iconType={
                  schemaDetails != null ? schemaDetails.icon : 'tokenString'
                }
              />
            </EuiFlexItem>
            <EuiFlexItem aria-hidden>
              <EuiText size="xs">
                <p>{display}</p>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="euiDataGridColumnSorting__orderButtons">
              <EuiI18n
                token="euiColumnSortingDraggable.toggleLegend"
                default="Select sorting method for {display}"
                values={{ display }}
              >
                {(toggleLegend: string) => (
                  <EuiButtonGroup
                    legend={toggleLegend}
                    name={id}
                    isFullWidth
                    options={toggleOptions}
                    data-test-subj={`-${direction}`}
                    buttonSize="compressed"
                    className="euiDataGridColumnSorting__order"
                    idSelected={direction === 'asc' ? `${id}Asc` : `${id}Desc`}
                    onChange={(_, direction) => {
                      const nextColumns = [...sorting.columns];
                      const columnIndex = nextColumns
                        .map(({ id }) => id)
                        .indexOf(id);
                      nextColumns.splice(columnIndex, 1, {
                        id,
                        direction,
                      });
                      sorting.onSort(nextColumns);
                    }}
                  />
                )}
              </EuiI18n>
            </EuiFlexItem>
            <EuiFlexItem grow={false} {...provided.dragHandleProps}>
              <div {...provided.dragHandleProps}>
                <EuiIcon type="grab" color="subdued" />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      )}
    </EuiDraggable>
  );
};
