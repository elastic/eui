/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiDataGridRowManager } from '../data_grid_types';

export const makeRowManager = (): EuiDataGridRowManager => {
  const rowIdToElements = new Map<number, HTMLDivElement>();

  let moveCellsTimeout: number | undefined;
  const cellsToMove = new Map<number, HTMLElement[]>();
  const moveCells = () => {
    const entries = cellsToMove.entries();

    let entry: [number, HTMLElement[]];
    while ((entry = entries.next().value)) {
      const [rowId, cellElements] = entry;
      let rowElement = rowIdToElements.get(rowId);

      if (rowElement == null) {
        rowElement = document.createElement('div');
        rowElement.setAttribute('role', 'row');
        rowIdToElements.set(rowId, rowElement);

        // append the row to the cells' parent
        cellElements[0].parentNode?.appendChild(rowElement);
      }

      for (let i = 0; i < cellElements.length; i++) {
        rowElement.appendChild(cellElements[i]);
      }
    }

    cellsToMove.clear();
  };

  return {
    addToRow(rowId: number, cellElement: HTMLElement) {
      if (!cellsToMove.has(rowId)) {
        cellsToMove.set(rowId, []);
      }
      cellsToMove.get(rowId)!.push(cellElement);

      if (moveCellsTimeout != null) {
        clearTimeout(moveCellsTimeout);
        moveCellsTimeout = undefined;
      }
      moveCellsTimeout = setTimeout(moveCells);
    },
    removeFromRow(rowId: number, cellElement: HTMLElement) {
      if (cellsToMove.has(rowId)) {
        // cell hasn't yet moved to a row
        const rowCells = cellsToMove.get(rowId)!;
        const cellIdx = rowCells.indexOf(cellElement);
        if (cellIdx !== -1) {
          // remove this cell from the list of cells to be process
          rowCells.splice(cellIdx, 1);
        }
        if (rowCells.length === 0) {
          cellsToMove.delete(rowId);
        }
      } else {
        // cell exists in a row, move it back & process the row change
        const rowElement = rowIdToElements.get(rowId);

        // need to move the cell back to where React rendered it so React can be happy removing it
        cellElement.parentNode?.parentNode?.appendChild(cellElement);

        if (rowElement) {
          // remove the row wrapper if it is now empty
          if (rowElement.childElementCount === 0) {
            rowElement.remove();
            rowIdToElements.delete(rowId);
          }
        }
      }
    },
  };
};
