import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiPopoverTitle,
  EuiButtonIcon,
  EuiSpacer,
} from '../../../../src/components/';
import { EuiButton } from '../../../../src/components/button';

const raw_data = [];

for (let i = 1; i < 100; i++) {
  const email = fake('{{internet.email}}');
  const name = fake('{{name.lastName}}, {{name.firstName}}');
  const suffix = fake('{{name.suffix}}');
  raw_data.push({
    name: {
      formatted: `${name} ${suffix}`,
      raw: name,
    },
    email: {
      formatted: <EuiLink href="">{fake('{{internet.email}}')}</EuiLink>,
      raw: email,
    },
    location: (
      <Fragment>
        {`${fake('{{address.city}}')}, `}
        <EuiLink href="https://google.com">
          {fake('{{address.country}}')}
        </EuiLink>
      </Fragment>
    ),
    date: fake('{{date.past}}'),
    account: fake('{{finance.account}}'),
    amount: fake('${{commerce.price}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
  });
}

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
    valueActions: [
      {
        label: 'Say hi',
        iconType: 'heart',
        callback: (rowIndex, columnId) =>
          alert(`Hi ${raw_data[rowIndex][columnId].raw}!`),
      },
      {
        label: 'Say bye',
        iconType: 'moon',
        callback: (rowIndex, columnId) =>
          alert(`Bye ${raw_data[rowIndex][columnId].raw}!`),
      },
    ],
  },
  {
    id: 'email',
    display: (
      // This is an example of an icon next to a title that still respects text truncate
      <EuiFlexGroup gutterSize="xs" responsive={false}>
        <EuiFlexItem className="eui-textTruncate">
          <div className="eui-textTruncate">email</div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            aria-label="Column header email"
            iconType="gear"
            color="text"
            onClick={() => alert('Email Icon Clicked!')}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    ),
    valueActions: [
      {
        label: 'Send email',
        iconType: 'email',
        callback: (rowIndex, columnId) =>
          alert(raw_data[rowIndex][columnId].raw),
      },
    ],
  },
  {
    id: 'location',
  },
  {
    id: 'account',
    actions: {
      showHide: { label: 'Custom hide label' },
      showMoveLeft: false,
      showMoveRight: false,
      additional: [
        {
          label: 'Custom action',
          onClick: () => alert('🎉'),
          iconType: 'cheer',
          size: 'xs',
          color: 'text',
        },
      ],
    },
    valueActions: [
      {
        label: 'Send money',
        iconType: 'faceHappy',
        callback: (rowIndex, columnId) =>
          alert(`Sent money to ${raw_data[rowIndex][columnId]}`),
        inPopoverButton: (rowIndex, columnId) => (
          <EuiButton
            onClick={() => alert('done')}
            iconType="faceHappy"
            aria-label={`Send money to ${raw_data[rowIndex][columnId]}`}>
            Send money
          </EuiButton>
        ),
      },
    ],
  },
  {
    id: 'date',
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
    isSortable: false,
  },
  {
    id: 'version',
    defaultSortDirection: 'desc',
    initialWidth: 65,
    isResizable: false,
    actions: false,
  },
];

const trailingControlColumns = [
  {
    id: 'actions',
    width: 40,
    headerCellRender: () => null,
    rowCellRender: function RowCellRender() {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      return (
        <div>
          <EuiPopover
            isOpen={isPopoverOpen}
            anchorPosition="upCenter"
            button={
              <EuiButtonIcon
                aria-label="show actions"
                iconType="boxesHorizontal"
                color="text"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              />
            }
            closePopover={() => setIsPopoverOpen(false)}
            ownFocus={true}>
            <EuiPopoverTitle>Actions</EuiPopoverTitle>
            <div style={{ width: 150 }}>
              <button onClick={() => alert('hello')} component="span">
                <EuiFlexGroup
                  alignItems="center"
                  component="span"
                  gutterSize="s">
                  <EuiFlexItem grow={false}>
                    <EuiButtonIcon
                      aria-label="Pin selected items"
                      iconType="pin"
                      color="text"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>Pin</EuiFlexItem>
                </EuiFlexGroup>
              </button>
              <EuiSpacer size="s" />
              <button onClick={() => alert('hello')}>
                <EuiFlexGroup
                  alignItems="center"
                  component="span"
                  gutterSize="s">
                  <EuiFlexItem grow={false}>
                    <EuiButtonIcon
                      aria-label="Delete selected items"
                      iconType="trash"
                      color="text"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>Delete</EuiFlexItem>
                </EuiFlexGroup>
              </button>
            </div>
          </EuiPopover>
        </div>
      );
    },
  },
];

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    pageSize =>
      setPagination(pagination => ({ ...pagination, pageSize, pageIndex: 0 })),
    [setPagination]
  );
  const onChangePage = useCallback(
    pageIndex => setPagination(pagination => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    sortingColumns => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }) => {
      useEffect(() => {
        if (columnId === 'amount') {
          if (raw_data.hasOwnProperty(rowIndex)) {
            const numeric = parseFloat(
              raw_data[rowIndex][columnId].match(/\d+\.\d+/)[0],
              10
            );
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
              },
            });
          }
        }
      }, [rowIndex, columnId, setCellProps]);

      function getFormatted() {
        return raw_data[rowIndex][columnId].formatted
          ? raw_data[rowIndex][columnId].formatted
          : raw_data[rowIndex][columnId];
      }

      return raw_data.hasOwnProperty(rowIndex)
        ? getFormatted(rowIndex, columnId)
        : null;
    };
  }, []);

  return (
    <EuiDataGrid
      aria-label="Data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      trailingControlColumns={trailingControlColumns}
      rowCount={raw_data.length}
      renderCellValue={renderCellValue}
      inMemory={{ level: 'sorting' }}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 50, 100],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
      onColumnResize={eventData => {
        console.log(eventData);
      }}
    />
  );
};
