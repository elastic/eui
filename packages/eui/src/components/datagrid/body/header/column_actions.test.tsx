/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  renderHook,
  waitForEuiPopoverOpen,
  waitForEuiPopoverClose,
} from '../../../../test/rtl';

import { EuiListGroupItemProps } from '../../../list_group';
import { schemaDetectors } from '../../utils/data_grid_schema';

import {
  useHasColumnActions,
  ColumnActions,
  getColumnActions,
  isColumnActionEnabled,
  getColumnActionConfig,
  usePopoverArrowNavigation,
} from './column_actions';

describe('useHasColumnActions', () => {
  it('is true if no configuration was set', () => {
    const { result } = renderHook(useHasColumnActions);
    expect(result.current).toEqual(true);
  });

  it('all actions can be quickly turned off with false', () => {
    const { result } = renderHook(() => useHasColumnActions(false));
    expect(result.current).toEqual(false);
  });

  it('all actions can be turned off manually', () => {
    const { result } = renderHook(() =>
      useHasColumnActions({
        showHide: false,
        showMoveLeft: false,
        showMoveRight: false,
        showSortAsc: false,
        showSortDesc: false,
      })
    );
    expect(result.current).toEqual(false);
  });

  it('returns true if only some actions are turned off', () => {
    const { result } = renderHook(() =>
      useHasColumnActions({
        showSortAsc: false,
        showSortDesc: false,
      })
    );
    expect(result.current).toEqual(true);
  });

  it('returns true if additional actions have been passed but all other actions turned off', () => {
    const { result } = renderHook(() =>
      useHasColumnActions({
        showHide: false,
        showMoveLeft: false,
        showMoveRight: false,
        showSortAsc: false,
        showSortDesc: false,
        additional: [{ label: 'additional action' }],
      })
    );
    expect(result.current).toEqual(true);
  });
});

describe('ColumnActions', () => {
  const requiredProps = {
    index: 0,
    id: 'someColumn',
    title: 'someColumn',
    column: {
      id: 'someColumn',
    },
    columns: [],
    schema: { someColumn: { columnType: 'numeric' } },
    schemaDetectors: [],
    setVisibleColumns: jest.fn(),
    switchColumnPos: jest.fn(),
    sorting: { onSort: jest.fn(), columns: [] },
    hasFocusTrap: false,
    setPropsFromColumnActions: jest.fn(),
    actionsButtonRef: jest.fn(),
  };

  it('renders', async () => {
    const { getByTestSubject, baseElement } = render(
      <ColumnActions {...requiredProps} />
    );
    const toggle = getByTestSubject(
      'dataGridHeaderCellActionButton-someColumn'
    );

    fireEvent.click(toggle);
    await waitForEuiPopoverOpen();

    expect(baseElement).toMatchSnapshot();

    fireEvent.click(toggle);
    await waitForEuiPopoverClose();
  });
});

describe('usePopoverArrowNavigation', () => {
  const MockPanel = () => (
    <div tabIndex={-1}>
      <button data-test-subj="first">First action</button>
      <button data-test-subj="second">Second action</button>
      <button data-test-subj="last">Last action</button>
    </div>
  );

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
      expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
        'first'
      );
    });

    it('focuses the last action when the arrow up key is pressed', () => {
      onKeyDown({ ...keyDownEvent, key: 'ArrowUp' });
      expect(preventDefault).toHaveBeenCalled();
      expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
        'last'
      );
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
        expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
          'second'
        );

        onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
        expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
          'last'
        );
      });

      it('loops focus back to the first action when pressing down on the last action', () => {
        (mockPanel.lastElementChild as HTMLButtonElement).focus();

        onKeyDown({ ...keyDownEvent, key: 'ArrowDown' });
        expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
          'first'
        );
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
        expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
          'second'
        );

        onKeyDown({ ...keyDownEvent, key: 'ArrowUp' });
        expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
          'first'
        );
      });

      it('loops focus back to the last action when pressing up on the first action', () => {
        (mockPanel.firstElementChild as HTMLButtonElement).focus();

        onKeyDown({ ...keyDownEvent, key: 'ArrowUp' });
        expect(document.activeElement?.getAttribute('data-test-subj')).toEqual(
          'last'
        );
      });
    });
  });
});

