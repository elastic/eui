/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { keys } from '../../../services';
import { mockRowHeightUtils } from '../utils/__mocks__/row_heights';
import { mockFocusContext } from '../utils/__mocks__/focus_context';
import { DataGridFocusContext } from '../utils/focus';

import { EuiDataGridCell } from './data_grid_cell';

describe('EuiDataGridCell', () => {
  const mockPopoverContext = {
    popoverIsOpen: false,
    openCellLocation: { rowIndex: 0, colIndex: 0 },
    closeCellPopover: jest.fn(),
    openCellPopover: jest.fn(),
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
    popoverContent: () => <div>popover</div>,
    popoverContext: mockPopoverContext,
    rowHeightUtils: mockRowHeightUtils,
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders', () => {
    const component = mount(<EuiDataGridCell {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders cell buttons', () => {
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
    component.setState({ popoverIsOpen: true });

    const cellButtons = component.find('EuiDataGridCellButtons');
    expect(component.find('EuiDataGridCellButtons')).toHaveLength(1);

    // Should handle re-closing the popover correctly

    (cellButtons.prop('onExpandClick') as Function)();
    expect(component.state('popoverIsOpen')).toEqual(false);

    component.setState({ popoverIsOpen: true });
    (cellButtons.prop('closePopover') as Function)();
    expect(component.state('popoverIsOpen')).toEqual(false);
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
        it('interactiveCellId', () => {
          component.setProps({ interactiveCellId: 'test' });
        });
        it('popoverContent', () => {
          component.setProps({ popoverContent: () => <div>test</div> });
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
        it('popoverIsOpen', () => {
          component.setState({ popoverIsOpen: true });
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
    it('resets cell props when the cell columnId changes', () => {
      const setState = jest.spyOn(EuiDataGridCell.prototype, 'setState');
      const component = mount(<EuiDataGridCell {...requiredProps} />);

      component.setProps({ columnId: 'newColumnId' });
      expect(setState).toHaveBeenCalledWith({ cellProps: {} });
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

        expect(component.state('popoverIsOpen')).toEqual(true);
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
    component.setState({ popoverIsOpen: true });

    expect(
      component.find('.euiDataGridRowCell__contentByHeight').exists()
    ).toBe(true);
  });
});
