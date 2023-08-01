/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';

import { EuiDragDropContext, EuiDroppable } from '../../drag_and_drop';
import { schemaDetectors } from '../utils/data_grid_schema';

import { EuiDataGridColumnSortingDraggable } from './column_sorting_draggable';
import { testByReactVersion } from '../../../test/internal';

describe('EuiDataGridColumnSortingDraggable', () => {
  const onSort = jest.fn();
  const requiredProps = {
    id: 'columnA',
    direction: 'asc',
    index: 0,
    sorting: {
      onSort,
      columns: [{ id: 'columnA', direction: 'asc' as 'asc' | 'desc' }],
    },
    schema: { columnA: { columnType: 'numeric' } },
    schemaDetectors,
    display: 'Column A',
  };

  beforeEach(() => jest.clearAllMocks());

  testByReactVersion(
    'renders an EuiDraggable component of a single column that is currently being sorted',
    () => {
      const { getByTestSubject } = render(
        <EuiDragDropContext onDragEnd={() => {}}>
          <EuiDroppable droppableId="test">
            {() => <EuiDataGridColumnSortingDraggable {...requiredProps} />}
          </EuiDroppable>
        </EuiDragDropContext>
      );

      expect(getByTestSubject('draggable')).toMatchSnapshot();
    }
  );

  it('renders a screen reader active sort label', () => {
    const { getByText } = render(
      <EuiDragDropContext onDragEnd={() => {}}>
        <EuiDroppable droppableId="test">
          {() => <EuiDataGridColumnSortingDraggable {...requiredProps} />}
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(getByText('Column A is sorting this data grid')).toBeInTheDocument();
  });

  it('renders a button that removes the sort', () => {
    const { getByLabelText } = render(
      <EuiDragDropContext onDragEnd={() => {}}>
        <EuiDroppable droppableId="test">
          {() => <EuiDataGridColumnSortingDraggable {...requiredProps} />}
        </EuiDroppable>
      </EuiDragDropContext>
    );

    fireEvent.click(getByLabelText('Remove Column A from data grid sort'));

    expect(onSort).toHaveBeenCalled();
  });

  it('renders a buttongroup that toggles the sort direction', () => {
    const { getByTestSubject } = render(
      <EuiDragDropContext onDragEnd={() => {}}>
        <EuiDroppable droppableId="test">
          {() => <EuiDataGridColumnSortingDraggable {...requiredProps} />}
        </EuiDroppable>
      </EuiDragDropContext>
    );

    fireEvent.click(getByTestSubject('columnADesc'));

    expect(onSort).toHaveBeenCalledWith([{ id: 'columnA', direction: 'desc' }]);
  });

  describe('button group schema', () => {
    it('renders default A-Z sort text if the schema is unknown', () => {
      const { getByTestSubject } = render(
        <EuiDragDropContext onDragEnd={() => {}}>
          <EuiDroppable droppableId="test">
            {() => (
              <EuiDataGridColumnSortingDraggable
                {...requiredProps}
                schema={{}}
              />
            )}
          </EuiDroppable>
        </EuiDragDropContext>
      );

      expect(
        getByTestSubject('euiDataGridColumnSorting-sortColumn-columnA-asc')
          .title
      ).toEqual('A-Z');

      expect(
        getByTestSubject('euiDataGridColumnSorting-sortColumn-columnA-desc')
          .title
      ).toEqual('Z-A');
    });

    it('renders different asc/desc text when a known schema is passed', () => {
      const { getByTestSubject } = render(
        <EuiDragDropContext onDragEnd={() => {}}>
          <EuiDroppable droppableId="test">
            {() => (
              <EuiDataGridColumnSortingDraggable
                {...requiredProps}
                schema={{ columnA: { columnType: 'boolean' } }}
              />
            )}
          </EuiDroppable>
        </EuiDragDropContext>
      );

      expect(
        getByTestSubject('euiDataGridColumnSorting-sortColumn-columnA-asc')
          .title
      ).toEqual('False-True');

      expect(
        getByTestSubject('euiDataGridColumnSorting-sortColumn-columnA-desc')
          .title
      ).toEqual('True-False');
    });
  });
});
