/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, renderHook } from '../../../test/rtl';
import { useScrollCellIntoView, useScrollBars } from './scrolling';

// see scrolling.spec.tsx for E2E useScroll tests

describe('useScrollCellIntoView', () => {
  const scrollToItem = jest.fn();
  const scrollTo = jest.fn();

  const mockCell = {
    parentNode: { offsetTop: 30 },
    offsetLeft: 0,
    offsetWidth: 100,
    offsetHeight: 20,
  } as any;
  const getCell = jest.fn(() => mockCell);

  const args = {
    gridRef: {
      current: { scrollTo, scrollToItem },
    } as any,
    outerGridRef: {
      current: {
        offsetHeight: 400,
        clientHeight: 380, // accounts for scrollbars
        offsetWidth: 500,
        clientWidth: 480, // accounts for scrollbars
        scrollTop: 0,
        scrollLeft: 0,
        querySelector: getCell,
      } as any,
    },
    hasGridScrolling: true,
    headerRowHeight: 0,
    footerRowHeight: 0,
    visibleRowCount: 100,
    hasStickyFooter: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getCell.mockReturnValue(mockCell);
  });

  it('does nothing if the grid references are unavailable', () => {
    const { scrollCellIntoView } = renderHook(() =>
      useScrollCellIntoView({
        ...args,
        gridRef: { current: null },
        outerGridRef: { current: null },
      })
    ).result.current;

    scrollCellIntoView({ rowIndex: 0, colIndex: 0 });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('does nothing if the grid does not scroll', () => {
    const { scrollCellIntoView } = renderHook(() =>
      useScrollCellIntoView({
        ...args,
        hasGridScrolling: false,
      })
    ).result.current;

    scrollCellIntoView({ rowIndex: 0, colIndex: 0 });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('calls scrollToItem if the specified cell is not virtualized', async () => {
    getCell.mockReturnValue(null);
    const { scrollCellIntoView } = renderHook(() => useScrollCellIntoView(args))
      .result.current;

    await scrollCellIntoView({ rowIndex: 20, colIndex: 5 });
    expect(scrollToItem).toHaveBeenCalledWith({ columnIndex: 5, rowIndex: 20 });
  });

  it("does nothing if the current cell is in view and not outside the grid's scroll bounds", () => {
    getCell.mockReturnValue({
      ...mockCell,
      parentNode: { offsetTop: 50 },
      offsetLeft: 50,
    });
    const { scrollCellIntoView } = renderHook(() => useScrollCellIntoView(args))
      .result.current;

    scrollCellIntoView({ rowIndex: 1, colIndex: 1 });
    expect(scrollToItem).not.toHaveBeenCalled();
    expect(scrollTo).not.toHaveBeenCalled();
  });

  describe('right scroll adjustments', () => {
    it('scrolls the grid right if the right side of the cell is out of view', () => {
      const cell = {
        ...mockCell,
        offsetLeft: 400,
        offsetWidth: 100,
      };
      const grid = {
        scrollLeft: 0,
        clientWidth: 450,
      };

      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 1, colIndex: 5 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 50, scrollTop: 0 });
    });

    it('correctly accounts for header cells inside EuiDraggable', () => {
      const mockEuiDraggable = {
        offsetLeft: 500,
      };
      const cell = {
        ...mockCell,
        offsetLeft: 0,
        offsetWidth: 100,
        offsetParent: mockEuiDraggable,
      };
      const grid = {
        offsetWidth: 600,
        clientWidth: 200,
      };

      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          canDragAndDropColumns: true,
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: -1, colIndex: 4 });
      // should scroll all the way to the right, aka the grid's offsetWidth - clientWidth
      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 400, scrollTop: 0 });
    });
  });

  describe('left scroll adjustments', () => {
    it('scrolls the grid left if the left side of the cell is out of view', () => {
      const cell = {
        ...mockCell,
        offsetLeft: 0,
        offsetWidth: 100,
      };
      const grid = {
        scrollLeft: 50,
      };

      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 1, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 0, scrollTop: 0 });
    });

    it('scrolls to the left side over the right if the cell width is larger than the grid width', () => {
      const cell = {
        ...mockCell,
        offsetLeft: 50,
        offsetWidth: 300,
      };
      const grid = {
        scrollLeft: 100,
        clientWidth: 250,
      };

      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 1, colIndex: 1 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 50, scrollTop: 0 });
    });

    it('correctly accounts for header cells inside EuiDraggable', () => {
      const mockEuiDraggable = {
        offsetLeft: 100,
      };
      const cell = {
        ...mockCell,
        offsetLeft: 0,
        offsetWidth: 100,
        offsetParent: mockEuiDraggable,
      };
      const grid = {
        scrollLeft: 300,
      };

      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          canDragAndDropColumns: true,
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: -1, colIndex: 1 });
      // should have been called with mockEuiDraggable's offsetLeft
      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 100, scrollTop: 0 });
    });
  });

  describe('bottom scroll adjustments', () => {
    const cell = {
      ...mockCell,
      parentNode: { offsetTop: 400 },
      offsetHeight: 100,
    };
    const grid = {
      scrollTop: 0,
      clientHeight: 450,
    };

    it('scrolls the grid down if the bottom side of the cell is out of view', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 5, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 50, scrollLeft: 0 });
    });

    it('accounts for the sticky bottom footer if present', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          hasStickyFooter: true,
          footerRowHeight: 25,
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 5, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 75, scrollLeft: 0 });
    });

    it('makes no vertical adjustments if the cell is a sticky header cell', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: -1, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });

    it('makes no vertical adjustments if the cell is a sticky footer cell', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          visibleRowCount: 25,
          hasStickyFooter: true,
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 25, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('top scroll adjustments', () => {
    const cell = {
      ...mockCell,
      parentNode: { offsetTop: 50 },
      offsetHeight: 25,
    };
    const grid = {
      scrollTop: 60,
    };

    it('scrolls the grid up if the top side of the cell is out of view', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 1, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 50, scrollLeft: 0 });
    });

    it('accounts for the sticky header', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          headerRowHeight: 30,
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 1, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 20, scrollLeft: 0 });
    });

    it('scrolls to the top side over the bottom if the cell height is larger than the grid height', () => {
      const cell = {
        ...mockCell,
        parentNode: { offsetTop: 100 },
        offsetHeight: 600,
      };
      const grid = {
        scrollTop: 200,
        clientHeight: 300,
      };

      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          headerRowHeight: 50,
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 1, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 50, scrollLeft: 0 });
    });

    it('makes no vertical adjustments if the cell is a sticky header cell', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: -1, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });

    it('makes no vertical adjustments if the cell is a sticky footer cell', () => {
      getCell.mockReturnValue(cell);
      const { scrollCellIntoView } = renderHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          visibleRowCount: 25,
          hasStickyFooter: true,
        })
      ).result.current;

      scrollCellIntoView({ rowIndex: 25, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });
  });
});

