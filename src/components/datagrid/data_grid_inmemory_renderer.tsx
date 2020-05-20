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

import React, {
  Fragment,
  FunctionComponent,
  JSXElementConstructor,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  EuiDataGridCellValueElementProps,
  EuiDataGridCellProps,
} from './data_grid_cell';
import { EuiDataGridColumn, EuiDataGridInMemory } from './data_grid_types';
import { enqueueStateChange } from '../../services/react';

export interface EuiDataGridInMemoryRendererProps {
  inMemory: EuiDataGridInMemory;
  columns: EuiDataGridColumn[];
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  onCellRender: (
    rowIndex: number,
    column: EuiDataGridColumn,
    value: string
  ) => void;
}

function noop() {}

function getElementText(element: HTMLElement) {
  return 'innerText' in element
    ? element.innerText
    : // TS thinks element.innerText always exists, however it doesn't in jest/jsdom enviornment
      // @ts-ignore-next-line
      element.textContent || undefined;
}

const ObservedCell: FunctionComponent<{
  renderCellValue: EuiDataGridInMemoryRendererProps['renderCellValue'];
  onCellRender: EuiDataGridInMemoryRendererProps['onCellRender'];
  i: number;
  column: EuiDataGridColumn;
  isExpandable: boolean;
}> = ({ renderCellValue, i, column, onCellRender, isExpandable }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>();

  useEffect(() => {
    if (ref) {
      // this is part of React's component lifecycle, onCellRender->setState are automatically batched
      onCellRender(i, column, getElementText(ref));
      const observer = new MutationObserver(() => {
        // onMutation callbacks aren't in the component lifecycle, intentionally batch any effects
        enqueueStateChange(
          onCellRender.bind(null, i, column, getElementText(ref))
        );
      });
      observer.observe(ref, {
        characterData: true,
        subtree: true,
        attributes: true,
        childList: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [column, i, onCellRender, ref]);

  const CellElement = renderCellValue as JSXElementConstructor<
    EuiDataGridCellValueElementProps
  >;

  return (
    <div ref={setRef}>
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
};

export const EuiDataGridInMemoryRenderer: FunctionComponent<
  EuiDataGridInMemoryRendererProps
> = ({ inMemory, columns, rowCount, renderCellValue, onCellRender }) => {
  const [documentFragment] = useState(() => document.createDocumentFragment());

  const rows = useMemo(() => {
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <Fragment key={i}>
          {columns
            .map(column => {
              const skipThisColumn =
                inMemory.skipColumns &&
                inMemory.skipColumns.indexOf(column.id) !== -1;

              if (skipThisColumn) {
                return null;
              }

              const isExpandable =
                column.isExpandable !== undefined ? column.isExpandable : true;

              return (
                <ObservedCell
                  key={column.id}
                  i={i}
                  renderCellValue={renderCellValue}
                  column={column}
                  onCellRender={onCellRender}
                  isExpandable={isExpandable}
                />
              );
            })
            .filter(cell => cell != null)}
        </Fragment>
      );
    }

    return rows;
  }, [rowCount, columns, inMemory.skipColumns, renderCellValue, onCellRender]);

  return createPortal(
    <Fragment>{rows}</Fragment>,
    (documentFragment as unknown) as Element
  );
};
