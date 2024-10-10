/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { AriaAttributes, useMemo } from 'react';

import { useGeneratedHtmlId } from '../../../../services';
// Keep the i18n scope the same as EuiDataGridHeaderCell
/* eslint-disable local/i18n */
import { EuiI18n } from '../../../i18n';
import { EuiIcon } from '../../../icon';
import { EuiDataGridSorting } from '../../data_grid_types';

/**
 * Column sorting utility helpers
 */
export const useColumnSorting = ({
  sorting,
  id,
  hasColumnActions,
}: {
  sorting?: EuiDataGridSorting;
  id: string;
  hasColumnActions: boolean;
}) => {
  const sortedColumn = useMemo(
    () => sorting?.columns.find((col) => col.id === id),
    [sorting, id]
  );
  const isColumnSorted = !!sortedColumn;
  const hasOnlyOneSort = sorting?.columns?.length === 1;

  /**
   * Arrow icon
   */
  const sortingArrow = useMemo(() => {
    return isColumnSorted ? (
      <EuiIcon
        type={sortedColumn.direction === 'asc' ? 'sortUp' : 'sortDown'}
        color="text"
        className="euiDataGridHeaderCell__sortingArrow"
        data-test-subj={`dataGridHeaderCellSortingIcon-${id}`}
      />
    ) : null;
  }, [id, isColumnSorted, sortedColumn]);

  /**
   * aria-sort attribute - should only be used when a single column is being sorted
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-sort
   * @see https://www.w3.org/WAI/ARIA/apg/example-index/table/sortable-table.html
   * @see https://github.com/w3c/aria/issues/283 for potential future multi-column usage
   */
  const ariaSort: AriaAttributes['aria-sort'] =
    isColumnSorted && hasOnlyOneSort
      ? sorting.columns[0].direction === 'asc'
        ? 'ascending'
        : 'descending'
      : undefined;

  // aria-describedby ID for when aria-sort isn't sufficient
  const sortingAriaId = useGeneratedHtmlId({
    prefix: 'euiDataGridCellHeader',
    suffix: 'sorting',
  });

  /**
   * Sorting status - screen reader text
   */
  const sortingScreenReaderText = useMemo(() => {
    if (!isColumnSorted) return null;
    if (!hasColumnActions && hasOnlyOneSort) return null; // in this scenario, the `aria-sort` attribute will be used by screen readers
    return (
      <p id={sortingAriaId} hidden>
        {sorting?.columns?.map(({ id: columnId, direction }, index) => {
          if (hasOnlyOneSort) {
            if (direction === 'asc') {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByAscendingSingle"
                  default="Sorted ascending"
                  key={index}
                />
              );
            } else {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByDescendingSingle"
                  default="Sorted descending"
                  key={index}
                />
              );
            }
          } else if (index === 0) {
            if (direction === 'asc') {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByAscendingFirst"
                  default="Sorted by {columnId}, ascending"
                  values={{ columnId }}
                  key={index}
                />
              );
            } else {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByDescendingFirst"
                  default="Sorted by {columnId}, descending"
                  values={{ columnId }}
                  key={index}
                />
              );
            }
          } else {
            if (direction === 'asc') {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByAscendingMultiple"
                  default=", then sorted by {columnId}, ascending"
                  values={{ columnId }}
                  key={index}
                />
              );
            } else {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByDescendingMultiple"
                  default=", then sorted by {columnId}, descending"
                  values={{ columnId }}
                  key={index}
                />
              );
            }
          }
        })}
        .
      </p>
    );
  }, [
    isColumnSorted,
    hasColumnActions,
    hasOnlyOneSort,
    sorting,
    sortingAriaId,
  ]);

  return { sortingArrow, ariaSort, sortingAriaId, sortingScreenReaderText };
};