describe('useScrollBars', () => {
  const mockOuterGrid = {
    clientHeight: 0,
    offsetHeight: 0,
    scrollHeight: 0,
    clientWidth: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  } as any;

  describe('scrollBarHeight', () => {
    it("is derived by the difference between the grid's offsetHeight vs clientHeight", () => {
      const { scrollBarHeight } = renderHook(() =>
        useScrollBars({
          current: { ...mockOuterGrid, clientHeight: 40, offsetHeight: 50 },
        })
      ).result.current;

      expect(scrollBarHeight).toEqual(10);
    });
  });

  describe('scrollBarWidth', () => {
    it('is zero if there is no difference between offsetWidth and clientWidth', () => {
      const { scrollBarWidth } = renderHook(() =>
        useScrollBars({
          current: { ...mockOuterGrid, clientWidth: 40, offsetWidth: 40 },
        })
      ).result.current;

      expect(scrollBarWidth).toEqual(0);
    });
  });

  describe('hasVerticalScroll', () => {
    it("has scrolling overflow if the grid's scrollHeight exceeds its clientHeight", () => {
      const { hasVerticalScroll } = renderHook(() =>
        useScrollBars({
          current: { ...mockOuterGrid, clientHeight: 50, scrollHeight: 100 },
        })
      ).result.current;

      expect(hasVerticalScroll).toEqual(true);
    });

    it("does not have scrolling overflow if the the grid's scrollHeight is the same as its clientHeight", () => {
      const { hasVerticalScroll } = renderHook(() =>
        useScrollBars({
          current: { ...mockOuterGrid, clientHeight: 50, scrollHeight: 50 },
        })
      ).result.current;

      expect(hasVerticalScroll).toEqual(false);
    });
  });

  describe('hasHorizontalScroll', () => {
    it("has scrolling overflow if the grid's scrollWidth exceeds its clientWidth", () => {
      const { hasHorizontalScroll } = renderHook(() =>
        useScrollBars({
          current: { ...mockOuterGrid, clientWidth: 100, scrollWidth: 200 },
        })
      ).result.current;

      expect(hasHorizontalScroll).toEqual(true);
    });

    it("does not have scrolling overflow if the the grid's scrollWidth is the same as its clientWidth", () => {
      const { hasHorizontalScroll } = renderHook(() =>
        useScrollBars({
          current: { ...mockOuterGrid, clientWidth: 200, scrollWidth: 200 },
        })
      ).result.current;

      expect(hasHorizontalScroll).toEqual(false);
    });
  });

  describe('scrollBorderOverlay', () => {
    describe('if the grid does not scroll', () => {
      it('does not render anything', () => {
        const { scrollBorderOverlay } = renderHook(() =>
          useScrollBars({
            current: {
              ...mockOuterGrid,
              clientHeight: 100,
              scrollHeight: 100,
              clientWidth: 200,
              scrollWidth: 200,
            },
          })
        ).result.current;

        expect(scrollBorderOverlay).toEqual(null);
      });
    });

    describe('if the grid does not display borders', () => {
      it('does not render anything', () => {
        const { scrollBorderOverlay } = renderHook(() =>
          useScrollBars(
            {
              current: {
                ...mockOuterGrid,
                clientHeight: 50,
                scrollHeight: 100,
              },
            },
            'none'
          )
        ).result.current;

        expect(scrollBorderOverlay).toEqual(null);
      });
    });

    describe('if the grid scrolls but has inline scrollbars & no scrollbar width/height', () => {
      it('renders a single overlay with borders for the outermost grid', () => {
        const { scrollBorderOverlay } = renderHook(() =>
          useScrollBars({
            current: {
              ...mockOuterGrid,
              clientHeight: 50,
              offsetHeight: 50,
              scrollHeight: 100,
              clientWidth: 100,
              offsetWidth: 100,
              scrollWidth: 200,
            },
          })
        ).result.current;
        const { container } = render(<>{scrollBorderOverlay}</>);

        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="euiDataGrid__scrollOverlay emotion-euiDataGrid__scrollOverlay"
            role="presentation"
          />
        `);
      });
    });

    describe('if the grid scrolls and has scrollbars that take up width/height', () => {
      it('renders a top border for the bottom scrollbar', () => {
        const { scrollBorderOverlay } = renderHook(() =>
          useScrollBars({
            current: {
              ...mockOuterGrid,
              clientHeight: 40,
              offsetHeight: 50,
              scrollHeight: 100,
              clientWidth: 100,
              offsetWidth: 100,
              scrollWidth: 100,
            },
          })
        ).result.current;
        const { container } = render(<>{scrollBorderOverlay}</>);

        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="euiDataGrid__scrollOverlay emotion-euiDataGrid__scrollOverlay"
            role="presentation"
          >
            <div
              class="euiDataGrid__scrollBarOverlayBottom emotion-euiDataGrid__scrollBarOverlayBottom"
              style="inset-block-end: 10px;"
            />
          </div>
        `);
      });

      it('renders a left border for the bottom scrollbar', () => {
        const { scrollBorderOverlay } = renderHook(() =>
          useScrollBars({
            current: {
              ...mockOuterGrid,
              clientHeight: 50,
              offsetHeight: 50,
              scrollHeight: 50,
              clientWidth: 90,
              offsetWidth: 100,
              scrollWidth: 200,
            },
          })
        ).result.current;
        const { container } = render(<>{scrollBorderOverlay}</>);

        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="euiDataGrid__scrollOverlay emotion-euiDataGrid__scrollOverlay"
            role="presentation"
          >
            <div
              class="euiDataGrid__scrollBarOverlayRight emotion-euiDataGrid__scrollBarOverlayRight"
              style="inset-block-start: 0; inset-block-end: 0; inset-inline-end: 10px;"
            />
          </div>
        `);
      });
    });
  });

  it('returns falsey values if outerGridRef is not yet instantiated', () => {
    expect(
      renderHook(() => useScrollBars({ current: null })).result.current
    ).toEqual({
      scrollBarHeight: 0,
      scrollBarWidth: 0,
      hasVerticalScroll: false,
      hasHorizontalScroll: false,
      scrollBorderOverlay: null,
    });
  });
});
