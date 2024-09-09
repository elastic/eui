/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { createEvent, fireEvent } from '@testing-library/react';
import { render, renderHook, renderHookAct } from '../../../../test/rtl';
import { keys } from '../../../../services';

import { DataGridCellPopoverContextShape } from '../../data_grid_types';
import { useCellPopover, DefaultCellPopover } from './data_grid_cell_popover';

describe('useCellPopover', () => {
  describe('openCellPopover', () => {
    it('sets popoverIsOpen state to true', () => {
      const { result } = renderHook(useCellPopover);
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);

      renderHookAct(() =>
        result.current.cellPopoverContext.openCellPopover({
          rowIndex: 0,
          colIndex: 0,
        })
      );
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);
    });

    it('does nothing if called again on a popover that is already open', () => {
      const mockAnchor = document.createElement('div');
      document.body.appendChild(mockAnchor);

      const { result } = renderHook(useCellPopover);
      expect(result.current.cellPopover).toBeFalsy();

      renderHookAct(() => {
        result.current.cellPopoverContext.openCellPopover({
          rowIndex: 0,
          colIndex: 0,
        });
        result.current.cellPopoverContext.setPopoverAnchor(mockAnchor);
      });
      expect(result.current.cellPopover).not.toBeFalsy();

      renderHookAct(() => {
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

      renderHookAct(() =>
        result.current.cellPopoverContext.openCellPopover({
          rowIndex: 0,
          colIndex: 0,
        })
      );
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

      renderHookAct(() => result.current.cellPopoverContext.closeCellPopover());
      expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);
    });
  });

  describe('cellPopover', () => {
    const mockPopoverAnchor = document.createElement('div');
    const mockPopoverContent = (
      <div data-test-subj="mockPopover">Hello world</div>
    );

    // the anchor needs to be avialable in the DOM for the context on initialization
    document.body.append(mockPopoverAnchor);

    const populateCellPopover = (
      cellPopoverContext: DataGridCellPopoverContextShape
    ) => {
      renderHookAct(() => {
        cellPopoverContext.openCellPopover({ colIndex: 0, rowIndex: 0 });
        cellPopoverContext.setPopoverAnchor(mockPopoverAnchor);
        cellPopoverContext.setPopoverContent(mockPopoverContent);
      });
    };

    it('renders', () => {
      const { result } = renderHook(useCellPopover);
      expect(result.current.cellPopover).toBeFalsy(); // Should be empty on init

      populateCellPopover(result.current.cellPopoverContext);
      expect(result.current.cellPopover).toBeTruthy();

      const { baseElement } = render(<>{result.current.cellPopover}</>);
      expect(baseElement.querySelector('.euiDataGridRowCell__popover'))
        .toMatchInlineSnapshot(`
        <div
          aria-describedby="generated-id"
          aria-live="off"
          aria-modal="true"
          class="euiPanel euiPanel--plain euiPanel--paddingSmall euiPopover__panel euiDataGridRowCell__popover emotion-euiPanel-grow-m-s-plain-euiPopover__panel-light-isOpen-isAttached-bottom-euiDataGridRowCell__popover"
          data-autofocus="true"
          data-popover-open="true"
          data-popover-panel="true"
          data-test-subj="euiDataGridExpansionPopover"
          role="dialog"
          style="top: 0px; left: 0px; will-change: transform, opacity; max-inline-size: min(75vw, max(0px, 400px)); max-block-size: 50vh; z-index: 1000;"
          tabindex="0"
        >
          <p
            class="emotion-euiScreenReaderOnly"
            id="generated-id"
          >
            You are in a dialog. Press Escape, or tap/click outside the dialog to close.
          </p>
          <div>
            <div
              data-test-subj="mockPopover"
            >
              Hello world
            </div>
          </div>
        </div>
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
      mockCell.className = 'euiDataGridRowCell';
      mockCell.tabIndex = 0;

      const renderCellPopover = () => {
        const { result } = renderHook(useCellPopover);

        populateCellPopover(result.current.cellPopoverContext);

        const { baseElement, container, getByTestSubject } = render(
          <div>{result.current.cellPopover}</div>
        );

        mockCell.append(mockPopoverAnchor);
        // NOTE: [issue for React 16/17] we need to append the cell to the body instead of the container
        // to prevent issues with unmounting between renders as the cell otherwise
        // would not be part of the original render content
        document.body.prepend(mockCell);

        return { result, container, baseElement, getByTestSubject };
      };

      it('closes the popover and refocuses the cell when the Escape key is pressed', () => {
        const { result, getByTestSubject } = renderCellPopover();
        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

        const popover = getByTestSubject('euiDataGridExpansionPopover');

        const keyboardEvent = createEvent.keyDown(popover, {
          key: keys.ESCAPE,
        });
        keyboardEvent.preventDefault = jest.fn();
        keyboardEvent.stopPropagation = jest.fn();
        fireEvent(popover, keyboardEvent);

        expect(keyboardEvent.preventDefault).toHaveBeenCalled();
        expect(keyboardEvent.stopPropagation).toHaveBeenCalled();

        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);
        expect(document.activeElement).toEqual(mockCell);
      });

      it('closes the popover when the F2 key is pressed', () => {
        const { result, getByTestSubject } = renderCellPopover();
        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

        const popover = getByTestSubject('euiDataGridExpansionPopover');

        const keyboardEvent = createEvent.keyDown(popover, { key: keys.F2 });
        keyboardEvent.preventDefault = jest.fn();
        keyboardEvent.stopPropagation = jest.fn();
        fireEvent(popover, keyboardEvent);

        expect(keyboardEvent.preventDefault).toHaveBeenCalled();
        expect(keyboardEvent.stopPropagation).toHaveBeenCalled();

        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(false);
        expect(document.activeElement).toEqual(mockCell);
      });

      it('does nothing when other keys are pressed', () => {
        const { result, getByTestSubject } = renderCellPopover();
        expect(result.current.cellPopoverContext.popoverIsOpen).toEqual(true);

        const popover = getByTestSubject('euiDataGridExpansionPopover');

        const keyboardEvent = createEvent.keyDown(popover, { key: keys.ENTER });
        keyboardEvent.preventDefault = jest.fn();
        keyboardEvent.stopPropagation = jest.fn();
        fireEvent(popover, keyboardEvent);

        expect(keyboardEvent.preventDefault).not.toHaveBeenCalled();
        expect(keyboardEvent.stopPropagation).not.toHaveBeenCalled();
        expect(rafSpy).not.toHaveBeenCalledTimes(2); // 1 render happens on mount

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
    const { container } = render(<DefaultCellPopover {...props} />);
    expect(container.firstChild).toHaveClass('euiText');
    expect(container).toHaveTextContent('Content');
  });

  test('JSON schema popover', () => {
    const { container } = render(
      <DefaultCellPopover {...props} schema="json" />
    );
    expect(container.firstChild).toHaveClass('euiCodeBlock');
    expect(container).toHaveTextContent('{ "hello": "world" }');
  });
});
