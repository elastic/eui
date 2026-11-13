/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createRef, useEffect } from 'react';
import { act, fireEvent } from '@testing-library/react';
import { render } from '../../../../test/rtl';
import { RowHeightUtils } from '../../utils/__mocks__/row_heights';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';
import { DataGridFocusContext } from '../../utils/focus';
import type {
  DataGridFocusContextShape,
  EuiDataGridCellProps,
  EuiDataGridCellValueElementProps,
  EuiDataGridProps,
} from '../../data_grid_types';

import { EuiDataGridCell } from './data_grid_cell';

describe('EuiDataGridCell', () => {
  const mockRowHeightUtils = new RowHeightUtils();

  const mockPopoverContext = {
    popoverIsOpen: false,
    cellLocation: { rowIndex: 0, colIndex: 0 },
    closeCellPopover: jest.fn(),
    openCellPopover: jest.fn(),
    setPopoverAnchor: jest.fn(),
    setPopoverAnchorPosition: jest.fn(),
    setPopoverContent: jest.fn(),
    setCellPopoverProps: () => {},
  };
  const requiredProps = {
    rowIndex: 0,
    visibleRowIndex: 0,
    colIndex: 0,
    columnId: 'someColumn',
    interactiveCellId: 'someId',
    isExpandable: true,
    renderCellValue: () => (
      <div>
        <button data-datagrid-interactable="true">hello</button>
        <button data-datagrid-interactable="true">world</button>
      </div>
    ),
    popoverContext: mockPopoverContext,
    rowHeightUtils: mockRowHeightUtils,
    gridStyles: {},
  };

  const renderCell = (
    initialProps: Partial<EuiDataGridCellProps> = {},
    focusContext?: DataGridFocusContextShape
  ) => {
    const ref = createRef<EuiDataGridCell>();
    let props = { ...requiredProps, ...initialProps };
    const ui = () => {
      const cell = <EuiDataGridCell ref={ref} {...props} />;
      return focusContext ? (
        <DataGridFocusContext.Provider value={focusContext}>
          {cell}
        </DataGridFocusContext.Provider>
      ) : (
        cell
      );
    };
    const result = render(ui());
    const setProps = (nextProps: Record<string, any>) => {
      props = { ...props, ...nextProps };
      result.rerender(ui());
    };
    const getInstance = () => ref.current!;
    return { ...result, setProps, getInstance };
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders', () => {
    const { container } = render(<EuiDataGridCell {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the cell's `aria-rowindex` correctly when paginated on a different page", () => {
    const { getByTestSubject } = render(
      <EuiDataGridCell
        {...requiredProps}
        pagination={{
          pageIndex: 3,
          pageSize: 20,
          pageSizeOptions: [20],
          onChangePage: () => {},
          onChangeItemsPerPage: () => {},
        }}
      />
    );

    expect(getByTestSubject('dataGridRowCell')).toHaveAttribute(
      'aria-rowindex',
      '61'
    );
  });

  it('renders cell actions', () => {
    const { getByTestSubject, getAllByTestSubject, setProps } = renderCell({
      isExpandable: false,
      column: {
        id: 'someColumn',
        cellActions: [() => <button />],
      },
    });
    fireEvent.mouseEnter(getByTestSubject('dataGridRowCell'));

    expect(getAllByTestSubject('euiDataGridCellExpandButton')).toHaveLength(1);

    // Should handle opening the popover
    fireEvent.click(getByTestSubject('euiDataGridCellExpandButton'));
    expect(mockPopoverContext.openCellPopover).toHaveBeenCalled();

    // Should handle closing the popover
    setProps({
      isExpandable: true,
      popoverContext: { ...mockPopoverContext, popoverIsOpen: true },
    });
    fireEvent.click(getByTestSubject('euiDataGridCellExpandButton'));
    expect(mockPopoverContext.closeCellPopover).toHaveBeenCalledTimes(1);
  });

  describe('setCellProps', () => {
    it('correctly merges props that also have EUI values', () => {
      const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
        setCellProps,
      }) => {
        useEffect(() => {
          setCellProps({
            style: { backgroundColor: 'black' },
            css: { color: 'white' },
            'data-test-subj': 'test',
            className: 'helloWorld',
          });
        }, [setCellProps]);
        return 'cell render';
      };

      const { getByTestSubject } = render(
        <EuiDataGridCell {...requiredProps} renderCellValue={RenderCellValue} />
      );

      const cell = getByTestSubject('dataGridRowCell test'); // should have merged `data-test-subj` correctly
      expect(cell).toHaveClass('euiDataGridRowCell helloWorld'); // should have merged `className` correctly
      expect(cell).toHaveStyle('background-color: rgb(0, 0, 0)'); // should have merged `style` correctly
      expect(cell).toHaveStyle('color: rgb(255, 255, 255)'); // should have applied consumer `css`
      expect(cell.className).toMatch(/css-[\w\d]+-euiDataGridRowCell/); // should not have overridden EUI `css`
    });

    it('does not allow overriding certain EUI props/values', () => {
      const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
        setCellProps,
      }) => {
        useEffect(() => {
          setCellProps({
            // @ts-expect-error - deliberately passing omitted props
            role: 'ignored',
            tabIndex: 2,
            'aria-rowindex': 99,
            'data-gridcell-visible-row-index': -200,
          });
        }, [setCellProps]);
        return 'cell render';
      };

      const { container } = render(
        <EuiDataGridCell {...requiredProps} renderCellValue={RenderCellValue} />
      );

      const cell = container.firstElementChild;
      expect(cell).toHaveAttribute('role', 'gridcell');
      expect(cell).toHaveAttribute('tabIndex', '-1');
      expect(cell).toHaveAttribute('aria-rowindex', '1');
      expect(cell).toHaveAttribute('data-gridcell-visible-row-index', '0');
    });
  });

  describe('shouldComponentUpdate', () => {
    let shouldComponentUpdate: jest.SpyInstance;
    let component: ReturnType<typeof renderCell>;

    beforeEach(() => {
      shouldComponentUpdate = jest.spyOn(
        EuiDataGridCell.prototype,
        'shouldComponentUpdate'
      );
      component = renderCell();
      shouldComponentUpdate.mockClear();
    });
    afterEach(() => {
      shouldComponentUpdate.mockRestore();
    });

    describe('should return true', () => {
      afterEach(() => {
        expect(shouldComponentUpdate).toHaveReturnedWith(true);
      });

      describe('when props change:', () => {
        it('rowIndex', () => {
          component.setProps({ rowIndex: 1 });
        });
        it('visibleRowIndex', () => {
          component.setProps({ visibleRowIndex: 1 });
        });
        it('colIndex', () => {
          component.setProps({ colIndex: 1 });
        });
        it('columnId', () => {
          component.setProps({ columnId: 'test' });
        });
        it('columnType', () => {
          component.setProps({ columnType: 'string' });
        });
        it('width', () => {
          component.setProps({ width: 30 });
        });
        it('rowHeightsOptions', () => {
          component.setProps({ rowHeightsOptions: { defaultHeight: 'auto' } });
        });
        it('gridStyles.fontSize', () => {
          component.setProps({ gridStyles: { fontSize: 's' } });
        });
        it('gridStyles.cellPadding', () => {
          component.setProps({ gridStyles: { cellPadding: 'l' } });
        });
        it('renderCellValue', () => {
          component.setProps({ renderCellValue: () => <div>test</div> });
        });
        it('renderCellPopover', () => {
          component.setProps({ renderCellPopover: () => <div>test</div> });
        });
        it('interactiveCellId', () => {
          component.setProps({ interactiveCellId: 'test' });
        });
        it('popoverContext.popoverIsOpen', () => {
          component.setProps({
            popoverContext: { ...mockPopoverContext, popoverIsOpen: true },
          });
        });
        it('popoverContext.cellLocation', () => {
          component.setProps({
            popoverContext: {
              ...mockPopoverContext,
              cellLocation: { rowIndex: 5, colIndex: 5 },
            },
          });
        });
        it('style', () => {
          component.setProps({ style: {} });
          component.setProps({ style: { top: 0 } });
          component.setProps({ style: { top: 0, left: 0 } });
          component.setProps({ style: { top: 0, left: 0, width: 50 } });
          component.setProps({
            style: { top: 0, left: 0, width: 50, height: 10 },
          });
        });
        it('cellContext', () => {
          component.setProps({ cellContext: { someData: true } });
          component.setProps({ cellContext: { someData: false } });
        });
      });

      describe('when state changes:', () => {
        it('cellProps', () => {
          act(() => {
            component.getInstance().setState({ cellProps: {} });
          });
        });
        it('isFocused', () => {
          act(() => {
            component.getInstance().setState({ isFocused: true });
          });
        });
      });
    });

    it('should not update for prop/state changes not specified above', () => {
      component.setProps({
        className: 'test',
        gridStyles: { header: 'underline' },
      });
      expect(shouldComponentUpdate).toHaveReturnedWith(false);
    });
  });

  describe('componentDidUpdate', () => {
    it('resets cell props when the cell is moved (columnId) or sorted (rowIndex)', () => {
      const setState = jest.spyOn(EuiDataGridCell.prototype, 'setState');
      const component = renderCell();
      setState.mockClear();

      component.setProps({ columnId: 'newColumnId' });
      expect(setState).toHaveBeenCalledWith({ cellProps: {} });
      expect(setState).toHaveBeenCalledTimes(1);

      component.setProps({ rowIndex: 1 });
      expect(setState).toHaveBeenCalledWith({ cellProps: {} });
      expect(setState).toHaveBeenCalledTimes(2);
      setState.mockRestore();
    });

    it("handles the cell popover by forwarding the cell's DOM node and contents to the parent popover context", () => {
      const component = renderCell({
        column: { id: 'someColumn', cellActions: [() => <button />] },
      });
      expect(mockPopoverContext.setPopoverAnchor).not.toHaveBeenCalled();
      expect(mockPopoverContext.setPopoverContent).not.toHaveBeenCalled();

      component.setProps({
        popoverContext: { ...mockPopoverContext, popoverIsOpen: true },
      });
      expect(mockPopoverContext.setPopoverAnchor).toHaveBeenCalled();
      expect(mockPopoverContext.setPopoverContent).toHaveBeenCalled();

      // Examine popover content which should contain popoverContent, renderCellValue, and cellActions
      const { container } = render(
        <>{mockPopoverContext.setPopoverContent.mock.calls[0][0]}</>
      );
      expect(container).toMatchSnapshot();
    });

    describe('rowHeightsOptions.scrollAnchorRow', () => {
      let component: ReturnType<typeof renderCell>;

      beforeEach(() => {
        component = renderCell({
          rowHeightsOptions: {
            defaultHeight: 'auto',
            scrollAnchorRow: 'start',
          },
          style: { top: '30px' },
        });
      });

      it('compensates for layout shifts', () => {
        component.setProps({ style: { top: '60px' } });
        expect(
          mockRowHeightUtils.compensateForLayoutShift
        ).toHaveBeenCalledWith(0, 30, 'start');
      });

      describe('does not compensate for layout shifts when', () => {
        afterEach(() => {
          expect(
            mockRowHeightUtils.compensateForLayoutShift
          ).not.toHaveBeenCalled();
        });

        test('the rowIndex is changing', () => {
          component.setProps({ style: '60px', rowIndex: 3 });
        });

        test('the columnId is changing', () => {
          component.setProps({ style: '60px', columnId: 'someOtherColumn' });
        });

        test('scrollAnchorRow is undefined', () => {
          component.setProps({ rowHeightsOptions: { defaultHeight: 20 } });
        });

        test('the cell is not the first cell in the row', () => {
          component.setProps({ colIndex: 1 });
        });

        test('the cell top position is not changing', () => {
          component.setProps({ style: { top: '30px' } });
        });
      });
    });
  });

  describe('componentDidMount', () => {
    it('creates an onFocusUpdate subscription', () => {
      renderCell({}, mockFocusContext);

      expect(mockFocusContext.onFocusUpdate).toHaveBeenCalled();
    });

    it('mounts the cell with focus state if the current cell should be focused', () => {
      const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
      const { getInstance } = renderCell(
        { colIndex: 3, visibleRowIndex: 3 },
        { ...mockFocusContext, focusedCell: [3, 3] }
      );

      expect(getInstance().state.isFocused).toEqual(true);
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
      expect(mockFocusContext.setIsFocusedCellInView).toHaveBeenCalledWith(
        true
      );
      focusSpy.mockRestore();
    });

    it('handles the cell popover if the current cell should have an open popover', () => {
      renderCell({
        popoverContext: { ...mockPopoverContext, popoverIsOpen: true },
      });

      expect(mockPopoverContext.setPopoverAnchor).toHaveBeenCalled();
      expect(mockPopoverContext.setPopoverContent).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('unsubscribes from the onFocusUpdate subscription', () => {
      const unsubscribeCellMock = jest.fn();
      mockFocusContext.onFocusUpdate.mockReturnValueOnce(unsubscribeCellMock);

      const { unmount } = renderCell({}, mockFocusContext);
      unmount();

      expect(unsubscribeCellMock).toHaveBeenCalled();
    });

    it('sets isFocusedCellInView to false if the current cell is focused and unmounting due to being scrolled out of view', () => {
      const { unmount } = renderCell(
        { colIndex: 3, visibleRowIndex: 3 },
        { ...mockFocusContext, focusedCell: [3, 3] }
      );
      unmount();

      expect(mockFocusContext.setIsFocusedCellInView).toHaveBeenCalledWith(
        false
      );
    });

    it('closes the popover if open and the user scrolls out of view', () => {
      const { unmount } = renderCell({
        popoverContext: {
          ...mockPopoverContext,
          popoverIsOpen: true,
        },
      });
      unmount();

      expect(mockPopoverContext.closeCellPopover).toHaveBeenCalled();
    });
  });

  describe('isFocusedCell', () => {
    it("returns true if the current focusedCell[x,y] matches the cell's colIndex and visibleRowIndex", () => {
      const { getInstance } = renderCell(
        { colIndex: 5, visibleRowIndex: 10 },
        { ...mockFocusContext, focusedCell: [5, 10] }
      );

      expect(getInstance().isFocusedCell()).toEqual(true);
    });

    it("returns false if the current focusedCell[x,y] does not match the cell's colIndex and visibleRowIndex", () => {
      const { getInstance } = renderCell(
        { colIndex: 3, visibleRowIndex: 4 },
        { ...mockFocusContext, focusedCell: [1, 2] }
      );

      expect(getInstance().isFocusedCell()).toEqual(false);
    });
  });

  describe('isPopoverOpen', () => {
    const props = {
      ...requiredProps,
      popoverContext: {
        ...mockPopoverContext,
        popoverIsOpen: true,
        cellLocation: { colIndex: 1, rowIndex: 2 },
      },
      colIndex: 1,
      visibleRowIndex: 2,
      isExpandable: true,
    };

    it('returns true if the cell is expandable, the popover is open, and the cell location matches', () => {
      const { getInstance } = renderCell(props);

      expect(getInstance().isPopoverOpen()).toEqual(true);
    });

    it('returns false if popoverContext.popoverIsOpen is false', () => {
      const { getInstance } = renderCell({
        ...props,
        popoverContext: { ...props.popoverContext, popoverIsOpen: false },
      });
      expect(getInstance().isPopoverOpen()).toEqual(false);
    });

    it("returns false if popoverContext.cellLocation does not match the cell's colIndex and visibleRowIndex", () => {
      const { getInstance } = renderCell({
        ...props,
        colIndex: 3,
        visibleRowIndex: 4,
      });
      expect(getInstance().isPopoverOpen()).toEqual(false);
    });

    it('returns false if the cell is not expandable', () => {
      const { getInstance } = renderCell({ ...props, isExpandable: false });
      expect(getInstance().isPopoverOpen()).toEqual(false);
    });
  });

  describe('isExpandable', () => {
    it('always returns true if column.cellActions exists', () => {
      const renderCellValue = jest.fn<null, [EuiDataGridCellValueElementProps]>(
        () => null
      );
      renderCell({
        renderCellValue,
        column: { id: 'someId', cellActions: [() => <button />] },
        isExpandable: false,
      });

      expect(renderCellValue.mock.lastCall?.[0]).toMatchObject({
        isExpandable: true,
      });
    });

    it('falls back to props.isExpandable which is derived from the column config', () => {
      const renderCellValue = jest.fn<null, [EuiDataGridCellValueElementProps]>(
        () => null
      );
      renderCell({ renderCellValue, isExpandable: true });

      expect(renderCellValue.mock.lastCall?.[0]).toMatchObject({
        isExpandable: true,
      });
    });

    it('allows overriding column.isExpandable with setCellProps({ isExpandable })', () => {
      const RenderCellValue = jest.fn(
        ({ setCellProps }: EuiDataGridCellValueElementProps) => {
          useEffect(() => {
            setCellProps({ isExpandable: false });
          }, [setCellProps]);
          return 'cell render';
        }
      );
      renderCell({ isExpandable: true, renderCellValue: RenderCellValue });

      expect(RenderCellValue.mock.lastCall?.[0]).toMatchObject({
        isExpandable: false,
      });
    });
  });

  // TODO: Test ResizeObserver logic in Cypress alongside Jest
  describe('row height logic & resize observers', () => {
    describe('recalculateAutoHeight', () => {
      afterEach(() => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockRestore();
      });

      const triggerUpdate = (component: ReturnType<typeof renderCell>) =>
        component.setProps({ rowIndex: 2 });

      it('sets the row height cache with cell heights on update', () => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockReturnValue(true);

        const component = renderCell({
          rowHeightsOptions: { defaultHeight: 'auto' },
        });

        triggerUpdate(component);
        expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalled();
      });

      it('does not update the cache if cell height is not auto', () => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockReturnValue(false);

        const component = renderCell({
          rowHeightsOptions: { defaultHeight: 34 },
        });

        triggerUpdate(component);
        expect(mockRowHeightUtils.setRowHeight).not.toHaveBeenCalled();
      });
    });

    describe('recalculateLineHeight', () => {
      const setRowHeight = jest.fn();

      const callMethod = (component: ReturnType<typeof renderCell>) =>
        component.getInstance().recalculateLineHeight();

      describe('default height', () => {
        it('observes the first cell for size changes and calls this.props.setRowHeight on change', () => {
          const component = renderCell({
            rowHeightsOptions: { defaultHeight: { lineCount: 3 } },
            setRowHeight,
          });

          callMethod(component);
          expect(
            mockRowHeightUtils.calculateHeightForLineCount
          ).toHaveBeenCalledWith(expect.any(HTMLElement), 3);
          expect(setRowHeight).toHaveBeenCalled();
        });
      });

      describe('row height overrides', () => {
        it('uses the rowHeightUtils.setRowHeight cache instead of this.props.setRowHeight', () => {
          const component = renderCell({
            rowHeightsOptions: {
              defaultHeight: { lineCount: 3 },
              rowHeights: { 10: { lineCount: 10 } },
            },
            rowIndex: 10,
            setRowHeight,
          });

          callMethod(component);
          expect(
            mockRowHeightUtils.calculateHeightForLineCount
          ).toHaveBeenCalledWith(expect.any(HTMLElement), 10);
          expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalled();
          expect(setRowHeight).not.toHaveBeenCalled();
        });

        it('recalculates when the override for the row changes', () => {
          const component = renderCell({ setRowHeight });

          component.setProps({
            rowHeightsOptions: {
              rowHeights: {
                0: { lineCount: 2 },
              },
            },
          });
          expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalledTimes(1);

          // Handle row index changes as well
          component.setProps({
            rowHeightsOptions: {
              rowHeights: {
                0: { lineCount: 2 },
                2: { lineCount: 4 },
              },
            },
            rowIndex: 2,
          });
          expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalledTimes(2);

          expect(setRowHeight).not.toHaveBeenCalled();
        });
      });

      it('recalculates when props that affect row/line height change', () => {
        const component = renderCell({
          rowHeightsOptions: { defaultHeight: { lineCount: 4 } },
          setRowHeight,
        });
        component.setProps({
          rowHeightsOptions: { defaultHeight: { lineCount: 2 } },
        });
        expect(setRowHeight).toHaveBeenCalledTimes(1);

        // Other props that can affect row heights

        const rowHeightsOptionsWithLineHeight = {
          defaultHeight: { lineCount: 2 },
          lineHeight: '3',
        };
        component.setProps({
          rowHeightsOptions: rowHeightsOptionsWithLineHeight,
        });
        expect(setRowHeight).toHaveBeenCalledTimes(2);

        component.setProps({
          rowHeightsOptions: rowHeightsOptionsWithLineHeight,
          gridStyles: { cellPadding: 'l' },
        });
        expect(setRowHeight).toHaveBeenCalledTimes(3);

        component.setProps({
          rowHeightsOptions: rowHeightsOptionsWithLineHeight,
          gridStyles: { cellPadding: 'l', fontSize: 'l' },
        });
        expect(setRowHeight).toHaveBeenCalledTimes(4);
      });

      it('calculates undefined heights as single rows with a lineCount of 1', () => {
        const component = renderCell({
          rowHeightsOptions: { defaultHeight: undefined },
          setRowHeight,
        });

        callMethod(component);
        expect(
          mockRowHeightUtils.calculateHeightForLineCount
        ).toHaveBeenCalledWith(expect.any(HTMLElement), 1);
        expect(setRowHeight).toHaveBeenCalled();
      });

      it('does nothing if cell height is not lineCount or undefined', () => {
        const component = renderCell({
          rowHeightsOptions: { defaultHeight: 34 },
          setRowHeight,
        });

        callMethod(component);
        expect(setRowHeight).not.toHaveBeenCalled();
      });

      it('does nothing if cell height is auto or autoBelowLineCount', () => {
        mockRowHeightUtils.isAutoBelowLineCount.mockReturnValue(true);

        const component = renderCell({
          rowHeightsOptions: {
            autoBelowLineCount: true,
            defaultHeight: { lineCount: 3 },
          },
          setRowHeight,
        });

        callMethod(component);
        expect(setRowHeight).not.toHaveBeenCalled();

        mockRowHeightUtils.isAutoBelowLineCount.mockRestore();
      });
    });
  });

  describe('renders certain classes/styles based on rowHeightOptions', () => {
    const props = { ...requiredProps, renderCellValue: () => null };

    test('default', () => {
      const { container } = renderCell({
        ...props,
        rowHeightsOptions: undefined,
      });

      expect(
        container.querySelector('.euiDataGridRowCell__content--defaultHeight')
      ).toBeInTheDocument();
      expect(container.querySelector('.eui-textTruncate')).toBeInTheDocument();
    });

    test('auto', () => {
      const { container } = renderCell({
        ...props,
        rowHeightsOptions: { defaultHeight: 'auto' },
      });

      expect(
        container.querySelector('.euiDataGridRowCell__content--autoHeight')
      ).toBeInTheDocument();
      expect(container.querySelector('.eui-textBreakWord')).toBeInTheDocument();
    });

    test('numerical', () => {
      const { container } = renderCell({
        ...props,
        rowHeightsOptions: { defaultHeight: { height: 3 } },
      });

      expect(
        container.querySelector('.euiDataGridRowCell__content--numericalHeight')
      ).toBeInTheDocument();
      expect(container.querySelector('.eui-textBreakWord')).toBeInTheDocument();
    });

    test('lineCount', () => {
      const { container } = renderCell({
        ...props,
        rowHeightsOptions: { defaultHeight: { lineCount: 3 } },
      });

      expect(
        container.querySelector('.euiDataGridRowCell__content--lineCountHeight')
      ).toBeInTheDocument();
      expect(container.querySelector('.eui-textBreakWord')).toBeInTheDocument();
      expect(
        container.querySelector('.euiTextBlockTruncate')
      ).toBeInTheDocument();
    });

    test('autoBelowLineCount', () => {
      mockRowHeightUtils.isAutoBelowLineCount.mockReturnValue(true);

      const { container } = renderCell({
        ...props,
        rowHeightsOptions: {
          autoBelowLineCount: true,
          defaultHeight: { lineCount: 3 },
        },
      });

      expect(
        container.querySelector(
          'div.euiDataGridRowCell__content--autoBelowLineCountHeight'
        )?.className
      ).toMatch(/autoHeight/);
      expect(container.querySelector('.eui-textBreakWord')).toBeInTheDocument();
      expect(
        container.querySelector('.euiTextBlockTruncate')
      ).toBeInTheDocument();

      mockRowHeightUtils.isAutoBelowLineCount.mockRestore();
    });
  });

  // Note: Tests for cell interactivity (focus, tabbing, etc) are in `focus_utils.spec.tsx`
});
