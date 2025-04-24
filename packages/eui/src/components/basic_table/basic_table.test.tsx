/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiBasicTableProps,
  getItemId,
} from './basic_table';

import { SortDirection } from '../../services';
import {
  EuiTableFieldDataColumnType,
  EuiTableActionsColumnType,
} from './table_types';

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
    expect(getItemId({ id: 5 }, () => '6')).toBe('6');
    expect(
      getItemId(
        { x: 2, y: 4 },
        ({ x, y }: { x: number; y: number }) => `${x * y}`
      )
    ).toBe('8');
  });
});

interface BasicItem {
  id: string;
  name: string;
}
interface AgeItem extends BasicItem {
  age: number;
}
const basicColumns: Array<EuiBasicTableColumn<BasicItem>> = [
  {
    field: 'name',
    name: 'Name',
    description: 'description',
  },
];
const basicItems = [
  { id: '1', name: 'name1' },
  { id: '2', name: 'name2' },
  { id: '3', name: 'name3' },
];

describe('EuiBasicTable', () => {
  shouldRenderCustomStyles(
    <EuiBasicTable items={basicItems} columns={basicColumns} />
  );

  it('renders (bare-bones)', () => {
    const props = {
      ...requiredProps,
      items: basicItems,
      columns: basicColumns,
    };
    const { container } = render(<EuiBasicTable {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('empty', () => {
    test('is rendered', () => {
      const props = {
        items: [],
        columns: basicColumns,
      };
      const { getByText } = render(<EuiBasicTable {...props} />);

      expect(getByText('No items found')).toBeTruthy();
    });

    test('renders a string as a custom message', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: [],
        columns: basicColumns,
        noItemsMessage: 'where my items at?',
      };
      const { getByText } = render(<EuiBasicTable {...props} />);

      expect(getByText('where my items at?')).toBeTruthy();
    });

    test('renders a node as a custom message', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: [],
        columns: basicColumns,
        noItemsMessage: (
          <p>
            no items, click <a href="">here</a> to make some
          </p>
        ),
      };
      const { getByRole } = render(<EuiBasicTable {...props} />);

      expect(getByRole('link')).toBeTruthy();
    });
  });

  test('loading', () => {
    const props = {
      items: basicItems,
      columns: basicColumns,
      loading: true,
    };
    const { container } = render(<EuiBasicTable {...props} />);

    expect(container.querySelector('.euiBasicTable-loading')).toBeTruthy(); // Used by several Kibana tests as an assertion
    expect(container.querySelector('tbody')?.className).toContain(
      'euiBasicTableBodyLoading'
    );
    // Hopefully one day we can delete this when Safari gets its act together
    expect(container.querySelector('table')?.className).toContain(
      'safariLoadingWorkaround'
    );
  });

  describe('rowProps', () => {
    test('renders rows with custom props from a callback', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        rowProps: (item) => {
          const { id } = item;
          return {
            'data-test-subj': `row-${id}`,
            className: 'customRowClass',
            onClick: () => {},
          };
        },
      };
      const { getByTestSubject } = render(
        <EuiBasicTable<BasicItem> {...props} />
      );

      expect(getByTestSubject('row-1')).toBeTruthy();
      expect(getByTestSubject('row-2')).toBeTruthy();
      expect(getByTestSubject('row-3')).toBeTruthy();
    });

    test('renders rows with custom props from an object', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        rowProps: {
          'data-test-subj': 'row',
          className: 'customClass',
          onClick: () => {},
        },
      };
      const { getAllByTestSubject } = render(<EuiBasicTable {...props} />);

      expect(getAllByTestSubject('row')).toHaveLength(3);
    });
  });

  describe('cellProps', () => {
    test('renders cells with custom props from a callback', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        cellProps: (item, column) => {
          const { id } = item;
          const { field } = column as EuiTableFieldDataColumnType<BasicItem>;
          return {
            'data-test-subj': `cell-${id}-${field}`,
            className: 'customRowClass',
            onClick: () => {},
          };
        },
      };
      const { getByTestSubject } = render(<EuiBasicTable {...props} />);

      expect(getByTestSubject('cell-1-name')).toBeTruthy();
      expect(getByTestSubject('cell-2-name')).toBeTruthy();
      expect(getByTestSubject('cell-3-name')).toBeTruthy();
    });

    test('renders cells with custom props from an object', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        cellProps: {
          'data-test-subj': 'cell',
          className: 'customClass',
          onClick: () => {},
        },
      };
      const { getAllByTestSubject } = render(<EuiBasicTable {...props} />);

      expect(getAllByTestSubject('cell')).toHaveLength(3);
    });
  });

  test('itemIdToExpandedRowMap renders an expanded row', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: basicColumns,
      itemId: 'id',
      itemIdToExpandedRowMap: {
        '1': <div>Expanded row</div>,
      },
    };
    const { getByText } = render(<EuiBasicTable {...props} />);

    expect(getByText('Expanded row')).toBeTruthy();
  });

  test('with pagination', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: basicColumns,
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
      },
      onChange: () => {},
    };
    const { container, getByRole } = render(<EuiBasicTable {...props} />);

    expect(getByRole('list')).toBeTruthy();
    expect(
      container.querySelector('[aria-current="page"]')?.textContent
    ).toEqual('1');
  });

  test('with pagination - 2nd page', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: basicColumns,
      pagination: {
        pageIndex: 1,
        pageSize: 3,
        totalItemCount: 5,
      },
      onChange: () => {},
    };
    const { container } = render(<EuiBasicTable {...props} />);

    expect(
      container.querySelector('[aria-current="page"]')?.textContent
    ).toEqual('2');
  });

  test('with pagination - show all', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: basicColumns,
      pagination: {
        pageIndex: 0,
        pageSize: 0,
        pageSizeOptions: [1, 5, 0],
        totalItemCount: 2,
      },
      onChange: () => {},
    };
    const { getByTestSubject, getByText } = render(
      <EuiBasicTable {...props} />
    );

    expect(getByTestSubject('tablePaginationPopoverButton')).toBeTruthy();
    expect(getByText('Showing all rows')).toBeTruthy();
  });

  it('does not show pagination bar if there is an error', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: basicColumns,
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        pageSizeOptions: [1, 5, 0],
        totalItemCount: 5,
      },
      onChange: () => {},
      error: 'no can do',
    };
    const { getByText, queryByTestSubject, queryByRole } = render(
      <EuiBasicTable {...props} />
    );

    expect(getByText('no can do')).toBeTruthy();
    expect(queryByTestSubject('tablePaginationPopoverButton')).toBeFalsy();
    expect(queryByRole('list')).toBeFalsy();
  });

  test('with pagination, hiding the per page options', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: basicColumns,
      pagination: {
        pageIndex: 0,
        pageSize: 3,
        totalItemCount: 5,
        showPerPageOptions: false,
      },
      onChange: () => {},
    };
    const { queryByTestSubject } = render(<EuiBasicTable {...props} />);

    expect(queryByTestSubject('tablePaginationPopoverButton')).toBeFalsy();
  });

  test('with sorting', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: [
        {
          field: 'name',
          name: 'Name',
          sortable: true,
        },
      ],
      sorting: {
        sort: { field: 'name', direction: SortDirection.ASC },
      },
      onChange: () => {},
    };
    const { container, getByTestSubject } = render(
      <EuiBasicTable {...props} />
    );

    expect(getByTestSubject('tableHeaderSortButton')).toBeTruthy();
    expect(
      container.querySelector('[aria-sort="ascending"] .euiTableCellContent')
        ?.textContent
    ).toEqual('Name');
  });

  test('with sortable columns and sorting disabled', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
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
    const { container, queryByTestSubject } = render(
      <EuiBasicTable {...props} />
    );

    expect(queryByTestSubject('tableHeaderSortButton')).toBeFalsy();
    expect(container.querySelector('[aria-sort]')).toBeFalsy();
  });

  test('with sorting enabled and enable all columns for sorting', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: basicColumns,
      sorting: {
        sort: {
          field: 'name',
          direction: SortDirection.ASC,
        },
        enableAllColumns: true,
      },
      onChange: () => {},
    };
    const { container, getByTestSubject } = render(
      <EuiBasicTable {...props} />
    );

    expect(getByTestSubject('tableHeaderSortButton')).toBeTruthy();
    expect(container.querySelector('[aria-sort]')).toBeTruthy();
  });

  describe('selection', () => {
    const getCheckboxAt = (index: number) =>
      screen.getByTestSubject(`checkboxSelectRow-${index}`) as HTMLInputElement;

    test('initialSelected', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        itemId: 'id',
        selection: {
          onSelectionChange: () => {},
          initialSelected: [basicItems[0]],
        },
      };
      render(<EuiBasicTable {...props} />);

      expect(getCheckboxAt(1).checked).toBeTruthy();
      expect(getCheckboxAt(2).checked).toBeFalsy();
    });

    test('selected', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        itemId: 'id',
        selection: {
          onSelectionChange: () => {},
          selected: [basicItems[1]],
        },
      };
      render(<EuiBasicTable {...props} />);

      expect(getCheckboxAt(1).checked).toBeFalsy();
      expect(getCheckboxAt(2).checked).toBeTruthy();
    });

    it('ignores initialSelected if selected is passed', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        itemId: 'id',
        selection: {
          initialSelected: [basicItems[0]],
          selected: [],
        },
      };
      render(<EuiBasicTable {...props} />);

      expect(getCheckboxAt(1).checked).toBeFalsy();
      expect(getCheckboxAt(2).checked).toBeFalsy();
    });

    it("checks for selections that don't exist within `items`", () => {
      const onSelectionChange = jest.fn();
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: basicColumns,
        itemId: 'id',
        selection: {
          onSelectionChange: onSelectionChange,
          selected: [{ id: 'notvalid', name: 'notInItems' }],
        },
      };
      const { container } = render(<EuiBasicTable {...props} />);

      expect(onSelectionChange).toHaveBeenCalledWith([]);
      expect(container.querySelectorAll('[checked]')).toHaveLength(0);
    });

    describe('header checkbox', () => {
      it('selects all rows', () => {
        const props: EuiBasicTableProps<BasicItem> = {
          items: basicItems,
          columns: basicColumns,
          itemId: 'id',
          selection: {
            onSelectionChange: () => {},
            initialSelected: [],
          },
        };
        const { getByTestSubject } = render(<EuiBasicTable {...props} />);
        expect(getByTestSubject('checkboxSelectAll')).not.toBeChecked();

        fireEvent.click(getByTestSubject('checkboxSelectAll'));

        expect(getByTestSubject('checkboxSelectAll')).toBeChecked();
        expect(getCheckboxAt(1)).toBeChecked();
        expect(getCheckboxAt(2)).toBeChecked();
        expect(getCheckboxAt(3)).toBeChecked();
      });

      it('deselects all rows', () => {
        const props: EuiBasicTableProps<BasicItem> = {
          items: basicItems,
          columns: basicColumns,
          itemId: 'id',
          selection: {
            onSelectionChange: () => {},
            initialSelected: basicItems,
          },
        };
        const { getByTestSubject } = render(<EuiBasicTable {...props} />);
        expect(getByTestSubject('checkboxSelectAll')).toBeChecked();

        fireEvent.click(getByTestSubject('checkboxSelectAll'));

        expect(getByTestSubject('checkboxSelectAll')).not.toBeChecked();
        expect(getCheckboxAt(1)).not.toBeChecked();
        expect(getCheckboxAt(2)).not.toBeChecked();
        expect(getCheckboxAt(3)).not.toBeChecked();
      });

      it('renders an indeterminate header checkbox if some but not all rows are selected', () => {
        const props: EuiBasicTableProps<BasicItem> = {
          items: basicItems,
          columns: basicColumns,
          itemId: 'id',
          selection: {
            onSelectionChange: () => {},
            initialSelected: [],
          },
        };
        const { getByTestSubject } = render(<EuiBasicTable {...props} />);
        expect(getByTestSubject('checkboxSelectAll')).not.toBeChecked();

        fireEvent.click(getCheckboxAt(1));
        expect(getCheckboxAt(1)).toBeChecked();
        expect(getByTestSubject('checkboxSelectAll')).toBePartiallyChecked();

        // Should deselect all rows on indeterminate click
        fireEvent.click(getByTestSubject('checkboxSelectAll'));
        expect(getCheckboxAt(1)).not.toBeChecked();
      });
    });
  });

  test('footers', () => {
    const props: EuiBasicTableProps<AgeItem> = {
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
          // No footer
        },
        {
          field: 'id',
          name: 'ID',
          description: 'your id',
          footer: 'Total users: 3',
        },
        {
          field: 'age',
          name: 'Age',
          description: 'your age',
          footer: ({ items }) => (
            <>
              <strong>
                Total ages: {items.reduce((acc, cur) => acc + cur.age, 0)}
              </strong>
              <br />
              <strong>Total items: {items.length}</strong>
            </>
          ),
        },
      ],
      onChange: () => {},
    };
    const { getByText } = render(<EuiBasicTable {...props} />);

    expect(getByText('Total users: 3')).toBeTruthy();
    expect(getByText('Total ages: 63')).toBeTruthy();
    expect(getByText('Total items: 3')).toBeTruthy();
  });

  test('column renderer', () => {
    const props: EuiBasicTableProps<BasicItem> = {
      items: basicItems,
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          render: (name: string) => name.toUpperCase(),
        },
      ],
    };
    const { getByText } = render(<EuiBasicTable {...props} />);

    expect(getByText('NAME1')).toBeTruthy();
    expect(getByText('NAME2')).toBeTruthy();
    expect(getByText('NAME3')).toBeTruthy();
  });

  describe('column dataType', () => {
    interface DataTypeItem {
      id: string;
      count: number;
      online: boolean;
      date: Date;
    }
    const dataTypeItems = [
      { id: '1', count: 1, online: true, date: new Date('1/1/1970') },
      { id: '2', count: 2, online: false, date: new Date('2/2/1971') },
    ];

    test('number, boolean, and date types', () => {
      const props: EuiBasicTableProps<DataTypeItem> = {
        items: dataTypeItems,
        columns: [
          {
            field: 'age',
            name: 'Count',
            dataType: 'number',
          },
          {
            field: 'online',
            name: 'Status',
            dataType: 'boolean',
          },
          {
            field: 'date',
            name: 'Date',
            dataType: 'date',
          },
        ],
      };
      const { container, getByText } = render(<EuiBasicTable {...props} />);

      // Numbers should be right aligned
      expect(
        container.querySelectorAll('[class*="euiTableCellContent-right"]')
      ).toHaveLength(3);

      // Booleans should output as Yes or No
      expect(getByText('Yes')).toBeTruthy();
      expect(getByText('No')).toBeTruthy();

      // Dates should auto format
      expect(getByText('1 Jan 1970 00:00')).toBeTruthy();
      expect(getByText('2 Feb 1971 00:00')).toBeTruthy();
    });

    test('column renderer takes precedence over column data type', () => {
      const props: EuiBasicTableProps<DataTypeItem> = {
        items: dataTypeItems,
        columns: [
          {
            field: 'online',
            name: 'Status',
            dataType: 'boolean',
            render: (online: boolean) => (online ? 'Online' : 'Offline'),
          },
          {
            field: 'date',
            name: 'Date',
            dataType: 'date',
            render: (date: Date) => date.getFullYear(),
          },
        ],
      };
      const { queryByText } = render(<EuiBasicTable {...props} />);

      expect(queryByText('Yes')).toBeFalsy();
      expect(queryByText('Online')).toBeTruthy();

      expect(queryByText('No')).toBeFalsy();
      expect(queryByText('Offline')).toBeTruthy();

      expect(queryByText('1970')).toBeTruthy();
      expect(queryByText('1971')).toBeTruthy();
    });
  });

  describe('actions', () => {
    const actions: EuiTableActionsColumnType<{ id: string }>['actions'] = [
      {
        type: 'icon',
        name: 'Edit',
        isPrimary: true,
        icon: 'pencil',
        available: ({ id }) => !(Number(id) % 2),
        description: 'edit',
        'data-test-subj': 'editAction',
        onClick: () => {},
      },
      {
        type: 'icon',
        name: 'Share',
        icon: 'share',
        isPrimary: true,
        available: ({ id }) => id !== '3',
        description: 'share',
        onClick: () => {},
      },
      // Below actions are not primary and should be hidden behind collapse button
      {
        type: 'icon',
        name: 'Copy',
        icon: 'copy',
        description: 'copy',
        onClick: () => {},
      },
      {
        type: 'icon',
        name: 'Delete',
        icon: 'trash',
        description: 'delete',
        'data-test-subj': ({ id }) => `deleteAction-${id}`,
        onClick: () => {},
      },
      {
        type: 'icon',
        name: 'elastic.co',
        icon: 'link',
        description: 'Go to link',
        onClick: () => {},
      },
    ];

    test('single action', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: [
          ...basicColumns,
          {
            name: 'Actions',
            actions: [actions[3]],
          },
        ],
      };
      const { getAllByText, container } = render(<EuiBasicTable {...props} />);

      expect(getAllByText('Delete')).toHaveLength(basicItems.length);
      expect(
        container.querySelector('.euiBasicTableAction-showOnHover')
      ).not.toBeInTheDocument();
    });

    test('multiple actions with custom availability', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: [...basicItems, { id: '4', name: 'name4' }],
        columns: [
          ...basicColumns,
          {
            name: 'Actions',
            actions: actions,
          },
        ],
      };
      const { getAllByText, getAllByTestSubject, container } = render(
        <EuiBasicTable {...props} />
      );

      expect(getAllByText('Edit')).toHaveLength(2);
      expect(getAllByText('Share')).toHaveLength(3);
      expect(getAllByTestSubject('euiCollapsedItemActionsButton')).toHaveLength(
        4
      );
      expect(
        container.querySelector('.euiBasicTable__collapsedActions')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.euiBasicTableAction-showOnHover')
      ).toBeInTheDocument();
    });

    test('custom item actions', () => {
      const props: EuiBasicTableProps<BasicItem> = {
        items: basicItems,
        columns: [
          {
            name: 'Actions',
            actions: [
              {
                render: ({ id }) => (
                  <button data-test-subj={`customAction-${id}`}>
                    Custom action
                  </button>
                ),
                available: ({ id }) => id !== '3',
              },
            ],
          },
        ],
        responsiveBreakpoint: true, // Needs to be in mobile to render customAction cell CSS
      };
      const { queryByTestSubject, container } = render(
        <EuiBasicTable {...props} />
      );

      expect(queryByTestSubject('customAction-1')).toBeInTheDocument();
      expect(queryByTestSubject('customAction-2')).toBeInTheDocument();
      expect(queryByTestSubject('customAction-3')).not.toBeInTheDocument();

      // TODO: These assertions should ideally be visual regression snapshots instead
      expect(
        container.querySelector('.euiTableRowCell--hasActions')!.className
      ).toContain('-customActions');
      expect(
        container.querySelector(
          '.euiTableRowCell--hasActions .euiTableCellContent'
        )!.className
      ).not.toContain('-actions-mobile');
      expect(
        container.querySelector('.euiTableRow-hasActions')!.className
      ).not.toContain('-hasRightColumn');
      expect(
        container.querySelector('.euiTableRow-hasActions')
      ).toMatchSnapshot();
    });

    describe('are disabled on selection', () => {
      test('single action', () => {
        const props: EuiBasicTableProps<BasicItem> = {
          items: basicItems,
          selection: {
            onSelectionChange: () => {},
            selected: [basicItems[0]],
          },
          columns: [
            ...basicColumns,
            {
              name: 'Actions',
              actions: [actions[3]],
            },
          ],
        };
        const { getByTestSubject } = render(<EuiBasicTable {...props} />);

        expect(getByTestSubject('deleteAction-1')).toBeDisabled();
        expect(getByTestSubject('deleteAction-2')).toBeDisabled();
        expect(getByTestSubject('deleteAction-3')).toBeDisabled();
      });

      test('multiple actions', () => {
        const props: EuiBasicTableProps<BasicItem> = {
          items: basicItems,
          selection: {
            onSelectionChange: () => {},
            selected: [basicItems[0]],
          },
          columns: [
            ...basicColumns,
            {
              name: 'Actions',
              actions: actions,
            },
          ],
        };
        const { getAllByTestSubject } = render(<EuiBasicTable {...props} />);

        getAllByTestSubject('euiCollapsedItemActionsButton').forEach(
          (button) => {
            expect(button).toBeDisabled();
          }
        );
      });
    });
  });

  it('renders (kitchen sink) with pagination, selection, sorting, actions, and footer', () => {
    const props: EuiBasicTableProps<AgeItem> = {
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
          render: (name: string) => name.toUpperCase(),
        },
        {
          field: 'id',
          name: 'ID',
          description: 'your id',
          footer: ({ pagination }) => (
            <strong>Total items: {pagination!.totalItemCount}</strong>
          ),
        },
        {
          field: 'age',
          name: 'Age',
          description: 'your age',
          dataType: 'number',
        },
        {
          name: 'Actions',
          actions: [
            {
              type: 'button',
              name: 'Edit',
              description: 'edit',
              onClick: () => {},
            },
            {
              type: 'button',
              name: 'Delete',
              description: 'delete',
              onClick: () => {},
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
        onSelectionChange: () => {},
      },
      sorting: {
        sort: { field: 'name', direction: SortDirection.ASC },
      },
      onChange: () => {},
    };
    const { container } = render(<EuiBasicTable {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
