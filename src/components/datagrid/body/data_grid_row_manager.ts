/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RefObject } from 'react';
import { EuiDataGridRowManager } from '../data_grid_types';

export const makeRowManager = (
  containerRef: RefObject<HTMLDivElement>
): EuiDataGridRowManager => {
  const rowIdToElements = new Map<number, HTMLDivElement>();

  return {
    getRow(rowIndex, top, height) {
      let rowElement = rowIdToElements.get(rowIndex);

      if (rowElement == null) {
        rowElement = document.createElement('div');
        rowElement.setAttribute('role', 'row');
        rowElement.setAttribute('data-gridrow-index', String(rowIndex));
        rowElement.classList.add('euiDataGridRow');
        rowElement.style.position = 'absolute';
        rowElement.style.left = '0';
        rowElement.style.right = '0';

        // In order for the rowElement's left and right position to correctly inherit
        // from the innerGrid width, we need to make its position relative
        containerRef.current!.style.position = 'relative';

        // add the element to the wrapping container
        containerRef.current!.appendChild(rowElement);

        // add the element to the row map
        rowIdToElements.set(rowIndex, rowElement);

        // watch the row's children, if they all disappear then remove this row
        const observer = new MutationObserver((records) => {
          if ((records[0].target as HTMLElement).childElementCount === 0) {
            observer.disconnect();
            rowElement?.remove();
            rowIdToElements.delete(rowIndex);
          }
        });
        observer.observe(rowElement, { childList: true });
      }

      // Ensure that the row's dimensions are always correct by having each cell update position styles
      rowElement.style.top = top;
      rowElement.style.height = `${height}px`;

      return rowElement;
    },
  };
};
