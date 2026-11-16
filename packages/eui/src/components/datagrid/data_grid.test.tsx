/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, useEffect, useState } from 'react';
import { act, fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { getAllByTestSubject, render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { keys } from '../../services';

import type { EuiDataGridProps, RenderCellValue } from './data_grid_types';
import { EuiDataGrid } from './';

// Mock the cell popover (TODO: Move failing tests to Cypress and remove need for mock?)
jest.mock('../popover', () => ({
  ...jest.requireActual('../popover'),
  EuiWrappingPopover: ({ children }: { children: React.ReactNode }) => (
    <div data-test-subj="euiDataGridExpansionPopover">{children}</div>
  ),
}));

// Keyboard dragging doesn't reorder columns in a fully rendered grid under
// jsdom, so capture `onDragEnd` handlers (keyed by the child droppable's id)
// to be called directly
const mockOnDragEndHandlers: { [droppableId: string]: Function } = {};
jest.mock('../drag_and_drop', () => {
  const actual = jest.requireActual('../drag_and_drop');
  return {
    ...actual,
    EuiDragDropContext: (props: any) => {
      const droppableId = props.children?.props?.droppableId;
      if (droppableId) mockOnDragEndHandlers[droppableId] = props.onDragEnd;
      return <actual.EuiDragDropContext {...props} />;
    },
  };
});

const renderDataGrid = (element: ReactElement<EuiDataGridProps>) => {
  let currentProps = element.props;
  const result = render(<EuiDataGrid {...currentProps} />);

  // Mimics Enzyme's `setProps`, which merges into the current props
  const setProps = (nextProps: Partial<EuiDataGridProps>) => {
    currentProps = { ...currentProps, ...nextProps } as EuiDataGridProps;
    result.rerender(<EuiDataGrid {...currentProps} />);
  };

  return { ...result, setProps, getProps: () => currentProps };
};

function getFocusableCell(element: HTMLElement) {
  const headerCell = element.querySelector<HTMLElement>(
    '[role="columnheader"][tabindex="0"]'
  );

  const rowCell = getAllByTestSubject(element, 'dataGridRowCell').find(
    (el) => el.getAttribute('tabindex') === '0'
  );

  return headerCell ?? rowCell;
}

const getHeaderCells = (element: HTMLElement) =>
  Array.from(
    element.querySelectorAll<HTMLElement>(
      '[data-test-subj|="dataGridHeaderCell"]'
    )
  );

const getRowCells = (element: HTMLElement) =>
  Array.from(
    element.querySelectorAll<HTMLElement>('[data-test-subj~="dataGridRowCell"]')
  );

const getCellContentText = (cell: Element) =>
  cell.querySelector('[data-datagrid-cellcontent]')?.textContent ?? '';

function extractGridData(element: HTMLElement) {
  const rows: string[][] = [];

  const headerCells = getHeaderCells(element);
  rows.push(
    headerCells.map(
      (cell) =>
        cell.querySelector('div.euiDataGridHeaderCell__content')?.textContent ??
        ''
    )
  );

  // reduce the virtualized grid of cells into rows
  const columnCount = headerCells.length;
  const gridCells = getRowCells(element);
  const visibleRowsCount = gridCells.length / columnCount;
  for (let i = 0; i < visibleRowsCount; i++) {
    const rowContent: string[] = [];
    for (let j = i * columnCount; j < (i + 1) * columnCount; j++) {
      rowContent.push(getCellContentText(gridCells[j]));
    }
    rows.push(rowContent);
  }

  return rows;
}

function extractRowHeights(element: HTMLElement) {
  return getRowCells(element).reduce(
    (heights: { [key: string]: number }, cell) => {
      const rowIndex = cell.getAttribute('data-gridcell-row-index')!;
      heights[rowIndex] = parseFloat(cell.style.height);
      return heights;
    },
    {}
  );
}

function extractColumnWidths(element: HTMLElement) {
  return getHeaderCells(element).reduce(
    (widths: { [key: string]: number }, cell) => {
      const [, columnId] = cell
        .getAttribute('data-test-subj')!
        .match(/dataGridHeaderCell-(.*)/)!;
      widths[columnId] = parseFloat(cell.style.width);
      return widths;
    },
    {}
  );
}

const getColumnResizer = (element: HTMLElement, columnId: string) =>
  element.querySelector<HTMLElement>(
    `[data-test-subj="dataGridHeaderCell-${columnId}"] [data-test-subj="dataGridColumnResizer"]`
  );

function resizeColumn(
  element: HTMLElement,
  columnId: string,
  columnWidth: number
) {
  const widths = extractColumnWidths(element);
  const originalWidth = widths[columnId];

  // jsdom derives `pageX` from `clientX`
  fireEvent.mouseDown(getColumnResizer(element, columnId)!, {
    clientX: originalWidth,
  });
  // `mousemove` and `mouseup` are bound to `window`
  fireEvent.mouseMove(window, { clientX: columnWidth });
  fireEvent.mouseUp(window);
}

const getButton = (element: HTMLElement, dataTestSubj: string) =>
  element.querySelector<HTMLButtonElement>(
    `button[data-test-subj="${dataTestSubj}"]`
  );

const expectPopoverOpen = (trigger: HTMLElement, isOpen: boolean) =>
  expect(trigger).toHaveAttribute('aria-expanded', String(isOpen));

const getOpenPopoverPanels = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-popover-open]'));

/**
 * Clicks a popover's trigger button, asserting the popover's open state
 * before and after. Returns the newly opened popover panel when opening.
 */
function togglePopover(
  element: HTMLElement,
  triggerTestSubj: string,
  isOpening: boolean
) {
  const trigger = getButton(element, triggerTestSubj)!;
  expectPopoverOpen(trigger, !isOpening);
  // generated ids are mocked in tests, so `aria-controls` can't identify the panel
  const previouslyOpenPanels = getOpenPopoverPanels();

  fireEvent.click(trigger);

  expectPopoverOpen(trigger, isOpening);
  return getOpenPopoverPanels().find(
    (panel) => !previouslyOpenPanels.includes(panel)
  );
}

// Merges adjacent text nodes, matching the serialization of the
// previously used `.render()` snapshots
const getSnapshotNode = (node: Node) => {
  const clone = node.cloneNode(true);
  clone.normalize();
  return clone;
};

// The selection popover is nested in the portalled sorting popover,
// so it lives outside of the render container
const openColumnSorterSelection = (element: HTMLElement) =>
  togglePopover(
    element.ownerDocument.body,
    'dataGridColumnSortingSelectionButton',
    true
  )!;

function closeColumnSorterSelection(element: HTMLElement) {
  const { body } = element.ownerDocument;
  // popover will go away if all of the columns are selected
  if (getButton(body, 'dataGridColumnSortingSelectionButton')) {
    togglePopover(body, 'dataGridColumnSortingSelectionButton', false);
  }
}

function getColumnSortDirection(
  element: HTMLElement,
  columnId: string
): [HTMLElement, string] {
  const getColumnSorter = () =>
    document.querySelector<HTMLElement>(
      `div[data-test-subj="euiDataGridColumnSorting-sortColumn-${columnId}"]`
    );

  // get the button that sorts by this column
  let columnSorter = getColumnSorter();
  if (!columnSorter) {
    // need to enable this column
    openColumnSorterSelection(element);

    // find button to enable this column and click it
    const selectColumnButton = getButton(
      document.body,
      `dataGridColumnSortingPopoverColumnSelection-${columnId}`
    );
    expect(selectColumnButton).toBeInTheDocument();
    fireEvent.click(selectColumnButton!);

    // close column selection popover
    closeColumnSorterSelection(element);

    // find the column sorter
    columnSorter = getColumnSorter();
  }

  expect(columnSorter).toBeInTheDocument();
  const activeSort = columnSorter!.querySelector(
    'button[aria-pressed="true"]'
  )!;

  const sortDirection = activeSort
    .getAttribute('data-test-subj')!
    .match(/(?<direction>[^-]+)$/)!.groups!.direction;

  return [columnSorter!, sortDirection];
}

const openColumnSorter = (element: HTMLElement) =>
  togglePopover(element, 'dataGridColumnSortingButton', true)!;

const closeColumnSorter = (element: HTMLElement) =>
  togglePopover(element, 'dataGridColumnSortingButton', false);

function sortByColumn(
  element: HTMLElement,
  columnId: string,
  direction: 'asc' | 'desc' | 'off'
) {
  openColumnSorter(element);

  const [columnSorter, currentSortDirection] = getColumnSortDirection(
    element,
    columnId
  );

  if (currentSortDirection !== direction) {
    const sortButton = getButton(
      columnSorter,
      `euiDataGridColumnSorting-sortColumn-${columnId}-${direction}`
    );
    expect(sortButton).toBeInTheDocument();
    fireEvent.click(sortButton!);
  }

  closeColumnSorter(element);
}

const openColumnSelector = (element: HTMLElement) =>
  togglePopover(element, 'dataGridColumnSelectorButton', true)!;

const closeColumnSelector = (element: HTMLElement) =>
  togglePopover(element, 'dataGridColumnSelectorButton', false);

function setColumnVisibility(
  element: HTMLElement,
  columnId: string,
  isVisible: boolean
) {
  const popover = openColumnSelector(element);

  // toggle column's visibility switch
  const columnSwitch = popover.querySelector<HTMLButtonElement>(
    `[role="switch"][name="${columnId}"]`
  )!;
  if (columnSwitch.getAttribute('aria-checked') !== `${isVisible}`) {
    fireEvent.click(columnSwitch);
  }

  closeColumnSelector(element);
}

const renderCellValueRowAndColumnCount: RenderCellValue = ({
  rowIndex,
  columnId,
}) => `${rowIndex}, ${columnId}`;

const renderCellBasedOnColumnId: RenderCellValue = ({ columnId }) => {
  if (columnId === 'A') {
    return 5.5;
  } else if (columnId === 'B') {
    return 'true';
  } else {
    return 'asdf';
  }
};

const renderCellRowAsValue: RenderCellValue = ({ rowIndex }) => rowIndex;

const renderCellValueALowBHigh: RenderCellValue = ({ rowIndex, columnId }) =>
  // render A as 0, 1, 0, 1, 0 and B as 9->5
  columnId === 'A' ? rowIndex % 2 : 9 - rowIndex;

function moveColumnToIndex(
  element: HTMLElement,
  columnId: string,
  nextIndex: number
) {
  // open datagrid column options
  openColumnSelector(element);

  const [initialColumnOrder] = extractGridData(element);
  const initialColumnIndex = initialColumnOrder.indexOf(columnId);
  expect(initialColumnIndex).not.toBe(-1);

  // "drag" column into new location
  const onDragEnd = mockOnDragEndHandlers.columnOrder;
  expect(onDragEnd).toBeDefined();
  act(() =>
    onDragEnd({
      source: { index: initialColumnIndex },
      destination: { index: nextIndex },
    })
  );

  // close popover
  closeColumnSelector(element);
}

describe('EuiDataGrid', () => {
  afterEach(() => {
    Object.keys(mockOnDragEndHandlers).forEach(
      (droppableId) => delete mockOnDragEndHandlers[droppableId]
    );
  });

  // Mock requestAnimationFrame to run immediately
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation((cb: any) => cb());

  shouldRenderCustomStyles(
    <EuiDataGrid
      aria-label=""
      columns={[]}
      columnVisibility={{ visibleColumns: [], setVisibleColumns: () => {} }}
      rowCount={0}
      renderCellValue={() => null}
    />
  );

  describe('rendering', () => {
    const getBoundingClientRect =
      window.Element.prototype.getBoundingClientRect;
    beforeAll(() => {
      window.Element.prototype.getBoundingClientRect = () =>
        ({ width: 100, height: 100 } as DOMRect);
    });
    afterAll(() => {
      window.Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it('renders with common and div attributes', () => {
      const { container } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('renders custom column headers', () => {
      const { container } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[
            { id: 'A', display: 'Column A' },
            { id: 'B', display: <div>More Elements</div> },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('renders and applies custom props', () => {
      const RenderCellValueSetCellProps: RenderCellValue = ({
        rowIndex,
        columnId,
        setCellProps,
      }) => {
        useEffect(() => {
          setCellProps({
            className: 'customClass',
            'data-test-subj': `cell-${rowIndex}-${columnId}`,
            style: { color: columnId === 'A' ? 'red' : 'blue' },
          });
        }, [columnId, rowIndex, setCellProps]);

        return `${rowIndex}, ${columnId}`;
      };

      const { container, getByTestSubject } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={RenderCellValueSetCellProps}
        />
      );

      expect(container.querySelectorAll('.customClass')).toHaveLength(4);
      expect(getByTestSubject('dataGridRowCell cell-0-A')).toHaveStyle(
        'color: rgb(255, 0, 0)'
      );
      expect(getByTestSubject('dataGridRowCell cell-1-B')).toHaveStyle(
        'color: rgb(0, 0, 255)'
      );
    });

    it('renders additional toolbar controls', () => {
      const { container } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={renderCellValueRowAndColumnCount}
          toolbarVisibility={{ additionalControls: <button>Button</button> }}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('renders control columns', () => {
      const { container } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          leadingControlColumns={[
            {
              id: 'leading',
              width: 50,
              headerCellRender: () => <span>leading heading</span>,
              headerCellProps: { className: 'leadingControlCol' },
              rowCellRender: renderCellRowAsValue,
            },
          ]}
          trailingControlColumns={[
            {
              id: 'trailing',
              width: 50,
              headerCellRender: () => <span>trailing heading</span>,
              headerCellProps: { className: 'trailingControlCol' },
              rowCellRender: renderCellRowAsValue,
            },
          ]}
          rowCount={3}
          renderCellValue={renderCellValueRowAndColumnCount}
          toolbarVisibility={{ additionalControls: <button>Button</button> }}
        />
      );

      expect(container).toMatchSnapshot();
      expect(container.querySelector('.leadingControlCol')).toBeInTheDocument();
      expect(
        container.querySelector('.trailingControlCol')
      ).toBeInTheDocument();
    });

    it('can hide the toolbar', () => {
      const { queryAllByTestSubject, setProps } = renderDataGrid(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          toolbarVisibility={false}
          rowCount={1}
          renderCellValue={() => 'value'}
        />
      );

      // The toolbar should not show
      expect(queryAllByTestSubject('dataGridControls')).toHaveLength(0);

      // Check for false / true and unset values
      setProps({
        toolbarVisibility: {
          showFullScreenSelector: false,
          showSortSelector: false,
          showDisplaySelector: true,
        },
      });

      // fullscreen selector
      expect(queryAllByTestSubject('dataGridFullScreenButton')).toHaveLength(0);

      // sort selector
      expect(queryAllByTestSubject('dataGridColumnSortingButton')).toHaveLength(
        0
      );

      // style selector
      expect(
        queryAllByTestSubject('dataGridDisplaySelectorButton')
      ).toHaveLength(1);

      // column selector
      expect(
        queryAllByTestSubject('dataGridColumnSelectorButton')
      ).toHaveLength(1);
    });

    describe('schema classnames', () => {
      const getCell = (id: string) =>
        document.querySelector(
          `.euiDataGridRowCell[data-gridcell-column-id="${id}"]`
        );

      it('applies classnames from explicit schemas', () => {
        render(
          <EuiDataGrid
            {...requiredProps}
            columns={[
              { id: 'A', schema: 'numeric' },
              { id: 'B', schema: 'customFormatName' },
            ]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={1}
            renderCellValue={renderCellValueRowAndColumnCount}
          />
        );

        expect(getCell('A')).toHaveClass('euiDataGridRowCell--numeric');
        expect(getCell('B')).toHaveClass(
          'euiDataGridRowCell--customFormatName'
        );
      });

      it('automatically detects column types and applies classnames', () => {
        render(
          <EuiDataGrid
            {...requiredProps}
            columns={[{ id: 'A' }, { id: 'B' }, { id: 'C' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B', 'C'],
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={2}
            renderCellValue={renderCellBasedOnColumnId}
          />
        );
        expect(getCell('A')).toHaveClass('euiDataGridRowCell--numeric');
        expect(getCell('B')).toHaveClass('euiDataGridRowCell--boolean');
        expect(getCell('C')).not.toHaveClass(
          'euiDataGridRowCell--numeric euiDataGridRowCell--boolean'
        );
      });

      it('overrides automatically detected column types with supplied schema', () => {
        render(
          <EuiDataGrid
            {...requiredProps}
            columns={[{ id: 'A' }, { id: 'B', schema: 'alphanumeric' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={2}
            renderCellValue={renderCellBasedOnColumnId}
          />
        );
        expect(getCell('A')).toHaveClass('euiDataGridRowCell--numeric');
        expect(getCell('B')).toHaveClass('euiDataGridRowCell--alphanumeric');
      });

      it('detects all of the supported types', () => {
        const values: { [key: string]: string } = {
          A: '-5.80',
          B: 'false',
          C: '$-5.80',
          D: '2019-09-18T12:31:28',
          E: '2019-09-18T12:31:28Z',
          F: '2019-09-18T12:31:28.234',
          G: '2019-09-18T12:31:28.234+0300',
        };
        const renderCellValue: RenderCellValue = ({ columnId }) =>
          values[columnId];
        render(
          <EuiDataGrid
            {...requiredProps}
            columns={Object.keys(values).map((id) => ({ id }))}
            columnVisibility={{
              visibleColumns: Object.keys(values),
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={1}
            renderCellValue={renderCellValue}
          />
        );

        expect(getCell('A')).toHaveClass('euiDataGridRowCell--numeric');
        expect(getCell('B')).toHaveClass('euiDataGridRowCell--boolean');
        expect(getCell('C')).toHaveClass('euiDataGridRowCell--currency');
        expect(getCell('D')).toHaveClass('euiDataGridRowCell--datetime');
        expect(getCell('E')).toHaveClass('euiDataGridRowCell--datetime');
        expect(getCell('F')).toHaveClass('euiDataGridRowCell--datetime');
        expect(getCell('G')).toHaveClass('euiDataGridRowCell--datetime');
      });

      it('accepts extra detectors', () => {
        const values: { [key: string]: string } = {
          A: '-5.80',
          B: '127.0.0.1',
        };
        const renderCellValue: RenderCellValue = ({ columnId }) =>
          values[columnId];
        render(
          <EuiDataGrid
            {...requiredProps}
            columns={Object.keys(values).map((id) => ({ id }))}
            columnVisibility={{
              visibleColumns: Object.keys(values),
              setVisibleColumns: () => {},
            }}
            schemaDetectors={[
              {
                type: 'ipaddress',
                detector(value: string) {
                  return value.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
                    ? 1
                    : 0;
                },
                icon: 'warning',
                color: 'primary',
                sortTextAsc: 'a-z',
                sortTextDesc: 'z-a',
              },
            ]}
            inMemory={{ level: 'pagination' }}
            rowCount={1}
            renderCellValue={renderCellValue}
          />
        );

        expect(getCell('A')).toHaveClass('euiDataGridRowCell--numeric');
        expect(getCell('B')).toHaveClass('euiDataGridRowCell--ipaddress');
      });
    });
  });

  describe('cell rendering', () => {
    it('supports hooks', () => {
      const RenderCellValueWithHooks: RenderCellValue = ({
        rowIndex,
        columnId,
      }) => {
        const [value] = useState(`Hello, Row ${rowIndex}-${columnId}!`);
        return <span>{value}</span>;
      };
      const { container } = render(
        <EuiDataGrid
          aria-label="test"
          columns={[{ id: 'Column 1' }, { id: 'Column 2' }]}
          columnVisibility={{
            visibleColumns: ['Column 1', 'Column 2'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={RenderCellValueWithHooks}
        />
      );
      expect(extractGridData(container)).toMatchInlineSnapshot(`
        [
          [
            "Column 1",
            "Column 2",
          ],
          [
            "Hello, Row 0-Column 1!",
            "Hello, Row 0-Column 2!",
          ],
          [
            "Hello, Row 1-Column 1!",
            "Hello, Row 1-Column 2!",
          ],
        ]
      `);
    });

    it('passes `cellContext` as props to the renderCellValue component', () => {
      const dataGridProps = {
        'aria-label': 'test',
        columns: [{ id: 'Column' }],
        columnVisibility: {
          visibleColumns: ['Column'],
          setVisibleColumns: () => {},
        },
        rowCount: 1,
      };

      const RenderCellValueWithContext: RenderCellValue = ({ someContext }) => (
        <div data-test-subj="renderedCell">
          {someContext ? 'hello' : 'world'}
        </div>
      );

      const { getByTestSubject, rerender } = render(
        <EuiDataGrid
          {...dataGridProps}
          renderCellValue={RenderCellValueWithContext}
          cellContext={{ someContext: true }}
        />
      );
      expect(getByTestSubject('renderedCell')).toHaveTextContent('hello');

      rerender(
        <EuiDataGrid
          {...dataGridProps}
          renderCellValue={RenderCellValueWithContext}
          cellContext={{ someContext: false }}
        />
      );
      expect(getByTestSubject('renderedCell')).toHaveTextContent('world');
    });
  });

  describe('pagination', () => {
    it('renders', () => {
      const { container } = render(
        <EuiDataGrid
          aria-label="test grid"
          columns={[{ id: 'Column' }]}
          columnVisibility={{
            visibleColumns: ['Column'],
            setVisibleColumns: () => {},
          }}
          rowCount={10}
          renderCellValue={renderCellRowAsValue}
          pagination={{
            pageIndex: 1,
            pageSize: 6,
            pageSizeOptions: [3, 6, 10],
            onChangePage: () => {},
            onChangeItemsPerPage: () => {},
          }}
        />
      );

      expect(
        getSnapshotNode(
          container.querySelector('.euiDataGrid__pagination')!.firstChild!
        )
      ).toMatchSnapshot();
    });

    describe('page navigation', () => {
      it('next button pages through content', () => {
        const onChangePage = jest.fn((pageIndex: number) => {
          setProps({
            pagination: { ...getProps().pagination!, pageIndex },
          });
        });
        const { container, getByTestSubject, setProps, getProps } =
          renderDataGrid(
            <EuiDataGrid
              aria-label="test grid"
              columns={[{ id: 'Column' }]}
              columnVisibility={{
                visibleColumns: ['Column'],
                setVisibleColumns: () => {},
              }}
              rowCount={8}
              renderCellValue={renderCellRowAsValue}
              pagination={{
                pageIndex: 0,
                pageSize: 3,
                pageSizeOptions: [3, 6, 10],
                onChangePage,
                onChangeItemsPerPage: jest.fn(),
              }}
            />
          );

        expect(extractGridData(container)).toEqual([
          ['Column'],
          ['0'],
          ['1'],
          ['2'],
        ]);

        fireEvent.click(getByTestSubject('pagination-button-next'));

        expect(getProps().pagination!.onChangePage).toHaveBeenCalledTimes(1);
        const firstCallPageIndex = onChangePage.mock.calls[0][0];
        expect(firstCallPageIndex).toBe(1);

        expect(extractGridData(container)).toEqual([
          ['Column'],
          ['3'],
          ['4'],
          ['5'],
        ]);

        fireEvent.click(getByTestSubject('pagination-button-next'));

        expect(getProps().pagination!.onChangePage).toHaveBeenCalledTimes(2);
        const secondCallPageIndex = onChangePage.mock.calls[1][0];
        expect(secondCallPageIndex).toBe(2);

        expect(extractGridData(container)).toEqual([['Column'], ['6'], ['7']]);
      });

      it('pages are navigable through page links', () => {
        const onChangePage = jest.fn((pageIndex: number) => {
          setProps({
            pagination: { ...getProps().pagination!, pageIndex },
          });
        });
        const { container, getByTestSubject, setProps, getProps } =
          renderDataGrid(
            <EuiDataGrid
              aria-label="test grid"
              columns={[{ id: 'Column' }]}
              columnVisibility={{
                visibleColumns: ['Column'],
                setVisibleColumns: () => {},
              }}
              rowCount={8}
              renderCellValue={renderCellRowAsValue}
              pagination={{
                pageIndex: 0,
                pageSize: 3,
                pageSizeOptions: [3, 6, 10],
                onChangePage,
                onChangeItemsPerPage: jest.fn(),
              }}
            />
          );

        expect(extractGridData(container)).toEqual([
          ['Column'],
          ['0'],
          ['1'],
          ['2'],
        ]);

        // goto page 3
        fireEvent.click(getByTestSubject('pagination-button-2'));

        expect(getProps().pagination!.onChangePage).toHaveBeenCalledTimes(1);
        const firstCallPageIndex = onChangePage.mock.calls[0][0];
        expect(firstCallPageIndex).toBe(2);

        expect(extractGridData(container)).toEqual([['Column'], ['6'], ['7']]);

        // goto page 2
        fireEvent.click(getByTestSubject('pagination-button-1'));

        expect(getProps().pagination!.onChangePage).toHaveBeenCalledTimes(2);
        const secondCallPageIndex = onChangePage.mock.calls[1][0];
        expect(secondCallPageIndex).toBe(1);

        expect(extractGridData(container)).toEqual([
          ['Column'],
          ['3'],
          ['4'],
          ['5'],
        ]);
      });
    });

    it('changes the page size', () => {
      const onChangeItemsPerPage = jest.fn((pageSize: number) => {
        setProps({
          pagination: { ...getProps().pagination!, pageSize },
        });
      });
      const { container, getByTestSubject, setProps, getProps } =
        renderDataGrid(
          <EuiDataGrid
            aria-label="test grid"
            columns={[{ id: 'Column' }]}
            columnVisibility={{
              visibleColumns: ['Column'],
              setVisibleColumns: () => {},
            }}
            rowCount={8}
            renderCellValue={renderCellRowAsValue}
            pagination={{
              pageIndex: 0,
              pageSize: 3,
              pageSizeOptions: [3, 6, 10],
              onChangePage: jest.fn(),
              onChangeItemsPerPage,
            }}
          />
        );

      expect(extractGridData(container)).toEqual([
        ['Column'],
        ['0'],
        ['1'],
        ['2'],
      ]);

      fireEvent.click(getByTestSubject('tablePaginationPopoverButton'));

      const rowButtons: NodeListOf<HTMLButtonElement> =
        document.body.querySelectorAll('.euiContextMenuItem');
      expect(
        Array.prototype.map.call(
          rowButtons,
          (button: HTMLDivElement) => button.textContent || ''
        )
      ).toEqual(['3 rows', '6 rows', '10 rows']);

      fireEvent.click(rowButtons[1]);

      expect(getProps().pagination!.onChangeItemsPerPage).toHaveBeenCalledTimes(
        1
      );
      const firstCallPageIndex = onChangeItemsPerPage.mock.calls[0][0];
      expect(firstCallPageIndex).toBe(6);

      expect(extractGridData(container)).toEqual([
        ['Column'],
        ['0'],
        ['1'],
        ['2'],
        ['3'],
        ['4'],
        ['5'],
      ]);
    });
  });

  describe('column sizing', () => {
    it('uses a columns initialWidth', () => {
      const { container } = render(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'Column 1', initialWidth: 400 }, { id: 'Column 2' }]}
          columnVisibility={{
            visibleColumns: ['Column 1', 'Column 2'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={() => 'value'}
        />
      );

      const originalCellWidths = extractColumnWidths(container);
      expect(originalCellWidths).toEqual({
        'Column 1': 400,
        'Column 2': 100,
      });
    });

    describe('resizing', () => {
      it('resizes a column by grab handles', () => {
        const { container } = render(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'Column 1' }, { id: 'Column 2' }]}
            columnVisibility={{
              visibleColumns: ['Column 1', 'Column 2'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={() => 'value'}
          />
        );

        expect(extractColumnWidths(container)).toEqual({
          'Column 1': 100,
          'Column 2': 100,
        });

        resizeColumn(container, 'Column 1', 150);

        expect(extractColumnWidths(container)).toEqual({
          'Column 1': 150,
          'Column 2': 100,
        });
      });

      it('should listen for column resize', () => {
        const onColumnResizeCallback = jest.fn();
        const { container } = render(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'Column 1' }, { id: 'Column 2', initialWidth: 75 }]}
            columnVisibility={{
              visibleColumns: ['Column 1', 'Column 2'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={() => 'value'}
            onColumnResize={(args) => onColumnResizeCallback(args)}
          />
        );

        resizeColumn(container, 'Column 1', 150);
        resizeColumn(container, 'Column 2', 100);

        expect(onColumnResizeCallback.mock.calls.length).toBe(2);
        expect(onColumnResizeCallback.mock.calls[0][0]).toEqual({
          columnId: 'Column 1',
          width: 150,
        });
        expect(onColumnResizeCallback.mock.calls[1][0]).toEqual({
          columnId: 'Column 2',
          width: 100,
        });
      });

      it('is prevented by isResizable:false', () => {
        const { container } = render(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[
              { id: 'Column 1', isResizable: false },
              { id: 'Column 2' },
            ]}
            columnVisibility={{
              visibleColumns: ['Column 1', 'Column 2'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={() => 'value'}
          />
        );

        const originalCellWidths = extractColumnWidths(container);
        expect(originalCellWidths).toEqual({
          'Column 1': 100,
          'Column 2': 100,
        });

        // verify there is no resizer on Column 1 but that there is on Column 2
        expect(getColumnResizer(container, 'Column 1')).not.toBeInTheDocument();
        expect(getColumnResizer(container, 'Column 2')).toBeInTheDocument();
      });

      it('does not trigger value re-renders', () => {
        const renderCellValue = jest.fn(() => 'value');

        const { container } = render(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'ColumnA' }]}
            columnVisibility={{
              visibleColumns: ['ColumnA'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={renderCellValue}
          />
        );

        expect(renderCellValue).toHaveBeenCalledTimes(3);
        renderCellValue.mockClear();

        resizeColumn(container, 'ColumnA', 200);

        expect(extractColumnWidths(container)).toEqual({ ColumnA: 200 });
        expect(renderCellValue).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('column options', () => {
    it('column visibility can be toggled', () => {
      const columnVisibility = {
        visibleColumns: ['ColumnA', 'ColumnB'],
        setVisibleColumns: (visibleColumns: string[]) => {
          columnVisibility.visibleColumns = visibleColumns;
          setProps({ columnVisibility });
        },
      };

      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
          columnVisibility={columnVisibility}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      expect(extractGridData(container)).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0, ColumnA', '0, ColumnB'],
        ['1, ColumnA', '1, ColumnB'],
      ]);

      setColumnVisibility(container, 'ColumnA', false);
      expect(extractGridData(container)).toEqual([
        ['ColumnB'],
        ['0, ColumnB'],
        ['1, ColumnB'],
      ]);

      setColumnVisibility(container, 'ColumnA', true);
      expect(extractGridData(container)).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0, ColumnA', '0, ColumnB'],
        ['1, ColumnA', '1, ColumnB'],
      ]);
    });

    it('column order can be changed', () => {
      const columnVisibility = {
        visibleColumns: ['ColumnA', 'ColumnB'],
        setVisibleColumns: (visibleColumns: string[]) => {
          columnVisibility.visibleColumns = visibleColumns;
          setProps({ columnVisibility });
        },
      };

      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
          columnVisibility={columnVisibility}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      expect(extractGridData(container)).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0, ColumnA', '0, ColumnB'],
        ['1, ColumnA', '1, ColumnB'],
      ]);

      moveColumnToIndex(container, 'ColumnB', 0);

      expect(extractGridData(container)).toEqual([
        ['ColumnB', 'ColumnA'],
        ['0, ColumnB', '0, ColumnA'],
        ['1, ColumnB', '1, ColumnA'],
      ]);
    });

    it('resets cell props on column reorder', () => {
      const columnVisibility = {
        visibleColumns: ['ColumnA', 'ColumnB'],
        setVisibleColumns: (visibleColumns: string[]) => {
          columnVisibility.visibleColumns = visibleColumns;
          setProps({ columnVisibility });
        },
      };

      const RenderCellValue: RenderCellValue = ({
        rowIndex,
        columnId,
        setCellProps,
      }) => {
        useEffect(() => {
          if (columnId === 'ColumnB') {
            setCellProps({ style: { color: 'blue' } });
          }
        }, [columnId, rowIndex, setCellProps]);

        return `${rowIndex}-${columnId}`;
      };

      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
          columnVisibility={columnVisibility}
          rowCount={1}
          renderCellValue={RenderCellValue}
        />
      );

      const getCellColorAt = (index: number) =>
        getAllByTestSubject(container, 'dataGridRowCell')[index].style.color ||
        undefined;

      expect(getCellColorAt(0)).toEqual(undefined);
      expect(getCellColorAt(1)).toEqual('blue');

      moveColumnToIndex(container, 'ColumnB', 0);

      expect(getCellColorAt(0)).toEqual('blue');
      expect(getCellColorAt(1)).toEqual(undefined);
    });

    test('column display, displayAsText, and displayHeaderCellProps', () => {
      const { container, getByTestSubject } = render(
        <EuiDataGrid
          aria-labelledby="#test"
          columnVisibility={{
            visibleColumns: ['ColumnA'],
            setVisibleColumns: () => {},
          }}
          columns={[
            {
              id: 'ColumnA',
              display: <span data-test-subj="display">Hello world</span>,
              displayAsText: 'displayAsText',
              displayHeaderCellProps: { className: 'displayHeaderCellProps' },
            },
          ]}
          rowCount={1}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      expect(
        container.querySelector('.euiDataGridHeaderCell.displayHeaderCellProps')
      ).toBeInTheDocument();
      expect(getByTestSubject('display')).toBeInTheDocument();
      expect(
        container.querySelector('[aria-label="displayAsText"]')
      ).toBeInTheDocument();
    });

    describe('canDragAndDropColumns', () => {
      it('should render draggable header columns cells', () => {
        const columnVisibility = {
          visibleColumns: ['ColumnA', 'ColumnB'],
          setVisibleColumns: () => {},
          canDragAndDropColumns: true,
        };

        const { getByTestSubject } = render(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
            columnVisibility={columnVisibility}
            rowCount={2}
            renderCellValue={renderCellValueRowAndColumnCount}
          />
        );

        expect(
          getByTestSubject('euiDataGridHeaderDroppable')
        ).toBeInTheDocument();
        expect(
          getByTestSubject('dataGridHeaderCell-ColumnA').parentElement
        ).toHaveClass('euiDraggable');
      });
    });
  });

  describe('column sorting', () => {
    it('calls the onSort callback', () => {
      const onSort = jest.fn((columns) => {
        setProps({ sorting: { columns, onSort } });
      });

      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'ColumnA' }]}
          columnVisibility={{
            visibleColumns: ['ColumnA'],
            setVisibleColumns: () => {},
          }}
          rowCount={1}
          sorting={{
            columns: [],
            onSort,
          }}
          renderCellValue={() => 'hello'}
        />
      );

      sortByColumn(container, 'ColumnA', 'desc');

      expect(onSort).toHaveBeenCalledTimes(2);
      expect(onSort).toHaveBeenCalledWith([
        { id: 'ColumnA', direction: 'asc' },
      ]);
      expect(onSort).toHaveBeenCalledWith([
        { id: 'ColumnA', direction: 'desc' },
      ]);

      const [, sortDirection] = getColumnSortDirection(container, 'ColumnA');
      expect(sortDirection).toBe('desc');
    });

    describe('in-memory sorting', () => {
      it('sorts on initial render', () => {
        const renderCellValue: RenderCellValue = ({ rowIndex, columnId }) =>
          // render A 0->4 and B 9->5
          columnId === 'A' ? rowIndex : 9 - rowIndex;
        const { container } = render(
          <EuiDataGrid
            aria-label="test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={renderCellValue}
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [{ id: 'A', direction: 'desc' }],
              onSort: () => {},
            }}
          />
        );

        expect(extractGridData(container)).toEqual([
          ['A', 'B'],
          ['4', '5'],
          ['3', '6'],
          ['2', '7'],
          ['1', '8'],
          ['0', '9'],
        ]);
      });

      it('sorts on multiple columns', () => {
        const { container } = render(
          <EuiDataGrid
            aria-label="test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={renderCellValueALowBHigh}
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [
                { id: 'A', direction: 'desc' },
                { id: 'B', direction: 'asc' },
              ],
              onSort: () => {},
            }}
          />
        );

        expect(extractGridData(container)).toEqual([
          ['A', 'B'],
          ['1', '6'],
          ['1', '8'],
          ['0', '5'],
          ['0', '7'],
          ['0', '9'],
        ]);
      });

      it('sorts in response to user interaction', () => {
        const onSort = jest.fn((columns) => {
          setProps({ sorting: { columns, onSort } });
        });

        const { container, setProps } = renderDataGrid(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={renderCellValueALowBHigh}
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [],
              onSort,
            }}
          />
        );

        expect(extractGridData(container)).toEqual([
          ['A', 'B'],
          ['0', '9'],
          ['1', '8'],
          ['0', '7'],
          ['1', '6'],
          ['0', '5'],
        ]);

        sortByColumn(container, 'A', 'desc');
        expect(extractGridData(container)).toEqual([
          ['A', 'B'],
          ['1', '8'],
          ['1', '6'],
          ['0', '9'],
          ['0', '7'],
          ['0', '5'],
        ]);

        sortByColumn(container, 'B', 'asc');
        expect(extractGridData(container)).toEqual([
          ['A', 'B'],
          ['1', '6'],
          ['1', '8'],
          ['0', '5'],
          ['0', '7'],
          ['0', '9'],
        ]);
      });

      it('sorts with all digit groups in numerical-like', () => {
        const onSort = jest.fn((columns) => {
          setProps({ sorting: { columns, onSort } });
        });
        const renderCellValue: RenderCellValue = ({ rowIndex }) =>
          `1.0.${(rowIndex % 3) + rowIndex}`; // computes as 0,2,4,3,5

        const { container, setProps } = renderDataGrid(
          <EuiDataGrid
            aria-label="test"
            columns={[{ id: 'version' }]}
            columnVisibility={{
              visibleColumns: ['version'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={renderCellValue}
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [],
              onSort,
            }}
          />
        );

        // verify rows are unordered
        expect(extractGridData(container)).toEqual([
          ['version'],
          ['1.0.0'],
          ['1.0.2'],
          ['1.0.4'],
          ['1.0.3'],
          ['1.0.5'],
        ]);

        sortByColumn(container, 'version', 'asc');

        expect(extractGridData(container)).toEqual([
          ['version'],
          ['1.0.0'],
          ['1.0.2'],
          ['1.0.3'],
          ['1.0.4'],
          ['1.0.5'],
        ]);
      });
    });

    it('uses schema information to sort', () => {
      const renderCellValue: RenderCellValue = ({ rowIndex, columnId }) =>
        // render A 0->4 and B 12->8
        columnId === 'A' ? rowIndex : 12 - rowIndex;
      const { container } = render(
        <EuiDataGrid
          aria-label="test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={5}
          renderCellValue={renderCellValue}
          inMemory={{ level: 'sorting' }}
          sorting={{
            columns: [{ id: 'B', direction: 'asc' }],
            onSort: () => {},
          }}
        />
      );

      expect(extractGridData(container)).toEqual([
        ['A', 'B'],
        ['4', '8'],
        ['3', '9'],
        ['2', '10'],
        ['1', '11'],
        ['0', '12'],
      ]);
    });
  });

  describe('updating column definitions', () => {
    it('renders the new set', () => {
      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      expect(extractGridData(container)).toEqual([
        ['A', 'B'],
        ['0, A', '0, B'],
        ['1, A', '1, B'],
      ]);

      setProps({
        columns: [{ id: 'A' }, { id: 'C' }],
        columnVisibility: {
          visibleColumns: ['A', 'C'],
          setVisibleColumns: () => {},
        },
      });

      expect(extractGridData(container)).toEqual([
        ['A', 'C'],
        ['0, A', '0, C'],
        ['1, A', '1, C'],
      ]);
    });

    it('"Hide fields" updates', () => {
      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      // verify original column list is A, B
      let popover = openColumnSelector(container);
      expect(
        Array.from(
          popover.querySelectorAll('div.euiDataGridColumnSelector__item'),
          (item) => item.textContent
        )
      ).toEqual(['A', 'B']);
      closeColumnSelector(container);

      // update columns
      setProps({
        columns: [{ id: 'A' }, { id: 'C' }],
        columnVisibility: {
          visibleColumns: ['A', 'C'],
          setVisibleColumns: () => {},
        },
      });

      // test that the column list updated to A,C
      popover = openColumnSelector(container);
      expect(
        Array.from(
          popover.querySelectorAll('div.euiDataGridColumnSelector__item'),
          (item) => item.textContent
        )
      ).toEqual(['A', 'C']);
      closeColumnSelector(container);
    });

    it('"Sort fields" updates', () => {
      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          sorting={{
            onSort: () => {},
            columns: [],
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      // verify original column list is A, B
      openColumnSorter(container);
      let popover = openColumnSorterSelection(container);
      expect(
        Array.from(
          popover.querySelectorAll('button.euiDataGridColumnSorting__field'),
          (item) => item.textContent
        )
      ).toEqual(['A', 'B']);
      closeColumnSorterSelection(container);
      closeColumnSorter(container);

      // update columns
      setProps({
        columns: [{ id: 'A' }, { id: 'C' }],
        columnVisibility: {
          visibleColumns: ['A', 'C'],
          setVisibleColumns: () => {},
        },
      });

      // test that the column list updated to A,C
      openColumnSorter(container);
      popover = openColumnSorterSelection(container);
      expect(
        Array.from(
          popover.querySelectorAll('button.euiDataGridColumnSorting__field'),
          (item) => item.textContent
        )
      ).toEqual(['A', 'C']);
      closeColumnSorterSelection(container);
      closeColumnSorter(container);
    });

    it('"Sort fields" button text updates', () => {
      const { container, setProps } = renderDataGrid(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          sorting={{
            onSort: () => {},
            columns: [],
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      // Get column sort count
      const getBadgeText = () => {
        const button = getButton(container, 'dataGridColumnSortingButton')!;
        const badge = button.querySelector(
          'span.euiDataGridToolbarControl__badge'
        );
        return badge ? badge.textContent : false;
      };
      expect(getBadgeText()).toBeFalsy();

      // Update sorted columns
      setProps({
        sorting: {
          columns: [{ id: 'A', direction: 'asc' }],
          onSort: () => {},
        },
      });
      expect(getBadgeText()).toEqual('1');

      // Update sorted columns again
      setProps({
        sorting: {
          columns: [
            { id: 'A', direction: 'asc' },
            { id: 'B', direction: 'asc' },
          ],
          onSort: () => {},
        },
      });
      expect(getBadgeText()).toEqual('2');
    });
  });

  describe('render column actions', () => {
    it('renders various column actions configurations', () => {
      const { queryByTestSubject, getByTestSubject } = render(
        <EuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [{ id: 'A', direction: 'asc' }],
            onSort: () => {},
          }}
          columns={[
            { id: 'A', actions: false },
            { id: 'B', isSortable: true },
            {
              id: 'C',
              isSortable: true,
              actions: {
                showHide: false,
                showMoveRight: false,
                showMoveLeft: false,
                showSortAsc: false,
                showSortDesc: false,
                additional: [{ label: 'test' }],
              },
            },
            {
              id: 'D',
              isSortable: true,
              actions: {
                showHide: false,
                showMoveRight: false,
                showMoveLeft: false,
                additional: [{ label: 'test' }],
              },
            },
            {
              id: 'E',
              isSortable: true,
              actions: {
                showHide: { label: '1' },
                showSortAsc: { label: '2' },
                showSortDesc: { label: '3' },
                showMoveLeft: { label: '4' },
                showMoveRight: { label: '5' },
                additional: [{ label: 'test' }],
              },
            },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B', 'C', 'D', 'E'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      expect(
        queryByTestSubject('dataGridHeaderCellActionButton-A')
      ).not.toBeInTheDocument();

      for (const col of ['B', 'C', 'D', 'E']) {
        fireEvent.click(
          getByTestSubject(`dataGridHeaderCellActionButton-${col}`)
        );
        const actionGroup = getByTestSubject(
          `dataGridHeaderCellActionGroup-${col}`
        );
        expect(getSnapshotNode(actionGroup)).toMatchSnapshot();
      }
    });
  });

  describe('render sorting arrows', () => {
    it('renders sorting arrows when direction is given', () => {
      const { queryAllByTestSubject } = render(
        <EuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [
              { id: 'A', direction: 'asc' },
              { id: 'B', direction: 'desc' },
            ],
            onSort: () => {},
          }}
          columns={[
            { id: 'A', isSortable: true },
            { id: 'B', isSortable: true },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );
      expect(
        queryAllByTestSubject('dataGridHeaderCellSortingIcon-A')
      ).toHaveLength(1);

      expect(
        queryAllByTestSubject('dataGridHeaderCellSortingIcon-B')
      ).toHaveLength(1);
    });

    it('does not render the arrows if the column is not sorted', () => {
      const { queryAllByTestSubject } = render(
        <EuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [],
            onSort: () => {},
          }}
          columns={[
            {
              id: 'C',
              isSortable: true,
              actions: {
                showHide: false,
                showMoveRight: false,
                showMoveLeft: false,
                showSortAsc: false,
                showSortDesc: false,
                additional: [{ label: 'test' }],
              },
            },
          ]}
          columnVisibility={{
            visibleColumns: ['C'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );
      expect(
        queryAllByTestSubject('dataGridHeaderCellSortingIcon-C')
      ).toHaveLength(0);
    });

    it('renders the icons if they are sorted but user is not allowed to perform any action', () => {
      const { queryAllByTestSubject } = render(
        <EuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [{ id: 'D', direction: 'asc' }],
            onSort: () => {},
          }}
          columns={[{ id: 'D', actions: false }]}
          columnVisibility={{
            visibleColumns: ['D'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );
      expect(
        queryAllByTestSubject('dataGridHeaderCellSortingIcon-D')
      ).toHaveLength(1);
    });
  });

  describe('render column cell actions', () => {
    it('renders various column cell actions configurations after cell gets hovered', async () => {
      const alertFn = jest.fn();
      const happyFn = jest.fn();
      const { getByTestSubject, queryByTestSubject, getAllByTestSubject } =
        render(
          <EuiDataGrid
            aria-labelledby="#test"
            sorting={{
              columns: [{ id: 'A', direction: 'asc' }],
              onSort: () => {},
            }}
            columns={[
              {
                id: 'A',
                isSortable: true,
                cellActions: [
                  ({ rowIndex, columnId, Component, isExpanded }) => {
                    return (
                      <Component
                        onClick={() => alertFn(rowIndex, columnId)}
                        iconType="warning"
                        aria-label="test1 aria label"
                        data-test-subj={
                          isExpanded ? 'alertActionPopover' : 'alertAction'
                        }
                      >
                        test1
                      </Component>
                    );
                  },
                  ({ rowIndex, columnId, Component, isExpanded }) => {
                    return (
                      <Component
                        onClick={() => happyFn(rowIndex, columnId)}
                        iconType="faceHappy"
                        aria-label="test2 aria label"
                        data-test-subj={
                          isExpanded ? 'happyActionPopover' : 'happyAction'
                        }
                      >
                        test2
                      </Component>
                    );
                  },
                ],
              },
            ]}
            columnVisibility={{
              visibleColumns: ['A'],
              setVisibleColumns: () => {},
            }}
            rowCount={2}
            renderCellValue={renderCellValueRowAndColumnCount}
          />
        );

      // cell buttons should not get rendered for unfocused, unhovered cell
      expect(queryByTestSubject('alertAction')).not.toBeInTheDocument();
      expect(queryByTestSubject('happyAction')).not.toBeInTheDocument();

      fireEvent.mouseEnter(getAllByTestSubject('dataGridRowCell')[1]);

      fireEvent.click(getAllByTestSubject('alertAction')[0]);
      expect(alertFn).toHaveBeenCalledWith(1, 'A');
      fireEvent.click(getAllByTestSubject('happyAction')[0]);
      expect(happyFn).toHaveBeenCalledWith(1, 'A');
      alertFn.mockReset();
      happyFn.mockReset();

      fireEvent.keyDown(getAllByTestSubject('dataGridRowCell')[1], {
        key: keys.ENTER,
      });

      fireEvent.click(getByTestSubject('alertActionPopover'));
      expect(alertFn).toHaveBeenCalledWith(1, 'A');
      fireEvent.click(getByTestSubject('happyActionPopover'));
      expect(happyFn).toHaveBeenCalledWith(1, 'A');
    });
  });

  describe('rowHeightsOptions', () => {
    it('all row heights options applied correctly', async () => {
      const { container } = render(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'Column 1' }, { id: 'Column 2' }]}
          columnVisibility={{
            visibleColumns: ['Column 1', 'Column 2'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={() => 'value'}
          rowHeightsOptions={{
            defaultHeight: 50,
            rowHeights: {
              0: 70,
              1: {
                lineCount: 3,
              },
            },
          }}
        />
      );

      const cellHeights = extractRowHeights(container);
      expect(cellHeights).toEqual({
        0: 70,
        1: 34,
        2: 50,
      });
    });

    it('render cells with correct height during pagination', () => {
      const { container, getByTestSubject, setProps, getProps } =
        renderDataGrid(
          <EuiDataGrid
            aria-label="test grid"
            columns={[{ id: 'Column' }]}
            columnVisibility={{
              visibleColumns: ['Column'],
              setVisibleColumns: () => {},
            }}
            rowCount={8}
            renderCellValue={renderCellRowAsValue}
            rowHeightsOptions={{
              defaultHeight: 50,
              rowHeights: {
                0: 70,
                1: {
                  lineCount: 3,
                },
              },
            }}
            pagination={{
              pageIndex: 0,
              pageSize: 3,
              pageSizeOptions: [3, 6, 10],
              onChangePage: jest.fn((pageIndex) => {
                const pagination = getProps().pagination!;
                setProps({
                  pagination: { ...pagination, pageIndex },
                });
              }),
              onChangeItemsPerPage: jest.fn(),
            }}
          />
        );

      expect(extractRowHeights(container)).toEqual({
        0: 70,
        1: 34,
        2: 50,
      });

      fireEvent.click(getByTestSubject('pagination-button-next'));

      expect(extractRowHeights(container)).toEqual({
        3: 50,
        4: 50,
        5: 50,
      });

      fireEvent.click(getByTestSubject('pagination-button-previous'));

      expect(extractRowHeights(container)).toEqual({
        0: 70,
        1: 34,
        2: 50,
      });
    });
  });

  describe('keyboard controls', () => {
    it('supports simple arrow navigation', async () => {
      let pagination = {
        pageIndex: 0,
        pageSize: 3,
        pageSizeOptions: [3, 6, 10],
        onChangePage: (pageIndex: number) => {
          pagination = {
            ...pagination,
            pageIndex,
          };

          rerender(
            <EuiDataGrid
              {...requiredProps}
              columns={[
                { id: 'A', actions: false },
                { id: 'B', actions: false },
                { id: 'C', actions: false },
              ]}
              columnVisibility={{
                visibleColumns: ['A', 'B', 'C'],
                setVisibleColumns: () => {},
              }}
              rowCount={8}
              renderCellValue={renderCellValueRowAndColumnCount}
              pagination={pagination}
            />
          );
        },
        onChangeItemsPerPage: () => {},
      };

      const { container, rerender } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[
            { id: 'A', actions: false },
            { id: 'B', actions: false },
            { id: 'C', actions: false },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B', 'C'],
            setVisibleColumns: () => {},
          }}
          rowCount={8}
          renderCellValue={renderCellValueRowAndColumnCount}
          pagination={pagination}
        />
      );

      // enable the grid to accept focus
      fireEvent.keyUp(
        container.querySelector('div [data-test-subj="euiDataGridBody"]')!,
        { key: keys.TAB }
      );

      // focus should begin at the first header cell
      let focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toBeInTheDocument();
      expect(focusableCell).toHaveTextContent('A');

      // focus should not move when up against the left edge
      fireEvent.focus(focusableCell);
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_LEFT });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('A');

      // focus should not move when up against the top edge
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('A');

      // move down
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('1, A');

      // move right
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('1, B');

      // move up
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('0, B');

      // move left
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_LEFT });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('0, A');

      // move down and to the end of the row
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });
      fireEvent.keyDown(focusableCell, { key: keys.END });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('1, C');

      // move up and to the beginning of the row
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
      fireEvent.keyDown(focusableCell, { key: keys.HOME });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('0, A');

      // jump to the last cell
      fireEvent.keyDown(focusableCell, { key: keys.END, ctrlKey: true });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('2, C');

      // jump to the first cell
      fireEvent.keyDown(focusableCell, { key: keys.HOME, ctrlKey: true });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('0, A');

      // page should not change when moving before the first entry
      // but the last row should remain focused
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_UP });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('2, A');

      // advance to the next page
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_DOWN });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('3, A');

      // move over one column and advance one more page
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT }); // 3, B
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_DOWN }); // 6, B
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('6, B');

      // does not advance beyond the last page
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_DOWN });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('6, B');

      // move left one column, return to the previous page
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_LEFT }); // 6, A
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_UP }); // 5, A
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('5, A');

      // return to the previous (first) page
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_UP });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('2, A');

      // move to the last cell of the page then advance one page
      fireEvent.keyDown(focusableCell, { key: keys.END, ctrlKey: true }); // 2, C (last cell of the first page)
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_DOWN }); // 3, C (first cell of the second page, same cell position as previous page)
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('3, C');

      // advance to the final page
      fireEvent.keyDown(focusableCell, { key: keys.PAGE_DOWN }); // 6, C
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toHaveTextContent('6, C');
    });

    // Maximum call stack reached
    it.skip('does not break arrow key focus control behavior when also using a mouse', async () => {
      const { container } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[
            { id: 'A', actions: false },
            { id: 'B', actions: false },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={renderCellValueRowAndColumnCount}
        />
      );

      // enable the grid to accept focus
      fireEvent.keyUp(
        container.querySelector('div [data-test-subj="euiDataGridBody"]')!,
        { key: keys.TAB }
      );

      let focusableCell = getFocusableCell(container)!;
      expect(getCellContentText(focusableCell)).toEqual('0, A');

      fireEvent.focus(getAllByTestSubject(container, 'dataGridRowCell')[3]);

      // wait for a tick to give focus logic time to run
      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toBeInTheDocument();
      expect(getCellContentText(focusableCell)).toEqual('1, B');
    });
    it.skip('supports arrow navigation through grids with different interactive cells', () => {
      const renderCellValue: RenderCellValue = ({ rowIndex, columnId }) => {
        if (columnId === 'A') {
          return `${rowIndex}, A`;
        }

        if (columnId === 'B') {
          return <button>{rowIndex}, B</button>;
        }

        if (columnId === 'C') {
          return (
            <>
              <button>{rowIndex}</button>, <button>C</button>
            </>
          );
        }

        if (columnId === 'D') {
          return (
            <div>
              {rowIndex}, <button>D</button>
            </div>
          );
        }

        return 'error';
      };
      const { container } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B', 'C', 'D'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={renderCellValue}
        />
      );

      /**
       * Make sure we start from a happy state
       */
      let focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toBeInTheDocument();
      expect(focusableCell.textContent).toEqual('0, A');
      fireEvent.focus(focusableCell);
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });

      /**
       * On text only cells, the cell receives focus
       */
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell.textContent).toEqual('1, A'); // make sure we're on the right cell
      expect(focusableCell).toBe(document.activeElement);

      fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT });

      /**
       * On cells with 1 interactive item, the interactive item receives focus
       */
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell.textContent).toEqual('1, B');
      expect(focusableCell.querySelector('button')).toBe(
        document.activeElement
      );

      fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT });

      /**
       * On cells with multiple interactive items, the cell receives focus
       */
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell.textContent).toEqual('1, C');
      expect(focusableCell).toBe(document.activeElement);

      fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT });

      /**
       * On cells with 1 interactive item and non-interactive item(s), the cell receives focus
       */
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell.textContent).toEqual('1, D');
      expect(focusableCell).toBe(document.activeElement);
    });
    it.skip('allows user to enter and exit grid navigation', async () => {
      const renderCellValue: RenderCellValue = ({ rowIndex, columnId }) => (
        <>
          <button>{rowIndex}</button>, <button>{columnId}</button>
        </>
      );
      const { container } = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={renderCellValue}
        />
      );

      /**
       * Make sure we start from a happy state
       */
      let focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toBeInTheDocument();
      expect(focusableCell.textContent).toEqual('0, A');
      fireEvent.focus(focusableCell);
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });
      focusableCell = getFocusableCell(container)!;

      /**
       * Confirm initial state is with grid navigation turn on
       */
      expect(focusableCell.textContent).toEqual('1, A');
      expect(focusableCell).toBe(document.activeElement);
      expect(container).toMatchSnapshot();

      /**
       * Disable grid navigation using ENTER
       */
      fireEvent.keyDown(focusableCell, { key: keys.ENTER });
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });

      let buttons = focusableCell.querySelectorAll('button');

      // grid navigation is disabled, location should not move
      expect(buttons[0].textContent).toEqual('1');
      expect(buttons[1].textContent).toEqual('A');
      expect(buttons[0]).toBe(document.activeElement); // focus should move to first button
      expect(container).toMatchSnapshot(); // should prove focus lock is on

      /**
       * Enable grid navigation ESCAPE
       */
      fireEvent.keyDown(focusableCell, { key: keys.ESCAPE });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toBe(document.activeElement); // focus should move back to cell

      fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell.textContent).toEqual('1, B'); // grid navigation is enabled again, check that we can move
      expect(container).toMatchSnapshot();

      /**
       * Disable grid navigation using F2
       */
      focusableCell = getFocusableCell(container)!;
      fireEvent.keyDown(focusableCell, { key: keys.F2 });
      fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
      buttons = focusableCell.querySelectorAll('button');

      // grid navigation is disabled, location should not move
      expect(buttons[0].textContent).toEqual('1');
      expect(buttons[1].textContent).toEqual('B');
      expect(buttons[0]).toBe(document.activeElement); // focus should move to first button
      expect(container).toMatchSnapshot(); // should prove focus lock is on

      /**
       * Enable grid navigation using F2
       */
      fireEvent.keyDown(focusableCell, { key: keys.F2 });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell).toBe(document.activeElement); // focus should move back to cell

      fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
      focusableCell = getFocusableCell(container)!;
      expect(focusableCell.textContent).toEqual('0, B'); // grid navigation is enabled again, check that we can move
      expect(container).toMatchSnapshot();
    });
  });

  it('calls onFullScreenChange when fullscreen button is clicked', () => {
    const onFullScreenChange = jest.fn();
    const { getByTestSubject } = render(
      <EuiDataGrid
        {...requiredProps}
        columns={[{ id: 'A' }, { id: 'B' }]}
        columnVisibility={{
          visibleColumns: ['A', 'B'],
          setVisibleColumns: () => {},
        }}
        rowCount={3}
        renderCellValue={renderCellValueRowAndColumnCount}
        toolbarVisibility={{ showFullScreenSelector: true }}
        onFullScreenChange={onFullScreenChange}
      />
    );

    const button = getByTestSubject('dataGridFullScreenButton');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onFullScreenChange).toHaveBeenCalledWith(true);

    fireEvent.click(button);
    expect(onFullScreenChange).toHaveBeenCalledWith(false);
  });
});
