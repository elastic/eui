/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactElement } from 'react';

import { EuiListGroupItemProps } from '../../../list_group';
import { schemaDetectors } from '../../data_grid_schema';

import { getColumnActions } from './column_actions';

describe('getColumnActions', () => {
  const column = { id: 'B' };
  const columns = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];
  const schema = {};
  const setVisibleColumns = jest.fn();
  const setIsPopoverOpen = jest.fn();
  const sorting = undefined;
  const switchColumnPos = jest.fn();

  // DRY test helper
  const callActionOnClick = (action: EuiListGroupItemProps) => {
    (action.onClick as Function)({ stopPropagation: jest.fn() });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns an array of EuiListGroup items', () => {
    const items = getColumnActions(
      column,
      columns,
      schema,
      schemaDetectors,
      setVisibleColumns,
      setIsPopoverOpen,
      sorting,
      switchColumnPos
    );
    expect(items).toBeInstanceOf(Array); // We'll assert the actual contents below
    expect(items.length).toEqual(3);
  });

  it('returns an empty array when column.actions is set to false', () => {
    const items = getColumnActions(
      { ...column, actions: false },
      columns,
      schema,
      schemaDetectors,
      setVisibleColumns,
      setIsPopoverOpen,
      sorting,
      switchColumnPos
    );
    expect(items.length).toEqual(0);
  });

  it('appends additional custom columns to the end of the array', () => {
    const items = getColumnActions(
      {
        ...column,
        actions: {
          additional: [{ label: 'Hi world!', iconType: 'alert' }],
        },
      },
      columns,
      schema,
      schemaDetectors,
      setVisibleColumns,
      setIsPopoverOpen,
      sorting,
      switchColumnPos
    );
    expect(items.length).toEqual(4);

    const customAction = items[3];
    expect(customAction).toMatchInlineSnapshot(`
      Object {
        "iconType": "alert",
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
      const items = getColumnActions(
        column,
        columns,
        schema,
        schemaDetectors,
        setVisibleColumns,
        setIsPopoverOpen,
        sorting,
        switchColumnPos
      );
      const hideColumn = items[0];

      it('renders a "Hide column" item first', () => {
        expect(hideColumn).toMatchInlineSnapshot(`
            Object {
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

      it('sets column visibility on click', () => {
        callActionOnClick(hideColumn);
        expect(setVisibleColumns).toHaveBeenCalledWith(['A', 'C']);
      });
    });

    describe('custom column behavior', () => {
      it('accepts column action overrides', () => {
        const items = getColumnActions(
          {
            ...column,
            actions: {
              showHide: {
                label: 'hello world',
              },
            },
          },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          sorting,
          switchColumnPos
        );
        const hideColumn = items[0];

        expect(hideColumn.label).toEqual('hello world');
      });

      it('allows disabling the hide action', () => {
        const items = getColumnActions(
          {
            ...column,
            actions: {
              showHide: false,
            },
          },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          sorting,
          switchColumnPos
        );

        expect(items.length).toEqual(2);
      });
    });
  });

  describe('column reordering', () => {
    describe('default enabled behavior', () => {
      const items = getColumnActions(
        column,
        columns,
        schema,
        schemaDetectors,
        setVisibleColumns,
        setIsPopoverOpen,
        sorting,
        switchColumnPos
      );
      const moveLeft = items[1];
      const moveRight = items[2];

      it('renders a "Move left" item', () => {
        expect(moveLeft).toMatchInlineSnapshot(`
            Object {
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
            Object {
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

      it('calls switchColumnPos on click', () => {
        callActionOnClick(moveLeft);
        expect(switchColumnPos).toHaveBeenCalledWith('B', 'A');

        callActionOnClick(moveRight);
        expect(switchColumnPos).toHaveBeenCalledWith('B', 'C');
      });
    });

    describe('disabled behavior', () => {
      it('renders "Move left" as disabled if already on the first/left-most column', () => {
        const items = getColumnActions(
          { id: 'A' },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          sorting,
          switchColumnPos
        );
        const moveLeft = items[1];
        expect(moveLeft.isDisabled).toEqual(true);

        // Should still not error/do anything if the onClick is somehow invoked
        callActionOnClick(moveLeft);
        expect(switchColumnPos).not.toHaveBeenCalled();
      });

      it('renders "Move left" as disabled if already on the last/right-most column', () => {
        const items = getColumnActions(
          { id: 'C' },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          sorting,
          switchColumnPos
        );
        const moveRight = items[2];
        expect(moveRight.isDisabled).toEqual(true);

        // Should still not error/do anything if the onClick is somehow invoked
        callActionOnClick(moveRight);
        expect(switchColumnPos).not.toHaveBeenCalled();
      });
    });

    describe('custom column behavior', () => {
      it('accepts column action overrides', () => {
        const items = getColumnActions(
          {
            ...column,
            actions: {
              showMoveLeft: {
                label: 'hello',
              },
              showMoveRight: {
                label: 'world',
              },
            },
          },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          sorting,
          switchColumnPos
        );
        const moveLeft = items[1];
        const moveRight = items[2];

        expect(moveLeft.label).toEqual('hello');
        expect(moveRight.label).toEqual('world');
      });

      it('allows disabling show actions', () => {
        const items = getColumnActions(
          {
            ...column,
            actions: {
              showMoveLeft: false,
              showMoveRight: false,
            },
          },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          sorting,
          switchColumnPos
        );

        expect(items.length).toEqual(1);
      });
    });
  });

  describe('sorting', () => {
    const onSort = jest.fn();

    describe('default behavior (no active sorts present)', () => {
      const items = getColumnActions(
        column,
        columns,
        schema,
        schemaDetectors,
        setVisibleColumns,
        setIsPopoverOpen,
        { onSort, columns: [] },
        switchColumnPos
      );
      const sortAsc = items[1];
      const sortDesc = items[2];

      it('returns 2 more sorting EuiListGroup items when sorting is defined', () => {
        expect(items.length).toEqual(5);
      });

      it('renders a "Sort A-Z" item', () => {
        expect(sortAsc).toMatchInlineSnapshot(`
          Object {
            "className": "",
            "color": "text",
            "iconType": "sortUp",
            "isDisabled": false,
            "label": <EuiI18n
              default="Sort {schemaLabel}"
              token="euiColumnActions.sort"
              values={
                Object {
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
          Object {
            "className": "",
            "color": "text",
            "iconType": "sortDown",
            "isDisabled": false,
            "label": <EuiI18n
              default="Sort {schemaLabel}"
              token="euiColumnActions.sort"
              values={
                Object {
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
        const items = getColumnActions(
          column,
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          { onSort, columns: [{ id: 'B', direction: 'asc' }] },
          switchColumnPos
        );
        const sortAsc = items[1];

        it('renders sortAsc as selected', () => {
          expect(sortAsc.className).toEqual(
            'euiDataGridHeader__action--selected'
          );
        });

        it('unsets the current sort if sortAsc is clicked again', () => {
          callActionOnClick(sortAsc);
          expect(onSort).toHaveBeenCalledWith([]);
        });
      });

      describe('when current column is sorting by desc', () => {
        const items = getColumnActions(
          column,
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          { onSort, columns: [{ id: 'B', direction: 'desc' }] },
          switchColumnPos
        );
        const sortAsc = items[1];
        const sortDesc = items[2];

        it('renders sortDesc as selected', () => {
          expect(sortDesc.className).toEqual(
            'euiDataGridHeader__action--selected'
          );
        });

        it('sets a new sort if the direction is changed', () => {
          callActionOnClick(sortAsc);
          expect(onSort).toHaveBeenCalledWith([{ id: 'B', direction: 'asc' }]);
        });
      });
    });

    describe('modifies the sort label based on schema', () => {
      it('renders low-high instead of A-Z for number schema', () => {
        const items = getColumnActions(
          { id: 'A' },
          columns,
          { A: { columnType: 'numeric' } },
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          { onSort, columns: [{ id: 'A', direction: 'desc' }] },
          switchColumnPos
        );
        const sortAscLabel = items[1].label as ReactElement;
        const sortDescLabel = items[2].label as ReactElement;

        expect(sortAscLabel.props.values.schemaLabel.props.default).toEqual(
          'Low-High'
        );
        expect(sortDescLabel.props.values.schemaLabel.props.default).toContain(
          'High-Low'
        );
      });
    });

    describe('custom column behavior', () => {
      it('accepts column action overrides', () => {
        const items = getColumnActions(
          {
            ...column,
            actions: {
              showSortAsc: {
                label: 'upsies',
              },
              showSortDesc: {
                label: 'downsies',
              },
            },
          },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          { onSort, columns: [] },
          switchColumnPos
        );
        const sortAsc = items[1];
        const sortDesc = items[2];

        expect(sortAsc.label).toEqual('upsies');
        expect(sortDesc.label).toEqual('downsies');
      });

      it('allows disabling sort actions', () => {
        const items = getColumnActions(
          {
            ...column,
            actions: {
              showSortAsc: false,
              showSortDesc: false,
            },
          },
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          setIsPopoverOpen,
          { onSort, columns: [] },
          switchColumnPos
        );
        expect(items.length).toEqual(3);
      });
    });
  });
});
