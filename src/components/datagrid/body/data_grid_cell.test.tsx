/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';
import { mount, render, ReactWrapper } from 'enzyme';
import { keys } from '../../../services';
import { RowHeightUtils } from '../utils/__mocks__/row_heights';
import { mockFocusContext } from '../utils/__mocks__/focus_context';
import { DataGridFocusContext } from '../utils/focus';

import { EuiDataGridCell } from './data_grid_cell';

describe('EuiDataGridCell', () => {
  const mockRowHeightUtils = new RowHeightUtils();

  const mockPopoverContext = {
    popoverIsOpen: false,
    cellLocation: { rowIndex: 0, colIndex: 0 },
    closeCellPopover: jest.fn(),
    openCellPopover: jest.fn(),
    setPopoverAnchor: jest.fn(),
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
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders', () => {
    const component = render(<EuiDataGridCell {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  it("renders the cell's `aria-rowindex` correctly when paginated on a different page", () => {
    const component = mount(
      <EuiDataGridCell
        {...requiredProps}
        pagination={{
          pageIndex: 3,
          pageSize: 20,
          onChangePage: () => {},
          onChangeItemsPerPage: () => {},
        }}
      />
    );
    expect(
      component.find('[data-test-subj="dataGridRowCell"]').prop('aria-rowindex')
    ).toEqual(61);
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
    component.setState({ enableInteractions: true });

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
      });

      describe('when state changes:', () => {
        it('cellProps', () => {
          component.setState({ cellProps: {} });
        });
        it('isEntered', () => {
          component.setState({ isEntered: true });
        });
        it('isFocused', () => {
          component.setState({ isFocused: true });
        });
        it('enableInteractions', () => {
          component.setState({ enableInteractions: true });
        });
        it('disableCellTabIndex', () => {
          component.setState({ disableCellTabIndex: true });
        });
      });
    });

    it('should not update for prop/state changes not specified above', () => {
      component.setProps({ className: 'test' });
      expect(shouldComponentUpdate).toHaveReturnedWith(false);
    });
  });

  describe('componentDidUpdate', () => {
    it('resets cell props when the cell is moved (columnId) or sorted (rowIndex)', () => {
      const setState = jest.spyOn(EuiDataGridCell.prototype, 'setState');
      const component = mount(<EuiDataGridCell {...requiredProps} />);

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
      const popoverContent = render(
        <>{mockPopoverContext.setPopoverContent.mock.calls[0][0]}</>
      );
      expect(popoverContent).toMatchSnapshot();
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
      const RenderCellValue = ({ setCellProps }: any) => {
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
          ).toHaveBeenCalledWith(expect.any(HTMLElement), 3, false);
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
          ).toHaveBeenCalledWith(expect.any(HTMLElement), 10, true);
          expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalled();
          expect(setRowHeight).not.toHaveBeenCalled();
        });
      });

      it('recalculates when rowHeightsOptions.defaultHeight.lineCount changes', () => {
        const component = mount(
          <EuiDataGridCell
            {...requiredProps}
            rowHeightsOptions={{ defaultHeight: { lineCount: 7 } }}
            setRowHeight={setRowHeight}
          />
        );

        component.setProps({
          rowHeightsOptions: { defaultHeight: { lineCount: 6 } },
        });
        expect(setRowHeight).toHaveBeenCalled();
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
        ).toHaveBeenCalledWith(expect.any(HTMLElement), 1, false);
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
    });
  });

  // TODO: Test interacting/focus/tabbing in Cypress instead of Jest
  describe('interactions', () => {
    describe('keyboard events', () => {
      it('when cell is expandable', () => {
        const component = mount(<EuiDataGridCell {...requiredProps} />);
        const preventDefault = jest.fn();

        component.simulate('keyDown', { preventDefault, key: keys.ENTER });
        component.simulate('keyDown', { preventDefault, key: keys.F2 });

        expect(mockPopoverContext.openCellPopover).toHaveBeenCalledWith({
          rowIndex: 0,
          colIndex: 0,
        });
        expect(mockPopoverContext.openCellPopover).toHaveBeenCalledTimes(2);

        // If the cell popover is open, the nothing should happen
        jest.clearAllMocks();
        component.setProps({
          popoverContext: { ...mockPopoverContext, popoverIsOpen: true },
        });

        component.simulate('keyDown', { preventDefault, key: keys.ENTER });
        component.simulate('keyDown', { preventDefault, key: keys.F2 });

        expect(mockPopoverContext.openCellPopover).not.toHaveBeenCalled();
      });

      it('when cell is not expandable', () => {
        const component = mount(
          <EuiDataGridCell {...requiredProps} isExpandable={false} />
        );
        const preventDefault = jest.fn();

        component.simulate('keyDown', { preventDefault, key: keys.ENTER });
        // TODO: Assert that tabbing should be enabled
        expect(component.state('isEntered')).toEqual(true);

        component.simulate('keyDown', { preventDefault, key: keys.F2 });
        // TODO: Assert that tabbing should be prevented
        expect(component.state('isEntered')).toEqual(false);

        component.simulate('keyDown', { preventDefault, key: keys.F2 });
        // TODO: Assert that tabbing should be enabled
        expect(component.state('isEntered')).toEqual(true);

        component.simulate('keyDown', { preventDefault, key: keys.ENTER });
        component.simulate('keyDown', { preventDefault, key: keys.ESCAPE });
        // TODO: Assert that tabbing should be prevented
        expect(component.state('isEntered')).toEqual(false);
      });
    });

    it('mouse events', () => {
      const component = mount(<EuiDataGridCell {...requiredProps} />);
      component.simulate('mouseEnter');
      expect(component.state('enableInteractions')).toEqual(true);
      component.simulate('mouseLeave');
      expect(component.state('enableInteractions')).toEqual(false);
    });

    it('focus/blur events', () => {
      const component = mount(<EuiDataGridCell {...requiredProps} />);
      component.simulate('focus');
      component.simulate('blur');
      expect(component.state('disableCellTabIndex')).toEqual(false);
    });
  });

  it('renders certain classes/styles if rowHeightOptions is passed', () => {
    const component = mount(
      <EuiDataGridCell
        {...requiredProps}
        rowHeightsOptions={{
          defaultHeight: 20,
          rowHeights: { 0: 10 },
        }}
      />
    );

    expect(
      component.find('.euiDataGridRowCell__contentByHeight').exists()
    ).toBe(true);
  });
});
