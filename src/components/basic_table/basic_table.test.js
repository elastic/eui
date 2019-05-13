import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiBasicTable, getItemId } from './basic_table';

describe('getItemId', () => {
  it('returns undefined if no itemId prop is given', () => {
    expect(getItemId({ id: 5 })).toBeUndefined();
    expect(getItemId({ itemId: 5 })).toBeUndefined();
    expect(getItemId({ _itemId: 5 })).toBeUndefined();
  });

  it('returns the correct id when a string itemId is given', () => {
    expect(getItemId({ id: 5 }, 'id')).toBe(5);
    expect(getItemId({ thing: '5' }, 'thing')).toBe('5');
  });

  it('returns the correct id when a function itemId is given', () => {
    expect(getItemId({ id: 5 }, () => 6)).toBe(6);
    expect(getItemId({ x: 2, y: 4 }, ({ x, y }) => x * y)).toBe(8);
  });
});

describe('EuiBasicTable', () => {
  describe('empty', () => {
    test('is rendered', () => {
      const props = {
        ...requiredProps,
        items: [],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });

    test('renders a string as a custom message', () => {
      const props = {
        items: [],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        noItemsMessage: 'where my items at?',
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });

    test('renders a node as a custom message', () => {
      const props = {
        items: [],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        noItemsMessage: (
          <p>
            no items, click <a href>here</a> to make some
          </p>
        ),
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('rowProps', () => {
    test('renders rows with custom props from a callback', () => {
      const props = {
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        rowProps: item => {
          const { id } = item;
          return {
            'data-test-subj': `row-${id}`,
            className: 'customRowClass',
            onClick: () => {},
          };
        },
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });

    test('renders rows with custom props from an object', () => {
      const props = {
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        rowProps: {
          'data-test-subj': `row`,
          className: 'customClass',
          onClick: () => {},
        },
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('cellProps', () => {
    test('renders cells with custom props from a callback', () => {
      const props = {
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        cellProps: (item, column) => {
          const { id } = item;
          const { field } = column;
          return {
            'data-test-subj': `cell-${id}-${field}`,
            className: 'customRowClass',
            onClick: () => {},
          };
        },
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });

    test('renders rows with custom props from an object', () => {
      const props = {
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        cellProps: {
          'data-test-subj': `cell`,
          className: 'customClass',
          onClick: () => {},
        },
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  test('itemIdToExpandedRowMap renders an expanded row', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      itemIdToExpandedRowMap: {
        '1': <div>Expanded row</div>,
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination - 2nd page', () => {
    const props = {
      items: [{ id: '1', name: 'name1' }, { id: '2', name: 'name2' }],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        pageIndex: 1,
        pageSize: 3,
        totalItemCount: 5,
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination and error', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      onChange: () => {},
      error: 'no can do',
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, hiding the per page options', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
        hidePerPageOptions: true,
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with sorting', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
      ],
      sorting: {
        sort: { field: 'name', direction: 'asc' },
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with sortable columns and sorting disabled', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
      ],
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination and selection', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      selection: {
        onSelectionChanged: () => undefined,
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection and sorting', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      selection: {
        onSelectionChanged: () => undefined,
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' },
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  describe('footers', () => {
    test('do not render without a column footer definition', () => {
      const props = {
        items: [
          { id: '1', name: 'name1', age: 20 },
          { id: '2', name: 'name2', age: 21 },
          { id: '3', name: 'name3', age: 22 },
        ],
        itemId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'your name',
          },
          {
            field: 'id',
            name: 'ID',
            description: 'your id',
          },
          {
            field: 'age',
            name: 'Age',
            description: 'your age',
          },
        ],
        onChange: () => {},
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });

    test('render with pagination, selection, sorting, and footer', () => {
      const props = {
        items: [
          { id: '1', name: 'name1', age: 20 },
          { id: '2', name: 'name2', age: 21 },
          { id: '3', name: 'name3', age: 22 },
        ],
        itemId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'your name',
            sortable: true,
            footer: <strong>Name</strong>,
          },
          {
            field: 'id',
            name: 'ID',
            description: 'your id',
            footer: 'ID',
          },
          {
            field: 'age',
            name: 'Age',
            description: 'your age',
            footer: ({ items, pagination }) => (
              <strong>
                sum:
                {items.reduce((acc, cur) => acc + cur.age, 0)}
                <br />
                total items:
                {pagination.totalItemCount}
              </strong>
            ),
          },
        ],
        pagination: {
          pageIndex: 0,
          pageSize: 3,
          totalItemCount: 5,
        },
        selection: {
          onSelectionChanged: () => undefined,
        },
        sorting: {
          sort: { field: 'name', direction: 'asc' },
        },
        onChange: () => {},
      };
      const component = shallow(<EuiBasicTable {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  test('with pagination, selection, sorting and column renderer', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
          render: name => name.toUpperCase(),
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      selection: {
        onSelectionChanged: () => undefined,
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' },
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and column dataType', () => {
    const props = {
      items: [
        { id: '1', count: 1 },
        { id: '2', count: 2 },
        { id: '3', count: 3 },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'count',
          name: 'Count',
          description: 'description of count',
          sortable: true,
          dataType: 'number',
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      selection: {
        onSelectionChanged: () => undefined,
      },
      sorting: {
        sort: { field: 'count', direction: 'asc' },
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  // here we want to verify that the column renderer takes precedence over the column data type
  test('with pagination, selection, sorting, column renderer and column dataType', () => {
    const props = {
      items: [
        { id: '1', count: 1 },
        { id: '2', count: 2 },
        { id: '3', count: 3 },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'count',
          name: 'Count',
          description: 'description of count',
          sortable: true,
          dataType: 'number',
          render: count => 'x'.repeat(count),
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      selection: {
        onSelectionChanged: () => undefined,
      },
      sorting: {
        sort: { field: 'count', direction: 'asc' },
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and a single record action', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
        {
          name: 'Actions',
          actions: [
            {
              type: 'button',
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      selection: {
        onSelectionChanged: () => undefined,
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' },
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and multiple record actions', () => {
    const props = {
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
        {
          name: 'Actions',
          actions: [
            {
              type: 'button',
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
            {
              type: 'button',
              name: 'Delete',
              description: 'delete',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      selection: {
        onSelectionChanged: () => undefined,
      },
      sorting: {
        sort: { field: 'name', direction: 'asc' },
      },
      onChange: () => {},
    };
    const component = shallow(<EuiBasicTable {...props} />);

    expect(component).toMatchSnapshot();
  });
});
