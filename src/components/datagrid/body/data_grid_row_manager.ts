/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useRef, useCallback, useEffect, RefObject } from 'react';
import { EuiDataGridRowManager, EuiDataGridStyle } from '../data_grid_types';

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
        rowElement.dataset.gridRowIndex = String(rowIndex); // Row index from data, affected by sorting/pagination
        rowElement.dataset.gridVisibleRowIndex = String(visibleRowIndex); // Affected by sorting/pagination
        rowElement.classList.add('euiDataGridRow');
        if (rowClasses?.[rowIndex]) {
          rowElement.classList.add(rowClasses[rowIndex]);
        }
        const isOddRow = visibleRowIndex % 2 !== 0;
        if (isOddRow) rowElement.classList.add('euiDataGridRow--striped');
        rowElement.style.position = 'absolute';
        rowElement.style.left = '0';
        rowElement.style.right = '0';

        // In order for the rowElement's left and right position to correctly inherit
        // from the innerGrid width, we need to make its position relative
        innerGridRef.current!.style.position = 'relative';

        // add the element to the grid
        innerGridRef.current!.appendChild(rowElement);

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

      // Ensure that the row's dimensions are always correct by having each cell update position styles
      rowElement.style.top = top;
      rowElement.style.height = `${height}px`;

      return rowElement;
    },
    [rowClasses, innerGridRef]
  );

  // Update row classes dynamically whenever a new prop is passed in
  useEffect(() => {
    if (rowClasses) {
      rowIdToElements.current.forEach((rowElement, rowIndex) => {
        if (rowClasses[rowIndex]) {
          rowElement.classList.value = `euiDataGridRow ${rowClasses[rowIndex]}`;
        } else {
          rowElement.classList.value = 'euiDataGridRow'; // Clear any added classes
        }
      });
    }
  }, [rowClasses]);

  return { getRow };
};
