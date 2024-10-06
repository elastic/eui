/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  renderHook,
  waitForEuiPopoverOpen,
  waitForEuiPopoverClose,
} from '../../../../test/rtl';

import { DataGridFocusContext } from '../../utils/focus';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';

import {
  EuiDataGridHeaderCell,
  usePopoverArrowNavigation,
} from './data_grid_header_cell';

const MockPanel = () => (
  <div tabIndex={-1}>
    <button data-test-subj="first">First action</button>
    <button data-test-subj="second">Second action</button>
    <button data-test-subj="last">Last action</button>
  </div>
);

describe('EuiDataGridHeaderCell', () => {
  const requiredProps = {
    column: {
      id: 'someColumn',
    },
    index: 0,
    columns: [],
    columnWidths: {},
    defaultColumnWidth: 50,
    schema: { someColumn: { columnType: 'numeric' } },
    schemaDetectors: [],
    setColumnWidth: jest.fn(),
    visibleColCount: 1,
    setVisibleColumns: jest.fn(),
    switchColumnPos: jest.fn(),
    gridStyles: { header: 'shade' as const },
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridHeaderCell {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('resizing', () => {
    it('renders a resizer', () => {
      const { getByTestSubject } = render(
        <EuiDataGridHeaderCell {...requiredProps} />
      );
      expect(getByTestSubject('dataGridColumnResizer')).toBeInTheDocument();
    });

    it('does not render a resizer if isResizable is false', () => {
      const { queryByTestSubject } = render(
        <EuiDataGridHeaderCell
          {...requiredProps}
          column={{ id: 'test', isResizable: false }}
        />
      );
      expect(
        queryByTestSubject('dataGridColumnResizer')
      ).not.toBeInTheDocument();
    });

    it('does not render a resizer if a column width cannot be found', () => {
      const { queryByTestSubject } = render(
        <EuiDataGridHeaderCell
          {...requiredProps}
          columnWidths={{}}
          defaultColumnWidth={undefined}
        />
      );
      expect(
        queryByTestSubject('dataGridColumnResizer')
      ).not.toBeInTheDocument();
    });
  });

  describe('popover', () => {
    it('does not render a popover if there are no column actions', () => {
      const { container } = render(
        <EuiDataGridHeaderCell
          {...requiredProps}
          column={{ id: 'test', actions: false }}
        />
      );
      expect(container.querySelector('.euiPopover')).not.toBeInTheDocument();
    });

    it('handles popover open and close', () => {
      const { container } = render(
        <DataGridFocusContext.Provider value={mockFocusContext}>
          <EuiDataGridHeaderCell {...requiredProps} />
        </DataGridFocusContext.Provider>
      );
      const toggle = container.querySelector('.euiDataGridHeaderCell__button')!;

      fireEvent.click(toggle);
      waitForEuiPopoverOpen();

      fireEvent.click(toggle);
      waitForEuiPopoverClose();
    });

    describe('keyboard arrow navigation', () => {
      const {
        panelRef,
        panelProps: { onKeyDown },
      } = renderHook(usePopoverArrowNavigation).result.current;

      let mockPanel: HTMLElement;

      const preventDefault = jest.fn();
      const keyDownEvent = { preventDefault } as unknown as React.KeyboardEvent;
      beforeEach(() => jest.clearAllMocks());

      describe('early returns', () => {
        it('does nothing if the up/down arrow keys are not pressed', () => {
          onKeyDown({ ...keyDownEvent, key: 'Tab' });
          expect(preventDefault).not.toHaveBeenCalled();
        });

        it('does nothing if the popover contains no tabbable elements', () => {
          const emptyDiv = document.createElement('div');
          panelRef(emptyDiv);
          onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
          expect(preventDefault).not.toHaveBeenCalled();

          panelRef(mockPanel); // Reset for other tests
        });
      });

      describe('when the popover panel is focused (on initial open state)', () => {
        beforeEach(() => {
          const { container } = render(<MockPanel />);

          mockPanel = container.firstElementChild as HTMLElement;
          panelRef(mockPanel);

          mockPanel.focus();
        });
        it('focuses the first action when the arrow down key is pressed', () => {
          expect(mockPanel).toHaveFocus();
          onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
          expect(preventDefault).toHaveBeenCalled();
          expect(
            document.activeElement?.getAttribute('data-test-subj')
          ).toEqual('first');
        });

        it('focuses the last action when the arrow up key is pressed', () => {
          onKeyDown({ ...keyDownEvent, key: 'ArrowUp' });
          expect(preventDefault).toHaveBeenCalled();
          expect(
            document.activeElement?.getAttribute('data-test-subj')
          ).toEqual('last');
        });
      });

      describe('when already focused on action buttons', () => {
        describe('down arrow key', () => {
          beforeEach(() => {
            const { container } = render(<MockPanel />);

            mockPanel = container.firstElementChild as HTMLElement;
            panelRef(mockPanel);
          });

          it('moves focus to the the next action', () => {
            (mockPanel.firstElementChild as HTMLButtonElement).focus();

            onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('second');

            onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('last');
          });

          it('loops focus back to the first action when pressing down on the last action', () => {
            (mockPanel.lastElementChild as HTMLButtonElement).focus();

            onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('first');
          });
        });

        describe('up arrow key', () => {
          beforeEach(() => {
            const { container } = render(<MockPanel />);

            mockPanel = container.firstElementChild as HTMLElement;
            panelRef(mockPanel);
          });

          it('moves focus to the previous action', () => {
            (mockPanel.lastElementChild as HTMLButtonElement).focus();

            onKeyDown({ ...keyDownEvent, key: 'ArrowUp' });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('second');

            onKeyDown({ ...keyDownEvent, key: 'ArrowUp' });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('first');
          });

          it('loops focus back to the last action when pressing up on the first action', () => {
            (mockPanel.firstElementChild as HTMLButtonElement).focus();

            onKeyDown({ ...keyDownEvent, key: 'ArrowUp' });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('last');
          });
        });
      });
    });
  });
});
