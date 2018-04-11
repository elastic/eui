import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiInMemoryTable } from './in_memory_table';

describe('EuiInMemoryTable', () => {

  test('empty array', () => {

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
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with message', () => {

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
      message: 'where my items at?'
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with message and loading', () => {

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
      message: 'Loading items....',
      loading: true
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with items', () => {

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
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with items and message - expecting to show the items', () => {

    const props = {
      ...requiredProps,
      message: 'show me!',
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
      <EuiInMemoryTable {...props} />
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
        pageSizeOptions: [2, 4, 6]
      }
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination and default page size', () => {

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
        initialPageSize: 4,
        pageSizeOptions: [2, 4, 6]
      }
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, default page size and error', () => {

    const props = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' }
      ],
      error: 'ouch!',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description'
        }
      ],
      pagination: {
        initialPageSize: 4,
        pageSizeOptions: [2, 4, 6]
      }
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
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
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with initial sorting', () => {

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
        sort: {
          field: 'name',
          direction: 'desc'
        }
      }
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
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
      <EuiInMemoryTable {...props} />
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
      <EuiInMemoryTable {...props} />
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
      <EuiInMemoryTable {...props} />
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
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting  and simple search', () => {

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
      search: true,
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      }
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and configured search', () => {

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
      search: {
        defaultQuery: 'name:name1',
        box: {
          incremental: true,
          ...requiredProps
        },
        filters: [
          {
            type: 'field_value_toggle',
            field: 'name',
            value: 'name1',
            name: 'Name1',
            negatedName: 'Not Name1'
          }
        ]
      },
      selection: {
        itemId: 'id',
        onSelectionChanged: () => undefined
      }
    };
    const component = shallow(
      <EuiInMemoryTable {...props} />
    );

    expect(component).toMatchSnapshot();
  });

});
