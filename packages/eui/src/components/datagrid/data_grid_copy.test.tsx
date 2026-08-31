/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { EuiButtonIcon } from '../button';
import { EuiCheckbox } from '../form';
import { EuiScreenReaderOnly } from '../accessibility';
import { onTabularCopy } from '../../services/copy/tabular_copy';
import { EuiDataGrid } from './data_grid';
import type { EuiDataGridProps } from './data_grid_types';

const getSelectedTextFromFirstDataHeader = (
  container: HTMLElement,
  firstDataColumnId: string
): string => {
  const grid = container.querySelector('.euiDataGrid__content');
  const firstDataHeader = container.querySelector(
    `[data-gridcell-column-id="${firstDataColumnId}"][role="columnheader"]`
  );

  if (!grid || !firstDataHeader) {
    throw new Error('Expected grid content and first data header to render');
  }

  const walker = document.createTreeWalker(grid, NodeFilter.SHOW_TEXT);
  let started = false;
  let selectedText = '';

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!started) {
      if (!firstDataHeader.contains(node)) continue;
      started = true;
    }
    selectedText += node.textContent ?? '';
  }

  return selectedText;
};

const copySelectedText = (selectedText: string): string => {
  const mockSetData = jest.fn();
  const mockEvent = {
    clipboardData: { setData: mockSetData },
    preventDefault: jest.fn(),
  } as unknown as ClipboardEvent;

  jest.spyOn(window, 'getSelection').mockReturnValue({
    toString: () => selectedText,
  } as Selection);

  onTabularCopy(mockEvent);

  expect(mockSetData).toHaveBeenCalledWith('text/plain', expect.any(String));
  return mockSetData.mock.calls[0][1] as string;
};

const controlColumns: Pick<
  EuiDataGridProps,
  'leadingControlColumns' | 'trailingControlColumns'
> = {
  leadingControlColumns: [
    {
      id: 'select',
      width: 32,
      headerCellRender: () => (
        <EuiCheckbox
          id="selectAll"
          aria-label="Select all rows"
          onChange={() => {}}
        />
      ),
      rowCellRender: ({ rowIndex }) => (
        <EuiCheckbox
          id={`selectRow${rowIndex}`}
          aria-label={`Select row ${rowIndex + 1}`}
          onChange={() => {}}
        />
      ),
    },
  ],
  trailingControlColumns: [
    {
      id: 'actions',
      width: 40,
      headerCellRender: () => (
        <EuiScreenReaderOnly>
          <span>Row actions</span>
        </EuiScreenReaderOnly>
      ),
      rowCellRender: () => (
        <EuiButtonIcon iconType="boxesHorizontal" aria-label="Open actions" />
      ),
    },
  ],
};

describe('EuiDataGrid tabular copy', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('keeps headers aligned with body rows when control columns are present (#9951)', () => {
    const { container } = render(
      <EuiDataGrid
        aria-label="grid for copy testing"
        toolbarVisibility={false}
        columns={[
          { id: 'a', display: 'First', actions: false },
          { id: 'b', display: 'Second', actions: false },
        ]}
        columnVisibility={{
          visibleColumns: ['a', 'b'],
          setVisibleColumns: () => {},
        }}
        rowCount={2}
        renderCellValue={({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`}
        {...controlColumns}
      />
    );

    const copiedText = copySelectedText(
      getSelectedTextFromFirstDataHeader(container, 'a')
    );
    const rows = copiedText.split('\n').filter((row) => row.length > 0);
    const headerCells = rows[0].split('\t');
    const bodyRows = rows.slice(1).map((row) => row.split('\t'));

    expect(headerCells).toEqual(['First', 'Second']);
    expect(bodyRows).toEqual([
      ['a, 0', 'b, 0'],
      ['a, 1', 'b, 1'],
    ]);
  });
});
