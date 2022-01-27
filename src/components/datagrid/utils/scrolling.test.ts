/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../../test/test_custom_hook.test_helper';
import { useScrollCellIntoView } from './scrolling';

// see scrolling.spec.tsx for E2E useScroll tests

describe('useScrollCellIntoView', () => {
  const scrollToItem = jest.fn();
  const scrollTo = jest.fn();

  const mockCell = {
    offsetTop: 30,
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
    innerGridRef: {
      current: {
        offsetHeight: 800,
        offsetWidth: 1000,
      } as any,
    },
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
    const {
      return: { scrollCellIntoView },
    } = testCustomHook(() =>
      useScrollCellIntoView({
        ...args,
        gridRef: { current: null },
        outerGridRef: { current: null },
        innerGridRef: { current: null },
      })
    );
    scrollCellIntoView({ rowIndex: 0, colIndex: 0 });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('does nothing if the grid does not scroll (inner and outer grid dimensions are the same)', () => {
    const outerGrid = {
      offsetHeight: 500,
      offsetWidth: 500,
    };
    const innerGrid = {
      offsetHeight: 500,
      offsetWidth: 500,
    };

    const {
      return: { scrollCellIntoView },
    } = testCustomHook(() =>
      useScrollCellIntoView({
        ...args,
        outerGridRef: {
          current: { ...args.outerGridRef.current, ...outerGrid },
        },
        innerGridRef: {
          current: { ...args.innerGridRef.current, ...innerGrid },
        },
      })
    );
    scrollCellIntoView({ rowIndex: 0, colIndex: 0 });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('calls scrollToItem if the specified cell is not virtualized', async () => {
    getCell.mockReturnValue(null);
    const {
      return: { scrollCellIntoView },
    } = testCustomHook(() => useScrollCellIntoView(args));
    await scrollCellIntoView({ rowIndex: 20, colIndex: 5 });
    expect(scrollToItem).toHaveBeenCalledWith({ columnIndex: 5, rowIndex: 20 });
  });

  it("does nothing if the current cell is in view and not outside the grid's scroll bounds", () => {
    getCell.mockReturnValue({
      ...mockCell,
      offsetTop: 50,
      offsetLeft: 50,
    });
    const {
      return: { scrollCellIntoView },
    } = testCustomHook(() => useScrollCellIntoView(args));
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
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      );
      scrollCellIntoView({ rowIndex: 1, colIndex: 5 });

      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 50, scrollTop: 0 });
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
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      );
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
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      );
      scrollCellIntoView({ rowIndex: 1, colIndex: 1 });

      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 50, scrollTop: 0 });
    });
  });

  describe('bottom scroll adjustments', () => {
    const cell = {
      ...mockCell,
      offsetTop: 400,
      offsetHeight: 100,
    };
    const grid = {
      scrollTop: 0,
      clientHeight: 450,
    };

    it('scrolls the grid down if the bottom side of the cell is out of view', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      );
      scrollCellIntoView({ rowIndex: 5, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 50, scrollLeft: 0 });
    });

    it('accounts for the sticky bottom footer if present', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          hasStickyFooter: true,
          footerRowHeight: 25,
        })
      );
      scrollCellIntoView({ rowIndex: 5, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 75, scrollLeft: 0 });
    });

    it('makes no vertical adjustments if the cell is a sticky header cell', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      );
      scrollCellIntoView({ rowIndex: -1, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });

    it('makes no vertical adjustments if the cell is a sticky footer cell', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          visibleRowCount: 25,
          hasStickyFooter: true,
        })
      );
      scrollCellIntoView({ rowIndex: 25, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('top scroll adjustments', () => {
    const cell = {
      ...mockCell,
      offsetTop: 50,
      offsetHeight: 25,
    };
    const grid = {
      scrollTop: 60,
    };

    it('scrolls the grid up if the top side of the cell is out of view', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      );
      scrollCellIntoView({ rowIndex: 1, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 50, scrollLeft: 0 });
    });

    it('accounts for the sticky header', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          headerRowHeight: 30,
        })
      );
      scrollCellIntoView({ rowIndex: 1, colIndex: 0 });
      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 20, scrollLeft: 0 });
    });

    it('scrolls to the top side over the bottom if the cell height is larger than the grid height', () => {
      const cell = {
        ...mockCell,
        offsetTop: 100,
        offsetHeight: 600,
      };
      const grid = {
        scrollTop: 200,
        clientHeight: 300,
      };

      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          headerRowHeight: 50,
        })
      );
      scrollCellIntoView({ rowIndex: 1, colIndex: 0 });

      expect(scrollTo).toHaveBeenCalledWith({ scrollTop: 50, scrollLeft: 0 });
    });

    it('makes no vertical adjustments if the cell is a sticky header cell', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
        })
      );
      scrollCellIntoView({ rowIndex: -1, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });

    it('makes no vertical adjustments if the cell is a sticky footer cell', () => {
      getCell.mockReturnValue(cell);
      const {
        return: { scrollCellIntoView },
      } = testCustomHook(() =>
        useScrollCellIntoView({
          ...args,
          outerGridRef: { current: { ...args.outerGridRef.current, ...grid } },
          visibleRowCount: 25,
          hasStickyFooter: true,
        })
      );
      scrollCellIntoView({ rowIndex: 25, colIndex: 0 });
      expect(scrollTo).not.toHaveBeenCalled();
    });
  });
});
