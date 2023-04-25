/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { shallow } from 'enzyme';

import { keys } from '../../../services';

import { DataGridCellPopoverContextShape } from '../data_grid_types';
import { useCellPopover, DefaultCellPopover } from './data_grid_cell_popover';

describe('useCellPopover', () => {
  describe('openCellPopover', () => {
    it('sets popoverIsOpen state to true', () => {
      const { result } = renderHook(useCellPopover);
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);

      act(() =>
        result.current.cellPopoverContext.openCellPopover({
          rowIndex: 0,
          colIndex: 0,
        })
      );
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);
    });

    it('does nothing if called again on a popover that is already open', () => {
      const { result } = renderHook(useCellPopover);
      expect(result.current.cellPopover).toBeFalsy();

      act(() => {
        result.current.cellPopoverContext.openCellPopover({
          rowIndex: 0,
          colIndex: 0,
        });
        result.current.cellPopoverContext.setPopoverAnchor(
          document.createElement('div')
        );
      });
      expect(result.current.cellPopover).not.toBeFalsy();

      act(() => {
        result.current.cellPopoverContext.openCellPopover({
          rowIndex: 0,
          colIndex: 0,
        });
      });
      expect(result.current.cellPopover).not.toBeFalsy();
    });
  });

  describe('closeCellPopover', () => {
    it('sets popoverIsOpen state to false', () => {
      const { result } = renderHook(useCellPopover);

      act(() =>
        result.current.cellPopoverContext.openCellPopover({
          rowIndex: 0,
          colIndex: 0,
        })
      );
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

      act(() => result.current.cellPopoverContext.closeCellPopover());
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);
    });
  });

  describe('cellPopover', () => {
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
      const { result } = renderHook(useCellPopover);
      expect(result.current.cellPopover).toBeFalsy(); // Should be empty on init

      populateCellPopover(result.current.cellPopoverContext);
      expect(result.current.cellPopover).toMatchInlineSnapshot(`
        <EuiWrappingPopover
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
      let rafSpy: jest.SpyInstance;
      beforeAll(() => {
        rafSpy = jest
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation((cb: Function) => cb());
      });
      beforeEach(() => jest.clearAllMocks());
      afterAll(() => rafSpy.mockRestore());

      // Mock a focusable cell parent
      const mockCell = document.createElement('div');
      mockCell.tabIndex = 0;
      mockCell.appendChild(mockPopoverAnchor);

      const renderCellPopover = () => {
        const { result } = renderHook(useCellPopover);
        populateCellPopover(result.current.cellPopoverContext);
        const component = shallow(<div>{result.current.cellPopover}</div>);

        return { result, component };
      };

      it('closes the popover and refocuses the cell when the Escape key is pressed', () => {
        const { result, component } = renderCellPopover();
        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

        const event = {
          key: keys.ESCAPE,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        };
        act(() => {
          component.find('EuiWrappingPopover').simulate('keyDown', event);
        });
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();

        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);
        expect(document.activeElement).toEqual(mockCell);
      });

      it('closes the popover when the F2 key is pressed', () => {
        const { result, component } = renderCellPopover();
        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

        const event = {
          key: keys.F2,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        };
        act(() => {
          component.find('EuiWrappingPopover').simulate('keyDown', event);
        });
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();

        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);
        expect(document.activeElement).toEqual(mockCell);
      });

      it('does nothing when other keys are pressed', () => {
        const { result, component } = renderCellPopover();
        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

        const event = {
          key: keys.ENTER,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        };
        act(() => {
          component.find('EuiWrappingPopover').simulate('keyDown', event);
        });
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.stopPropagation).not.toHaveBeenCalled();
        expect(rafSpy).not.toHaveBeenCalled();

        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);
      });
    });
  });

  // setCellPopoverProps is tested in the Cypress .spec file
});

describe('popover content renderers', () => {
  const cellContentsElement = document.createElement('div');
  cellContentsElement.innerText = '{ "hello": "world" }';
  const props = {
    rowIndex: 0,
    colIndex: 0,
    columnId: 'someId',
    schema: null,
    children: <div data-test-subj="mockCellValue">Content</div>,
    cellActions: <div data-test-subj="mockCellActions">Action</div>,
    cellContentsElement,
    DefaultCellPopover,
    setCellPopoverProps: () => {},
  };

  test('default cell popover', () => {
    const component = shallow(<DefaultCellPopover {...props} />);
    expect(component).toMatchInlineSnapshot(`
      <Fragment>
        <EuiText>
          <div
            data-test-subj="mockCellValue"
          >
            Content
          </div>
        </EuiText>
        <div
          data-test-subj="mockCellActions"
        >
          Action
        </div>
      </Fragment>
    `);
  });

  test('JSON schema popover', () => {
    const component = shallow(<DefaultCellPopover {...props} schema="json" />);
    const codeBlock = component.find('JsonPopoverContent').dive();
    expect(codeBlock).toMatchInlineSnapshot(`
      <EuiCodeBlock
        isCopyable={true}
        language="json"
        paddingSize="none"
        transparentBackground={true}
      >
        {
        "hello": "world"
      }
      </EuiCodeBlock>
    `);
  });
});
