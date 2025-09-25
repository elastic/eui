/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiProvider } from '../provider';

import { EuiInMemoryTable, EuiInMemoryTableProps } from './in_memory_table';
import { keys, SortDirection } from '../../services';
import { SearchFilterConfig } from '../search_bar/filters';
import { Query } from '../search_bar/query';

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
    const { container } = render(<EuiInMemoryTable {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('with noItemsMessage', () => {
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
      noItemsMessage: 'where my items at?',
    };
    const { getByText } = render(<EuiInMemoryTable {...props} />);

    expect(getByText('where my items at?')).toBeTruthy();
  });

  test('with noItemsMessage and loading', () => {
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
      noItemsMessage: 'Loading items....',
      loading: true,
    };
    const { container } = render(<EuiInMemoryTable {...props} />);

    expect(container.querySelector('.euiBasicTable-loading')).toBeTruthy();
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
    const { container } = render(<EuiInMemoryTable {...props} />);

    expect(container.firstChild).toMatchSnapshot();
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
    const { getByText } = render(<EuiInMemoryTable {...props} />);

    expect(getByText('expanded row content')).toBeTruthy();
  });

  test('with items and noItemsMessage - expecting to show the items', () => {
    const props: EuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      noItemsMessage: 'show me!',
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
    const { queryByText } = render(<EuiInMemoryTable {...props} />);

    expect(queryByText('show me!')).toBeFalsy();
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
    const { container } = render(<EuiInMemoryTable {...props} />);

    expect(container.querySelector('.euiPagination')).toBeTruthy();
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
    const { getByText, getByTestSubject } = render(
      <EuiInMemoryTable {...props} />
    );

    expect(getByText('Rows per page: 2')).toBeTruthy();
    expect(getByTestSubject('pagination-button-1')).toBeDisabled(); // disabled = current page
  });

  test('with pagination and "show all" page size', () => {
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
        initialPageSize: 0,
        pageSizeOptions: [1, 2, 3, 0],
      },
    };
    const { getByText } = render(<EuiInMemoryTable {...props} />);

    expect(getByText('Showing all rows')).toBeTruthy();
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
    const { getByText, queryByTestSubject } = render(
      <EuiInMemoryTable {...props} />
    );

    expect(getByText('ouch!')).toBeTruthy();
    expect(queryByTestSubject('tablePaginationPopoverButton')).toBe(null);
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
        showPerPageOptions: false,
      },
    };
    const { queryByTestSubject } = render(<EuiInMemoryTable {...props} />);

    expect(queryByTestSubject('tablePaginationPopoverButton')).toBe(null);
  });

  describe('sorting', () => {
    const getCellTextArray = () =>
      Array.from(
        document.querySelectorAll('tbody .euiTableCellContent__text')
      ).map((cell) => cell.textContent);

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
      render(<EuiInMemoryTable {...props} />);

      expect(getCellTextArray()).toEqual(['name3', 'name1', 'name2']);
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
      render(<EuiInMemoryTable {...props} />);

      expect(getCellTextArray()).toEqual(['name1', 'name2', 'name3']);
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
      render(<EuiInMemoryTable {...props} />);

      expect(getCellTextArray()).toEqual(['name3', 'name2', 'name1']);
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
      render(<EuiInMemoryTable {...props} />);

      // name TDs should be sorted desc, id TDs should be asc,
      expect(getCellTextArray()).toEqual([
        'name3',
        '1',
        'name2',
        '2',
        'name1',
        '3',
      ]);
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
        render(<EuiInMemoryTable {...props} />);
      }).not.toThrow();
    });

    test('changing the sort field and direction via sorting prop', () => {
      // regression for https://github.com/elastic/eui/issues/6032
      const props: EuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'id',
            name: 'Id',
            sortable: true,
          },
          {
            field: 'name',
            name: 'Name',
            sortable: true,
          },
        ],
        sorting: {
          sort: {
            field: 'id',
            direction: SortDirection.ASC,
          },
        },
      };

      const { rerender } = render(<EuiInMemoryTable {...props} />);

      // initial sorting: id asc
      expect(getCellTextArray()).toEqual([
        '1',
        'name1',
        '2',
        'name2',
        '3',
        'name3',
      ]);

      // sorting: id desc
      rerender(
        <EuiInMemoryTable
          {...props}
          sorting={{ sort: { field: 'id', direction: SortDirection.DESC } }}
        />
      );
      expect(getCellTextArray()).toEqual([
        '3',
        'name3',
        '2',
        'name2',
        '1',
        'name1',
      ]);

      // sorting: name asc
      rerender(
        <EuiInMemoryTable
          {...props}
          sorting={{ sort: { field: 'name', direction: SortDirection.ASC } }}
        />
      );
      expect(getCellTextArray()).toEqual([
        '1',
        'name1',
        '2',
        'name2',
        '3',
        'name3',
      ]);

      // sorting: name desc
      rerender(
        <EuiInMemoryTable
          {...props}
          sorting={{ sort: { field: 'name', direction: SortDirection.DESC } }}
        />
      );
      expect(getCellTextArray()).toEqual([
        '3',
        'name3',
        '2',
        'name2',
        '1',
        'name1',
      ]);

      // can return to initial sorting: id asc
      rerender(
        <EuiInMemoryTable
          {...props}
          sorting={{ sort: { field: 'id', direction: SortDirection.ASC } }}
        />
      );
      expect(getCellTextArray()).toEqual([
        '1',
        'name1',
        '2',
        'name2',
        '3',
        'name3',
      ]);
    });

    describe('custom column sorting', () => {
      it('calls the sortable function and uses its return value for sorting', () => {
        const sortable = jest.fn(({ id }: any) => id); // Sorts by the ID instead of the name

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
              sortable,
            },
          ],
          sorting: {
            sort: {
              field: 'name',
              direction: SortDirection.ASC,
            },
          },
        };
        render(<EuiInMemoryTable {...props} />);

        expect(sortable).toHaveBeenCalled();
        expect(getCellTextArray()).toEqual(['Betty', 'Charlie', 'Alfred']);
      });
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
    const { container } = render(<EuiInMemoryTable {...props} />);
    expect(itemsProp).toEqual(items);

    const cells = container.querySelectorAll('td');
    expect(cells[0]).toHaveTextContent('name3');
    expect(cells[1]).toHaveTextContent('name2');
    expect(cells[2]).toHaveTextContent('name1');
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
    const { container } = render(<EuiInMemoryTable {...props} />);
    const selections = container.querySelectorAll(
      '[data-test-subj^="checkboxSelect"]'
    );

    expect(selections.length).toEqual(4);
    expect(selections[0]).not.toBeChecked(); // Select all row
    expect(selections[1]).toBeChecked();
    expect(selections[2]).not.toBeChecked();
    expect(selections[3]).not.toBeChecked();
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
    const { getByText } = render(
      <EuiInMemoryTable responsiveBreakpoint={true} {...props} />
    );

    expect(getByText('Page 1 of 1')).toBeTruthy();
    expect(getByText('Select all rows')).toBeTruthy();
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
    const { getByText } = render(
      <EuiInMemoryTable responsiveBreakpoint={true} {...props} />
    );

    expect(getByText('Page 1 of 1')).toBeTruthy();
    expect(getByText('Select all rows')).toBeTruthy();
    expect(getByText('Sorting')).toBeTruthy();
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
    const { getByText } = render(
      <EuiInMemoryTable responsiveBreakpoint={true} {...props} />
    );

    expect(getByText('Page 1 of 2')).toBeTruthy();
    expect(getByText('Select all rows')).toBeTruthy();
    expect(getByText('Sorting')).toBeTruthy();
    expect(getByText('NAME1')).toBeTruthy();
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
    const { getByText } = render(
      <EuiInMemoryTable responsiveBreakpoint={true} {...props} />
    );

    expect(getByText('Page 1 of 1')).toBeTruthy();
    expect(getByText('Select all rows')).toBeTruthy();
    expect(getByText('Sorting')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
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
    const { getByText, getByPlaceholderText } = render(
      <EuiInMemoryTable responsiveBreakpoint={true} {...props} />
    );

    expect(getByText('Page 1 of 1')).toBeTruthy();
    expect(getByText('Select all rows')).toBeTruthy();
    expect(getByText('Sorting')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
    expect(getByPlaceholderText('Search...')).toBeTruthy();
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
    const { getByPlaceholderText, getByText } = render(
      <EuiInMemoryTable {...props} />
    );

    expect(getByPlaceholderText('Search...')).toBeTruthy();
    expect(getByText('Children Between')).toBeTruthy();
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
    const { container, queryByText } = render(
      <EuiInMemoryTable responsiveBreakpoint={true} {...props} />
    );

    expect(queryByText('Page 1 of 1')).toBeTruthy();
    expect(queryByText('Select all rows')).toBeTruthy();
    expect(queryByText('Sorting')).toBeTruthy();

    expect(container.querySelector('input[type="search"]')).toHaveValue(
      'name:name1'
    );
    const filterButton = container.querySelector('.euiFilterButton');
    expect(filterButton).toHaveTextContent('Name1');
    expect(filterButton?.getAttribute('aria-pressed')).toEqual('true');

    expect(queryByText('name1')).toBeTruthy();
    expect(queryByText('name2')).toBeFalsy();
    expect(queryByText('name3')).toBeFalsy();
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

      const { container } = render(<EuiInMemoryTable {...props} />);

      // should render with all three results visible
      expect(container.querySelectorAll('tbody tr')).toHaveLength(3);

      const searchField = container.querySelector('input.euiFieldSearch')!;

      fireEvent.keyUp(searchField, {
        target: { value: 'is:active' },
        key: keys.ENTER,
      });

      // should render with the two active results
      expect(container.querySelectorAll('tbody tr')).toHaveLength(2);

      fireEvent.keyUp(searchField, {
        target: { value: 'active:false' },
        key: keys.ENTER,
      });

      // should render with the one inactive result
      expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
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
        noItemsMessage: <span className="customMessage">No items found!</span>,
      };

      const { container } = render(<EuiInMemoryTable {...props} />);
      // should render with the no items found text
      expect(container.querySelector('.customMessage')).toBeInTheDocument();

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
        noItemsMessage: <span className="customMessage">No items found!</span>,
      };

      const { container: container2 } = render(
        <EuiInMemoryTable {...props2} />
      );
      expect(container2.querySelectorAll('tbody tr')).toHaveLength(1);
    });
  });

  describe('behavior', () => {
    test('mobile header', () => {
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
      const { container } = render(
        <EuiInMemoryTable responsiveBreakpoint={true} {...props} />
      );

      expect(
        container.querySelector('.euiTableHeaderMobile')
      ).toMatchSnapshot();
    });

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
      const { getByTestSubject, rerender, container } = render(
        <EuiInMemoryTable {...props} />
      );

      fireEvent.click(getByTestSubject('pagination-button-1'));

      // forces EuiInMemoryTable's getDerivedStateFromProps to re-execute
      // this is specifically testing regression against https://github.com/elastic/eui/issues/1007
      rerender(<EuiInMemoryTable {...props} />);

      expect(container.querySelector('.euiPagination')).toMatchSnapshot();
    });

    // Other pagination tests already check default pagination sizes
    // and individual pagination setting, so we'll just check here that
    // `componentDefaults` is respected
    test('pagination inherited from EuiProvider componentDefaults', () => {
      const props = {
        items: [{ title: 'foo' }, { title: 'bar' }, { title: 'baz' }],
        columns: [{ field: 'title', name: 'Title' }],
      };
      const { getByText, getByTestSubject } = render(
        <EuiProvider
          componentDefaults={{
            EuiTablePagination: {
              itemsPerPage: 50,
              itemsPerPageOptions: [25, 50, 100],
            },
          }}
        >
          <EuiInMemoryTable {...props} pagination={true} />
        </EuiProvider>,
        { wrapper: undefined }
      );

      expect(getByText('Rows per page: 50')).toBeTruthy();

      fireEvent.click(getByTestSubject('tablePaginationPopoverButton'));
      expect(getByTestSubject('tablePagination-25-rows')).toBeTruthy();
      expect(getByTestSubject('tablePagination-50-rows')).toBeTruthy();
      expect(getByTestSubject('tablePagination-100-rows')).toBeTruthy();
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
      const { getByTestSubject } = render(<EuiInMemoryTable {...props} />);

      fireEvent.click(getByTestSubject('pagination-button-1'));
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

      const { getByTestSubject, container } = render(
        <EuiInMemoryTable {...props} />
      );
      expect(props.onTableChange).toHaveBeenCalledTimes(0);

      // Pagination change
      fireEvent.click(getByTestSubject('pagination-button-1'));
      expect(props.onTableChange).toHaveBeenCalledTimes(1);
      expect(props.onTableChange).toHaveBeenLastCalledWith({
        sort: {},
        page: {
          index: 1,
          size: 2,
        },
      });

      // Sorting change
      fireEvent.click(
        container.querySelector(
          '[data-test-subj*="tableHeaderCell_name_0"] [data-test-subj="tableHeaderSortButton"]'
        )!
      );
      expect(props.onTableChange).toHaveBeenCalledTimes(2);
      expect(props.onTableChange).toHaveBeenLastCalledWith({
        sort: {
          direction: SortDirection.ASC,
          field: 'name',
        },
        page: {
          index: 0,
          size: 2,
        },
      });

      // Sorted pagination change
      fireEvent.click(getByTestSubject('pagination-button-1'));
      expect(props.onTableChange).toHaveBeenCalledTimes(3);
      expect(props.onTableChange).toHaveBeenLastCalledWith({
        sort: {
          direction: SortDirection.ASC,
          field: 'name',
        },
        page: {
          index: 1,
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
      const { getByTestSubject, container, rerender } = render(
        <EuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // ensure table is on 2nd page (pageIndex=1)
      expect(getByTestSubject('pagination-button-1')).toBeDisabled();
      expect(container.querySelectorAll('td')[0]).toHaveTextContent('2');
      expect(container.querySelectorAll('td')[1]).toHaveTextContent('3');

      // click the first pagination button
      fireEvent.click(getByTestSubject('pagination-button-0'));
      expect(onTableChange).toHaveBeenCalledTimes(1);
      expect(onTableChange).toHaveBeenCalledWith({
        sort: {},
        page: {
          index: 0,
          size: 2,
        },
      });

      // ensure table is still on the 2nd page (pageIndex=1)
      expect(getByTestSubject('pagination-button-1')).toBeDisabled();
      expect(container.querySelectorAll('td')[0]).toHaveTextContent('2');
      expect(container.querySelectorAll('td')[1]).toHaveTextContent('3');

      // re-render with an updated `pageIndex` value
      rerender(
        <EuiInMemoryTable
          items={items}
          columns={columns}
          pagination={{ ...pagination, pageIndex: 2 }}
          onTableChange={onTableChange}
        />
      );

      // ensure table is on 3rd page (pageIndex=2)
      expect(getByTestSubject('pagination-button-2')).toBeDisabled();
      expect(container.querySelectorAll('td')[0]).toHaveTextContent('4');
      expect(container.querySelectorAll('td')[1]).toHaveTextContent('5');
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
      const { container, getByTestSubject, rerender } = render(
        <EuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // check that the first 2 items rendered
      let cells = container.querySelectorAll('td');
      expect(cells.length).toBe(2);
      expect(cells[0]).toHaveTextContent('0');
      expect(cells[1]).toHaveTextContent('1');

      // change the page size
      fireEvent.click(getByTestSubject('tablePaginationPopoverButton'));
      fireEvent.click(getByTestSubject('tablePagination-4-rows'));

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
      cells = container.querySelectorAll('td');
      expect(cells.length).toBe(2);
      expect(cells[0]).toHaveTextContent('0');
      expect(cells[1]).toHaveTextContent('1');

      // update the controlled page size
      rerender(
        <EuiInMemoryTable
          items={items}
          columns={columns}
          pagination={{ ...pagination, pageSize: 4 }}
          onTableChange={onTableChange}
        />
      );

      // verify it now renders 4 rows
      cells = container.querySelectorAll('td');
      expect(cells.length).toBe(4);
      expect(cells[0]).toHaveTextContent('0');
      expect(cells[1]).toHaveTextContent('1');
      expect(cells[2]).toHaveTextContent('2');
      expect(cells[3]).toHaveTextContent('3');
    });
  });

  describe('controlled search query', () => {
    it('execute the Query and filters the table items', () => {
      const items = [{ title: 'foo' }, { title: 'bar' }, { title: 'baz' }];
      const columns = [{ field: 'title', name: 'Title' }];
      const query = Query.parse('baz');

      const { container } = render(
        <EuiInMemoryTable
          items={items}
          search={{ query }}
          columns={columns}
          executeQueryOptions={{ defaultFields: ['title'] }}
        />
      );

      const tableContent = container.querySelectorAll(
        '.euiTableRowCell .euiTableCellContent'
      );

      expect(tableContent.length).toBe(1); // only 1 match
      expect(tableContent[0]).toHaveTextContent('baz');
    });

    it('does not execute the Query and renders the items passed as is', () => {
      const items = [{ title: 'foo' }, { title: 'bar' }, { title: 'baz' }];
      const columns = [{ field: 'title', name: 'Title' }];
      const query = Query.parse('baz');

      const { container } = render(
        <EuiInMemoryTable
          items={items}
          search={{ query }}
          columns={columns}
          executeQueryOptions={{ defaultFields: ['title'], enabled: false }}
        />
      );

      const tableContent = container.querySelectorAll(
        '.euiTableRowCell .euiTableCellContent'
      );

      expect(tableContent.length).toBe(3);
      expect(tableContent[0]).toHaveTextContent('foo');
      expect(tableContent[1]).toHaveTextContent('bar');
      expect(tableContent[2]).toHaveTextContent('baz');
    });
  });

  describe('text search format', () => {
    it('allows searching for any text with special characters in it', () => {
      const specialCharacterSearch =
        '!@#$%^&*(){}+=-_hello:world"`<>?/👋~.,;|\\';
      const items = [
        { title: specialCharacterSearch },
        { title: 'no special characters' },
      ];
      const columns = [{ field: 'title', name: 'Title' }];

      const { getByTestSubject, container } = render(
        <EuiInMemoryTable
          items={items}
          searchFormat="text"
          search={{ box: { incremental: true, 'data-test-subj': 'searchbox' } }}
          columns={columns}
        />
      );
      fireEvent.keyUp(getByTestSubject('searchbox'), {
        target: { value: specialCharacterSearch },
      });

      const tableContent = container.querySelectorAll(
        '.euiTableRowCell .euiTableCellContent'
      );
      expect(tableContent).toHaveLength(1); // only 1 match
      expect(tableContent[0]).toHaveTextContent(specialCharacterSearch);
    });

    it('fires the onChange callback', () => {
      const items = [{ title: 'Hello' }, { title: 'Goodbye' }];
      const columns = [{ field: 'title', name: 'Title' }];
      const TEXT = 'Hello World!';
      const mockOnChange = jest.fn();

      const { getByTestSubject, container } = render(
        <EuiInMemoryTable
          items={items}
          searchFormat="text"
          search={{
            box: { incremental: true, 'data-test-subj': 'searchbox' },
            onChange: mockOnChange,
          }}
          columns={columns}
        />
      );

      fireEvent.keyUp(getByTestSubject('searchbox'), {
        target: { value: TEXT },
      });

      const tableContent = container.querySelectorAll(
        '.euiTableRowCell .euiTableCellContent'
      );
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith({
        query: Query.parse(`"${TEXT}"`),
        queryText: TEXT,
        error: null,
      });
      expect(tableContent).toHaveLength(items.length); // all items
    });

    it('fires the onChange callback but handles internal state too', () => {
      const items = [{ title: 'foo' }, { title: 'bar' }, { title: 'baz' }];
      const columns = [{ field: 'title', name: 'Title' }];
      const TEXT = 'ba';
      const mockOnChange = jest.fn();
      mockOnChange.mockReturnValue(true);

      const { getByTestSubject, container } = render(
        <EuiInMemoryTable
          items={items}
          searchFormat="text"
          search={{
            box: { incremental: true, 'data-test-subj': 'searchbox' },
            onChange: mockOnChange,
          }}
          columns={columns}
        />
      );

      fireEvent.keyUp(getByTestSubject('searchbox'), {
        target: { value: TEXT },
      });

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      const tableContent = container.querySelectorAll(
        '.euiTableRowCell .euiTableCellContent'
      );
      expect(tableContent).toHaveLength(2); // 2 matches for "ba"
    });
  });
});
