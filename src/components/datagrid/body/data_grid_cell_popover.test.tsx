/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { keys } from '../../../services';
import { testCustomHook } from '../../../test';

import { DataGridCellPopoverContextShape } from '../data_grid_types';
import { useCellPopover } from './data_grid_cell_popover';

describe('useCellPopover', () => {
  describe('openCellPopover', () => {
    it('sets popoverIsOpen state to true', () => {
      const {
        return: { cellPopoverContext },
        getUpdatedState,
      } = testCustomHook(() => useCellPopover());
      expect(cellPopoverContext.popoverIsOpen).toEqual(false);

      act(() =>
        cellPopoverContext.openCellPopover({ rowIndex: 0, colIndex: 0 })
      );
      expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(true);
    });
  });

  describe('closeCellPopover', () => {
    it('sets popoverIsOpen state to false', () => {
      const {
        return: { cellPopoverContext },
        getUpdatedState,
      } = testCustomHook(() => useCellPopover());

      act(() =>
        cellPopoverContext.openCellPopover({ rowIndex: 0, colIndex: 0 })
      );
      expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(true);

      act(() => cellPopoverContext.closeCellPopover());
      expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(false);
    });
  });

  describe('cellPopver', () => {
    const mockPopoverAnchor = document.createElement('div');
    const mockPopoverContent = (
      <div data-test-subj="mockPopover">Hello world</div>
    );
    const populateCellPopover = (
      cellPopoverContext: DataGridCellPopoverContextShape
    ) => {
      act(() => {
        cellPopoverContext.openCellPopover({ colIndex: 0, rowIndex: 0 });
        cellPopoverContext.setPopoverAnchor(mockPopoverAnchor);
        cellPopoverContext.setPopoverContent(mockPopoverContent);
      });
    };

    it('renders', () => {
      const {
        return: { cellPopoverContext, cellPopover },
        getUpdatedState,
      } = testCustomHook(() => useCellPopover());
      expect(cellPopover).toBeFalsy(); // Should be empty on init

      populateCellPopover(cellPopoverContext);
      expect(getUpdatedState().cellPopover).toMatchInlineSnapshot(`
        <EuiWrappingPopover
          anchorClassName="euiDataGridRowCell__expand"
          button={<div />}
          closePopover={[Function]}
          display="block"
          hasArrow={false}
          isOpen={true}
          onKeyDown={[Function]}
          panelClassName="euiDataGridRowCell__popover"
          panelPaddingSize="s"
          panelProps={
            Object {
              "data-test-subj": "euiDataGridExpansionPopover",
            }
          }
        >
          <div
            data-test-subj="mockPopover"
          >
            Hello world
          </div>
        </EuiWrappingPopover>
      `);
    });

    describe('onKeyDown', () => {
      const renderCellPopover = () => {
        const {
          return: { cellPopoverContext },
          getUpdatedState,
        } = testCustomHook<ReturnType<typeof useCellPopover>>(() =>
          useCellPopover()
        );
        populateCellPopover(cellPopoverContext);

        const { cellPopover } = getUpdatedState();
        const component = shallow(<div>{cellPopover}</div>);

        return { component, getUpdatedState };
      };

      it('closes the popover when the Escape key is pressed', () => {
        const { component, getUpdatedState } = renderCellPopover();
        expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(
          true
        );

        const event = {
          key: keys.ESCAPE,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        };
        act(() => {
          component.find('EuiWrappingPopover').simulate('keyDown', event);
        });

        expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(
          false
        );
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
      });

      it('closes the popover when the F2 key is pressed', () => {
        const { component, getUpdatedState } = renderCellPopover();
        expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(
          true
        );

        const event = {
          key: keys.F2,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        };
        act(() => {
          component.find('EuiWrappingPopover').simulate('keyDown', event);
        });

        expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(
          false
        );
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
      });

      it('does nothing when other keys are pressed', () => {
        const { component, getUpdatedState } = renderCellPopover();
        expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(
          true
        );

        const event = {
          key: keys.ENTER,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        };
        act(() => {
          component.find('EuiWrappingPopover').simulate('keyDown', event);
        });

        expect(getUpdatedState().cellPopoverContext.popoverIsOpen).toEqual(
          true
        );
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.stopPropagation).not.toHaveBeenCalled();
      });
    });
  });
});
