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

import { EuiDataGridSorting } from '../../data_grid_types';
import { DataGridSortingContext } from '../../utils/sorting';
import { DataGridFocusContext } from '../../utils/focus';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';

import {
  EuiDataGridHeaderCell,
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
    const sortingContext = {
      onSort: jest.fn(),
      columns: [],
    } as EuiDataGridSorting;

    const mountWithContext = (props = {}, sorting = {}) => {
      return mount(
        <DataGridSortingContext.Provider
          value={{
            sorting: { ...sortingContext, ...sorting },
            sortedRowMap: [],
            getCorrectRowIndex: jest.fn(),
          }}
        >
          <EuiDataGridHeaderCell {...requiredProps} {...props} />
        </DataGridSortingContext.Provider>
      );
    };

    describe('if the current column is being sorted', () => {
      it('renders a ascending sort arrow', () => {
        const component = mountWithContext(
          { column: { id: 'test' } },
          { columns: [{ id: 'test', direction: 'asc' }] }
        );
        const arrowIcon = component.find('EuiIcon').first();
        expect(arrowIcon.prop('type')).toEqual('sortUp');
      });

      it('renders a descending sort arrow', () => {
        const component = mountWithContext(
          { column: { id: 'test' } },
          { columns: [{ id: 'test', direction: 'desc' }] }
        );
        const arrowIcon = component.find('EuiIcon').first();
        expect(arrowIcon.prop('type')).toEqual('sortDown');
      });
    });

    describe('if the current column is not being sorted', () => {
      it('does not render an arrow even if other columns are sorted', () => {
        const component = mountWithContext(
          { column: { id: 'test' } },
          { columns: [{ id: 'other', direction: 'asc' }] }
        );
        expect(
          component.find('.euiDataGridHeaderCell__sortingArrow')
        ).toHaveLength(0);
      });
    });

    describe('when multiple columns are being sorted', () => {
      it('renders EuiScreenReaderOnly text with a full list of sorted columns', () => {
        const component = mountWithContext(
          { column: { id: 'A' } },
          {
            columns: [
              { id: 'A', direction: 'asc' },
              { id: 'B', direction: 'desc' },
            ],
          }
        );

        expect(component.find('EuiScreenReaderOnly')).toHaveLength(1);
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
