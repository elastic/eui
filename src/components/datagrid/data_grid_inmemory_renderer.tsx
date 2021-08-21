/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  JSXElementConstructor,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { enqueueStateChange } from '../../services/react';
import { EuiMutationObserver } from '../observer/mutation_observer';
import {
  EuiDataGridCellValueElementProps,
  EuiDataGridInMemoryRendererProps,
} from './data_grid_types';

function noop() {}

function getElementText(element: HTMLElement) {
  return 'innerText' in element
    ? element.innerText
    : // (this line left here to satisfy Prettier since a ts-ignore is used on the next line)
      // @ts-ignore TypeScript thinks element.innerText always exists, however it doesn't in jest/jsdom environment
      element.textContent || undefined;
}

export const EuiDataGridInMemoryRenderer: FunctionComponent<EuiDataGridInMemoryRendererProps> = ({
  inMemory,
  columns,
  rowCount,
  renderCellValue,
  onCellRender,
}) => {
  const [documentFragment] = useState(() => document.createDocumentFragment());

  const cells = useMemo(() => {
    const CellElement = renderCellValue as JSXElementConstructor<
      EuiDataGridCellValueElementProps
    >;

    const cells = [];

    for (let i = 0; i < rowCount; i++) {
      cells.push(
        columns
          .map((column) => {
            const skipThisColumn =
              inMemory.skipColumns &&
              inMemory.skipColumns.indexOf(column.id) !== -1;

            if (skipThisColumn) {
              return null;
            }

            const isExpandable =
              column.isExpandable !== undefined ? column.isExpandable : true;

            return (
              <div
                key={`${i}-${column.id}`}
                data-dg-row={i}
                data-dg-column={column.id}
              >
                <CellElement
                  rowIndex={i}
                  columnId={column.id}
                  setCellProps={noop}
                  isExpandable={isExpandable}
                  isExpanded={false}
                  isDetails={false}
                />
              </div>
            );
          })
          .filter((cell) => cell != null)
      );
    }

    return cells;
  }, [rowCount, columns, inMemory.skipColumns, renderCellValue]);

  const onMutation = useCallback<MutationCallback>(
    (records) => {
      recordLoop: for (let i = 0; i < records.length; i++) {
        const record = records[i];
        let target: Node | null = record.target;

        while (true) {
          if (target == null) continue recordLoop; // somehow hit the document fragment
          if (
            target.nodeType === Node.ELEMENT_NODE &&
            (target as Element).hasAttribute('data-dg-row')
          ) {
            // target is the cell wrapping div
            break;
          }
          target = target.parentElement;
        }

        const cellDiv = target as HTMLDivElement;
        const rowIndex = parseInt(cellDiv.getAttribute('data-dg-row')!, 10);
        const column = cellDiv.getAttribute('data-dg-column')!;
        enqueueStateChange(() =>
          onCellRender(rowIndex, column, getElementText(cellDiv))
        );
      }
    },
    [onCellRender]
  );

  useEffect(() => {
    const cellDivs = documentFragment.childNodes[0].childNodes;
    for (let i = 0; i < cellDivs.length; i++) {
      const cellDiv = cellDivs[i] as HTMLDivElement;
      const rowIndex = parseInt(cellDiv.getAttribute('data-dg-row')!, 10);
      const column = cellDiv.getAttribute('data-dg-column')!;
      onCellRender(rowIndex, column, getElementText(cellDiv));
    }
    // changes to documentFragment.children is reflected by `cells`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCellRender, cells]);

  return createPortal(
    <EuiMutationObserver
      onMutation={onMutation}
      observerOptions={{
        characterData: true,
        subtree: true,
        attributes: true,
        childList: true,
      }}
    >
      {(ref) => <div ref={ref}>{cells}</div>}
    </EuiMutationObserver>,
    (documentFragment as unknown) as Element
  );
};
