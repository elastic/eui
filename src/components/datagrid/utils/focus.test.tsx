/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook, renderHookAct } from '../../../test/rtl';
import { keys } from '../../../services';
import {
  useFocus,
  notifyCellOfFocusState,
  createKeyDownHandler,
  preventTabbing,
  getParentCellContent,
} from './focus';

describe('useFocus', () => {
  describe('onFocusUpdate', () => {
    it("adds a cell's onFocus callback to the internal cellsUpdateFocus map,", () => {
      const onFocus = jest.fn();
      const { result } = renderHook(() => useFocus());
      const cleanupFn = result.current.onFocusUpdate([0, 0], onFocus);

      // the mapped onFocus is called with true when the cell becomes focused
      renderHookAct(() => result.current.setFocusedCell([0, 0]));
      expect(onFocus).toHaveBeenCalledWith(true);

      // the mapped onFocus is called with false when another cell becomes focused
      renderHookAct(() => result.current.setFocusedCell([1, 1]));
      expect(onFocus).toHaveBeenCalledWith(false);

      // the returned function removes the cell from the internal cellsUpdateFocus map
      cleanupFn();
      // Note: there's no great way to assert this since cellsUpdateFocus is internal,
      // so this is mostly here to document behavior and for line coverage
    });
  });

  describe('focusedCell / setFocusedCell', () => {
    it('gets and sets the focusedCell state', () => {
      const { result } = renderHook(() => useFocus());
      expect(result.current.focusedCell).toEqual(undefined);

      renderHookAct(() => result.current.setFocusedCell([2, 2]));
      expect(result.current.focusedCell).toEqual([2, 2]);
    });

    it('does not update if setFocusedCell is called with the same cell X/Y coordinates', () => {
      const { result } = renderHook(() => useFocus());
      renderHookAct(() => result.current.setFocusedCell([2, 2]));

      const focusedCellInMemory = result.current.focusedCell;
      renderHookAct(() => result.current.setFocusedCell([2, 2]));
      expect(result.current.focusedCell).toBe(focusedCellInMemory); // Would fail if the exact same array wasn't returned
    });
  });

  describe('focusFirstVisibleInteractiveCell', () => {
    it('focuses the first sticky header cell', () => {
      const { result } = renderHook(() => useFocus());

      renderHookAct(() => result.current.focusFirstVisibleInteractiveCell());
      expect(result.current.focusedCell).toEqual([0, -1]);
    });
  });

  describe('setIsFocusedCellInView / focusProps', () => {
    describe('when no focused child cell is in view', () => {
      it('renders the grid with tabindex 0 and an onKeyUp event', () => {
        const { focusProps } = renderHook(() => useFocus()).result.current;

        expect(focusProps).toEqual({
          tabIndex: 0,
          onKeyUp: expect.any(Function),
        });
      });

      describe('onKeyUp event', () => {
        const mockGrid = document.createElement('div');
        const someChild = mockGrid.appendChild(
          document.createElement('button')
        );

        it('focuses into the first visible cell of the grid when the grid is directly tabbed to', () => {
          const { result } = renderHook(() => useFocus());

          renderHookAct(() =>
            result.current.focusProps.onKeyUp!({
              key: keys.TAB,
              target: mockGrid,
              currentTarget: mockGrid,
            } as any)
          );
          expect(result.current.focusedCell).toEqual([0, -1]);
        });

        it('does nothing if not a tab keyup, or if the event was not on the grid itself', () => {
          const { result } = renderHook(() => useFocus());

          renderHookAct(() =>
            result.current.focusProps.onKeyUp!({
              key: keys.ARROW_DOWN,
              target: mockGrid,
              currentTarget: mockGrid,
            } as any)
          );
          expect(result.current.focusedCell).toEqual(undefined);

          renderHookAct(() =>
            result.current.focusProps.onKeyUp!({
              key: keys.TAB,
              target: someChild,
              currentTarget: mockGrid,
            } as any)
          );
          expect(result.current.focusedCell).toEqual(undefined);
        });
      });
    });

    describe('when a focused cell is in view', () => {
      it('renders the grid with tabindex -1 (because the child cell will already have a tabindex 0)', () => {
        const { result } = renderHook(() => useFocus());

        renderHookAct(() => result.current.setIsFocusedCellInView(true));
        expect(result.current.focusProps).toEqual({
          tabIndex: -1,
        });
      });
    });
  });
});

