/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../../test';

import {
  getParentCellContent,
  useKeyboardFocusScrollWorkaround,
} from './focus';

describe('getParentCellContent', () => {
  const doc = document.createDocumentFragment();

  const body = document.createElement('body');
  doc.appendChild(body);

  const cell = document.createElement('div');
  cell.setAttribute('data-datagrid-cellcontent', 'true');
  body.appendChild(cell);

  const span = document.createElement('span');
  span.textContent = 'Here comes the text';
  cell.appendChild(span);

  const text = span.childNodes[0];

  it('locates the cell element when starting with the cell itself', () => {
    expect(getParentCellContent(cell)).toBe(cell);
  });

  it('locates the cell element when starting with an element inside the cell', () => {
    expect(getParentCellContent(span!)).toBe(cell);
  });

  it('locates the cell element when starting with a text node inside the cell', () => {
    expect(getParentCellContent(text!)).toBe(cell);
  });

  it('does not locate the cell element when starting outside the cell', () => {
    expect(getParentCellContent(body)).toBeNull();
  });
});

describe('useKeyboardFocusScrollWorkaround', () => {
  const gridRef = {
    current: {
      scrollToItem: jest.fn(),
      scrollTo: jest.fn(),
    },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls scrollToItem whenever a new cell is focused via keyboard navigation', () => {
    testCustomHook(() =>
      useKeyboardFocusScrollWorkaround({
        focusedCell: [1, 0], // previous cell is [0, 0], so this is navigating to the right
        visibleRowCount: 3,
        gridRef,
      })
    );

    expect(gridRef.current.scrollToItem).toHaveBeenCalledWith({
      columnIndex: 1,
      rowIndex: 0,
    });
  });

  it('does not call scrollToItem when keyboard navigating downwards', () => {
    testCustomHook(() =>
      useKeyboardFocusScrollWorkaround({
        focusedCell: [0, 1], // previous cell is [0, 0]
        visibleRowCount: 3,
        gridRef,
      })
    );

    expect(gridRef.current.scrollToItem).not.toHaveBeenCalled();
  });

  it('calls scrollTo with a manual height calculation when navigating on the last row', () => {
    testCustomHook(() =>
      useKeyboardFocusScrollWorkaround({
        focusedCell: [2, 2],
        visibleRowCount: 3,
        gridRef: {
          current: {
            ...gridRef.current,
            _outerRef: { clientHeight: 200, firstChild: { clientHeight: 500 } },
          },
        },
      })
    );

    expect(gridRef.current.scrollToItem).toHaveBeenCalledWith({
      columnIndex: 2,
    });
    expect(gridRef.current.scrollTo).toHaveBeenCalledWith({ scrollTop: 300 });
  });

  it('does nothing if there is no currently focused cell', () => {
    testCustomHook(() =>
      useKeyboardFocusScrollWorkaround({
        focusedCell: undefined,
        visibleRowCount: 0,
        gridRef,
      })
    );

    expect(gridRef.current.scrollToItem).not.toHaveBeenCalled();
  });
});
