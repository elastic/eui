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

import React, { useEffect, useState } from 'react';
import { mount, ReactWrapper, render } from 'enzyme';
import { EuiDataGrid } from './';
import {
  findTestSubject,
  requiredProps,
  takeMountedSnapshot,
} from '../../test';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';
import { keys } from '../../services';
import { act } from 'react-dom/test-utils';
import cheerio from 'cheerio';
import { EuiButton } from '../button';

jest.mock('../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

function getFocusableCell(component: ReactWrapper) {
  return findTestSubject(component, 'dataGridRowCell').find('[tabIndex=0]');
}

function extractGridData(datagrid: ReactWrapper) {
  const rows: string[][] = [];

  const headerCells = findTestSubject(datagrid, 'dataGridHeaderCell', '|=');
  const headerRow: string[] = [];
  headerCells.forEach((cell: any) =>
    headerRow.push(
      cell.find('[className="euiDataGridHeaderCell__content"]').text()
    )
  );
  rows.push(headerRow);

  const gridRows = findTestSubject(datagrid, 'dataGridRow');
  gridRows.forEach((row: any) => {
    const rowContent: string[] = [];
    const cells = findTestSubject(row, 'dataGridRowCell');
    cells.forEach((cell: any) =>
      rowContent.push(cell.find('[data-test-subj="cell-content"]').text())
    );
    rows.push(rowContent);
  });

  return rows;
}

function extractColumnWidths(datagrid: ReactWrapper) {
  return (findTestSubject(datagrid, 'dataGridHeaderCell', '|=') as ReactWrapper<
    any
  >).reduce((widths: { [key: string]: number }, cell) => {
    const [, columnId] = cell
      .props()
      ['data-test-subj'].match(/dataGridHeaderCell-(.*)/);
    widths[columnId] = parseFloat(cell.props().style.width);
    return widths;
  }, {});
}

function resizeColumn(
  datagrid: ReactWrapper,
  columnId: string,
  columnWidth: number
) {
  const widths = extractColumnWidths(datagrid);
  const originalWidth = widths[columnId];

  const firstResizer = datagrid
    .find(`EuiDataGridColumnResizer[columnId="${columnId}"]`)
    .instance() as EuiDataGridColumnResizer;
  firstResizer.onMouseDown({
    pageX: originalWidth,
    stopPropagation: () => {},
    preventDefault: () => {},
  } as React.MouseEvent<HTMLDivElement>);
  firstResizer.onMouseMove({ pageX: columnWidth });
  act(() => firstResizer.onMouseUp());

  datagrid.update();
}

function openColumnSorterSelection(datagrid: ReactWrapper) {
  let columnSelectionPopover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]'
  );
  expect(columnSelectionPopover).not.euiPopoverToBeOpen();
  const popoverButton = columnSelectionPopover
    .find('div[className="euiPopover__anchor"]')
    .find('[onClick]')
    .first();
  // @ts-ignore onClick is known to exist, and does not require an argument in this usage
  act(() => popoverButton.props().onClick());

  datagrid.update();

  columnSelectionPopover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]'
  );
  expect(columnSelectionPopover).euiPopoverToBeOpen();

  return columnSelectionPopover;
}

function closeColumnSorterSelection(datagrid: ReactWrapper) {
  let columnSelectionPopover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]'
  );
  // popover will go away if all of the columns are selected
  if (columnSelectionPopover.length > 0) {
    expect(columnSelectionPopover).euiPopoverToBeOpen();

    const popoverButton = columnSelectionPopover
      .find('div[className="euiPopover__anchor"]')
      .find('[onClick]')
      .first();
    // @ts-ignore onClick is known to exist, and does not require an argument in this usage
    act(() => popoverButton.props().onClick());

    datagrid.update();

    columnSelectionPopover = datagrid.find(
      'EuiPopover[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]'
    );
    expect(columnSelectionPopover).not.euiPopoverToBeOpen();
  }

  return columnSelectionPopover;
}

function getColumnSortDirection(
  datagrid: ReactWrapper,
  columnId: string
): [ReactWrapper, string] {
  // get the button that sorts by this column
  let columnSorter = datagrid.find(
    `div[data-test-subj="euiDataGridColumnSorting-sortColumn-${columnId}"]`
  );
  if (columnSorter.length === 0) {
    // need to enable this column
    openColumnSorterSelection(datagrid);

    // find button to enable this column and click it
    const selectColumnButton = datagrid.find(
      `[data-test-subj="dataGridColumnSortingPopoverColumnSelection-${columnId}"]`
    );
    expect(selectColumnButton.length).toBe(1);
    // @ts-ignore onClick is known to exist, and does not require an argument in this usage
    act(() => selectColumnButton.props().onClick());

    // close column selection popover
    closeColumnSorterSelection(datagrid);

    // find the column sorter
    const columnSelectionPopover = datagrid.find(
      'EuiPopover[data-test-subj="dataGridColumnSortingPopover"]'
    );
    columnSorter = columnSelectionPopover.find(
      `div[data-test-subj="euiDataGridColumnSorting-sortColumn-${columnId}"]`
    );
  }

  expect(columnSorter.length).toBe(1);
  const activeSort = columnSorter
    .find('button[className*="euiButtonGroup__button--selected"]')
    .closest('EuiToggle')
    .find('input[className*="euiButtonToggle__input"]');

  const sortDirection = (activeSort.props() as {
    'data-test-subj': string;
  })['data-test-subj'].match(/(?<direction>[^-]+)$/)!.groups!.direction;

  return [columnSorter, sortDirection];
}

function openColumnSorter(datagrid: ReactWrapper) {
  let popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSortingPopover"]'
  );
  expect(popover).not.euiPopoverToBeOpen();

  const popoverButton = popover
    .find('div[className="euiPopover__anchor"]')
    .find('[onClick]')
    .first();
  // @ts-ignore onClick is known to exist, and does not require an argument in this usage
  act(() => popoverButton.props().onClick());

  datagrid.update();

  popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSortingPopover"]'
  );
  expect(popover).euiPopoverToBeOpen();

  return popover;
}