describe('notifyCellOfFocusState', () => {
  const onFocus = jest.fn();
  const cellsUpdateFocus = new Map();
  cellsUpdateFocus.set('0-0', onFocus);

  it("looks through the cellsUpdateFocus map and calls the focused cell's onFocus callback", () => {
    notifyCellOfFocusState(cellsUpdateFocus, [0, 0], true);
    expect(onFocus).toHaveBeenLastCalledWith(true);

    notifyCellOfFocusState(cellsUpdateFocus, [0, 0], false);
    expect(onFocus).toHaveBeenLastCalledWith(false);
  });

  it('does not error if the cell does not exist in the map', () => {
    notifyCellOfFocusState(cellsUpdateFocus, [1, 1], true);
  });
});

describe('createKeyDownHandler', () => {
  const focusContext = {
    focusedCell: [0, 0],
    setFocusedCell: jest.fn(),
  } as any;
  const mockArgs = {
    gridElement: document.createElement('div'),
    visibleColCount: 5,
    visibleRowCount: 10,
    visibleRowStartIndex: 0,
    rowCount: 10,
    pagination: undefined,
    hasFooter: false,
    focusContext,
  };
  const mockKeyDown = {
    preventDefault: jest.fn(),
    key: keys.ARROW_UP,
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure document.activeElement is inside the grid pass the early return
    const mockFocus = mockArgs.gridElement.appendChild(
      document.createElement('button')
    );
    mockFocus.focus();
  });

  describe('left arrow key', () => {
    it('moves the focusedCell x position left by 1', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: [1, 1] },
      });
      keyDownHandler({ ...mockKeyDown, key: keys.ARROW_LEFT });
      expect(focusContext.setFocusedCell).toHaveBeenCalledWith([0, 1]);
    });

    describe('when focus is on the left-most column', () => {
      it('does nothing', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          focusContext: { ...focusContext, focusedCell: [0, 1] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.ARROW_LEFT });
        expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
      });
    });
  });

  describe('right arrow key', () => {
    it('moves the focusedCell x position right by 1', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: [1, 1] },
      });
      keyDownHandler({ ...mockKeyDown, key: keys.ARROW_RIGHT });
      expect(focusContext.setFocusedCell).toHaveBeenCalledWith([2, 1]);
    });

    describe('when focus is on the right-most column', () => {
      it('does nothing', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          focusContext: { ...focusContext, focusedCell: [4, 1] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.ARROW_RIGHT });
        expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
      });
    });
  });

  describe('down arrow key', () => {
    it('moves the focusedCell y position down by 1', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: [1, 1] },
      });
      keyDownHandler({ ...mockKeyDown, key: keys.ARROW_DOWN });
      expect(focusContext.setFocusedCell).toHaveBeenCalledWith([1, 2]);
    });

    describe('when focus is on the bottom-most row', () => {
      it('does nothing', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          focusContext: { ...focusContext, focusedCell: [1, 9] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.ARROW_DOWN });
        expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
      });

      it('accounts for the footer row', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          hasFooter: true,
          focusContext: { ...focusContext, focusedCell: [1, 10] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.ARROW_DOWN });
        expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
      });
    });

    describe('when moving focus down from the sticky header', () => {
      it('moves focus down to the visibleRowStartIndex, since rowIndex 0 may not be virtualized', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          visibleRowStartIndex: 5,
          focusContext: { ...focusContext, focusedCell: [1, -1] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.ARROW_DOWN });
        expect(focusContext.setFocusedCell).toHaveBeenCalledWith([1, 5]);
      });
    });
  });

  describe('up arrow key', () => {
    it('moves the focusedCell y position up by 1', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: [1, 1] },
      });
      keyDownHandler({ ...mockKeyDown, key: keys.ARROW_UP });
      expect(focusContext.setFocusedCell).toHaveBeenCalledWith([1, 0]);
    });

    it('does nothing when focus is on the top-most header row', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: [1, -1] },
      });
      keyDownHandler({ ...mockKeyDown, key: keys.ARROW_UP });
      expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
    });
  });

  describe('page down key', () => {
    describe('when grid pagination is set', () => {
      const pagination = {
        pageIndex: 0,
        pageSize: 5,
        pageSizeOptions: [5],
        onChangePage: jest.fn(),
        onChangeItemsPerPage: () => {},
      };

      it('paginates to the next page and sets the focus to the first data row on that page', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          pagination,
          focusContext: { ...focusContext, focusedCell: [2, 5] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.PAGE_DOWN });

        expect(pagination.onChangePage).toHaveBeenCalledWith(1);
        expect(focusContext.setFocusedCell).toHaveBeenCalledWith([2, 0]);
      });

      it('does not paginate if already on the last page, but still moves focus to the last row', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          pagination: { ...pagination, pageIndex: 1 },
          focusContext: { ...focusContext, focusedCell: [2, 5] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.PAGE_DOWN });

        expect(pagination.onChangePage).not.toHaveBeenCalled();
        expect(focusContext.setFocusedCell).toHaveBeenCalledWith([2, 0]);
      });
    });

    describe('when grid pagination is not set', () => {
      it('does nothing', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          pagination: undefined,
        });
        keyDownHandler({ ...mockKeyDown, key: keys.PAGE_DOWN });
        expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
      });
    });
  });

  describe('page up key', () => {
    describe('when grid pagination is set', () => {
      const pagination = {
        pageIndex: 1,
        pageSize: 5,
        pageSizeOptions: [5],
        onChangePage: jest.fn(),
        onChangeItemsPerPage: () => {},
      };

      it('paginates to the previous page and sets the focus to the last data row on that page', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          pagination,
          focusContext: { ...focusContext, focusedCell: [2, 1] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.PAGE_UP });

        expect(pagination.onChangePage).toHaveBeenCalled();
        expect(focusContext.setFocusedCell).toHaveBeenCalledWith([2, 4]);
      });

      it('does not paginate if already on the first page, but still moves focus to the last row', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          pagination: { ...pagination, pageIndex: 0 },
          focusContext: { ...focusContext, focusedCell: [2, 1] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.PAGE_UP });

        expect(pagination.onChangePage).not.toHaveBeenCalledWith(0);
        expect(focusContext.setFocusedCell).toHaveBeenCalledWith([2, 4]);
      });
    });

    describe('when grid pagination is not set', () => {
      it('does nothing', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          pagination: undefined,
        });
        keyDownHandler({ ...mockKeyDown, key: keys.PAGE_UP });
        expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
      });
    });
  });

  describe('home key', () => {
    it('moves the focusedCell to the leftmost column in the current row', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: [2, 2] },
      });
      keyDownHandler({ ...mockKeyDown, key: keys.HOME });
      expect(focusContext.setFocusedCell).toHaveBeenCalledWith([0, 2]);
    });

    describe('ctrl+home key', () => {
      it('moves the focusedCell to the topmost and leftmost cell on the current page', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          focusContext: { ...focusContext, focusedCell: [2, 2] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.HOME, ctrlKey: true });
        expect(focusContext.setFocusedCell).toHaveBeenCalledWith([0, 0]);
      });
    });
  });

  describe('end key', () => {
    it('moves the focusedCell to the rightmost column in the current row', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: [2, 2] },
      });
      keyDownHandler({ ...mockKeyDown, key: keys.END });
      expect(focusContext.setFocusedCell).toHaveBeenCalledWith([4, 2]);
    });

    describe('ctrl+end key', () => {
      it('moves the focusedCell to the rightmost and bottommost cell on the current page', () => {
        const keyDownHandler = createKeyDownHandler({
          ...mockArgs,
          focusContext: { ...focusContext, focusedCell: [2, 2] },
        });
        keyDownHandler({ ...mockKeyDown, key: keys.END, ctrlKey: true });
        expect(focusContext.setFocusedCell).toHaveBeenCalledWith([4, 9]);
      });
    });
  });

  it('does nothing for other non-navigation keys', () => {
    const keyDownHandler = createKeyDownHandler(mockArgs);
    keyDownHandler({ ...mockKeyDown, key: keys.SPACE });
    expect(focusContext.setFocusedCell).not.toHaveBeenCalled();
  });

  // mostly here for branch/code coverage
  describe('early returns', () => {
    test('unintialized focusedCell', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        focusContext: { ...focusContext, focusedCell: undefined },
      });
      keyDownHandler(mockKeyDown);
      expect(mockKeyDown.preventDefault).not.toHaveBeenCalled();
    });

    test('unintialized grids', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        gridElement: null,
      });
      keyDownHandler(mockKeyDown);
      expect(mockKeyDown.preventDefault).not.toHaveBeenCalled();
    });

    test('document.activeElement is not inside the grid', () => {
      const keyDownHandler = createKeyDownHandler({
        ...mockArgs,
        gridElement: document.createElement('div'),
      });
      keyDownHandler(mockKeyDown);
      expect(mockKeyDown.preventDefault).not.toHaveBeenCalled();
    });
  });
});

