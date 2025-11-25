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
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { enqueueStateChange } from '../../../services/react';
import { EuiMutationObserver } from '../../observer/mutation_observer';
import {
  EuiDataGridInMemory,
  EuiDataGridInMemoryValues,
  EuiDataGridInMemoryRendererProps,
  EuiDataGridCellValueElementProps,
} from '../data_grid_types';

/**
 * inMemory values hook
 */
export const useInMemoryValues = (
  inMemory: EuiDataGridInMemory | undefined,
  rowCount: number
): [
  EuiDataGridInMemoryValues,
  EuiDataGridInMemoryRendererProps['onCellRender']
] => {
  /**
   * For performance, `onCellRender` below mutates the inMemoryValues object
   * instead of cloning. If this operation were done in a setState call
   * React would ignore the update as the object itself has not changed.
   * So, we keep a dual record: the in-memory values themselves and a "version" counter.
   * When the object is mutated, the version is incremented triggering a re-render, and
   * the returned `inMemoryValues` object is re-created (cloned) from the mutated version.
   * The version updates are batched, so only one clone happens per batch.
   **/
  const _inMemoryValues = useRef<EuiDataGridInMemoryValues>({});
  const [inMemoryValuesVersion, setInMemoryValuesVersion] = useState(0);

  const inMemoryValues = useMemo<EuiDataGridInMemoryValues>(
    () => ({ ..._inMemoryValues.current }),
    [inMemoryValuesVersion] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const onCellRender = useCallback<
    EuiDataGridInMemoryRendererProps['onCellRender']
  >((rowIndex, columnId, value) => {
    const nextInMemoryValues = _inMemoryValues.current;
    nextInMemoryValues[rowIndex] = nextInMemoryValues[rowIndex] || {};
    if (nextInMemoryValues[rowIndex][columnId] !== value) {
      nextInMemoryValues[rowIndex][columnId] = value;
      setInMemoryValuesVersion((version) => version + 1);
    }
  }, []);

  // if `inMemory.level` or `rowCount` changes reset the values
  const inMemoryLevel = inMemory && inMemory.level;
  const resetRunCount = useRef(0);
  useEffect(() => {
    if (resetRunCount.current++ > 0) {
      // this has to delete "overflow" keys from the object instead of resetting to an empty one,
      // as the internal inmemoryrenderer component's useEffect which sets the values
      // executes before this outer, wrapping useEffect
      const existingRowKeyCount = Object.keys(_inMemoryValues.current).length;
      for (let i = rowCount; i < existingRowKeyCount; i++) {
        delete _inMemoryValues.current[i];
      }
      setInMemoryValuesVersion((version) => version + 1);
    }
  }, [inMemoryLevel, rowCount]);

  return [inMemoryValues, onCellRender];
};

/**
 * InMemory renderer
 */
export const EuiDataGridInMemoryRenderer: FunctionComponent<
  EuiDataGridInMemoryRendererProps
> = ({ inMemory, columns, rowCount, renderCellValue, onCellRender }) => {
  const [documentFragment] = useState(() => document.createDocumentFragment());

  const cells = useMemo(() => {
    const CellElement =
      renderCellValue as JSXElementConstructor<EuiDataGridCellValueElementProps>;

    const cells = [];

    for (let i = 0; i < rowCount; i++) {
      cells.push(
        columns
          .map((column, j) => {
            const key = `${i}-${j}-${column.id}`;
            const skipThisColumn =
              inMemory.skipColumns &&
              inMemory.skipColumns.indexOf(column.id) !== -1;

            if (skipThisColumn) {
              return null;
            }

            const isExpandable =
              column.isExpandable !== undefined ? column.isExpandable : true;

            return (
              <div key={key} data-dg-row={i} data-dg-column={column.id}>
                <CellElement
                  rowIndex={i}
                  colIndex={j}
                  columnId={column.id}
                  setCellProps={noop}
                  schema={column.schema}
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
    documentFragment as unknown as Element
  );
};

function noop() {}

function getElementText(element: HTMLElement) {
  return 'innerText' in element
    ? element.innerText
    : // (this line left here to satisfy Prettier since a ts-ignore is used on the next line)
      // @ts-ignore TypeScript thinks element.innerText always exists, however it doesn't in jest/jsdom environment
      element.textContent || '';
}
