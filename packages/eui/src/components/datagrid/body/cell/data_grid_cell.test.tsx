/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from '@testing-library/react';
import { render } from '../../../../test/rtl';
import { RowHeightUtils } from '../../utils/__mocks__/row_heights';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';
import { DataGridFocusContext } from '../../utils/focus';
import type { EuiDataGridProps } from '../../data_grid_types';

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
    const component = mount(
      <EuiDataGridCell
        {...requiredProps}
        isExpandable={false}
        column={{
          id: 'someColumn',
          cellActions: [() => <button />],
        }}
      />
    );
    act(() => {
      component.setState({ isHovered: true });
    });

    const getCellActions = () => component.find('EuiDataGridCellActions');
    expect(getCellActions()).toHaveLength(1);

    // Should handle opening the popover
    (getCellActions().prop('onExpandClick') as Function)();
    expect(mockPopoverContext.openCellPopover).toHaveBeenCalled();

    // Should handle closing the popover
    component.setProps({
      isExpandable: true,
      popoverContext: { ...mockPopoverContext, popoverIsOpen: true },
    });
    (getCellActions().prop('onExpandClick') as Function)();
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
    let component: ReactWrapper;

    beforeEach(() => {
      shouldComponentUpdate = jest.spyOn(
        EuiDataGridCell.prototype,
        'shouldComponentUpdate'
      );
      component = mount(<EuiDataGridCell {...requiredProps} />);
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
            component.setState({ cellProps: {} });
          });
        });
        it('isFocused', () => {
          act(() => {
            component.setState({ isFocused: true });
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
      const component = mount(<EuiDataGridCell {...requiredProps} />);
      setState.mockClear();

      component.setProps({ columnId: 'newColumnId' });
      expect(setState).toHaveBeenCalledWith({ cellProps: {} });
      expect(setState).toHaveBeenCalledTimes(1);

      component.setProps({ rowIndex: 1 });
      expect(setState).toHaveBeenCalledWith({ cellProps: {} });
      expect(setState).toHaveBeenCalledTimes(2);
    });

    it("handles the cell popover by forwarding the cell's DOM node and contents to the parent popover context", () => {
      const component = mount(
        <EuiDataGridCell
          {...requiredProps}
          column={{ id: 'someColumn', cellActions: [() => <button />] }}
        />
      );
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
      let component: ReactWrapper;

      beforeEach(() => {
        component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{
              defaultHeight: 'auto',
              scrollAnchorRow: 'start',
            }}
            style={{ top: '30px' }}
          />
        );
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
      mount(
        <DataGridFocusContext.Provider value={mockFocusContext}>
          <EuiDataGridCell {...requiredProps} />
        </DataGridFocusContext.Provider>
      );

      expect(mockFocusContext.onFocusUpdate).toHaveBeenCalled();
    });

    it('mounts the cell with focus state if the current cell should be focused', () => {
      const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
      const component = mount(
        <DataGridFocusContext.Provider
          value={{ ...mockFocusContext, focusedCell: [3, 3] }}
        >
          <EuiDataGridCell
            {...requiredProps}
            colIndex={3}
            visibleRowIndex={3}
          />
        </DataGridFocusContext.Provider>
      );

      expect((component.instance().state as any).isFocused).toEqual(true);
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
      expect(mockFocusContext.setIsFocusedCellInView).toHaveBeenCalledWith(
        true
      );
    });

    it('handles the cell popover if the current cell should have an open popover', () => {
      mount(
        <EuiDataGridCell
          {...requiredProps}
          popoverContext={{ ...mockPopoverContext, popoverIsOpen: true }}
        />
      );

      expect(mockPopoverContext.setPopoverAnchor).toHaveBeenCalled();
      expect(mockPopoverContext.setPopoverContent).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('unsubscribes from the onFocusUpdate subscription', () => {
      const unsubscribeCellMock = jest.fn();
      mockFocusContext.onFocusUpdate.mockReturnValueOnce(unsubscribeCellMock);

      const component = mount(
        <DataGridFocusContext.Provider value={mockFocusContext}>
          <EuiDataGridCell {...requiredProps} />
        </DataGridFocusContext.Provider>
      );
      component.unmount();

      expect(unsubscribeCellMock).toHaveBeenCalled();
    });

    it('sets isFocusedCellInView to false if the current cell is focused and unmounting due to being scrolled out of view', () => {
      const component = mount(
        <DataGridFocusContext.Provider
          value={{ ...mockFocusContext, focusedCell: [3, 3] }}
        >
          <EuiDataGridCell
            {...requiredProps}
            colIndex={3}
            visibleRowIndex={3}
          />
        </DataGridFocusContext.Provider>
      );
      component.unmount();

      expect(mockFocusContext.setIsFocusedCellInView).toHaveBeenCalledWith(
        false
      );
    });

    it('closes the popover if open and the user scrolls out of view', () => {
      const component = mount(
        <EuiDataGridCell
          {...requiredProps}
          popoverContext={{
            ...mockPopoverContext,
            popoverIsOpen: true,
          }}
        />
      );
      component.unmount();

      expect(mockPopoverContext.closeCellPopover).toHaveBeenCalled();
    });
  });

  describe('isFocusedCell', () => {
    it("returns true if the current focusedCell[x,y] matches the cell's colIndex and visibleRowIndex", () => {
      const component = mount(
        <DataGridFocusContext.Provider
          value={{ ...mockFocusContext, focusedCell: [5, 10] }}
        >
          <EuiDataGridCell
            {...requiredProps}
            colIndex={5}
            visibleRowIndex={10}
          />
        </DataGridFocusContext.Provider>
      );

      expect((component.instance() as any).isFocusedCell()).toEqual(true);
    });

    it("returns false if the current focusedCell[x,y] does not match the cell's colIndex and visibleRowIndex", () => {
      const component = mount(
        <DataGridFocusContext.Provider
          value={{ ...mockFocusContext, focusedCell: [1, 2] }}
        >
          <EuiDataGridCell
            {...requiredProps}
            colIndex={3}
            visibleRowIndex={4}
          />
        </DataGridFocusContext.Provider>
      );

      expect((component.instance() as any).isFocusedCell()).toEqual(false);
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
      const component = mount(<EuiDataGridCell {...props} />);

      expect((component.instance() as any).isPopoverOpen()).toEqual(true);
    });

    it('returns false if popoverContext.popoverIsOpen is false', () => {
      const component = mount(
        <EuiDataGridCell
          {...props}
          popoverContext={{ ...props.popoverContext, popoverIsOpen: false }}
        />
      );
      expect((component.instance() as any).isPopoverOpen()).toEqual(false);
    });

    it("returns false if popoverContext.cellLocation does not match the cell's colIndex and visibleRowIndex", () => {
      const component = mount(
        <EuiDataGridCell {...props} colIndex={3} visibleRowIndex={4} />
      );
      expect((component.instance() as any).isPopoverOpen()).toEqual(false);
    });

    it('returns false if the cell is not expandable', () => {
      const component = mount(
        <EuiDataGridCell {...props} isExpandable={false} />
      );
      expect((component.instance() as any).isPopoverOpen()).toEqual(false);
    });
  });

  describe('isExpandable', () => {
    it('always returns true if column.cellActions exists', () => {
      const component = mount(
        <EuiDataGridCell
          {...requiredProps}
          column={{ id: 'someId', cellActions: [() => <button />] }}
          isExpandable={false}
        />
      );

      expect(component.find('renderCellValue').prop('isExpandable')).toBe(true);
    });

    it('falls back to props.isExpandable which is derived from the column config', () => {
      const component = mount(
        <EuiDataGridCell {...requiredProps} isExpandable={true} />
      );

      expect(component.find('renderCellValue').prop('isExpandable')).toBe(true);
    });

    it('allows overriding column.isExpandable with setCellProps({ isExpandable })', () => {
      const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
        setCellProps,
      }) => {
        useEffect(() => {
          setCellProps({ isExpandable: false });
        }, [setCellProps]);
        return 'cell render';
      };
      const component = mount(
        <EuiDataGridCell
          {...requiredProps}
          isExpandable={true}
          renderCellValue={RenderCellValue}
        />
      );

      expect(component.find('RenderCellValue').prop('isExpandable')).toBe(
        false
      );
    });
  });

  // TODO: Test ResizeObserver logic in Cypress alongside Jest
  describe('row height logic & resize observers', () => {
    describe('recalculateAutoHeight', () => {
      afterEach(() => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockRestore();
      });

      const triggerUpdate = (component: ReactWrapper) =>
        component.setProps({ rowIndex: 2 });

      it('sets the row height cache with cell heights on update', () => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockReturnValue(true);

        const component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{ defaultHeight: 'auto' }}
          />
        );

        triggerUpdate(component);
        expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalled();
      });

      it('does not update the cache if cell height is not auto', () => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockReturnValue(false);

        const component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{ defaultHeight: 34 }}
          />
        );

        triggerUpdate(component);
        expect(mockRowHeightUtils.setRowHeight).not.toHaveBeenCalled();
      });
    });

    describe('recalculateLineHeight', () => {
      const setRowHeight = jest.fn();

      const callMethod = (component: ReactWrapper) =>
        (component.instance() as any).recalculateLineHeight();

      describe('default height', () => {
        it('observes the first cell for size changes and calls this.props.setRowHeight on change', () => {
          const component = mount(
            <EuiDataGridCell
              {...requiredProps}
              rowHeightsOptions={{ defaultHeight: { lineCount: 3 } }}
              setRowHeight={setRowHeight}
            />
          );

          callMethod(component);
          expect(
            mockRowHeightUtils.calculateHeightForLineCount
          ).toHaveBeenCalledWith(expect.any(HTMLElement), 3);
          expect(setRowHeight).toHaveBeenCalled();
        });
      });

      describe('row height overrides', () => {
        it('uses the rowHeightUtils.setRowHeight cache instead of this.props.setRowHeight', () => {
          const component = mount(
            <EuiDataGridCell
              {...requiredProps}
              rowHeightsOptions={{
                defaultHeight: { lineCount: 3 },
                rowHeights: { 10: { lineCount: 10 } },
              }}
              rowIndex={10}
              setRowHeight={setRowHeight}
            />
          );

          callMethod(component);
          expect(
            mockRowHeightUtils.calculateHeightForLineCount
          ).toHaveBeenCalledWith(expect.any(HTMLElement), 10);
          expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalled();
          expect(setRowHeight).not.toHaveBeenCalled();
        });

        it('recalculates when the override for the row changes', () => {
          const component = mount(
            <EuiDataGridCell {...requiredProps} setRowHeight={setRowHeight} />
          );

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
        const component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{ defaultHeight: { lineCount: 4 } }}
            setRowHeight={setRowHeight}
          />
        );
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
        const component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{ defaultHeight: undefined }}
            setRowHeight={setRowHeight}
          />
        );

        callMethod(component);
        expect(
          mockRowHeightUtils.calculateHeightForLineCount
        ).toHaveBeenCalledWith(expect.any(HTMLElement), 1);
        expect(setRowHeight).toHaveBeenCalled();
      });

      it('does nothing if cell height is not lineCount or undefined', () => {
        const component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{ defaultHeight: 34 }}
            setRowHeight={setRowHeight}
          />
        );

        callMethod(component);
        expect(setRowHeight).not.toHaveBeenCalled();
      });

      it('does nothing if cell height is auto or autoBelowLineCount', () => {
        mockRowHeightUtils.isAutoBelowLineCount.mockReturnValue(true);

        const component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{
              autoBelowLineCount: true,
              defaultHeight: { lineCount: 3 },
            }}
            setRowHeight={setRowHeight}
          />
        );

        callMethod(component);
        expect(setRowHeight).not.toHaveBeenCalled();

        mockRowHeightUtils.isAutoBelowLineCount.mockRestore();
      });
    });
  });

  describe('renders certain classes/styles based on rowHeightOptions', () => {
    const props = { ...requiredProps, renderCellValue: () => null };

    test('default', () => {
      const component = mount(
        <EuiDataGridCell {...props} rowHeightsOptions={undefined} />
      );

      expect(
        component.find('.euiDataGridRowCell__content--defaultHeight').exists()
      ).toBe(true);
      expect(component.find('.eui-textTruncate').exists()).toBe(true);
    });

    test('auto', () => {
      const component = mount(
        <EuiDataGridCell
          {...props}
          rowHeightsOptions={{ defaultHeight: 'auto' }}
        />
      );

      expect(
        component.find('.euiDataGridRowCell__content--autoHeight').exists()
      ).toBe(true);
      expect(component.find('.eui-textBreakWord').exists()).toBe(true);
    });

    test('numerical', () => {
      const component = mount(
        <EuiDataGridCell
          {...props}
          rowHeightsOptions={{ defaultHeight: { height: 3 } }}
        />
      );

      expect(
        component.find('.euiDataGridRowCell__content--numericalHeight').exists()
      ).toBe(true);
      expect(component.find('.eui-textBreakWord').exists()).toBe(true);
    });

    test('lineCount', () => {
      const component = mount(
        <EuiDataGridCell
          {...props}
          rowHeightsOptions={{ defaultHeight: { lineCount: 3 } }}
        />
      );

      expect(
        component.find('.euiDataGridRowCell__content--lineCountHeight').exists()
      ).toBe(true);
      expect(component.find('.eui-textBreakWord').exists()).toBe(true);
      expect(component.find('.euiTextBlockTruncate').exists()).toBe(true);
    });

    test('autoBelowLineCount', () => {
      mockRowHeightUtils.isAutoBelowLineCount.mockReturnValue(true);

      const component = mount(
        <EuiDataGridCell
          {...props}
          rowHeightsOptions={{
            autoBelowLineCount: true,
            defaultHeight: { lineCount: 3 },
          }}
        />
      );

      expect(
        component
          .find('div.euiDataGridRowCell__content--autoBelowLineCountHeight')
          .hasClass(/autoHeight/)
      ).toBe(true);
      expect(component.find('.eui-textBreakWord').exists()).toBe(true);
      expect(component.find('.euiTextBlockTruncate').exists()).toBe(true);

      mockRowHeightUtils.isAutoBelowLineCount.mockRestore();
    });
  });

  // Note: Tests for cell interactivity (focus, tabbing, etc) are in `focus_utils.spec.tsx`
});