describe('preventTabbing', () => {
  const mockCellWithInteractiveChildren = () => {
    const cell = document.createElement('div');
    cell.setAttribute('data-datagrid-cellcontent', 'true');

    const button = cell.appendChild(document.createElement('button'));
    const link = cell.appendChild(document.createElement('a'));
    link.setAttribute('href', 'courageous');

    return [cell, button, link];
  };

  it('on mutation, sets all interactive children of the parent cell to tabindex -1', () => {
    const [cell, button, link] = mockCellWithInteractiveChildren();
    preventTabbing([{ target: cell }] as any);

    expect(button.getAttribute('tabIndex')).toEqual('-1');
    expect(button.getAttribute('data-datagrid-interactable')).toEqual('true');

    expect(link.getAttribute('tabIndex')).toEqual('-1');
    expect(link.getAttribute('data-datagrid-interactable')).toEqual('true');
  });

  it('stops early if two separate mutation records occur from the same cell', () => {
    const [button, link] = mockCellWithInteractiveChildren();
    preventTabbing([{ target: button }, { target: link }] as any);

    // There isn't a super great way of asserting a continue,
    // so this is mostly just here for line code coverage
  });

  it('does nothing if the mutation event does not have a valid parent cell', () => {
    const notCell = document.createElement('div');
    preventTabbing([{ target: notCell }] as any);

    // There isn't a super great way of asserting this,
    // so this is mostly just here for branch code coverage
  });

  it('ignores header cells that manage their own tabindex state (data-euigrid-tab-managed attr)', () => {
    const [cell, button] = mockCellWithInteractiveChildren();
    button.setAttribute('data-euigrid-tab-managed', 'true');
    button.setAttribute('tabIndex', '0');

    preventTabbing([{ target: cell }] as any);

    expect(button.getAttribute('tabIndex')).toEqual('0');
  });
});

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
    expect(getParentCellContent(span)).toBe(cell);
  });

  it('locates the cell element when starting with a text node inside the cell', () => {
    expect(getParentCellContent(text)).toBe(cell);
  });

  it('does not locate the cell element when starting outside the cell', () => {
    expect(getParentCellContent(body)).toBeNull();
  });
});
