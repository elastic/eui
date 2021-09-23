/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { EuiDataGridSorting } from '../../data_grid_types';
import { DataGridSortingContext } from '../../data_grid_context';

import { EuiDataGridHeaderCell } from './data_grid_header_cell';

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
          value={{ ...sortingContext, ...sorting }}
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
      const component = mount(<EuiDataGridHeaderCell {...requiredProps} />);
      component.find('.euiDataGridHeaderCell__button').simulate('click');

      expect(component.find('EuiPopover').prop('isOpen')).toEqual(true);
    });

    it('handles popover close', () => {
      const component = shallow(<EuiDataGridHeaderCell {...requiredProps} />);
      (component.find('EuiPopover').prop('closePopover') as Function)();

      expect(component.find('EuiPopover').prop('isOpen')).toEqual(false);
    });
  });
});