describe('getColumnActions', () => {
  const setVisibleColumns = jest.fn();
  const focusFirstVisibleInteractiveCell = jest.fn();
  const setIsPopoverOpen = jest.fn();
  const switchColumnPos = jest.fn();
  const setIsColumnMoving = jest.fn();
  const setFocusedCell = jest.fn();

  const testArgs = {
    column: { id: 'B' },
    columns: [{ id: 'A' }, { id: 'B' }, { id: 'C' }],
    columnFocusIndex: 1,
    schema: {},
    schemaDetectors,
    setVisibleColumns,
    focusFirstVisibleInteractiveCell,
    setIsPopoverOpen,
    sorting: undefined,
    switchColumnPos,
    setIsColumnMoving,
    setFocusedCell,
  };

  // DRY test helper
  const callActionOnClick = (action: EuiListGroupItemProps) => {
    (action.onClick as Function)({ stopPropagation: jest.fn() });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns an array of EuiListGroup items', () => {
    const items = getColumnActions(testArgs);
    expect(items).toBeInstanceOf(Array); // We'll assert the actual contents below
    expect(items.length).toEqual(3);
  });

  it('returns an empty array when column.actions is set to false', () => {
    const items = getColumnActions({
      ...testArgs,
      column: {
        ...testArgs.column,
        actions: false,
      },
    });
    expect(items.length).toEqual(0);
  });

  it('appends additional custom columns to the end of the array', () => {
    const items = getColumnActions({
      ...testArgs,
      column: {
        ...testArgs.column,
        actions: {
          additional: [{ label: 'Hi world!', iconType: 'warning' }],
        },
      },
    });
    expect(items.length).toEqual(4);

    const customAction = items[3];
    expect(customAction).toMatchInlineSnapshot(`
      {
        "iconType": "warning",
        "label": "Hi world!",
        "onClick": [Function],
      }
    `);
    callActionOnClick(customAction);
    // Should still close the popover, even if the custom action has no onClick
    expect(setIsPopoverOpen).toHaveBeenCalledWith(false);
  });

  describe('hiding', () => {
    describe('default behavior', () => {
      const items = getColumnActions(testArgs);
      const hideColumn = items[0];

      it('renders a "Hide column" item first', () => {
        expect(hideColumn).toMatchInlineSnapshot(`
          {
            "color": "text",
            "iconType": "eyeClosed",
            "label": <EuiI18n
              default="Hide column"
              token="euiColumnActions.hideColumn"
            />,
            "onClick": [Function],
            "size": "xs",
          }
        `);
      });

      it('hides the current column on click and refocuses into the grid', () => {
        callActionOnClick(hideColumn);
        expect(setVisibleColumns).toHaveBeenCalledWith(['A', 'C']);
        expect(focusFirstVisibleInteractiveCell).toHaveBeenCalled();
      });
    });

    describe('custom column behavior', () => {
      it('accepts column action overrides', () => {
        const items = getColumnActions({
          ...testArgs,
          column: {
            ...testArgs.column,
            actions: {
              showHide: {
                label: 'hello world',
              },
            },
          },
        });
        const hideColumn = items[0];

        expect(hideColumn.label).toEqual('hello world');
      });

      it('allows disabling the hide action', () => {
        const items = getColumnActions({
          ...testArgs,
          column: {
            ...testArgs.column,
            actions: {
              showHide: false,
            },
          },
        });

        expect(items.length).toEqual(2);
      });
    });
  });

  describe('column reordering', () => {
    jest.useFakeTimers();

    describe('default enabled behavior', () => {
      const items = getColumnActions(testArgs);
      const moveLeft = items[1];
      const moveRight = items[2];

      it('renders a "Move left" item', () => {
        expect(moveLeft).toMatchInlineSnapshot(`
          {
            "color": "text",
            "iconType": "sortLeft",
            "isDisabled": false,
            "label": <EuiI18n
              default="Move left"
              token="euiColumnActions.moveLeft"
            />,
            "onClick": [Function],
            "size": "xs",
          }
        `);
      });

      it('renders a "Move right" item', () => {
        expect(moveRight).toMatchInlineSnapshot(`
          {
            "color": "text",
            "iconType": "sortRight",
            "isDisabled": false,
            "label": <EuiI18n
              default="Move right"
              token="euiColumnActions.moveRight"
            />,
            "onClick": [Function],
            "size": "xs",
          }
        `);
      });

      it('calls switchColumnPos and updates the focused cell column index on click', () => {
        callActionOnClick(moveLeft);
        jest.runAllTimers();
        expect(switchColumnPos).toHaveBeenCalledWith('B', 'A');
        expect(setFocusedCell).toHaveBeenLastCalledWith([0, -1]);
        expect(setIsColumnMoving).toHaveBeenCalledWith(true);

        callActionOnClick(moveRight);
        jest.runAllTimers();
        expect(switchColumnPos).toHaveBeenCalledWith('B', 'C');
        expect(setFocusedCell).toHaveBeenLastCalledWith([2, -1]);

        // Quick note about the -1 row index above: `-1` is the index we set for our
        // sticky header row, and these column actions can only ever be called by an
        // interactive header cell, so we can safely and statically set the -1 index
      });
    });

    describe('focus behavior with leading control columns', () => {
      const items = getColumnActions({
        ...testArgs,
        columnFocusIndex: testArgs.columnFocusIndex + 2, // "Add" 2 leading control columns
      });
      const moveLeft = items[1];
      const moveRight = items[2];

      it('correctly calls the focused cell x index accounting for leading control columns', () => {
        callActionOnClick(moveLeft);
        jest.runAllTimers();
        expect(switchColumnPos).toHaveBeenCalledWith('B', 'A');
        expect(setFocusedCell).toHaveBeenLastCalledWith([2, -1]);

        callActionOnClick(moveRight);
        jest.runAllTimers();
        expect(switchColumnPos).toHaveBeenCalledWith('B', 'C');
        expect(setFocusedCell).toHaveBeenLastCalledWith([4, -1]);
      });
    });

    describe('disabled behavior', () => {
      it('renders "Move left" as disabled if already on the first/left-most column', () => {
        const items = getColumnActions({
          ...testArgs,
          column: { id: 'A' },
        });
        const moveLeft = items[1];
        expect(moveLeft.isDisabled).toEqual(true);

        // Should still not error/do anything if the onClick is somehow invoked
        callActionOnClick(moveLeft);
        expect(switchColumnPos).not.toHaveBeenCalled();
      });

      it('renders "Move left" as disabled if already on the last/right-most column', () => {
        const items = getColumnActions({
          ...testArgs,
          column: { id: 'C' },
        });
        const moveRight = items[2];
        expect(moveRight.isDisabled).toEqual(true);

        // Should still not error/do anything if the onClick is somehow invoked
        callActionOnClick(moveRight);
        expect(switchColumnPos).not.toHaveBeenCalled();
      });
    });

    describe('custom column behavior', () => {
      it('accepts column action overrides', () => {
        const items = getColumnActions({
          ...testArgs,
          column: {
            ...testArgs.column,
            actions: {
              showMoveLeft: {
                label: 'hello',
              },
              showMoveRight: {
                label: 'world',
              },
            },
          },
        });
        const moveLeft = items[1];
        const moveRight = items[2];

        expect(moveLeft.label).toEqual('hello');
        expect(moveRight.label).toEqual('world');
      });

      it('allows disabling show actions', () => {
        const items = getColumnActions({
          ...testArgs,
          column: {
            ...testArgs.column,
            actions: {
              showMoveLeft: false,
              showMoveRight: false,
            },
          },
        });

        expect(items.length).toEqual(1);
      });
    });
  });

  describe('sorting', () => {
    const onSort = jest.fn();

    describe('default behavior (no active sorts present)', () => {
      const items = getColumnActions({
        ...testArgs,
        sorting: { onSort, columns: [] },
      });
      const sortAsc = items[1];
      const sortDesc = items[2];

      it('returns 2 more sorting EuiListGroup items when sorting is defined', () => {
        expect(items.length).toEqual(5);
      });

      it('renders a "Sort A-Z" item', () => {
        expect(sortAsc).toMatchInlineSnapshot(`
          {
            "color": "text",
            "iconType": "sortUp",
            "isDisabled": false,
            "label": <EuiI18n
              default="Sort {schemaLabel}"
              token="euiColumnActions.sort"
              values={
                {
                  "schemaLabel": <EuiI18n
                    default="A-Z"
                    token="euiColumnSortingDraggable.defaultSortAsc"
                  />,
                }
              }
            />,
            "onClick": [Function],
            "size": "xs",
          }
        `);
      });

      it('renders a "Sort Z-A" item', () => {
        expect(sortDesc).toMatchInlineSnapshot(`
          {
            "color": "text",
            "iconType": "sortDown",
            "isDisabled": false,
            "label": <EuiI18n
              default="Sort {schemaLabel}"
              token="euiColumnActions.sort"
              values={
                {
                  "schemaLabel": <EuiI18n
                    default="Z-A"
                    token="euiColumnSortingDraggable.defaultSortDesc"
                  />,
                }
              }
            />,
            "onClick": [Function],
            "size": "xs",
          }
        `);
      });

      it('calls onSort on click', () => {
        callActionOnClick(sortAsc);
        expect(onSort).toHaveBeenCalledWith([{ direction: 'asc', id: 'B' }]);

        callActionOnClick(sortDesc);
        expect(onSort).toHaveBeenCalledWith([{ direction: 'desc', id: 'B' }]);
      });
    });

    describe('when active sorts are present', () => {
      describe('when current column is sorting by asc', () => {
        const items = getColumnActions({
          ...testArgs,
          sorting: { onSort, columns: [{ id: 'B', direction: 'asc' }] },
        });
        const sortAsc = items[1];

        it('changes label to unsort', () => {
          expect(sortAsc.label).toMatchInlineSnapshot(`
            <EuiI18n
              default="Unsort {schemaLabel}"
              token="euiColumnActions.unsort"
              values={
                {
                  "schemaLabel": <EuiI18n
                    default="A-Z"
                    token="euiColumnSortingDraggable.defaultSortAsc"
                  />,
                }
              }
            />
          `);
        });

        it('unsets the current sort if sortAsc is clicked again', () => {
          callActionOnClick(sortAsc);
          expect(onSort).toHaveBeenCalledWith([]);
        });
      });

      describe('when current column is sorting by desc', () => {
        const items = getColumnActions({
          ...testArgs,
          sorting: { onSort, columns: [{ id: 'B', direction: 'desc' }] },
        });
        const sortAsc = items[1];
        const sortDesc = items[2];

        it('changes label to unsort', () => {
          expect(sortDesc.label).toMatchInlineSnapshot(`
            <EuiI18n
              default="Unsort {schemaLabel}"
              token="euiColumnActions.unsort"
              values={
                {
                  "schemaLabel": <EuiI18n
                    default="Z-A"
                    token="euiColumnSortingDraggable.defaultSortDesc"
                  />,
                }
              }
            />
          `);
        });

        it('sets a new sort if the direction is changed', () => {
          callActionOnClick(sortAsc);
          expect(onSort).toHaveBeenCalledWith([{ id: 'B', direction: 'asc' }]);
        });
      });
    });

    describe('modifies the sort label based on schema', () => {
      it('renders low-high instead of A-Z for number schema', () => {
        const items = getColumnActions({
          ...testArgs,
          column: { id: 'A' },
          schema: { A: { columnType: 'numeric' } },
          sorting: { onSort, columns: [{ id: 'A', direction: 'desc' }] },
        });
        const sortAscLabel = items[1].label as ReactElement;
        const sortDescLabel = items[2].label as ReactElement;

        expect(sortAscLabel.props.values.schemaLabel.props.default).toEqual(
          'Low-High'
        );
        expect(sortDescLabel.props.values.schemaLabel.props.default).toEqual(
          'High-Low'
        );
      });
    });

    describe('custom column behavior', () => {
      it('accepts column action overrides', () => {
        const items = getColumnActions({
          ...testArgs,
          column: {
            ...testArgs.column,
            actions: {
              showSortAsc: {
                label: 'upsies',
              },
              showSortDesc: {
                label: 'downsies',
              },
            },
          },
          sorting: { onSort, columns: [] },
        });
        const sortAsc = items[1];
        const sortDesc = items[2];

        expect(sortAsc.label).toEqual('upsies');
        expect(sortDesc.label).toEqual('downsies');
      });

      it('allows disabling sort actions', () => {
        const items = getColumnActions({
          ...testArgs,
          column: {
            ...testArgs.column,
            actions: {
              showSortAsc: false,
              showSortDesc: false,
            },
          },
          sorting: { onSort, columns: [] },
        });
        expect(items.length).toEqual(3);
      });
    });
  });
});

