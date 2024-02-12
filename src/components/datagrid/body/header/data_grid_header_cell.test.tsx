/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
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
  useSortingUtils,
  usePopoverArrowNavigation,
} from './data_grid_header_cell';

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
    setVisibleColumns: jest.fn(),
    switchColumnPos: jest.fn(),
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridHeaderCell {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('sorting', () => {
    const onSort = () => {};
    const columnId = 'test';
    const mockSortingArgs = {
      sorting: undefined,
      id: columnId,
      showColumnActions: true,
    };

    const getRender = (node: ReactNode) => render(<>{node}</>).container;

    describe('if the current column is being sorted', () => {
      it('renders an ascending sort arrow', () => {
        const { sortingArrow } = renderHook(() =>
          useSortingUtils({
            ...mockSortingArgs,
            sorting: {
              onSort,
              columns: [{ id: columnId, direction: 'asc' }],
            },
          })
        ).result.current;

        expect(
          getRender(sortingArrow).querySelector('[data-euiicon-type="sortUp"]')
        ).toBeInTheDocument();
      });

      it('renders a descending sort arrow', () => {
        const { sortingArrow } = renderHook(() =>
          useSortingUtils({
            ...mockSortingArgs,
            sorting: {
              onSort,
              columns: [{ id: columnId, direction: 'desc' }],
            },
          })
        ).result.current;

        expect(
          getRender(sortingArrow).querySelector(
            '[data-euiicon-type="sortDown"]'
          )
        ).toBeInTheDocument();
      });

      describe('when only the current column is being sorted', () => {
        describe('when the header cell has no actions', () => {
          it('renders aria-sort but not sortingScreenReaderText', () => {
            const { ariaSort, sortingScreenReaderText } = renderHook(() =>
              useSortingUtils({
                ...mockSortingArgs,
                sorting: {
                  onSort,
                  columns: [{ id: columnId, direction: 'asc' }],
                },
                showColumnActions: false,
              })
            ).result.current;

            expect(ariaSort).toEqual('ascending');
            expect(getRender(sortingScreenReaderText)).toHaveTextContent('');
          });
        });

        describe('when the header cell has actions', () => {
          it('renders aria-sort and sortingScreenReaderText', () => {
            const { ariaSort, sortingScreenReaderText } = renderHook(() =>
              useSortingUtils({
                ...mockSortingArgs,
                sorting: {
                  onSort,
                  columns: [{ id: columnId, direction: 'desc' }],
                },
                showColumnActions: true,
              })
            ).result.current;

            expect(ariaSort).toEqual('descending');
            expect(getRender(sortingScreenReaderText)).toHaveTextContent(
              'Sorted descending.'
            );
          });
        });
      });
    });

    describe('if the current column is not being sorted', () => {
      it('does not render an arrow even if other columns are sorted', () => {
        const { sortingArrow } = renderHook(() =>
          useSortingUtils({
            ...mockSortingArgs,
            sorting: { onSort, columns: [{ id: 'other', direction: 'desc' }] },
          })
        ).result.current;

        expect(sortingArrow).toBeNull();
      });

      it('does not render aria-sort or screen reader sorting text', () => {
        const { ariaSort, sortingScreenReaderText } = renderHook(() =>
          useSortingUtils(mockSortingArgs)
        ).result.current;

        expect(ariaSort).toEqual(undefined);
        expect(getRender(sortingScreenReaderText)).toHaveTextContent('');
      });
    });

    describe('when multiple columns are being sorted', () => {
      it('does not render aria-sort, but renders sorting screen reader text text with a full list of sorted columns', () => {
        const { result, rerender } = renderHook(useSortingUtils, {
          initialProps: {
            ...mockSortingArgs,
            id: 'A',
            sorting: {
              onSort,
              columns: [
                { id: 'A', direction: 'asc' },
                { id: 'B', direction: 'desc' },
              ],
            },
          },
        });

        expect(result.current.ariaSort).toEqual(undefined);
        expect(
          getRender(result.current.sortingScreenReaderText)
        ).toHaveTextContent(
          'Sorted by A, ascending, then sorted by B, descending.'
        );

        // Branch coverage
        rerender({
          ...mockSortingArgs,
          id: 'B',
          sorting: {
            onSort,
            columns: [
              { id: 'B', direction: 'desc' },
              { id: 'C', direction: 'asc' },
              { id: 'A', direction: 'asc' },
            ],
          },
        });
        expect(
          getRender(result.current.sortingScreenReaderText)
        ).toHaveTextContent(
          'Sorted by B, descending, then sorted by C, ascending, then sorted by A, ascending.'
        );
      });
    });
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

      const mockPanel = document.createElement('div');
      mockPanel.setAttribute('tabindex', '-1');
      mockPanel.innerHTML = `
        <button data-test-subj="first">First action</button>
        <button data-test-subj="second">Second action</button>
        <button data-test-subj="last">Last action</button>
      `;
      panelRef(mockPanel);

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
        beforeEach(() => mockPanel.focus());

        it('focuses the first action when the arrow down key is pressed', () => {
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
          beforeAll(() =>
            (mockPanel.firstElementChild as HTMLButtonElement).focus()
          );

          it('moves focus to the the next action', () => {
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
            onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('first');
          });
        });

        describe('up arrow key', () => {
          beforeAll(() =>
            (mockPanel.lastElementChild as HTMLButtonElement).focus()
          );

          it('moves focus to the previous action', () => {
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
