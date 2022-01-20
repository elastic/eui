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
        rowElement.classList.add('euiDataGridRow');
        rowElement.style.position = 'absolute';
        rowElement.style.left = '0';
        rowIdToElements.set(rowIndex, rowElement);

        // add the element to the wrapping container
        containerRef.current?.appendChild(rowElement);

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
      rowElement.style.width = containerRef.current!.style.width;

      return rowElement;
    },
  };
};
