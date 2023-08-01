/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from '@testing-library/react';
import { mount, ReactWrapper } from 'enzyme';
import { findTestSubject } from '../../../test';
import { testByReactVersion } from '../../../test/internal';

import { schemaDetectors } from '../utils/data_grid_schema';

import { useDataGridColumnSorting } from './column_sorting';
describe('useDataGridColumnSorting', () => {
  const onSort = jest.fn();
  const defaultSort = [{ id: 'columnA', direction: 'asc' as 'asc' | 'desc' }];
  const sorting = { onSort, columns: defaultSort };
  onSort.mockImplementation((newColumns) => (sorting.columns = newColumns));
  const columns = [{ id: 'columnA' }, { id: 'columnB' }, { id: 'columnC' }];
  const schema = {
    columnA: { columnType: 'numeric' },
    columnC: { columnType: 'boolean' },
  };
  const displayValues = { columnA: 'Column A' };

  const requiredArgs = [
    columns,
    sorting,
    schema,
    schemaDetectors,
    displayValues,
  ] as const;

  beforeEach(() => {
    jest.clearAllMocks();
    sorting.columns = defaultSort;
  });

  describe('columnSorting', () => {
    // Hooks can only be called inside function components
    const MockComponent = ({
      columns = requiredArgs[0],
      sorting = requiredArgs[1],
      schema = requiredArgs[2],
      schemaDetectors = requiredArgs[3],
      displayValues = requiredArgs[4],
    }) => {
      const columnSorting = useDataGridColumnSorting(
        columns,
        sorting,
        schema,
        schemaDetectors,
        displayValues
      );
      return <>{columnSorting}</>;
    };
    const openPopover = (component: ReactWrapper) => {
      findTestSubject(component, 'dataGridColumnSortingButton').simulate(
        'click'
      );
    };
    const closePopover = (component: ReactWrapper) => {
      const closeFn = component
        .find('[data-test-subj="dataGridColumnSortingPopover"]')
        .first()
        .prop('closePopover') as Function;
      act(() => closeFn());
    };
    const forceUpdate = (component: ReactWrapper) => {
      component.setProps({});
    };

    testByReactVersion(
      'renders a toolbar button/popover allowing users to set column sorting',
      () => {
        const component = mount(<MockComponent />);
        openPopover(component);
        expect(component.render()).toMatchSnapshot();
        expect(
          component.find('[data-popover-panel]').first().render()
        ).toMatchSnapshot();
        closePopover(component);
        expect(component.text()).toEqual('1 field sorted');
      }
    );

    it('returns null if sorting is not defined', () => {
      // @ts-ignore - normally this would be undefined vs. null, but we have = fallbacks up above for testing QOL
      const component = mount(<MockComponent sorting={null} />);
      expect(component.isEmptyRender()).toEqual(true);
    });

    it('handles updates when sorting/columns change outside the popover (e.g. from the grid itself)', () => {
      const component = mount(<MockComponent />);
      component.setProps({ columns: [{ id: 'columnB' }] });
      expect(onSort).toHaveBeenCalledWith([]);
    });

    describe('sort order', () => {
      it('reorders sort on drag', () => {
        const component = mount(<MockComponent />);
        openPopover(component);

        act(() => {
          (component.find('EuiDragDropContext').prop('onDragEnd') as Function)({
            source: { index: 0 },
            destination: { index: 1 },
          });
        });
        forceUpdate(component);

        expect(onSort).toHaveBeenCalledWith(defaultSort);
      });

      it('handles invalid drags outside the valid droppable area', () => {
        const component = mount(<MockComponent />);
        openPopover(component);

        act(() => {
          (component.find('EuiDragDropContext').prop('onDragEnd') as Function)({
            source: { index: 0 },
            destination: null,
          });
        });
        forceUpdate(component);

        expect(onSort).not.toHaveBeenCalled();
      });
    });

    describe('popover footer', () => {
      it('does not render a footer if no columns are visible', () => {
        const component = mount(<MockComponent columns={[]} />);
        openPopover(component);

        expect(component.find('EuiPopoverFooter')).toHaveLength(0);
      });

      describe('clear sorting button', () => {
        it('renders a button which removes all active sorts', () => {
          const component = mount(<MockComponent />);
          openPopover(component);

          const clearButton = findTestSubject(
            component,
            'dataGridColumnSortingClearButton'
          );
          clearButton.simulate('click');
          forceUpdate(component);

          expect(onSort).toHaveBeenCalledWith([]);

          expect(component.find('EuiText').text()).toContain(
            'Currently no fields are sorted'
          );
          expect(component.text()).toEqual('Sort fields');
        });

        it('does not render the button if there are no active sorts', () => {
          const component = mount(
            <MockComponent sorting={{ ...sorting, columns: [] }} />
          );
          openPopover(component);

          const clearButton = findTestSubject(
            component,
            'dataGridColumnSortingClearButton'
          );

          expect(clearButton).toHaveLength(0);
        });
      });

      describe('pick sort fields selection popover', () => {
        const openSelectionPopover = (component: ReactWrapper) => {
          findTestSubject(
            component,
            'dataGridColumnSortingSelectionButton'
          ).simulate('click');
        };
        const closeSelectionPopover = (component: ReactWrapper) => {
          const closeFn = component
            .find(
              '[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]'
            )
            .first()
            .prop('closePopover') as Function;
          act(() => closeFn());
        };

        it('renders a nested popover with a list of fields that are not being actively sorted', () => {
          const component = mount(<MockComponent />);
          openPopover(component);
          openSelectionPopover(component);

          const unsortedColumns = findTestSubject(
            component,
            'dataGridColumnSortingPopoverColumnSelection-',
            '^='
          );
          expect(unsortedColumns).toHaveLength(2);

          closeSelectionPopover(component);
        });

        it('does not render fields that are marked as isSortable: false at the column level', () => {
          const component = mount(
            <MockComponent
              columns={[
                { id: 'columnB', isSortable: false } as any,
                { id: 'columnC' },
              ]}
            />
          );
          openPopover(component);
          openSelectionPopover(component);

          const unsortedColumns = findTestSubject(
            component,
            'dataGridColumnSortingPopoverColumnSelection-',
            '^='
          );
          expect(unsortedColumns).toHaveLength(1);
        });

        it('does not render fields that are marked as isSortable: false at the schema level', () => {
          const component = mount(
            <MockComponent
              columns={[{ id: 'columnB' }, { id: 'columnC' }]}
              schema={{ columnB: { columnType: 'test' } } as any}
              schemaDetectors={[
                { ...schemaDetectors[0], type: 'test', isSortable: false },
              ]}
            />
          );
          openPopover(component);
          openSelectionPopover(component);

          const unsortedColumns = findTestSubject(
            component,
            'dataGridColumnSortingPopoverColumnSelection-',
            '^='
          );
          expect(unsortedColumns).toHaveLength(1);
        });

        it('does not render the popover or button if all fields are already being actively sorted', () => {
          const component = mount(
            <MockComponent columns={[{ id: 'columnA' }]} />
          );
          openPopover(component);

          const popoverButton = findTestSubject(
            component,
            'dataGridColumnSortingSelectionButton'
          );

          expect(popoverButton).toHaveLength(0);
        });

        describe('field click behavior', () => {
          const noActiveSorts = { ...sorting, columns: [] };

          const openPopoversAndSortByColumnB = (component: ReactWrapper) => {
            openPopover(component);
            openSelectionPopover(component);
            findTestSubject(
              component,
              'dataGridColumnSortingPopoverColumnSelection-columnB'
            ).simulate('click');
          };

          it('adds the field to the active sort list when clicked, with a default sort direction of `asc`', () => {
            const component = mount(<MockComponent sorting={noActiveSorts} />);
            openPopoversAndSortByColumnB(component);

            expect(onSort).toHaveBeenCalledWith([
              { id: 'columnB', direction: 'asc' },
            ]);
          });

          it('uses the default sort direction configured at the schema level', () => {
            const component = mount(
              <MockComponent
                sorting={noActiveSorts}
                columns={[
                  { id: 'columnB', defaultSortDirection: 'desc' } as any,
                ]}
                schema={{ columnB: { columnType: 'test' } } as any}
                schemaDetectors={[
                  ...schemaDetectors,
                  { ...schemaDetectors[0], defaultSortDirection: 'desc' },
                ]}
              />
            );
            openPopoversAndSortByColumnB(component);

            expect(onSort).toHaveBeenCalledWith([
              { id: 'columnB', direction: 'desc' },
            ]);
          });

          it('uses the default sort direction configured at the column level', () => {
            const component = mount(
              <MockComponent
                sorting={noActiveSorts}
                columns={[
                  { id: 'columnB', defaultSortDirection: 'desc' } as any,
                ]}
              />
            );
            openPopoversAndSortByColumnB(component);

            expect(onSort).toHaveBeenCalledWith([
              { id: 'columnB', direction: 'desc' },
            ]);
          });
        });
      });
    });
  });
});