describe('utility helpers', () => {
  describe('isColumnActionEnabled', () => {
    it('returns false if all actions are disabled', () => {
      expect(isColumnActionEnabled('showHide', false)).toEqual(false);
    });

    it('returns false if the specified column action is disabled', () => {
      expect(isColumnActionEnabled('showHide', { showHide: false })).toEqual(
        false
      );
    });

    it('returns true if column actions are not configured', () => {
      expect(isColumnActionEnabled('showHide', undefined)).toEqual(true);
    });

    it('returns true if the specified column action is not configured', () => {
      expect(isColumnActionEnabled('showHide', {})).toEqual(true);
    });

    it('returns true if the specified column action is configured', () => {
      expect(
        isColumnActionEnabled('showHide', { showHide: { label: 'test' } })
      ).toEqual(true);
    });
  });

  describe('getColumnActionConfig', () => {
    it('appends/overrides custom action configuration to the existing action', () => {
      expect(
        getColumnActionConfig({ label: 'hello world' }, 'showHide', {
          showHide: {
            label: 'world',
            isDisabled: true,
          },
        })
      ).toEqual({
        label: 'world',
        isDisabled: true,
      });
    });

    it('returns the the existing action as-is if no configuration is passed', () => {
      expect(
        getColumnActionConfig({ label: 'hello' }, 'showHide', false)
      ).toEqual({
        label: 'hello',
      });
      expect(
        getColumnActionConfig({ label: 'world' }, 'showHide', {
          showHide: false,
        })
      ).toEqual({
        label: 'world',
      });
    });
  });
});
