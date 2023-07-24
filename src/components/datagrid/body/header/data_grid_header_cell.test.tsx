/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { testCustomHook } from '../../../../test/internal';
import { render } from '../../../../test/rtl';

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
    headerIsInteractive: false,
  };

  it('renders', () => {
    const component = shallow(<EuiDataGridHeaderCell {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  describe('sorting', () => {
    const columnId = 'test';
    const mockSortingArgs = {
      sorting: undefined,
      id: columnId,
      showColumnActions: true,
    };

    const getRenderedText = (text: React.ReactElement) =>
      render(<p>{text}</p>).container.textContent;

    describe('if the current column is being sorted', () => {
      it('renders an ascending sort arrow', () => {
        const {
          return: { sortingArrow },
        } = testCustomHook(useSortingUtils, {
          ...mockSortingArgs,
          sorting: { columns: [{ id: columnId, direction: 'asc' }] },
        });

        expect(shallow(sortingArrow).prop('data-euiicon-type')).toEqual(
          'sortUp'
        );
      });

      it('renders a descending sort arrow', () => {
        const {
          return: { sortingArrow },
        } = testCustomHook(useSortingUtils, {
          ...mockSortingArgs,
          sorting: { columns: [{ id: columnId, direction: 'desc' }] },
        });

        expect(shallow(sortingArrow).prop('data-euiicon-type')).toEqual(
          'sortDown'
        );
      });

      describe('when only the current column is being sorted', () => {
        describe('when the header cell has no actions', () => {
          it('renders aria-sort but not sortingScreenReaderText', () => {
            const {
              return: { ariaSort, sortingScreenReaderText },
            } = testCustomHook(useSortingUtils, {
              ...mockSortingArgs,
              sorting: { columns: [{ id: columnId, direction: 'asc' }] },
              showColumnActions: false,
            });

            expect(ariaSort).toEqual('ascending');
            expect(getRenderedText(sortingScreenReaderText)).toEqual('');
          });
        });

        describe('when the header cell has actions', () => {
          it('renders aria-sort and sortingScreenReaderText', () => {
            const {
              return: { ariaSort, sortingScreenReaderText },
            } = testCustomHook(useSortingUtils, {
              ...mockSortingArgs,
              sorting: { columns: [{ id: columnId, direction: 'desc' }] },
              showColumnActions: true,
            });

            expect(ariaSort).toEqual('descending');
            expect(getRenderedText(sortingScreenReaderText)).toEqual(
              'Sorted descending.'
            );
          });
        });
      });
    });

    describe('if the current column is not being sorted', () => {
      it('does not render an arrow even if other columns are sorted', () => {
        const {
          return: { sortingArrow },
        } = testCustomHook(useSortingUtils, {
          ...mockSortingArgs,
          sorting: { columns: [{ id: 'other', direction: 'desc' }] },
        });

        expect(sortingArrow).toBeNull();
      });

      it('does not render aria-sort or screen reader sorting text', () => {
        const {
          return: { ariaSort, sortingScreenReaderText },
        } = testCustomHook(useSortingUtils, mockSortingArgs);

        expect(ariaSort).toEqual(undefined);
        expect(getRenderedText(sortingScreenReaderText)).toEqual('');
      });
    });

    describe('when multiple columns are being sorted', () => {
      it('does not render aria-sort, but renders sorting screen reader text text with a full list of sorted columns', () => {
        const {
          return: { ariaSort, sortingScreenReaderText },
          getUpdatedState,
          updateHookArgs,
        } = testCustomHook(useSortingUtils, {
          id: 'A',
          sorting: {
            columns: [
              { id: 'A', direction: 'asc' },
              { id: 'B', direction: 'desc' },
            ],
          },
        });

        expect(ariaSort).toEqual(undefined);
        expect(getRenderedText(sortingScreenReaderText)).toMatchInlineSnapshot(
          '"Sorted by A, ascending, then sorted by B, descending."'
        );

        // Branch coverage
        updateHookArgs({
          sorting: {
            columns: [
              { id: 'B', direction: 'desc' },
              { id: 'C', direction: 'asc' },
              { id: 'A', direction: 'asc' },
            ],
          },
        });
        expect(
          getRenderedText(getUpdatedState().sortingScreenReaderText)
        ).toMatchInlineSnapshot(
          '"Sorted by B, descending, then sorted by C, ascending, then sorted by A, ascending."'
        );
      });
    });
  });

  describe('resizing', () => {
    it('renders a resizer', () => {
      const component = shallow(<EuiDataGridHeaderCell {...requiredProps} />);
      expect(component.find('EuiDataGridColumnResizer')).toHaveLength(1);
    });

    it('does not render a resizer if isResizable is false', () => {
      const component = shallow(
        <EuiDataGridHeaderCell
          {...requiredProps}
          column={{ id: 'test', isResizable: false }}
        />
      );
      expect(component.find('EuiDataGridColumnResizer')).toHaveLength(0);
    });

    it('does not render a resizer if a column width cannot be found', () => {
      const component = shallow(
        <EuiDataGridHeaderCell
          {...requiredProps}
          columnWidths={{}}
          defaultColumnWidth={undefined}
        />
      );
      expect(component.find('EuiDataGridColumnResizer')).toHaveLength(0);
    });
  });

  describe('popover', () => {
    it('does not render a popover if there are no column actions', () => {
      const component = shallow(
        <EuiDataGridHeaderCell
          {...requiredProps}
          column={{ id: 'test', actions: false }}
        />
      );
      expect(component.find('EuiPopover')).toHaveLength(0);
    });

    it('handles popover open', () => {
      const component = mount(
        <DataGridFocusContext.Provider value={mockFocusContext}>
          <EuiDataGridHeaderCell {...requiredProps} />
        </DataGridFocusContext.Provider>
      );
      component.find('.euiDataGridHeaderCell__button').simulate('click');

      expect(component.find('EuiPopover').prop('isOpen')).toEqual(true);
      expect(mockFocusContext.setFocusedCell).toHaveBeenCalledWith([0, -1]);
    });

    it('handles popover close', () => {
      const component = shallow(<EuiDataGridHeaderCell {...requiredProps} />);
      (component.find('EuiPopover').prop('closePopover') as Function)();

      expect(component.find('EuiPopover').prop('isOpen')).toEqual(false);
    });

    describe('keyboard arrow navigation', () => {
      const {
        return: {
          panelRef,
          panelProps: { onKeyDown },
        },
      } = testCustomHook(usePopoverArrowNavigation);

      const mockPanel = document.createElement('div');
      mockPanel.setAttribute('tabindex', '-1');
      mockPanel.innerHTML = `
        <button data-test-subj="first">First action</button>
        <button data-test-subj="second">Second action</button>
        <button data-test-subj="last">Last action</button>
      `;
      panelRef(mockPanel);

      const preventDefault = jest.fn();
      beforeEach(() => jest.clearAllMocks());

      describe('early returns', () => {
        it('does nothing if the up/down arrow keys are not pressed', () => {
          onKeyDown({ key: 'Tab', preventDefault });
          expect(preventDefault).not.toHaveBeenCalled();
        });

        it('does nothing if the popover contains no tabbable elements', () => {
          const emptyDiv = document.createElement('div');
          panelRef(emptyDiv);
          onKeyDown({ key: 'ArrowDown', preventDefault });
          expect(preventDefault).not.toHaveBeenCalled();

          panelRef(mockPanel); // Reset for other tests
        });
      });

      describe('when the popover panel is focused (on initial open state)', () => {
        beforeEach(() => mockPanel.focus());

        it('focuses the first action when the arrow down key is pressed', () => {
          onKeyDown({ key: 'ArrowDown', preventDefault });
          expect(preventDefault).toHaveBeenCalled();
          expect(
            document.activeElement?.getAttribute('data-test-subj')
          ).toEqual('first');
        });

        it('focuses the last action when the arrow up key is pressed', () => {
          onKeyDown({ key: 'ArrowUp', preventDefault });
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
            onKeyDown({ key: 'ArrowDown', preventDefault });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('second');

            onKeyDown({ key: 'ArrowDown', preventDefault });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('last');
          });

          it('loops focus back to the first action when pressing down on the last action', () => {
            onKeyDown({ key: 'ArrowDown', preventDefault });
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
            onKeyDown({ key: 'ArrowUp', preventDefault });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('second');

            onKeyDown({ key: 'ArrowUp', preventDefault });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('first');
          });

          it('loops focus back to the last action when pressing up on the first action', () => {
            onKeyDown({ key: 'ArrowUp', preventDefault });
            expect(
              document.activeElement?.getAttribute('data-test-subj')
            ).toEqual('last');
          });
        });
      });
    });
  });
});
