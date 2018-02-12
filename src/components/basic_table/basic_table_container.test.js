import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiBasicTableContainer } from './basic_table_container';

describe('EuiBasicTableContainer', () => {

  test('basic - empty array', () => {

    const props = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ]
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('basic - empty simple loader', () => {

    const props = {
      ...requiredProps,
      items: () => [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ]
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('basic - empty promise loader', () => {

    const props = {
      ...requiredProps,
      items: () => Promise.resolve([]),
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ]
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });


  test('basic - empty - custom message', () => {

    const props = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ],
      noItemsMessage: 'where my items at?'
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('basic - with items', () => {

    const props = {
      ...requiredProps,
      items: () => [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' }
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ]
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination', () => {

    const props = {
      ...requiredProps,
      items: () => ({
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' }
        ],
        totalCount: 5
      }),
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ],
      pagination: {
        pageSizeOptions: [2, 4, 6]
      }
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination and error', () => {

    const props = {
      ...requiredProps,
      items: () => {
        throw new Error('no can do');
      },
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ],
      pagination: {
        pageSizeOptions: [2, 4, 6]
      }
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with sorting', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' }
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true
        }
      ],
      sorting: true
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination and selection', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' }
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ],
      pagination: true,
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      }
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection and sorting', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' }
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true
        }
      ],
      pagination: true,
      sorting: true,
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      }
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and column renderer', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' }
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
          render: (name) => name.toUpperCase()
        }
      ],
      pagination: {
        pageSizeOptions: [2, 4, 6]
      },
      sorting: true,
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      }
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and a single record action', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' }
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true
        },
        {
          name: 'Actions',
          actions: [
            {
              type: 'button',
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined
            }
          ]
        }
      ],
      pagination: true,
      sorting: true,
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      }
    };
    const component = shallow(
      <EuiBasicTableContainer {...props} />
    );

    expect(component).toMatchSnapshot();
  });

});
