/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { schemaDetectors } from '../data_grid_schema';

import { EuiDataGridColumnSortingDraggable } from './column_sorting_draggable';

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

  const renderPropEuiDraggable = (
    wrapper: ShallowWrapper,
    provided = { dragHandleProps: {} },
    state = { isDragging: true }
  ) => {
    // @ts-ignore enzyme doesn't know EuiDraggable's expected render prop args
    return wrapper.find('EuiDraggable').renderProp('children')(provided, state);
  };

  const getEuiI18nChildren = (component: ShallowWrapper, token: string) => {
    return component
      .find(`EuiI18n[token="euiColumnSortingDraggable.${token}"]`)
      .dive()
      .dive();
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders an EuiDraggable component of a single column that is currently being sorted', () => {
    const component = renderPropEuiDraggable(
      shallow(<EuiDataGridColumnSortingDraggable {...requiredProps} />)
    );
    expect(component).toMatchSnapshot();
  });

  it('renders a screen reader active sort label', () => {
    const component = renderPropEuiDraggable(
      shallow(<EuiDataGridColumnSortingDraggable {...requiredProps} />)
    );
    const screenReaderText = getEuiI18nChildren(component, 'activeSortLabel');
    expect(screenReaderText.text()).toEqual(
      'Column A is sorting this data grid'
    );
  });

  it('renders a button that removes the sort', () => {
    const component = renderPropEuiDraggable(
      shallow(<EuiDataGridColumnSortingDraggable {...requiredProps} />)
    );
    const button = getEuiI18nChildren(component, 'removeSortLabel');
    button.simulate('click');

    expect(onSort).toHaveBeenCalledWith([]);
  });

  it('renders a buttongroup that toggles the sort direction', () => {
    const component = renderPropEuiDraggable(
      shallow(<EuiDataGridColumnSortingDraggable {...requiredProps} />)
    );
    const buttonGroup = getEuiI18nChildren(component, 'toggleLegend');
    buttonGroup.simulate('change', {}, 'desc');

    expect(onSort).toHaveBeenCalledWith([{ id: 'columnA', direction: 'desc' }]);
  });

  describe('button group schema', () => {
    it('renders default A-Z sort text if the schema is unknown', () => {
      const component = renderPropEuiDraggable(
        shallow(
          <EuiDataGridColumnSortingDraggable {...requiredProps} schema={{}} />
        )
      );
      const buttonGroup = getEuiI18nChildren(component, 'toggleLegend');
      expect(buttonGroup).toMatchSnapshot();
    });

    it('renders different asc/desc text when a known schema is passed', () => {
      const component = renderPropEuiDraggable(
        shallow(
          <EuiDataGridColumnSortingDraggable
            {...requiredProps}
            direction="desc"
            schema={{ columnA: { columnType: 'boolean' } }}
          />
        )
      );
      const buttonGroup = getEuiI18nChildren(component, 'toggleLegend');
      expect(buttonGroup).toMatchSnapshot();
    });
  });
});
