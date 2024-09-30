/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';
import {
  renderHook,
  render,
  screen,
  waitForEuiPopoverOpen,
} from '../../../test/rtl';
import { testOnReactVersion } from '../../../test/internal';

import { schemaDetectors } from '../utils/data_grid_schema';
import type { EuiDataGridColumnSortingConfig } from '../data_grid_types';

import {
  useDataGridColumnSorting,
  DataGridSortingControl,
  type ColumnSortingProps,
} from './column_sorting';

const requiredArgs: Omit<ColumnSortingProps, 'sorting'> = {
  columns: [{ id: 'columnA' }, { id: 'columnB' }, { id: 'columnC' }],
  displayValues: {
    columnA: 'Column A',
    columnB: 'Column B',
    columnC: 'Column C',
  },
  schema: {
    columnA: { columnType: 'numeric' },
    columnC: { columnType: 'boolean' },
  },
  schemaDetectors,
};

describe('useDataGridColumnSorting', () => {
  it('returns null if sorting is undefined', () => {
    const { result } = renderHook(() =>
      useDataGridColumnSorting({ ...requiredArgs, sorting: undefined })
    );
    expect(result.current).toEqual(null);
  });

  it('returns a React toolbar control element if sorting is defined', () => {
    const { result } = renderHook(() =>
      useDataGridColumnSorting({
        ...requiredArgs,
        sorting: { onSort: () => {}, columns: [] },
      })
    );
    expect(result.current).not.toEqual(null);
  });
});

