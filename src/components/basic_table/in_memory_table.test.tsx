/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiInMemoryTable, EuiInMemoryTableProps } from './in_memory_table';
import { keys, SortDirection } from '../../services';
import { SearchFilterConfig } from '../search_bar/filters';

interface BasicItem {
  id: number | string;
  name: string;
}

interface StateItem {
  active: boolean;
  name: string;
}

interface ComplexItem {
  active: boolean;
  complex: {
    name: string;
  };
}

describe('EuiInMemoryTable', () => {
  test('empty array', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
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
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with message', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      message: 'where my items at?',
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with message and loading', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      message: 'Loading items....',
      loading: true,
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with executeQueryOptions', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      executeQueryOptions: {
        defaultFields: ['name'],
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with items', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with items and expanded item', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
        '1': <div>expanded row content</div>,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with items and message - expecting to show the items', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      message: 'show me!',
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
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
        pageSizeOptions: [2, 4, 6],
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination and default page size and index', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
        initialPageIndex: 1,
        initialPageSize: 2,
        pageSizeOptions: [1, 2, 3],
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, default page size and error', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [{ id: '1', name: 'name1' }],
      error: 'ouch!',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        initialPageSize: 4,
        pageSizeOptions: [2, 4, 6],
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, hiding the per page options', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
        hidePerPageOptions: true,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  describe('sorting', () => {
    test('with field sorting (off by default)', () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: true,
      };
      const component = mount(<EuiInMemoryTable {...props} />);

      expect(
        component
          .find('tbody .euiTableCellContent__text')
          .map((cell) => cell.text())
      ).toEqual(['name3', 'name1', 'name2']);
    });

    test('with field sorting (on by default)', () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
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
          sort: {
            field: 'name',
            direction: SortDirection.ASC,
          },
        },
      };
      const component = mount(<EuiInMemoryTable {...props} />);

      expect(
        component
          .find('tbody .euiTableCellContent__text')
          .map((cell) => cell.text())
      ).toEqual(['name1', 'name2', 'name3']);
    });

    test('with name sorting', () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
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
          sort: {
            field: 'Name',
            direction: SortDirection.DESC,
          },
        },
      };
      const component = mount(<EuiInMemoryTable {...props} />);

      expect(
        component
          .find('tbody .euiTableCellContent__text')
          .map((cell) => cell.text())
      ).toEqual(['name3', 'name2', 'name1']);
    });

    test('verify field sorting precedes name sorting', () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name3' },
          { id: '3', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Column 1',
            description: 'description',
            sortable: true,
          },
          {
            field: 'id',
            name: 'name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: {
          sort: {
            field: 'name',
            direction: SortDirection.DESC,
          },
        },
      };
      const component = mount(<EuiInMemoryTable {...props} />);

      // name TDs should be sorted desc, id TDs should be asc,
      expect(
        component
          .find('tbody .euiTableCellContent__text')
          .map((cell) => cell.text())
      ).toEqual(['name3', '1', 'name2', '2', 'name1', '3']);
    });

    test('verify an invalid sort field does not blow everything up', () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
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
          sort: {
            field: 'something_nonexistant',
            direction: SortDirection.ASC,
          },
        },
      };
      expect(() => {
        mount(<EuiInMemoryTable {...props} />);
      }).not.toThrow();
    });
  });

  test('with initial sorting', () => {
    const items = [
      { id: '1', name: 'name1' },
      { id: '2', name: 'name2' },
      { id: '3', name: 'name3' },
    ];

    // copy the array to ensure the `items` prop doesn't mutate
    const itemsProp = items.slice(0);

    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: itemsProp,
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
      ],
      sorting: {
        sort: {
          field: 'name',
          direction: SortDirection.DESC,
        },
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
    expect(itemsProp).toEqual(items);
  });

  test('with initial selection', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
      selection: {
        onSelectionChange: () => undefined,
        initialSelected: [{ id: '1', name: 'name1' }],
      },
    };
    const component = mount(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination and selection', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
      pagination: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection and sorting', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
      pagination: true,
      sorting: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and column renderer', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
          render: (name: any) => name.toUpperCase(),
        },
      ],
      pagination: {
        pageSizeOptions: [2, 4, 6],
      },
      sorting: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and a single record action', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: true,
      sorting: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting  and simple search', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: true,
      sorting: true,
      search: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with search and component between search and table', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      search: true,
      childrenBetween: <div>Children Between</div>,
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and configured search', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
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
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: true,
      sorting: true,
      search: {
        onChange: () => {},
        defaultQuery: 'name:name1',
        box: {
          incremental: true,
        },
        filters: [
          {
            type: 'field_value_toggle',
            field: 'name',
            value: 'name1',
            name: 'Name1',
            negatedName: 'Not Name1',
          },
        ] as SearchFilterConfig[],
      },
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const component = shallow(<EuiInMemoryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  describe('search interaction & functionality', () => {
    it('updates the results as based on the entered query', () => {
      const props: EuiInMemoryTableProps<StateItem> = {
        items: [
          {
            active: true,
            name: 'Kansas',
          },
          {
            active: true,
            name: 'North Dakota',
          },
          {
            active: false,
            name: 'Florida',
          },
        ],
        columns: [
          {
            field: 'active',
            name: 'Is Active',
          },
          {
            field: 'name',
            name: 'Name',
          },
        ],
        search: {
          onChange: () => true,
        },
        className: 'testTable',
      };

      const component = mount(<EuiInMemoryTable {...props} />);

      // should render with all three results visible
      expect(component.find('.testTable EuiTableRow').length).toBe(3);

      const searchField = component.find('EuiFieldSearch input[type="search"]');

      searchField.simulate('keyUp', {
        target: {
          value: 'is:active',
        },
        key: keys.ENTER,
      });
      component.update();

      // should render with the two active results
      expect(component.find('.testTable EuiTableRow').length).toBe(2);

      searchField.simulate('keyUp', {
        target: {
          value: 'active:false',
        },
        key: keys.ENTER,
      });
      component.update();

      // should render with the one inactive result
      expect(component.find('.testTable EuiTableRow').length).toBe(1);
    });

    it('passes down the executeQueryOptions properly', () => {
      const props: EuiInMemoryTableProps<ComplexItem> = {
        items: [
          {
            active: true,
            complex: {
              name: 'Kansas',
            },
          },
          {
            active: true,
            complex: {
              name: 'North Dakota',
            },
          },
          {
            active: false,
            complex: {
              name: 'Florida',
            },
          },
        ],
        columns: [
          {
            field: 'active',
            name: 'Is Active',
          },
          {
            field: 'complex.name',
            name: 'Name',
          },
        ],
        search: {
          onChange: () => {},
          defaultQuery: 'No',
        },
        className: 'testTable',
        message: <span className="customMessage">No items found!</span>,
      };

      const noDefaultFieldsComponent = mount(<EuiInMemoryTable {...props} />);
      // should render with the no items found text
      expect(noDefaultFieldsComponent.find('.customMessage').length).toBe(1);

      // With defaultFields and a search query, we should only see one
      const props2: EuiInMemoryTableProps<ComplexItem> = {
        items: [
          {
            active: true,
            complex: {
              name: 'Kansas',
            },
          },
          {
            active: true,
            complex: {
              name: 'North Dakota',
            },
          },
          {
            active: false,
            complex: {
              name: 'Florida',
            },
          },
        ],
        columns: [
          {
            field: 'active',
            name: 'Is Active',
          },
          {
            field: 'complex.name',
            name: 'Name',
          },
        ],
        search: {
          onChange: () => {},
          defaultQuery: 'No',
        },
        className: 'testTable',
        message: <span className="customMessage">No items found!</span>,
      };

      const defaultFieldComponent = mount(<EuiInMemoryTable {...props2} />);
      expect(defaultFieldComponent.find('.testTable EuiTableRow').length).toBe(
        1
      );
    });
  });

  describe('custom column sorting', () => {
    it('calls the sortable function and uses its return value for sorting', () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: 7, name: 'Alfred' },
          { id: 3, name: 'Betty' },
          { id: 5, name: 'Charlie' },
        ],
        itemId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            sortable: ({ id }: any) => id,
          },
        ],
        sorting: {
          sort: {
            field: 'name',
            direction: SortDirection.ASC,
          },
        },
      };
      const component = mount(<EuiInMemoryTable {...props} />);

      expect((component.find('EuiBasicTable').props() as any).items).toEqual([
        { id: 3, name: 'Betty' },
        { id: 5, name: 'Charlie' },
        { id: 7, name: 'Alfred' },
      ]);
    });
  });

  describe('behavior', () => {
    test('pagination', async () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
          { id: '4', name: 'name4' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        pagination: {
          pageSizeOptions: [2, 4, 6],
        },
      };
      const component = mount(<EuiInMemoryTable {...props} />);

      component
        .find('EuiButtonEmpty[data-test-subj="pagination-button-1"]')
        .simulate('click');

      // forces EuiInMemoryTable's getDerivedStateFromProps to re-execute
      // this is specifically testing regression against https://github.com/elastic/eui/issues/1007
      component.setProps({});

      expect(component).toMatchSnapshot();
    });

    test('pagination with actions column and sorting set to true', async () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
          { id: '4', name: 'name4' },
        ],
        columns: [
          {
            name: 'Actions',
            actions: [],
          },
        ],
        sorting: true,
        pagination: {
          pageSizeOptions: [2, 4, 6],
        },
      };
      const component = mount(<EuiInMemoryTable {...props} />);

      component
        .find('EuiButtonEmpty[data-test-subj="pagination-button-1"]')
        .simulate('click');
    });

    test('onTableChange callback', () => {
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
          { id: '4', name: 'name4' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: true,
        pagination: {
          pageSizeOptions: [2, 4, 6],
        },
        onTableChange: jest.fn(),
      };

      const component = mount(<EuiInMemoryTable {...props} />);

      expect(props.onTableChange).toHaveBeenCalledTimes(0);
      component
        .find('EuiButtonEmpty[data-test-subj="pagination-button-1"]')
        .simulate('click');
      expect(props.onTableChange).toHaveBeenCalledTimes(1);
      expect(props.onTableChange).toHaveBeenCalledWith({
        sort: {},
        page: {
          index: 1,
          size: 2,
        },
      });

      (props.onTableChange as jest.Mock).mockClear();
      component
        .find(
          '[data-test-subj*="tableHeaderCell_name_0"] [data-test-subj="tableHeaderSortButton"]'
        )
        .simulate('click');
      expect(props.onTableChange).toHaveBeenCalledTimes(1);
      expect(props.onTableChange).toHaveBeenCalledWith({
        sort: {
          direction: SortDirection.ASC,
          field: 'name',
        },
        page: {
          index: 0,
          size: 2,
        },
      });
    });
  });

  describe('controlled pagination', () => {
    it('respects pageIndex', () => {
      const pagination = {
        initialPageIndex: 2,
        pageIndex: 1,
        pageSizeOptions: [2],
      };
      const items = [
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
        { index: 5 },
      ];
      const columns = [
        {
          field: 'index',
          name: 'Index',
        },
      ];
      const onTableChange = jest.fn();
      const component = mount(
        <EuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // ensure table is on 2nd page (pageIndex=1)
      expect(
        component.find('button[data-test-subj="pagination-button-1"][disabled]')
          .length
      ).toBe(1);
      expect(component.find('td').at(0).text()).toBe('Index2');
      expect(component.find('td').at(1).text()).toBe('Index3');

      // click the first pagination button
      component
        .find('EuiButtonEmpty[data-test-subj="pagination-button-0"]')
        .simulate('click');
      expect(onTableChange).toHaveBeenCalledTimes(1);
      expect(onTableChange).toHaveBeenCalledWith({
        sort: {},
        page: {
          index: 0,
          size: 2,
        },
      });

      // ensure table is still on the 2nd page (pageIndex=1)
      expect(
        component.find('button[data-test-subj="pagination-button-1"][disabled]')
          .length
      ).toBe(1);
      expect(component.find('td').at(0).text()).toBe('Index2');
      expect(component.find('td').at(1).text()).toBe('Index3');

      // re-render with an updated `pageIndex` value
      pagination.pageIndex = 2;
      component.setProps({ pagination });

      // ensure table is on 3rd page (pageIndex=2)
      expect(
        component.find('button[data-test-subj="pagination-button-2"][disabled]')
          .length
      ).toBe(1);
      expect(component.find('td').at(0).text()).toBe('Index4');
      expect(component.find('td').at(1).text()).toBe('Index5');
    });

    it('respects pageSize', () => {
      const pagination = {
        pageSize: 2,
        initialPageSize: 4,
        pageSizeOptions: [1, 2, 4],
      };
      const items = [
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
        { index: 5 },
      ];
      const columns = [
        {
          field: 'index',
          name: 'Index',
        },
      ];
      const onTableChange = jest.fn();
      const component = mount(
        <EuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // check that the first 2 items rendered
      expect(component.find('td').length).toBe(2);
      expect(component.find('td').at(0).text()).toBe('Index0');
      expect(component.find('td').at(1).text()).toBe('Index1');

      // change the page size
      component
        .find('button[data-test-subj="tablePaginationPopoverButton"]')
        .simulate('click');
      component.update();
      component
        .find('button[data-test-subj="tablePagination-4-rows"]')
        .simulate('click');

      // check callback
      expect(onTableChange).toHaveBeenCalledTimes(1);
      expect(onTableChange).toHaveBeenCalledWith({
        sort: {},
        page: {
          index: 0,
          size: 4,
        },
      });

      // verify still only rendering the first 2 rows
      expect(component.find('td').length).toBe(2);
      expect(component.find('td').at(0).text()).toBe('Index0');
      expect(component.find('td').at(1).text()).toBe('Index1');

      // update the controlled page size
      pagination.pageSize = 4;
      component.setProps({ pagination });

      // verify it now renders 4 rows
      expect(component.find('td').length).toBe(4);
      expect(component.find('td').at(0).text()).toBe('Index0');
      expect(component.find('td').at(1).text()).toBe('Index1');
      expect(component.find('td').at(2).text()).toBe('Index2');
      expect(component.find('td').at(3).text()).toBe('Index3');
    });
  });
});
