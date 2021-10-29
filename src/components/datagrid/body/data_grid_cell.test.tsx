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
import { mockRowHeightUtils } from '../__mocks__/row_height_utils';

import { EuiDataGridCell } from './data_grid_cell';

describe('EuiDataGridCell', () => {
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
    rowHeightUtils: mockRowHeightUtils,
  };

  const mountEuiDataGridCellWithContext = ({ ...props } = {}) => {
    const focusContext = {
      setFocusedCell: jest.fn(),
      onFocusUpdate: jest.fn(),
    };
    return mount(<EuiDataGridCell {...requiredProps} {...props} />, {
      context: focusContext,
    });
  };

  it('renders', () => {
    const component = mountEuiDataGridCellWithContext();
    expect(component).toMatchSnapshot();
  });

  it('renders cell buttons', () => {
    const component = mountEuiDataGridCellWithContext({
      isExpandable: false,
      column: {
        id: 'someColumn',
        cellActions: [() => <button />],
      },
    });
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
      component = mountEuiDataGridCellWithContext();
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
      const component = mountEuiDataGridCellWithContext();

      component.setProps({ columnId: 'newColumnId' });
      expect(setState).toHaveBeenCalledWith({ cellProps: {} });
    });
  });

  // TODO: Test ResizeObserver logic in Cypress alongside Jest
  describe('row height logic & resize observers', () => {
    describe('recalculateAutoHeight', () => {
      beforeEach(() => {
        (mockRowHeightUtils.setRowHeight as jest.Mock).mockClear();
      });
      afterEach(() => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockRestore();
      });

      const triggerUpdate = (component: ReactWrapper) =>
        component.setProps({ rowIndex: 2 });

      it('sets the row height cache with cell heights on update', () => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockReturnValue(true);

        const component = mountEuiDataGridCellWithContext({
          rowHeightsOptions: { defaultHeight: 'auto' },
        });

        triggerUpdate(component);
        expect(mockRowHeightUtils.setRowHeight).toHaveBeenCalled();
      });

      it('does not update the cache if cell height is not auto', () => {
        (mockRowHeightUtils.isAutoHeight as jest.Mock).mockReturnValue(false);

        const component = mountEuiDataGridCellWithContext({
          rowHeightsOptions: { defaultHeight: 34 },
        });

        triggerUpdate(component);
        expect(mockRowHeightUtils.setRowHeight).not.toHaveBeenCalled();
      });
    });

    describe('recalculateLineCountHeight', () => {
      const setRowHeight = jest.fn();
      beforeEach(() => setRowHeight.mockClear());

      const callMethod = (component: ReactWrapper) =>
        (component.instance() as any).recalculateLineCountHeight();

      it('observes the first cell for size changes and calls this.props.setRowHeight on change', () => {
        const component = mountEuiDataGridCellWithContext({
          rowHeightsOptions: { defaultHeight: { lineCount: 3 } },
          setRowHeight,
        });

        callMethod(component);
        expect(setRowHeight).toHaveBeenCalled();
      });

      it('does nothing if cell height is not set to lineCount', () => {
        const component = mountEuiDataGridCellWithContext({
          rowHeightsOptions: { defaultHeight: 34 },
          setRowHeight,
        });

        callMethod(component);
        expect(setRowHeight).not.toHaveBeenCalled();
      });
    });
  });

  // TODO: Test interacting/focus/tabbing in Cypress instead of Jest
  describe('interactions', () => {
    describe('keyboard events', () => {
      it('when cell is expandable', () => {
        const component = mountEuiDataGridCellWithContext();
        const preventDefault = jest.fn();

        component.simulate('keyDown', { preventDefault, key: keys.ENTER });
        component.simulate('keyDown', { preventDefault, key: keys.F2 });

        expect(component.state('popoverIsOpen')).toEqual(true);
      });

      it('when cell is not expandable', () => {
        const component = mountEuiDataGridCellWithContext({
          isExpandable: false,
        });
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
      const component = mountEuiDataGridCellWithContext();
      component.simulate('mouseEnter');
      expect(component.state('enableInteractions')).toEqual(true);
      component.simulate('mouseLeave');
      expect(component.state('enableInteractions')).toEqual(false);
    });

    it('focus/blur events', () => {
      const component = mountEuiDataGridCellWithContext();
      component.simulate('focus');
      component.simulate('blur');
      expect(component.state('disableCellTabIndex')).toEqual(false);
    });
  });

  it('renders certain classes/styles if rowHeightOptions is passed', () => {
    const component = mountEuiDataGridCellWithContext({
      rowHeightsOptions: {
        defaultHeight: 20,
        rowHeights: { 0: 10 },
      },
    });
    component.setState({ popoverIsOpen: true });

    expect(
      component.find('.euiDataGridRowCell__contentByHeight').exists()
    ).toBe(true);
  });
});
