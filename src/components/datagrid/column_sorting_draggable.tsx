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

import React, { FunctionComponent, ReactChild } from 'react';
import { EuiI18n } from '../i18n';
import { EuiDraggable } from '../drag_and_drop';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiButtonIcon, EuiButtonGroup } from '../button';
import { EuiIcon } from '../icon';
import { EuiText } from '../text';
import {
  getDetailsForSchema,
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
} from './data_grid_schema';
import { EuiDataGridSorting } from './data_grid_types';
import { EuiToken } from '../token';

export interface EuiDataGridColumnSortingDraggableProps {
  id: string;
  direction: string;
  index: number;
  sorting: EuiDataGridSorting;
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
}

export const EuiDataGridColumnSortingDraggable: FunctionComponent<
  EuiDataGridColumnSortingDraggableProps
> = ({ id, direction, index, sorting, schema, schemaDetectors, ...rest }) => {
  const schemaDetails =
    schema.hasOwnProperty(id) && schema[id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
      : null;

  const textSortAsc =
    schemaDetails != null ? (
      schemaDetails.sortTextAsc
    ) : (
      <EuiI18n token="euiColumnSortingDraggable.defaultSortAsc" default="A-Z" />
    );

  const textSortDesc =
    schemaDetails != null ? (
      schemaDetails.sortTextDesc
    ) : (
      <EuiI18n
        token="euiColumnSortingDraggable.defaultSortDesc"
        default="Z-A"
      />
    );

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
          className={`euiDataGridColumnSorting__item ${state.isDragging &&
            'euiDataGridColumnSorting__item-isDragging'}`}>
          <EuiScreenReaderOnly>
            <p>
              <EuiI18n
                token="euiColumnSortingDraggable.activeSortLabel"
                default="is sorting this data grid">
                {(activeSortLabel: ReactChild) => (
                  <span>
                    {id} {activeSortLabel}
                  </span>
                )}
              </EuiI18n>
            </p>
          </EuiScreenReaderOnly>
          <EuiFlexGroup
            gutterSize="xs"
            alignItems="center"
            responsive={false}
            data-test-subj={`euiDataGridColumnSorting-sortColumn-${id}`}>
            <EuiFlexItem grow={false}>
              <EuiI18n
                token="euiColumnSortingDraggable.removeSortLabel"
                default="Remove from data grid sort:">
                {(removeSortLabel: ReactChild) => (
                  <EuiButtonIcon
                    color="text"
                    size="s"
                    className="euiDataGridColumnSorting__button"
                    aria-label={`${removeSortLabel} ${id}`}
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
                <p>{id}</p>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="euiDataGridColumnSorting__orderButtons">
              <EuiI18n
                token="euiColumnSortingDraggable.toggleLegend"
                default="Select sorting method for field: ">
                {(toggleLegend: ReactChild) => (
                  <EuiButtonGroup
                    legend={`${toggleLegend} ${id}`}
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