describe('DataGridSortingControl', () => {
  const onSort = jest.fn();
  const defaultSort = [{ id: 'columnA', direction: 'asc' as 'asc' | 'desc' }];
  const sorting = { columns: defaultSort, onSort };

  beforeEach(() => {
    jest.clearAllMocks();
    sorting.columns = defaultSort;
  });

  const ControlWithState = ({
    sorting,
    ...rest
  }: Partial<ColumnSortingProps>) => {
    const [sortingColumns, setSortingColumns] = useState(
      sorting?.columns || defaultSort
    );
    onSort.mockImplementation(
      (sortingColumns: EuiDataGridColumnSortingConfig[]) => {
        setSortingColumns(sortingColumns);
      }
    );
    const sortingWithState = {
      columns: sortingColumns,
      onSort,
    };
    return (
      <DataGridSortingControl
        {...requiredArgs}
        {...rest}
        sorting={sortingWithState}
      />
    );
  };
  const openPopover = () => {
    fireEvent.click(screen.getByTestSubject('dataGridColumnSortingButton'));
    waitForEuiPopoverOpen();
  };
  const getButtonText = () =>
    screen.getByTestSubject('dataGridColumnSortingButton').textContent;

  testOnReactVersion(['18'])(
    'renders a toolbar button/popover allowing users to set column sorting',
    () => {
      const { baseElement } = render(<ControlWithState />);
      expect(getButtonText()).toEqual('Sort fields1');
      openPopover();
      expect(baseElement).toMatchSnapshot();
    }
  );

  it('handles updates when sorting/columns change outside the popover (e.g. from the grid itself)', () => {
    const { rerender } = render(<ControlWithState />);
    rerender(<ControlWithState columns={[{ id: 'columnB' }]} />);
    expect(onSort).toHaveBeenCalledWith([]);
  });

  describe('sort order', () => {
    it('reorders sort on drag', () => {
      const { getByLabelText } = render(<ControlWithState />);
      openPopover();

      // we need to re-query the handle, otherwise the handle would not
      // be available because the draggable item is portalled on drag
      fireEvent.mouseDown(getByLabelText('Drag handle'));
      fireEvent.mouseMove(getByLabelText('Drag handle'), {
        clientX: 0,
        clientY: 5,
      });
      fireEvent.mouseUp(getByLabelText('Drag handle'));

      expect(onSort).toHaveBeenCalledWith(defaultSort);
    });

    it('handles invalid drags outside the valid droppable area', () => {
      const { getByLabelText } = render(<ControlWithState />);
      openPopover();

      const draggableItem = getByLabelText('Drag handle');

      fireEvent.mouseDown(draggableItem);
      fireEvent.mouseMove(draggableItem, {});
      fireEvent.mouseUp(draggableItem);

      expect(onSort).not.toHaveBeenCalled();
    });
  });

  describe('popover footer', () => {
    it('does not render a footer if no columns are visible', () => {
      const { container } = render(<ControlWithState columns={[]} />);
      openPopover();
      expect(container.querySelector('.euiPopoverFooter')).toBe(null);
    });

    describe('clear sorting button', () => {
      it('renders a button which removes all active sorts', () => {
        const { getByTestSubject, getByRole } = render(<ControlWithState />);
        openPopover();

        fireEvent.click(getByTestSubject('dataGridColumnSortingClearButton'));
        expect(onSort).toHaveBeenCalledWith([]);

        expect(getByRole('alert')).toHaveTextContent(
          'Currently no fields are sorted'
        );
        expect(getButtonText()).toEqual('Sort fields');
      });

      it('does not render the button if there are no active sorts', () => {
        const { queryByTestSubject } = render(
          <ControlWithState sorting={{ columns: [], onSort }} />
        );
        openPopover();

        expect(
          queryByTestSubject('dataGridColumnSortingClearButton')
        ).not.toBeInTheDocument();
      });
    });

    describe('pick sort fields selection popover', () => {
      const openSelectionPopover = () =>
        fireEvent.click(
          screen.getByTestSubject('dataGridColumnSortingSelectionButton')
        );
      const getUnsortedColumns = () =>
        document.querySelectorAll(
          '[data-test-subj^="dataGridColumnSortingPopoverColumnSelection-"]'
        );

      it('renders a nested popover with a list of fields that are not being actively sorted', () => {
        render(<ControlWithState />);
        openPopover();
        openSelectionPopover();

        expect(getUnsortedColumns()).toHaveLength(2);
      });

      it('does not render fields that are marked as isSortable: false at the column level', () => {
        render(
          <ControlWithState
            columns={[
              { id: 'columnB', isSortable: false } as any,
              { id: 'columnC' },
            ]}
          />
        );
        openPopover();
        openSelectionPopover();

        expect(getUnsortedColumns()).toHaveLength(1);
      });

      it('does not render fields that are marked as isSortable: false at the schema level', () => {
        render(
          <ControlWithState
            columns={[{ id: 'columnB' }, { id: 'columnC' }]}
            schema={{ columnB: { columnType: 'test' } } as any}
            schemaDetectors={[
              { ...schemaDetectors[0], type: 'test', isSortable: false },
            ]}
          />
        );
        openPopover();
        openSelectionPopover();

        expect(getUnsortedColumns()).toHaveLength(1);
      });

      it('does not render the popover or button if all fields are already being actively sorted', () => {
        const { queryByTestSubject } = render(
          <ControlWithState columns={[{ id: 'columnA' }]} />
        );
        openPopover();

        expect(
          queryByTestSubject('dataGridColumnSortingSelectionButton')
        ).not.toBeInTheDocument();
      });

      describe('field click behavior', () => {
        const noActiveSorts = { ...sorting, columns: [] };

        const openPopoversAndSortByColumnB = () => {
          openPopover();
          openSelectionPopover();
          fireEvent.click(
            screen.getByTestSubject(
              'dataGridColumnSortingPopoverColumnSelection-columnB'
            )
          );
        };

        it('adds the field to the active sort list when clicked, with a default sort direction of `asc`', () => {
          render(<ControlWithState sorting={noActiveSorts} />);
          openPopoversAndSortByColumnB();
          expect(onSort).toHaveBeenCalledWith([
            { id: 'columnB', direction: 'asc' },
          ]);
        });

        it('uses the default sort direction configured at the schema level', () => {
          render(
            <ControlWithState
              sorting={noActiveSorts}
              columns={[{ id: 'columnB', defaultSortDirection: 'desc' } as any]}
              schema={{ columnB: { columnType: 'test' } } as any}
              schemaDetectors={[
                ...schemaDetectors,
                { ...schemaDetectors[0], defaultSortDirection: 'desc' },
              ]}
            />
          );
          openPopoversAndSortByColumnB();

          expect(onSort).toHaveBeenCalledWith([
            { id: 'columnB', direction: 'desc' },
          ]);
        });

        it('uses the default sort direction configured at the column level', () => {
          render(
            <ControlWithState
              sorting={noActiveSorts}
              columns={[{ id: 'columnB', defaultSortDirection: 'desc' } as any]}
            />
          );
          openPopoversAndSortByColumnB();

          expect(onSort).toHaveBeenCalledWith([
            { id: 'columnB', direction: 'desc' },
          ]);
        });
      });
    });
  });
});
