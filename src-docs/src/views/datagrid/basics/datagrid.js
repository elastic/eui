import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
  createRef,
} from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiCode,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiDataGrid,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiLink,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiPopover,
  EuiScreenReaderOnly,
  EuiText,
  EuiTitle,
} from '../../../../../src/components/';

const gridRef = createRef();
const DataContext = createContext();
const raw_data = [];

for (let i = 1; i < 100; i++) {
  const email = faker.internet.email();
  const name = `${faker.name.lastName()}, ${faker.name.firstName()}`;
  const suffix = faker.name.suffix();
  raw_data.push({
    name: {
      formatted: `${name} ${suffix}`,
      raw: name,
    },
    email: {
      formatted: <EuiLink href="">{faker.internet.email()}</EuiLink>,
      raw: email,
    },
    location: (
      <Fragment>
        {`${faker.address.city()}, `}
        <EuiLink href="https://google.com">{faker.address.country()}</EuiLink>
      </Fragment>
    ),
    date: `${faker.date.past()}`,
    account: faker.finance.account(),
    amount: faker.commerce.price(),
    phone: faker.phone.number(),
    version: faker.system.semver(),
  });
}

const RenderCellValue = ({ rowIndex, columnId, setCellProps }) => {
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
            aria-label={`Say hi to ${data[rowIndex][columnId].raw}!`}
          >
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
            aria-label={`Say bye to ${data[rowIndex][columnId].raw}!`}
          >
            Say bye
          </Component>
        );
      },
    ],
  },
  {
    id: 'email',
    displayAsText: 'Email address',
    initialWidth: 130,
    cellActions: [
      ({ rowIndex, columnId, Component }) => {
        const data = useContext(DataContext);
        return (
          <Component
            onClick={() => alert(data[rowIndex][columnId].raw)}
            iconType="email"
            aria-label={`Send email to ${data[rowIndex][columnId].raw}`}
          >
            Send email
          </Component>
        );
      },
    ],
  },
  {
    id: 'location',
    displayAsText: 'Location',
  },
  {
    id: 'account',
    displayAsText: 'Account',
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
            aria-label={`Send money to ${data[rowIndex][columnId]}`}
          >
            Send money
          </Component>
        );
      },
    ],
  },
  {
    id: 'date',
    displayAsText: 'Date',
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
    displayAsText: 'Amount',
  },
  {
    id: 'phone',
    displayAsText: 'Phone',
    isSortable: false,
  },
  {
    id: 'version',
    displayAsText: 'Version',
    defaultSortDirection: 'desc',
    initialWidth: 70,
    isResizable: false,
    actions: false,
  },
];

const trailingControlColumns = [
  {
    id: 'actions',
    width: 40,
    headerCellRender: () => (
      <EuiScreenReaderOnly>
        <span>Controls</span>
      </EuiScreenReaderOnly>
    ),
    rowCellRender: function RowCellRender({ rowIndex, colIndex }) {
      const [isPopoverVisible, setIsPopoverVisible] = useState(false);
      const closePopover = () => setIsPopoverVisible(false);

      const [isModalVisible, setIsModalVisible] = useState(false);
      const closeModal = () => {
        setIsModalVisible(false);
        gridRef.current.setFocusedCell({ rowIndex, colIndex });
      };
      const showModal = () => {
        closePopover();
        setIsModalVisible(true);
      };

      let modal;

      if (isModalVisible) {
        modal = (
          <EuiModal onClose={closeModal} style={{ width: 500 }}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>A typical modal</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiText>
                <p>
                  <Link to="/layout/modal">
                    <strong>EuiModal</strong>
                  </Link>{' '}
                  components have a higher <EuiCode>z-index</EuiCode> than{' '}
                  <strong>EuiDataGrid</strong> components, even in fullscreen
                  mode. This ensures that modals will never appear behind the
                  data grid.
                </p>
              </EuiText>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButton onClick={closeModal} fill>
                Close
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        );
      }

      const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
      const closeFlyout = () => {
        setIsFlyoutVisible(false);
        gridRef.current.setFocusedCell({ rowIndex, colIndex });
      };
      const showFlyout = () => {
        closePopover();
        setIsFlyoutVisible(true);
      };

      let flyout;

      if (isFlyoutVisible) {
        flyout = (
          <EuiFlyout
            aria-labelledby="flyoutTitle"
            onClose={closeFlyout}
            ownFocus
            size="s"
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id="flyoutTitle">A typical flyout</h2>
              </EuiTitle>
            </EuiFlyoutHeader>

            <EuiFlyoutBody>
              <EuiText>
                <p>
                  <Link to="/layout/flyout">
                    <strong>EuiFlyout</strong>
                  </Link>{' '}
                  components have a higher <EuiCode>z-index</EuiCode> than{' '}
                  <strong>EuiDataGrid</strong> components, even in fullscreen
                  mode. This ensures that flyouts will never appear behind the
                  data grid.
                </p>

                <p>
                  Flyouts are also styled with a vertical offset that accounts
                  for the presence of fixed headers. However, when the data grid
                  is in fullscreen mode, these offset styles are ignored to
                  allow the flyout to correctly appear at the top of the
                  viewport.
                </p>
              </EuiText>
            </EuiFlyoutBody>

            <EuiFlyoutFooter>
              <EuiButtonEmpty
                flush="left"
                iconType="cross"
                onClick={closeFlyout}
              >
                Close
              </EuiButtonEmpty>
            </EuiFlyoutFooter>
          </EuiFlyout>
        );
      }

      const actions = [
        <EuiContextMenuItem icon="apmTrace" key="modal" onClick={showModal}>
          Modal example
        </EuiContextMenuItem>,
        <EuiContextMenuItem
          icon="tableOfContents"
          key="flyout"
          onClick={showFlyout}
        >
          Flyout example
        </EuiContextMenuItem>,
      ];

      return (
        <>
          <EuiPopover
            isOpen={isPopoverVisible}
            panelPaddingSize="none"
            anchorPosition="upCenter"
            button={
              <EuiButtonIcon
                aria-label="Show actions"
                iconType="boxesHorizontal"
                color="text"
                onClick={() => setIsPopoverVisible(!isPopoverVisible)}
              />
            }
            closePopover={closePopover}
          >
            <EuiContextMenuPanel items={actions} size="s" title="Actions" />
          </EuiPopover>

          {modal}

          {flyout}
        </>
      );
    },
  },
];

export default () => {
  // Pagination
  const [pagination, setPagination] = useState({ pageIndex: 0 });
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

  // Sorting
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id) // initialize to the full set of columns
  );

  const onColumnResize = useRef((eventData) => {
    console.log(eventData);
  });

  return (
    <DataContext.Provider value={raw_data}>
      <EuiDataGrid
        aria-label="Data grid demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        trailingControlColumns={trailingControlColumns}
        rowCount={raw_data.length}
        renderCellValue={RenderCellValue}
        inMemory={{ level: 'sorting' }}
        sorting={{ columns: sortingColumns, onSort }}
        pagination={{
          ...pagination,
          onChangeItemsPerPage: onChangeItemsPerPage,
          onChangePage: onChangePage,
        }}
        onColumnResize={onColumnResize.current}
        ref={gridRef}
      />
    </DataContext.Provider>
  );
};
