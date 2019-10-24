import React, {
  Fragment,
  FunctionComponent,
  JSXElementConstructor,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import {
  EuiDataGridCellValueElementProps,
  EuiDataGridCellProps,
} from './data_grid_cell';
import { EuiDataGridColumn, EuiDataGridInMemory } from './data_grid_types';

interface EuiDataGridInMemoryRendererProps {
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

const _queue: Function[] = [];

function processQueue() {
  // the queued functions trigger react setStates which, if unbatched,
  // each cause a full update->render->dom pass _per function_
  // instead, tell React to wait until all updates are finished before re-rendering
  unstable_batchedUpdates(() => {
    for (let i = 0; i < _queue.length; i++) {
      _queue[i]();
    }
    _queue.length = 0;
  });
}

function enqueue(fn: Function) {
  if (_queue.length === 0) {
    setTimeout(processQueue);
  }
  _queue.push(fn);
}

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
        enqueue(onCellRender.bind(null, i, column, getElementText(ref)));
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
  }, [ref]);

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
  }, [columns, rowCount, renderCellValue, onCellRender]);

  return createPortal(
    <Fragment>{rows}</Fragment>,
    (documentFragment as unknown) as Element
  );
};