function closeColumnSorter(datagrid: ReactWrapper) {
  let popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSortingPopover"]'
  );
  expect(popover).euiPopoverToBeOpen();

  const popoverButton = popover
    .find('div[className="euiPopover__anchor"]')
    .find('[onClick]')
    .first();
  // @ts-ignore onClick is known to exist, and does not require an argument in this usage
  act(() => popoverButton.props().onClick());

  datagrid.update();

  popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSortingPopover"]'
  );
  expect(popover).not.euiPopoverToBeOpen();

  return popover;
}

function sortByColumn(
  datagrid: ReactWrapper,
  columnId: string,
  direction: 'asc' | 'desc' | 'off'
) {
  openColumnSorter(datagrid);

  let [columnSorter, currentSortDirection] = getColumnSortDirection(
    datagrid,
    columnId
  );

  // if this column isn't being sorted, enable it
  if (currentSortDirection === 'off') {
    act(() => {
      // @ts-ignore does not require an argument in this usage
      columnSorter.find('EuiSwitch').props().onChange!();
    });

    datagrid.update();

    // inspect the column's new sort details
    [columnSorter, currentSortDirection] = getColumnSortDirection(
      datagrid,
      columnId
    );
  }

  if (currentSortDirection !== direction) {
    const sortButton = columnSorter.find(
      `input[data-test-subj="euiDataGridColumnSorting-sortColumn-${columnId}-${direction}"]`
    );
    expect(sortButton.length).toBe(1);
    sortButton.simulate('change', [undefined, direction]);
  }

  closeColumnSorter(datagrid);
}

expect.extend({
  toBeEuiPopover(received: ReactWrapper) {
    const pass = received.name() === 'EuiPopover';
    if (pass) {
      return {
        pass: true,
        message: () =>
          `expected component "${received.name}" to not be EuiPopover`,
      };
    } else {
      return {
        pass: false,
        message: () => `expected component "${received.name}" to be EuiPopover`,
      };
    }
  },
  euiPopoverToBeOpen(received) {
    expect(received).toBeEuiPopover();
    const { isOpen } = received.props();
    const pass = isOpen === true;
    if (pass) {
      return {
        pass: true,
        message: () => 'expected EuiPopover to be closed',
      };
    } else {
      return {
        pass: false,
        message: () => 'expected EuiPopover to be open',
      };
    }
  },
});
declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare */
  namespace jest {
    interface Matchers<R> {
      toBeEuiPopover(): R;
      euiPopoverToBeOpen(): R;
    }
  }
}

function openColumnSelector(datagrid: ReactWrapper) {
  let popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).not.euiPopoverToBeOpen();

  const popoverButton = popover
    .find('div[className="euiPopover__anchor"]')
    .find('[onClick]')
    .first();
  // @ts-ignore onClick is known to exist, and does not require an argument in this usage
  act(() => popoverButton.props().onClick());

  datagrid.update();

  popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).euiPopoverToBeOpen();

  return popover;
}

function closeColumnSelector(datagrid: ReactWrapper) {
  let popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).euiPopoverToBeOpen();

  const popoverButton = popover
    .find('div[className="euiPopover__anchor"]')
    .find('[onClick]')
    .first();
  // @ts-ignore onClick is known to exist, and does not require an argument in this usage
  act(() => popoverButton.props().onClick());

  datagrid.update();

  popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).not.euiPopoverToBeOpen();

  return popover;
}

function setColumnVisibility(
  datagrid: ReactWrapper,
  columnId: string,
  isVisible: boolean
) {
  const popover = openColumnSelector(datagrid);

  // toggle column's visibility switch
  const portal = popover.find('EuiPortal');

  const columnSwitch = portal.find(`EuiSwitch[name="${columnId}"]`);
  const switchInput = columnSwitch.find('button');
  switchInput.getDOMNode().setAttribute('aria-checked', `${isVisible}`);
  switchInput.simulate('click');

  closeColumnSelector(datagrid);
}

function moveColumnToIndex(
  datagrid: ReactWrapper,
  columnId: string,
  nextIndex: number
) {
  // open datagrid column options
  let popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).not.euiPopoverToBeOpen();

  let popoverButton = popover
    .find('div[className="euiPopover__anchor"]')
    .find('[onClick]')
    .first();
  // @ts-ignore onClick is known to exist, and does not require an argument in this usage
  act(() => popoverButton.props().onClick());

  datagrid.update();

  popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).euiPopoverToBeOpen();

  const [initialColumnOrder] = extractGridData(datagrid);
  const initialColumnIndex = initialColumnOrder.indexOf(columnId);

  // "drag" column into new location
  const portal = popover.find('EuiPortal');
  act(() =>
    portal.find('EuiDragDropContext').props().onDragEnd!({
      // @ts-ignore - only `index` is used from `source`, don't need to mock rest of the event
      source: { index: initialColumnIndex },
      destination: { index: nextIndex },
    })
  );

  datagrid.update();

  // close popover
  popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).euiPopoverToBeOpen();

  popoverButton = popover
    .find('div[className="euiPopover__anchor"]')
    .find('[onClick]')
    .first();
  // @ts-ignore onClick is known to exist, and does not require an argument in this usage
  act(() => popoverButton.props().onClick());

  datagrid.update();

  popover = datagrid.find(
    'EuiPopover[data-test-subj="dataGridColumnSelectorPopover"]'
  );
  expect(popover).not.euiPopoverToBeOpen();
}

