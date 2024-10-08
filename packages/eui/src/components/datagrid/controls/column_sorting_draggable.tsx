/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useCallback } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiButtonGroup, EuiButtonIcon } from '../../button';
import { EuiDraggable } from '../../drag_and_drop';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiIcon } from '../../icon';
import { EuiText } from '../../text';
import { EuiToken } from '../../token';

import { getDetailsForSchema } from '../utils/data_grid_schema';
import { EuiDataGridColumnSortingDraggableProps } from '../data_grid_types';
import { euiDataGridColumnSortingStyles } from './column_sorting.styles';

export const defaultSortAscLabel = (
  <EuiI18n token="euiColumnSortingDraggable.defaultSortAsc" default="A-Z" />
);
export const defaultSortDescLabel = (
  <EuiI18n token="euiColumnSortingDraggable.defaultSortDesc" default="Z-A" />
);

export const EuiDataGridColumnSortingDraggable: FunctionComponent<
  EuiDataGridColumnSortingDraggableProps
> = ({
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

  const dragHandleAriaLabel = useEuiI18n(
    'euiColumnSortingDraggable.dragHandleAriaLabel',
    'Drag handle'
  );

  const removeSort = useCallback(() => {
    const nextColumns = [...sorting.columns];
    const columnIndex = nextColumns.map(({ id }) => id).indexOf(id);
    nextColumns.splice(columnIndex, 1);
    sorting.onSort(nextColumns);
  }, [id, sorting]);

  const toggleLegendHandler = useCallback<(id: string, value?: any) => void>(
    (_, direction) => {
      const nextColumns = [...sorting.columns];
      const columnIndex = nextColumns.map(({ id }) => id).indexOf(id);
      nextColumns.splice(columnIndex, 1, {
        id,
        direction,
      });
      sorting.onSort(nextColumns);
    },
    [id, sorting]
  );

  const styles = useEuiMemoizedStyles(euiDataGridColumnSortingStyles);

  return (
    <EuiDraggable
      draggableId={id}
      index={index}
      hasInteractiveChildren
      customDragHandle
      usePortal
      {...rest}
    >
      {(provided, state) => (
        <EuiFlexGroup
          css={styles.euiDataGridColumnSorting__item}
          className={classNames('euiDataGridColumnSorting__item', {
            'euiDataGridColumnSorting__item-isDragging': state.isDragging,
          })}
          gutterSize="xs"
          alignItems="center"
          responsive={false}
          data-test-subj={`euiDataGridColumnSorting-sortColumn-${id}`}
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
                  onClick={removeSort}
                />
              )}
            </EuiI18n>
          </EuiFlexItem>

          <EuiFlexItem
            // This extra column name flex item affords the column more grabbable real estate
            // for mouse users, while hiding repetition for keyboard/screen reader users
            css={styles.euiDataGridColumnSorting__name}
            className="euiDataGridColumnSorting__name"
            {...provided.dragHandleProps}
            tabIndex={-1}
            aria-hidden
          >
            <EuiFlexGroup
              gutterSize="xs"
              alignItems="center"
              responsive={false}
            >
              <EuiFlexItem grow={false}>
                <EuiToken
                  color={
                    schemaDetails != null ? schemaDetails.color : undefined
                  }
                  iconType={
                    schemaDetails != null ? schemaDetails.icon : 'tokenString'
                  }
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="xs">{display}</EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiI18n
              token="euiColumnSortingDraggable.toggleLegend"
              default="Select sorting method for {display}"
              values={{ display }}
            >
              {(toggleLegend: string) => (
                <EuiButtonGroup
                  legend={toggleLegend}
                  isFullWidth
                  options={toggleOptions}
                  buttonSize="compressed"
                  css={styles.euiDataGridColumnSorting__order}
                  className="euiDataGridColumnSorting__order"
                  idSelected={direction === 'asc' ? `${id}Asc` : `${id}Desc`}
                  onChange={toggleLegendHandler}
                />
              )}
            </EuiI18n>
          </EuiFlexItem>

          <EuiFlexItem
            grow={false}
            {...provided.dragHandleProps}
            aria-label={dragHandleAriaLabel}
          >
            <EuiIcon type="grab" color="subdued" />
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </EuiDraggable>
  );
};
