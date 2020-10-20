import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
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
const DataContext = createContext();

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
    cellActions: [
      ({ rowIndex, columnId, Component }) => {
        const data = useContext(DataContext);
        return (
          <Component
            onClick={() => alert(`Hi ${data[rowIndex][columnId].raw}`)}
            iconType="heart"
            aria-label={`Say hi to ${data[rowIndex][columnId].raw}!`}>
            Say hi
          </Component>
        );
      },
      ({ rowIndex, columnId, Component }) => {
        const data = useContext(DataContext);
        return (
          <Component
            onClick={() => alert(`Bye ${data[rowIndex][columnId].raw}`)}
            iconType="moon"
            aria-label={`Say bye to ${data[rowIndex][columnId].raw}!`}>
            Say bye
          </Component>
        );
      },
    ],
  },
  {
    id: 'email',
    cellActions: [
      ({ rowIndex, columnId, Component }) => {
        const data = useContext(DataContext);
        return (
          <Component
            onClick={() => alert(data[rowIndex][columnId].raw)}
            iconType="email"
            aria-label={`Send email to ${data[rowIndex][columnId].raw}`}>
            Send email
          </Component>
        );
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
          onClick: () => {},
          iconType: 'cheer',
          size: 'xs',
          color: 'text',
        },
      ],
    },
    cellActions: [
      ({ rowIndex, columnId, Component, isExpanded }) => {
        const data = useContext(DataContext);
        const onClick = isExpanded
          ? () =>
              alert(`Sent money to ${data[rowIndex][columnId]} when expanded`)
          : () =>
              alert(
                `Sent money to ${data[rowIndex][columnId]} when not expanded`
              );
        return (
          <Component
            onClick={onClick}
            iconType="faceHappy"
            aria-label={`Send money to ${data[rowIndex][columnId]}`}>
            Send money
          </Component>
        );
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
              <button onClick={() => {}} component="span">
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
              <button onClick={() => {}}>
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
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => {
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
      const data = useContext(DataContext);
      useEffect(() => {
        if (columnId === 'amount') {
          if (data.hasOwnProperty(rowIndex)) {
            const numeric = parseFloat(
              data[rowIndex][columnId].match(/\d+\.\d+/)[0],
              10
            );
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
              },
            });
          }
        }
      }, [rowIndex, columnId, setCellProps, data]);

      function getFormatted() {
        return data[rowIndex][columnId].formatted
          ? data[rowIndex][columnId].formatted
          : data[rowIndex][columnId];
      }

      return data.hasOwnProperty(rowIndex)
        ? getFormatted(rowIndex, columnId)
        : null;
    };
  }, []);

  return (
    <DataContext.Provider value={raw_data}>
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
        onColumnResize={(eventData) => {
          console.log(eventData);
        }}
      />
    </DataContext.Provider>
  );
};