describe('EuiDataGrid', () => {
  describe('rendering', () => {
    it('renders with common and div attributes', () => {
      const component = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
        />
      );

      expect(component).toMatchSnapshot();
    });

    it('renders custom column headers', () => {
      const component = render(
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
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
        />
      );

      expect(component).toMatchSnapshot();
    });

    it('renders with appropriate role structure', () => {
      const component = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
        />
      );

      // purposefully not using data-test-subj attrs to test role semantics
      const grid = component.find('[role="grid"]');
      const rows = grid.children('[role="row"]'); // technically, this test should also allow role=rowgroup but we don't currently use rowgroups

      expect(rows.length).not.toBe(0);
      expect(grid.children().length).toBe(rows.length);

      rows.each((i, element) => {
        const $element = cheerio(element);
        const allCells = $element.children(
          '[role="columnheader"], [role="rowheader"], [role="gridcell"]'
        );
        expect($element.children().length).toBe(allCells.length);
      });
    });

    it('renders and applies custom props', () => {
      const component = mount(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId, setCellProps }) => {
            useEffect(() => {
              setCellProps({
                className: 'customClass',
                'data-test-subj': `cell-${rowIndex}-${columnId}`,
                style: { color: columnId === 'A' ? 'red' : 'blue' },
              });
            }, [columnId, rowIndex, setCellProps]);

            return `${rowIndex}, ${columnId}`;
          }}
        />
      );

      expect(
        component.find('.euiDataGridRowCell').map(cell => {
          const props = cell.props();
          delete props.children;
          return props;
        })
      ).toMatchInlineSnapshot(`
Array [
  Object {
    "className": "euiDataGridRowCell customClass",
    "data-test-subj": "dataGridRowCell",
    "onBlur": [Function],
    "onFocus": [Function],
    "onKeyDown": [Function],
    "role": "gridcell",
    "style": Object {
      "color": "red",
      "width": "100px",
    },
    "tabIndex": -1,
  },
  Object {
    "className": "euiDataGridRowCell customClass",
    "data-test-subj": "dataGridRowCell",
    "onBlur": [Function],
    "onFocus": [Function],
    "onKeyDown": [Function],
    "role": "gridcell",
    "style": Object {
      "color": "blue",
      "width": "100px",
    },
    "tabIndex": -1,
  },
  Object {
    "className": "euiDataGridRowCell customClass",
    "data-test-subj": "dataGridRowCell",
    "onBlur": [Function],
    "onFocus": [Function],
    "onKeyDown": [Function],
    "role": "gridcell",
    "style": Object {
      "color": "red",
      "width": "100px",
    },
    "tabIndex": -1,
  },
  Object {
    "className": "euiDataGridRowCell customClass",
    "data-test-subj": "dataGridRowCell",
    "onBlur": [Function],
    "onFocus": [Function],
    "onKeyDown": [Function],
    "role": "gridcell",
    "style": Object {
      "color": "blue",
      "width": "100px",
    },
    "tabIndex": -1,
  },
]
`);
    });

    it('renders correct aria attributes on column headers', () => {
      const component = mount(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={1}
          renderCellValue={() => 'value'}
        />
      );

      // no columns are sorted, expect no aria-sort or aria-describedby attributes
      expect(component.find('[role="columnheader"][aria-sort]').length).toBe(0);
      expect(
        component.find('[role="columnheader"][aria-describedby]').length
      ).toBe(0);

      // sort on one column
      component.setProps({
        sorting: { columns: [{ id: 'A', direction: 'asc' }], onSort: () => {} },
      });

      // expect A column to have aria-sort, expect no aria-describedby
      expect(component.find('[role="columnheader"][aria-sort]').length).toBe(1);
      expect(
        component.find(
          '[role="columnheader"][aria-sort="ascending"][data-test-subj="dataGridHeaderCell-A"]'
        ).length
      ).toBe(1);
      expect(
        component.find('[role="columnheader"][aria-describedby]').length
      ).toBe(0);

      // sort on both columns
      component.setProps({
        sorting: {
          columns: [
            { id: 'A', direction: 'asc' },
            { id: 'B', direction: 'desc' },
          ],
          onSort: () => {},
        },
      });

      // expect no aria-sort, both columns have aria-describedby
      expect(component.find('[role="columnheader"][aria-sort]').length).toBe(0);
      expect(
        component.find('[role="columnheader"][aria-describedby]').length
      ).toBe(2);
      expect(
        component.find('[role="columnheader"][aria-describedby="htmlId"]')
          .length
      ).toBe(2);
    });

    it('renders additional toolbar controls', () => {
      const component = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
          toolbarVisibility={{ additionalControls: <button>Button</button> }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    it('renders control columns', () => {
      const component = render(
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
              rowCellRender: ({ rowIndex }) => rowIndex,
            },
          ]}
          trailingControlColumns={[
            {
              id: 'trailing',
              width: 50,
              headerCellRender: () => <span>trailing heading</span>,
              rowCellRender: ({ rowIndex }) => rowIndex,
            },
          ]}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
          toolbarVisibility={{ additionalControls: <button>Button</button> }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    it('can hide the toolbar', () => {
      const component = mount(
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
      expect(findTestSubject(component, 'dataGridControls').length).toBe(0);

      // Check for false / true and unset values
      component.setProps({
        toolbarVisibility: {
          showFullScreenSelector: false,
          showSortSelector: false,
          showStyleSelector: true,
        },
      });

      // fullscreen selector
      expect(findTestSubject(component, 'dataGridFullScrenButton').length).toBe(
        0
      );

      // sort selector
      expect(
        findTestSubject(component, 'dataGridColumnSortingButton').length
      ).toBe(0);

      // style selector
      expect(
        findTestSubject(component, 'dataGridStyleSelectorButton').length
      ).toBe(1);

      // column selector
      expect(
        findTestSubject(component, 'dataGridColumnSelectorButton').length
      ).toBe(1);
    });

    describe('schema schema classnames', () => {
      it('applies classnames from explicit schemas', () => {
        const component = mount(
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
            rowCount={3}
            renderCellValue={({ rowIndex, columnId }) =>
              `${rowIndex}, ${columnId}`
            }
          />
        );

        const gridCellClassNames = component
          .find('[className*="euiDataGridRowCell--"]')
          .map(x => x.props().className);
        expect(gridCellClassNames).toMatchInlineSnapshot(`
Array [
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--customFormatName",
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--customFormatName",
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--customFormatName",
]
`);
      });

      it('automatically detects column types and applies classnames', () => {
        const component = mount(
          <EuiDataGrid
            {...requiredProps}
            columns={[{ id: 'A' }, { id: 'B' }, { id: 'C' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B', 'C'],
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={2}
            renderCellValue={({ columnId }) => {
              if (columnId === 'A') {
                return 5.5;
              } else if (columnId === 'B') {
                return 'true';
              } else {
                return 'asdf';
              }
            }}
          />
        );

        const gridCellClassNames = component
          .find('[className~="euiDataGridRowCell"]')
          .map(x => x.props().className);
        expect(gridCellClassNames).toMatchInlineSnapshot(`
Array [
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--boolean",
  "euiDataGridRowCell",
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--boolean",
  "euiDataGridRowCell",
]
`);
      });

      it('overrides automatically detected column types with supplied schema', () => {
        const component = mount(
          <EuiDataGrid
            {...requiredProps}
            columns={[{ id: 'A' }, { id: 'B', schema: 'alphanumeric' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={2}
            renderCellValue={({ columnId }) =>
              columnId === 'A' ? 5.5 : 'true'
            }
          />
        );

        const gridCellClassNames = component
          .find('[className~="euiDataGridRowCell"]')
          .map(x => x.props().className);
        expect(gridCellClassNames).toMatchInlineSnapshot(`
Array [
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--alphanumeric",
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--alphanumeric",
]
`);
      });

      it('detects all of the supported types', () => {
        const values: { [key: string]: string } = {
          A: '-5.80',
          B: 'false',
          C: '$-5.80',
          E: '2019-09-18T12:31:28',
          F: '2019-09-18T12:31:28Z',
          G: '2019-09-18T12:31:28.234',
          H: '2019-09-18T12:31:28.234+0300',
        };
        const component = mount(
          <EuiDataGrid
            {...requiredProps}
            columns={Object.keys(values).map(id => ({ id }))}
            columnVisibility={{
              visibleColumns: Object.keys(values),
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={1}
            renderCellValue={({ columnId }) => values[columnId]}
          />
        );

        const gridCellClassNames = component
          .find('[className~="euiDataGridRowCell"]')
          .map(x => x.props().className);
        expect(gridCellClassNames).toMatchInlineSnapshot(`
Array [
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--boolean",
  "euiDataGridRowCell euiDataGridRowCell--currency",
  "euiDataGridRowCell euiDataGridRowCell--datetime",
  "euiDataGridRowCell euiDataGridRowCell--datetime",
  "euiDataGridRowCell euiDataGridRowCell--datetime",
  "euiDataGridRowCell euiDataGridRowCell--datetime",
]
`);
      });

      it('accepts extra detectors', () => {
        const values: { [key: string]: string } = {
          A: '-5.80',
          B: '127.0.0.1',
        };
        const component = mount(
          <EuiDataGrid
            {...requiredProps}
            columns={Object.keys(values).map(id => ({ id }))}
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
                icon: 'alert',
                color: 'primary',
                sortTextAsc: 'a-z',
                sortTextDesc: 'z-a',
              },
            ]}
            inMemory={{ level: 'pagination' }}
            rowCount={1}
            renderCellValue={({ columnId }) => values[columnId]}
          />
        );

        const gridCellClassNames = component
          .find('[className~="euiDataGridRowCell"]')
          .map(x => x.props().className);
        expect(gridCellClassNames).toMatchInlineSnapshot(`
Array [
  "euiDataGridRowCell euiDataGridRowCell--numeric",
  "euiDataGridRowCell euiDataGridRowCell--ipaddress",
]
`);
      });
    });
  });

  describe('cell rendering', () => {
    it('supports hooks', () => {
      const component = mount(
        <EuiDataGrid
          aria-label="test"
          columns={[{ id: 'Column 1' }, { id: 'Column 2' }]}
          columnVisibility={{
            visibleColumns: ['Column 1', 'Column 2'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) => {
            const [value] = useState(`Hello, Row ${rowIndex}-${columnId}!`);
            return <span>{value}</span>;
          }}
        />
      );
      expect(extractGridData(component)).toMatchInlineSnapshot(`
Array [
  Array [
    "Column 1",
    "Column 2",
  ],
  Array [
    "Hello, Row 0-Column 1!",
    "Hello, Row 0-Column 2!",
  ],
  Array [
    "Hello, Row 1-Column 1!",
    "Hello, Row 1-Column 2!",
  ],
]
`);
    });
  });

  describe('pagination', () => {
    it('renders', () => {
      const component = mount(
        <EuiDataGrid
          aria-label="test grid"
          columns={[{ id: 'Column' }]}
          columnVisibility={{
            visibleColumns: ['Column'],
            setVisibleColumns: () => {},
          }}
          rowCount={10}
          renderCellValue={({ rowIndex }) => rowIndex}
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
        takeMountedSnapshot(component.find('EuiTablePagination'))
      ).toMatchSnapshot();
    });

    describe('page navigation', () => {
      it('next button pages through content', () => {
        const component = mount(
          <EuiDataGrid
            aria-label="test grid"
            columns={[{ id: 'Column' }]}
            columnVisibility={{
              visibleColumns: ['Column'],
              setVisibleColumns: () => {},
            }}
            rowCount={8}
            renderCellValue={({ rowIndex }) => rowIndex}
            pagination={{
              pageIndex: 0,
              pageSize: 3,
              pageSizeOptions: [3, 6, 10],
              onChangePage: jest.fn(pageIndex => {
                const pagination = component.props().pagination;
                component.setProps({
                  pagination: { ...pagination, pageIndex },
                });
              }),
              onChangeItemsPerPage: jest.fn(),
            }}
          />
        );

        expect(extractGridData(component)).toEqual([
          ['Column'],
          ['0'],
          ['1'],
          ['2'],
        ]);

        findTestSubject(component, 'pagination-button-next').simulate('click');

        expect(component.props().pagination.onChangePage).toHaveBeenCalledTimes(
          1
        );
        const firstCallPageIndex = component.props().pagination.onChangePage
          .mock.calls[0][0];
        expect(firstCallPageIndex).toBe(1);

        expect(extractGridData(component)).toEqual([
          ['Column'],
          ['3'],
          ['4'],
          ['5'],
        ]);

        findTestSubject(component, 'pagination-button-next').simulate('click');

        expect(component.props().pagination.onChangePage).toHaveBeenCalledTimes(
          2
        );
        const secondCallPageIndex = component.props().pagination.onChangePage
          .mock.calls[1][0];
        expect(secondCallPageIndex).toBe(2);

        expect(extractGridData(component)).toEqual([['Column'], ['6'], ['7']]);
      });

      it('pages are navigable through page links', () => {
        const component = mount(
          <EuiDataGrid
            aria-label="test grid"
            columns={[{ id: 'Column' }]}
            columnVisibility={{
              visibleColumns: ['Column'],
              setVisibleColumns: () => {},
            }}
            rowCount={8}
            renderCellValue={({ rowIndex }) => rowIndex}
            pagination={{
              pageIndex: 0,
              pageSize: 3,
              pageSizeOptions: [3, 6, 10],
              onChangePage: jest.fn(pageIndex => {
                const pagination = component.props().pagination;
                component.setProps({
                  pagination: { ...pagination, pageIndex },
                });
              }),
              onChangeItemsPerPage: jest.fn(),
            }}
          />
        );

        expect(extractGridData(component)).toEqual([
          ['Column'],
          ['0'],
          ['1'],
          ['2'],
        ]);

        // goto page 3
        findTestSubject(component, 'pagination-button-2').simulate('click');

        expect(component.props().pagination.onChangePage).toHaveBeenCalledTimes(
          1
        );
        const firstCallPageIndex = component.props().pagination.onChangePage
          .mock.calls[0][0];
        expect(firstCallPageIndex).toBe(2);

        expect(extractGridData(component)).toEqual([['Column'], ['6'], ['7']]);

        // goto page 2
        findTestSubject(component, 'pagination-button-1').simulate('click');

        expect(component.props().pagination.onChangePage).toHaveBeenCalledTimes(
          2
        );
        const secondCallPageIndex = component.props().pagination.onChangePage
          .mock.calls[1][0];
        expect(secondCallPageIndex).toBe(1);

        expect(extractGridData(component)).toEqual([
          ['Column'],
          ['3'],
          ['4'],
          ['5'],
        ]);
      });
    });

    it('changes the page size', () => {
      const component = mount(
        <EuiDataGrid
          aria-label="test grid"
          columns={[{ id: 'Column' }]}
          columnVisibility={{
            visibleColumns: ['Column'],
            setVisibleColumns: () => {},
          }}
          rowCount={8}
          renderCellValue={({ rowIndex }) => rowIndex}
          pagination={{
            pageIndex: 0,
            pageSize: 3,
            pageSizeOptions: [3, 6, 10],
            onChangePage: jest.fn(),
            onChangeItemsPerPage: jest.fn(pageSize => {
              const pagination = component.props().pagination;
              component.setProps({
                pagination: { ...pagination, pageSize },
              });
            }),
          }}
        />
      );

      expect(extractGridData(component)).toEqual([
        ['Column'],
        ['0'],
        ['1'],
        ['2'],
      ]);

      findTestSubject(component, 'tablePaginationPopoverButton').simulate(
        'click'
      );
      const rowButtons: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll(
        '.euiContextMenuItem'
      );
      expect(
        Array.prototype.map.call(
          rowButtons,
          (button: HTMLDivElement) => button.textContent || ''
        )
      ).toEqual(['3 rows', '6 rows', '10 rows']);
      rowButtons[1].click();

      expect(
        component.props().pagination.onChangeItemsPerPage
      ).toHaveBeenCalledTimes(1);
      const firstCallPageIndex = component.props().pagination
        .onChangeItemsPerPage.mock.calls[0][0];
      expect(firstCallPageIndex).toBe(6);

      expect(extractGridData(component)).toEqual([
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
      const component = mount(
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

      const originalCellWidths = extractColumnWidths(component);
      expect(originalCellWidths).toEqual({
        'Column 1': 400,
        'Column 2': 100,
      });
    });

    describe('resizing', () => {
      it('resizes a column by grab handles', () => {
        const component = mount(
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

        const originalCellWidths = extractColumnWidths(component);
        expect(originalCellWidths).toEqual({
          'Column 1': 100,
          'Column 2': 100,
        });

        resizeColumn(component, 'Column 1', 150);

        const updatedCellWidths = extractColumnWidths(component);
        expect(updatedCellWidths).toEqual({
          'Column 1': 150,
          'Column 2': 100,
        });
      });

      it('should listen for column resize', () => {
        const onColumnResizeCallback = jest.fn();
        const component = mount(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'Column 1' }, { id: 'Column 2', initialWidth: 75 }]}
            columnVisibility={{
              visibleColumns: ['Column 1', 'Column 2'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={() => 'value'}
            onColumnResize={args => onColumnResizeCallback(args)}
          />
        );

        resizeColumn(component, 'Column 1', 150);
        resizeColumn(component, 'Column 2', 100);

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
        const component = mount(
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

        const originalCellWidths = extractColumnWidths(component);
        expect(originalCellWidths).toEqual({
          'Column 1': 100,
          'Column 2': 100,
        });

        // verify there is no resizer on Column 1 but that there is on Column 2
        expect(
          component.find('EuiDataGridColumnResizer[columnId="Column 1"]').length
        ).toBe(0);
        expect(
          component.find('EuiDataGridColumnResizer[columnId="Column 2"]').length
        ).toBe(1);
      });

      it('does not trigger value re-renders', () => {
        const renderCellValue = jest.fn(() => 'value');

        const component = mount(
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

        resizeColumn(component, 'ColumnA', 200);

        expect(extractColumnWidths(component)).toEqual({ ColumnA: 200 });
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
          component.setProps({ columnVisibility });
        },
      };

      const component = mount(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
          columnVisibility={columnVisibility}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      expect(extractGridData(component)).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0-ColumnA', '0-ColumnB'],
        ['1-ColumnA', '1-ColumnB'],
      ]);

      setColumnVisibility(component, 'ColumnA', false);
      expect(extractGridData(component)).toEqual([
        ['ColumnB'],
        ['0-ColumnB'],
        ['1-ColumnB'],
      ]);

      setColumnVisibility(component, 'ColumnA', true);
      expect(extractGridData(component)).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0-ColumnA', '0-ColumnB'],
        ['1-ColumnA', '1-ColumnB'],
      ]);
    });

    it('column order can be changed', () => {
      const columnVisibility = {
        visibleColumns: ['ColumnA', 'ColumnB'],
        setVisibleColumns: (visibleColumns: string[]) => {
          columnVisibility.visibleColumns = visibleColumns;
          component.setProps({ columnVisibility });
        },
      };

      const component = mount(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
          columnVisibility={columnVisibility}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      expect(extractGridData(component)).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0-ColumnA', '0-ColumnB'],
        ['1-ColumnA', '1-ColumnB'],
      ]);

      moveColumnToIndex(component, 'ColumnB', 0);

      expect(extractGridData(component)).toEqual([
        ['ColumnB', 'ColumnA'],
        ['0-ColumnB', '0-ColumnA'],
        ['1-ColumnB', '1-ColumnA'],
      ]);
    });
  });

  describe('column sorting', () => {
    it('calls the onSort callback', () => {
      const onSort = jest.fn(columns => {
        component.setProps({ sorting: { columns, onSort } });
        component.update();
      });

      const component = mount(
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

      sortByColumn(component, 'ColumnA', 'desc');

      expect(onSort).toHaveBeenCalledTimes(2);
      expect(onSort).toHaveBeenCalledWith([
        { id: 'ColumnA', direction: 'asc' },
      ]);
      expect(onSort).toHaveBeenCalledWith([
        { id: 'ColumnA', direction: 'desc' },
      ]);

      const [, sortDirection] = getColumnSortDirection(component, 'ColumnA');
      expect(sortDirection).toBe('desc');
    });

    describe('in-memory sorting', () => {
      it('sorts on initial render', () => {
        const component = mount(
          <EuiDataGrid
            aria-label="test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={({ rowIndex, columnId }) =>
              // render A 0->4 and B 9->5
              columnId === 'A' ? rowIndex : 9 - rowIndex
            }
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [{ id: 'A', direction: 'desc' }],
              onSort: () => {},
            }}
          />
        );

        expect(extractGridData(component)).toEqual([
          ['A', 'B'],
          ['4', '5'],
          ['3', '6'],
          ['2', '7'],
          ['1', '8'],
          ['0', '9'],
        ]);
      });

      it('sorts on multiple columns', () => {
        const component = mount(
          <EuiDataGrid
            aria-label="test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={({ rowIndex, columnId }) =>
              // render A as 0, 1, 0, 1, 0 and B as 9->5
              columnId === 'A' ? rowIndex % 2 : 9 - rowIndex
            }
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

        expect(extractGridData(component)).toEqual([
          ['A', 'B'],
          ['1', '6'],
          ['1', '8'],
          ['0', '5'],
          ['0', '7'],
          ['0', '9'],
        ]);
      });

      it('sorts in response to user interaction', () => {
        const onSort = jest.fn(columns => {
          component.setProps({ sorting: { columns, onSort } });
          component.update();
        });

        const component = mount(
          <EuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={({ rowIndex, columnId }) =>
              // render A as 0, 1, 0, 1, 0 and B as 9->5
              columnId === 'A' ? rowIndex % 2 : 9 - rowIndex
            }
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [],
              onSort,
            }}
          />
        );

        expect(extractGridData(component)).toEqual([
          ['A', 'B'],
          ['0', '9'],
          ['1', '8'],
          ['0', '7'],
          ['1', '6'],
          ['0', '5'],
        ]);

        sortByColumn(component, 'A', 'desc');
        expect(extractGridData(component)).toEqual([
          ['A', 'B'],
          ['1', '8'],
          ['1', '6'],
          ['0', '9'],
          ['0', '7'],
          ['0', '5'],
        ]);

        sortByColumn(component, 'B', 'asc');
        expect(extractGridData(component)).toEqual([
          ['A', 'B'],
          ['1', '6'],
          ['1', '8'],
          ['0', '5'],
          ['0', '7'],
          ['0', '9'],
        ]);
      });

      it('sorts with all digit groups in numerical-like', () => {
        const onSort = jest.fn(columns => {
          component.setProps({ sorting: { columns, onSort } });
          component.update();
        });

        const component = mount(
          <EuiDataGrid
            aria-label="test"
            columns={[{ id: 'version' }]}
            columnVisibility={{
              visibleColumns: ['version'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={
              ({ rowIndex }) => `1.0.${(rowIndex % 3) + rowIndex}` // computes as 0,2,4,3,5
            }
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [],
              onSort,
            }}
          />
        );

        // verify rows are unordered
        expect(extractGridData(component)).toEqual([
          ['version'],
          ['1.0.0'],
          ['1.0.2'],
          ['1.0.4'],
          ['1.0.3'],
          ['1.0.5'],
        ]);

        sortByColumn(component, 'version', 'asc');

        expect(extractGridData(component)).toEqual([
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
      const component = mount(
        <EuiDataGrid
          aria-label="test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={5}
          renderCellValue={({ rowIndex, columnId }) =>
            // render A 0->4 and B 12->8
            columnId === 'A' ? rowIndex : 12 - rowIndex
          }
          inMemory={{ level: 'sorting' }}
          sorting={{
            columns: [{ id: 'B', direction: 'asc' }],
            onSort: () => {},
          }}
        />
      );

      expect(extractGridData(component)).toEqual([
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
      const component = mount(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      expect(extractGridData(component)).toEqual([
        ['A', 'B'],
        ['0-A', '0-B'],
        ['1-A', '1-B'],
      ]);

      component.setProps({
        columns: [{ id: 'A' }, { id: 'C' }],
        columnVisibility: {
          visibleColumns: ['A', 'C'],
          setVisibleColumns: () => {},
        },
      });

      expect(extractGridData(component)).toEqual([
        ['A', 'C'],
        ['0-A', '0-C'],
        ['1-A', '1-C'],
      ]);
    });

    it('"Hide fields" updates', () => {
      const component = mount(
        <EuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      // verify original column list is A, B
      let popover = openColumnSelector(component);
      expect(
        popover
          .find('.euiDataGridColumnSelector__item')
          .map(item => item.text())
      ).toEqual(['A', 'B']);
      closeColumnSelector(component);

      // update columns
      component.setProps({
        columns: [{ id: 'A' }, { id: 'C' }],
        columnVisibility: {
          visibleColumns: ['A', 'C'],
          setVisibleColumns: () => {},
        },
      });

      // test that the column list updated to A,C
      popover = openColumnSelector(component);
      expect(
        popover
          .find('.euiDataGridColumnSelector__item')
          .map(item => item.text())
      ).toEqual(['A', 'C']);
      closeColumnSelector(component);
    });

    it('"Sort fields" updates', () => {
      const component = mount(
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
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      // verify original column list is A, B
      openColumnSorter(component);
      let popover = openColumnSorterSelection(component);
      expect(
        popover
          .find('.euiDataGridColumnSorting__field')
          .map(item => item.text())
      ).toEqual(['A', 'B']);
      closeColumnSorterSelection(component);
      closeColumnSorter(component);

      // update columns
      component.setProps({
        columns: [{ id: 'A' }, { id: 'C' }],
        columnVisibility: {
          visibleColumns: ['A', 'C'],
          setVisibleColumns: () => {},
        },
      });

      // test that the column list updated to A,C
      openColumnSorter(component);
      popover = openColumnSorterSelection(component);
      expect(
        popover
          .find('.euiDataGridColumnSorting__field')
          .map(item => item.text())
      ).toEqual(['A', 'C']);
      closeColumnSorterSelection(component);
      closeColumnSorter(component);
    });
  });

  describe('render column actions', () => {
    it('renders various column actions configurations', () => {
      const component = mount(
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
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      const buttonA = findTestSubject(
        component,
        'dataGridHeaderCellActionButton-A'
      );
      expect(buttonA.length).toBe(0);

      for (const col of ['B', 'C', 'D', 'E']) {
        const button = findTestSubject(
          component,
          `dataGridHeaderCellActionButton-${col}`
        );
        button.simulate('click');
        component.update();
        const actionGroup = findTestSubject(
          component,
          `dataGridHeaderCellActionGroup-${col}`
        );
        expect(actionGroup).toMatchSnapshot();
      }
    });
  });

  describe('render column cell actions', () => {
    it('renders various column cell actions configurations', () => {
      const alertFn = jest.fn();
      const happyFn = jest.fn();
      const component = mount(
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
                {
                  iconType: 'alert',
                  label: 'test1',
                  'aria-label': 'test1 aria label',
                  callback: alertFn,
                  'data-test-subj': 'alertAction',
                },
                {
                  iconType: 'faceHappy',
                  label: 'test2',
                  'aria-label': 'test2 aria label',
                  callback: happyFn,
                  'data-test-subj': 'happyAction',
                  inPopoverButton: ({ rowIndex, columnId }) => (
                    <EuiButton
                      data-test-subj="happyActionCustomBtn"
                      onClick={() => happyFn(rowIndex, columnId)}
                      iconType="faceHappy"
                      aria-label="happy aria label">
                      {`test2 ${rowIndex} ${columnId}`}
                    </EuiButton>
                  ),
                },
              ],
            },
          ]}
          columnVisibility={{
            visibleColumns: ['A'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      findTestSubject(component, 'alertAction')
        .at(1)
        .simulate('click');
      expect(alertFn).toHaveBeenCalledWith(1, 'A');
      findTestSubject(component, 'happyAction')
        .at(1)
        .simulate('click');
      expect(happyFn).toHaveBeenCalledWith(1, 'A');
      alertFn.mockReset();
      happyFn.mockReset();

      findTestSubject(component, 'dataGridRowCell')
        .at(1)
        .simulate('keydown', { key: keys.ENTER });
      component.update();

      findTestSubject(component, 'alertActionPopover').simulate('click');
      expect(alertFn).toHaveBeenCalledWith(1, 'A');
      findTestSubject(component, 'happyActionCustomBtn').simulate('click');
      expect(happyFn).toHaveBeenCalledWith(1, 'A');
    });
  });

  describe('keyboard controls', () => {
    it('supports simple arrow navigation', () => {
      let pagination = {
        pageIndex: 0,
        pageSize: 3,
        pageSizeOptions: [3, 6, 10],
        onChangePage: (pageIndex: number) => {
          pagination = {
            ...pagination,
            pageIndex,
          };
          component.setProps({ pagination });
        },
        onChangeItemsPerPage: () => {},
      };

      const component = mount(
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
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
          pagination={pagination}
        />
      );

      // enable the grid to accept focus
      act(() =>
        component
          .find('div [data-test-subj="dataGridWrapper"][onFocus]')
          .props().onFocus!({} as React.FocusEvent)
      );
      component.update();

      let focusableCell = getFocusableCell(component);
      // focus should begin at the first cell
      expect(focusableCell.length).toEqual(1);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, A');

      // focus should not move when up against the left edge
      focusableCell
        .simulate('focus')
        .simulate('keydown', { key: keys.ARROW_LEFT });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, A');

      // focus should not move when up against the top edge
      focusableCell.simulate('keydown', { key: keys.ARROW_UP });
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, A');

      // move down
      focusableCell.simulate('keydown', { key: keys.ARROW_DOWN });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('1, A');

      // move right
      focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('1, B');

      // move up
      focusableCell.simulate('keydown', { key: keys.ARROW_UP });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, B');

      // move left
      focusableCell.simulate('keydown', { key: keys.ARROW_LEFT });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, A');

      // move down and to the end of the row
      focusableCell
        .simulate('keydown', { key: keys.ARROW_DOWN })
        .simulate('keydown', { key: keys.END });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('1, C');

      // move up and to the beginning of the row
      focusableCell
        .simulate('keydown', { key: keys.ARROW_UP })
        .simulate('keydown', { key: keys.HOME });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, A');

      // jump to the last cell
      focusableCell.simulate('keydown', {
        ctrlKey: true,
        key: keys.END,
      });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('2, C');

      // jump to the first cell
      focusableCell.simulate('keydown', {
        ctrlKey: true,
        key: keys.HOME,
      });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, A');

      // page should not change when moving before the first entry
      // but the last row should remain focused
      focusableCell.simulate('keydown', {
        key: keys.PAGE_UP,
      });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('2, A');

      // advance to the next page
      focusableCell.simulate('keydown', {
        key: keys.PAGE_DOWN,
      });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('3, A');

      // move over one column and advance one more page
      focusableCell
        .simulate('keydown', { key: keys.ARROW_RIGHT }) // 3, B
        .simulate('keydown', {
          key: keys.PAGE_DOWN,
        }); // 6, B
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('6, B');

      // does not advance beyond the last page
      focusableCell.simulate('keydown', {
        key: keys.PAGE_DOWN,
      });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('6, B');

      // move left one column, return to the previous page
      focusableCell
        .simulate('keydown', { key: keys.ARROW_LEFT }) // 6, A
        .simulate('keydown', {
          key: keys.PAGE_UP,
        }); // 5, A
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('5, A');

      // return to the previous (first) page
      focusableCell.simulate('keydown', {
        key: keys.PAGE_UP,
      });
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('2, A');

      // move to the last cell of the page then advance one page
      focusableCell
        .simulate('keydown', {
          ctrlKey: true,
          key: keys.END,
        }) // 2, C (last cell of the first page)
        .simulate('keydown', {
          key: keys.PAGE_DOWN,
        }); // 3, C (first cell of the second page, same cell position as previous page)
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('3, C');

      // advance to the final page
      focusableCell.simulate('keydown', {
        key: keys.PAGE_DOWN,
      }); // 6, C
      focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('6, C');
    });

    it('does not break arrow key focus control behavior when also using a mouse', () => {
      const component = mount(
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
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
        />
      );

      // enable the grid to accept focus
      act(() =>
        component
          .find('div [data-test-subj="dataGridWrapper"][onFocus]')
          .props().onFocus!({} as React.FocusEvent)
      );
      component.update();

      let focusableCell = getFocusableCell(component);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('0, A');

      findTestSubject(component, 'dataGridRowCell')
        .at(3)
        .simulate('focus');

      focusableCell = getFocusableCell(component);
      expect(focusableCell.length).toEqual(1);
      expect(
        focusableCell.find('[data-test-subj="cell-content"]').text()
      ).toEqual('1, B');
    });
    it.skip('supports arrow navigation through grids with different interactive cells', () => {
      const component = mount(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B', 'C', 'D'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) => {
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
          }}
        />
      );

      /**
       * Make sure we start from a happy state
       */
      let focusableCell = getFocusableCell(component);
      expect(focusableCell.length).toEqual(1);
      expect(focusableCell.text()).toEqual('0, A');
      focusableCell
        .simulate('focus')
        .simulate('keydown', { key: keys.ARROW_DOWN });

      /**
       * On text only cells, the cell receives focus
       */
      focusableCell = getFocusableCell(component);
      expect(focusableCell.text()).toEqual('1, A'); // make sure we're on the right cell
      expect(focusableCell.getDOMNode()).toBe(document.activeElement);

      focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });

      /**
       * On cells with 1 interactive item, the interactive item receives focus
       */
      focusableCell = getFocusableCell(component);
      expect(focusableCell.text()).toEqual('1, B');
      expect(focusableCell.find('button').getDOMNode()).toBe(
        document.activeElement
      );

      focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });

      /**
       * On cells with multiple interactive items, the cell receives focus
       */
      focusableCell = getFocusableCell(component);
      expect(focusableCell.text()).toEqual('1, C');
      expect(focusableCell.getDOMNode()).toBe(document.activeElement);

      focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });

      /**
       * On cells with 1 interactive item and non-interactive item(s), the cell receives focus
       */
      focusableCell = getFocusableCell(component);
      expect(focusableCell.text()).toEqual('1, D');
      expect(focusableCell.getDOMNode()).toBe(document.activeElement);
    });
    it.skip('allows user to enter and exit grid navigation', async () => {
      const component = mount(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) => (
            <>
              <button>{rowIndex}</button>, <button>{columnId}</button>
            </>
          )}
        />
      );

      /**
       * Make sure we start from a happy state
       */
      let focusableCell = getFocusableCell(component);
      expect(focusableCell.length).toEqual(1);
      expect(focusableCell.text()).toEqual('0, A');
      focusableCell
        .simulate('focus')
        .simulate('keydown', { key: keys.ARROW_DOWN });
      focusableCell = getFocusableCell(component);

      /**
       * Confirm initial state is with grid navigation turn on
       */
      expect(focusableCell.text()).toEqual('1, A');
      expect(focusableCell.getDOMNode()).toBe(document.activeElement);
      expect(takeMountedSnapshot(component)).toMatchSnapshot();

      /**
       * Disable grid navigation using ENTER
       */
      focusableCell
        .simulate('keydown', { key: keys.ENTER })
        .simulate('keydown', { key: keys.ARROW_DOWN });

      let buttons = focusableCell.find('button');

      // grid navigation is disabled, location should not move
      expect(buttons.at(0).text()).toEqual('1');
      expect(buttons.at(1).text()).toEqual('A');
      expect(buttons.at(0).getDOMNode()).toBe(document.activeElement); // focus should move to first button
      expect(takeMountedSnapshot(component)).toMatchSnapshot(); // should prove focus lock is on

      /**
       * Enable grid navigation ESCAPE
       */
      focusableCell.simulate('keydown', { key: keys.ESCAPE });
      focusableCell = getFocusableCell(component);
      expect(focusableCell.getDOMNode()).toBe(document.activeElement); // focus should move back to cell

      focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });
      focusableCell = getFocusableCell(component);
      expect(focusableCell.text()).toEqual('1, B'); // grid navigation is enabled again, check that we can move
      expect(takeMountedSnapshot(component)).toMatchSnapshot();

      /**
       * Disable grid navigation using F2
       */
      focusableCell = getFocusableCell(component);
      focusableCell
        .simulate('keydown', { key: keys.F2 })
        .simulate('keydown', { key: keys.ARROW_UP });
      buttons = focusableCell.find('button');

      // grid navigation is disabled, location should not move
      expect(buttons.at(0).text()).toEqual('1');
      expect(buttons.at(1).text()).toEqual('B');
      expect(buttons.at(0).getDOMNode()).toBe(document.activeElement); // focus should move to first button
      expect(takeMountedSnapshot(component)).toMatchSnapshot(); // should prove focus lock is on

      /**
       * Enable grid navigation using F2
       */
      focusableCell.simulate('keydown', { key: keys.F2 });
      focusableCell = getFocusableCell(component);
      expect(focusableCell.getDOMNode()).toBe(document.activeElement); // focus should move back to cell

      focusableCell.simulate('keydown', { key: keys.ARROW_UP });
      focusableCell = getFocusableCell(component);
      expect(focusableCell.text()).toEqual('0, B'); // grid navigation is enabled again, check that we can move
      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });
  });
});
