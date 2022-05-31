/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { findTestSubject } from '../../../test';

import { EuiDataGridToolBarVisibilityOptions } from '../data_grid_types';

import { useDataGridColumnSelector } from './column_selector';

describe('useDataGridColumnSelector', () => {
  const availableColumns = [{ id: 'columnA' }, { id: 'columnB' }];
  const setVisibleColumns = jest.fn();
  const defaultVisibleColumns = ['columnA', 'columnB'];
  const columnVisibility = {
    setVisibleColumns,
    visibleColumns: defaultVisibleColumns,
  };
  setVisibleColumns.mockImplementation(
    (newColumns) => (columnVisibility.visibleColumns = newColumns)
  );
  const showColumnSelector = {
    allowHide: false,
    allowReorder: false,
  } as EuiDataGridToolBarVisibilityOptions['showColumnSelector'];
  const displayValues = {};

  const requiredArgs = [
    availableColumns,
    columnVisibility,
    showColumnSelector,
    displayValues,
  ] as const;

  beforeEach(() => {
    jest.clearAllMocks();
    columnVisibility.visibleColumns = defaultVisibleColumns;
  });

  describe('columnSelector', () => {
    // Hooks can only be called inside function components
    const MockComponent = ({
      availableColumns = requiredArgs[0],
      columnVisibility = requiredArgs[1],
      showColumnSelector = requiredArgs[2],
      displayValues = requiredArgs[3],
    }) => {
      const [columnSelector] = useDataGridColumnSelector(
        availableColumns,
        columnVisibility,
        showColumnSelector,
        displayValues
      );
      return <>{columnSelector}</>;
    };
    const openPopover = (component: ReactWrapper) => {
      findTestSubject(component, 'dataGridColumnSelectorButton').simulate(
        'click'
      );
    };
    const closePopover = (component: ReactWrapper) => {
      const closeFn = component
        .find('[data-test-subj="dataGridColumnSelectorPopover"]')
        .first()
        .prop('closePopover') as Function;
      act(() => closeFn());
    };
    const forceUpdate = (component: ReactWrapper) => {
      component.setProps({});
    };

    it('renders a toolbar button/popover allowing users to set column visibility and order', () => {
      const component = mount(<MockComponent showColumnSelector={true} />);
      openPopover(component);
      expect(component.render()).toMatchSnapshot();
      expect(
        component.find('[data-popover-panel]').first().render()
      ).toMatchSnapshot();
      closePopover(component);
    });

    it('does not render if all valid sub-options are disabled', () => {
      const component = shallow(
        <MockComponent
          showColumnSelector={{
            allowHide: false,
            allowReorder: false,
          }}
        />
      );
      expect(component.text()).toEqual('');
    });

    describe('column filtering', () => {
      const showColumnSelector = { allowHide: true, allowReorder: true };

      it('renders a searchbar that filters displayed columns', () => {
        const component = mount(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover(component);

        expect(
          findTestSubject(component, 'dataGridColumnSelectorColumnItem', '^=')
        ).toHaveLength(2);

        const searchInput = findTestSubject(
          component,
          'dataGridColumnSelectorSearch'
        );
        (searchInput.getDOMNode() as HTMLInputElement).value = 'A';
        searchInput.simulate('change');

        expect(
          findTestSubject(component, 'dataGridColumnSelectorColumnItem', '^=')
        ).toHaveLength(1);
      });
    });

    describe('column reordering', () => {
      const showColumnSelector = { allowHide: false, allowReorder: true };

      it('renders draggable handles', () => {
        const component = mount(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover(component);

        expect(component.find('EuiDraggable')).toHaveLength(2);
        expect(component.find('EuiIcon[type="grab"]')).toHaveLength(2);
      });

      it('calls setColumns on drag end', () => {
        const component = mount(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover(component);

        const getFirstColumn = () => component.find('EuiDraggable').first();
        expect(getFirstColumn().prop('draggableId')).toEqual('columnA');

        act(() => {
          (component.find('EuiDragDropContext').prop('onDragEnd') as Function)({
            source: { index: 1 },
            destination: { index: 0 },
          });
        });
        forceUpdate(component);

        expect(getFirstColumn().prop('draggableId')).toEqual('columnB');
      });

      it('handles invalid drags outside the valid droppable area', () => {
        const component = mount(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover(component);

        act(() => {
          (component.find('EuiDragDropContext').prop('onDragEnd') as Function)({
            source: { index: 0 },
            destination: null,
          });
        });
        forceUpdate(component);

        expect(
          component.find('EuiDraggable').first().prop('draggableId')
        ).toEqual('columnA');
      });
    });

    describe('column visibility', () => {
      const showColumnSelector = { allowHide: true, allowReorder: false };

      it('shows the number of columns hidden as the toolbar button text', () => {
        const component = mount(
          <MockComponent
            showColumnSelector={showColumnSelector}
            columnVisibility={{ ...columnVisibility, visibleColumns: [] }}
          />
        );

        expect(component.text()).toEqual('2 columns hidden');
      });

      it('toggles column visibility on switch interaction', () => {
        const component = mount(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover(component);

        findTestSubject(
          component,
          'dataGridColumnSelectorToggleColumnVisibility-columnB'
        ).simulate('click');
        forceUpdate(component);

        expect(component.text()).toEqual('1 column hidden');

        findTestSubject(
          component,
          'dataGridColumnSelectorToggleColumnVisibility-columnB'
        ).simulate('click');
        forceUpdate(component);

        expect(component.text()).not.toEqual('1 column hidden');
      });

      it('toggles all column visibility with the show/hide all buttons', () => {
        const component = mount(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover(component);

        findTestSubject(
          component,
          'dataGridColumnSelectorHideAllButton'
        ).simulate('click');
        forceUpdate(component);

        expect(component.text()).toEqual('2 columns hidden');

        findTestSubject(
          component,
          'dataGridColumnSelectorShowAllButton'
        ).simulate('click');
        forceUpdate(component);

        expect(component.text()).toEqual('Columns');
      });
    });
  });

  describe('orderedVisibleColumns', () => {
    it('returns an array of ordered visible columns', () => {
      const MockComponent = () => {
        const [, orderedVisibleColumns] = useDataGridColumnSelector(
          ...requiredArgs
        );
        return <>{JSON.stringify(orderedVisibleColumns)}</>;
      };
      const component = mount(<MockComponent />);

      expect(component).toMatchInlineSnapshot(`
        <MockComponent>
          [{"id":"columnA"},{"id":"columnB"}]
        </MockComponent>
      `);
    });
  });

  describe('setVisibleColumns', () => {
    it('exposes the passed setVisibleColumns fn', () => {
      const MockComponent = () => {
        const [, , setVisibleColumns] = useDataGridColumnSelector(
          ...requiredArgs
        );
        setVisibleColumns([]);
        return <></>;
      };
      shallow(<MockComponent />);

      expect(setVisibleColumns).toHaveBeenCalledTimes(1);
    });
  });

  describe('switchColumnPos', () => {
    it('exposes the switchColumnPos fn', () => {
      const MockComponent = () => {
        const [, , , switchColumnPos] = useDataGridColumnSelector(
          ...requiredArgs
        );

        try {
          switchColumnPos('columnA', 'columnB');
        } catch {
          // not sure why this is throwing rerender errors :|
        }
        // Invalid indices
        switchColumnPos('columnA', 'undefined');
        switchColumnPos('undefined', 'columnA');
        return <></>;
      };
      shallow(<MockComponent />);
    });
  });
});
