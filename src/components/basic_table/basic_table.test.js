import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiBasicTable } from './basic_table';

describe('EuiBasicTable', () => {

  test('basic - empty', () => {

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
      <EuiBasicTable {...props} />
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
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('basic - empty - custom message as node', () => {

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
      noItemsMessage: (<p>no items, click <a href>here</a> to make some</p>)
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('basic - with items', () => {

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
      ]
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('itemIdToExpandedRowMap renders an expanded row', () => {
    const props = {
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
      itemIdToExpandedRowMap: {
        '1': <div>Expanded row</div>,
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination', () => {

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
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination - 2nd page', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ],
      pagination: {
        pageIndex: 1,
        pageSize: 3,
        totalItemCount: 5
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination and error', () => {

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
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      onChange: () => {},
      error: 'no can do'
    };
    const component = shallow(
      <EuiBasicTable {...props} />
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
      sorting: {
        sort: { field: 'name', direction: 'asc' }
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with sortable columns and sorting disabled', () => {

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
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
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
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
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
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' }
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
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
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' }
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and column dataType', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', count: 1 },
        { id: '2', count: 2 },
        { id: '3', count: 3 }
      ],
      columns: [
        {
          field: 'count',
          name: 'Count',
          description: 'description of count',
          sortable: true,
          dataType: 'number'
        }
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      },
      sorting: {
        sort: { field: 'count', direction: 'asc' }
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  // here we want to verify that the column renderer takes precedence over the column data type
  test('with pagination, selection, sorting, column renderer and column dataType', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', count: 1 },
        { id: '2', count: 2 },
        { id: '3', count: 3 }
      ],
      columns: [
        {
          field: 'count',
          name: 'Count',
          description: 'description of count',
          sortable: true,
          dataType: 'number',
          render: (count) => 'x'.repeat(count)
        }
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      },
      sorting: {
        sort: { field: 'count', direction: 'asc' }
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
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
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' }
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and multiple record actions', () => {

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
            },
            {
              type: 'button',
              name: 'Delete',
              description: 'delete',
              onClick: () => undefined
            }
          ]
        }
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' }
      },
      onChange: () => {}
    };
    const component = shallow(
      <EuiBasicTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

});
