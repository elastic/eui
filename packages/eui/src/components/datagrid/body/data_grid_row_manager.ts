/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useRef, useCallback, RefObject, useMemo } from 'react';
import { useUpdateEffect } from '../../../services';

import { EuiDataGridRowManager, EuiDataGridStyle } from '../data_grid_types';

/**
 * Rows are absolutely positioned, so their DOM order doesn't affect layout.
 * It does affect text selection however, which follows DOM order - so rows
 * must be kept in visible order, not in the order they were (re-)created in
 */
const insertRowInOrder = (
  container: HTMLElement,
  rowElement: HTMLElement,
  visibleRowIndex: number
) => {
  const isRowAfter = (child: Element) =>
    child !== rowElement &&
    child.classList.contains('euiDataGridRow') &&
    (child as HTMLElement).dataset.gridVisibleRowIndex != null &&
    Number((child as HTMLElement).dataset.gridVisibleRowIndex) >
      visibleRowIndex;

  // Fast path: rows are usually created in ascending order (e.g. scrolling down),
  // so avoid scanning every rendered row when the new row belongs at the end
  const lastChild = container.lastElementChild;
  const belongsAtEnd =
    lastChild != null && lastChild !== rowElement && !isRowAfter(lastChild);

  let nextRow: Element | null = null;
  if (!belongsAtEnd) {
    for (let i = 0; i < container.children.length; i++) {
      if (isRowAfter(container.children[i])) {
        nextRow = container.children[i];
        break;
      }
    }
  }

  // Avoid moving rows that are already in place, which can drop focus or selection
  if (
    rowElement.parentNode === container &&
    rowElement.nextElementSibling === nextRow
  ) {
    return;
  }

  // Moving a connected node blurs any focused descendant, so restore it afterwards
  const focusedElement =
    rowElement.parentNode === container &&
    rowElement.contains(document.activeElement)
      ? (document.activeElement as HTMLElement)
      : null;
  container.insertBefore(rowElement, nextRow);
  focusedElement?.focus({ preventScroll: true });
};

export const useRowManager = ({
  innerGridRef,
  rowClasses,
}: {
  innerGridRef: RefObject<HTMLDivElement>;
  rowClasses?: EuiDataGridStyle['rowClasses'];
}): EuiDataGridRowManager => {
  const rowIdToElements = useRef(new Map<number, HTMLDivElement>());

  const getRow = useCallback<EuiDataGridRowManager['getRow']>(
    ({ rowIndex, visibleRowIndex, top, height }) => {
      let rowElement = rowIdToElements.current.get(rowIndex);

      if (rowElement == null) {
        rowElement = document.createElement('div');
        rowElement.setAttribute('role', 'row');
        rowElement.dataset.gridRowIndex = String(rowIndex); // Row index from data, not affected by sorting/pagination
        rowElement.classList.add('euiDataGridRow');
        if (rowClasses?.[rowIndex]) {
          rowElement.classList.add(...rowClasses[rowIndex].split(' '));
        }
        rowElement.style.position = 'absolute';
        rowElement.style.left = '0';
        rowElement.style.right = '0';

        // In order for the rowElement's left and right position to correctly inherit
        // from the innerGrid width, we need to make its position relative
        innerGridRef.current!.style.position = 'relative';

        // add the element to the row map
        rowIdToElements.current.set(rowIndex, rowElement);

        // watch the row's children, if they all disappear then remove this row
        const observer = new MutationObserver((records) => {
          if ((records[0].target as HTMLElement).childElementCount === 0) {
            observer.disconnect();
            rowElement?.remove();
            rowIdToElements.current.delete(rowIndex);
          }
        });
        observer.observe(rowElement, { childList: true });
      }

      // Ensure the row's visible row index, DOM position & striping update correctly
      // on creation, sort & pagination
      if (rowElement.dataset.gridVisibleRowIndex !== String(visibleRowIndex)) {
        rowElement.dataset.gridVisibleRowIndex = String(visibleRowIndex);
        insertRowInOrder(innerGridRef.current!, rowElement, visibleRowIndex);
        const isOddRow = visibleRowIndex % 2 !== 0;
        if (isOddRow) {
          rowElement.classList.add('euiDataGridRow--striped');
        } else {
          rowElement.classList.remove('euiDataGridRow--striped');
        }
      }

      // Ensure that the row's dimensions are always correct by having each cell update position styles
      rowElement.style.top = top;
      rowElement.style.height = `${height}px`;

      return rowElement;
    },
    [rowClasses, innerGridRef]
  );

  // Update row classes dynamically whenever a new prop is passed in
  useUpdateEffect(() => {
    if (rowClasses) {
      rowIdToElements.current.forEach((rowElement, rowIndex) => {
        const euiClasses = Array.from(rowElement.classList)
          .filter((className) =>
            ['euiDataGridRow', 'euiDataGridRow--striped'].includes(className)
          )
          .join(' ');

        if (rowClasses[rowIndex]) {
          rowElement.classList.value = `${euiClasses} ${rowClasses[rowIndex]}`;
        } else {
          rowElement.classList.value = euiClasses; // Clear any added classes
        }
      });
    }
  }, [rowClasses]);

  return useMemo(() => {
    return { getRow };
  }, [getRow]);
};
