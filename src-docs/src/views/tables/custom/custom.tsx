import React, { useState } from 'react';

import {
  EuiBadge,
  EuiHealth,
  EuiButton,
  EuiButtonIcon,
  EuiCheckbox,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLink,
  EuiPopover,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableFooter,
  EuiTableFooterCell,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTablePagination,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
  EuiTableSortMobile,
  EuiTableHeaderMobile,
  EuiScreenReaderOnly,
  EuiTableSortMobileProps,
} from '../../../../../src/components';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  Pager,
  SortableProperties,
} from '../../../../../src/services';

import { isFunction } from '../../../../../src/services/predicate';

type Item = {
  id: number;
  title: { value: string; truncateText?: boolean };
  type: string;
  dateCreated: string;
  magnitude: number;
  health: React.ReactNode;
};

export default () => {
  const items = [
    {
      id: 0,
      title:
        'A very long line which will wrap on narrower screens and NOT become truncated and replaced by an ellipsis',
      type: 'user',
      dateCreated: 'Tue Dec 28 2016',
      magnitude: 1,
      health: <EuiBadge color="success">Healthy</EuiBadge>,
    },
    {
      id: 1,
      title: {
        value:
          'A very long line which will not wrap on narrower screens and instead will become truncated and replaced by an ellipsis',
        truncateText: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 01 2016',
      magnitude: 1,
      health: <EuiBadge color="success">Healthy</EuiBadge>,
    },
    {
      id: 2,
      title: {
        value:
          'A very long line which will not wrap on narrower screens and instead will become truncated and replaced by an ellipsis',
        truncateText: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 28 2016',
      magnitude: 10,
      health: <EuiBadge color="warning">Warning</EuiBadge>,
    },
    {
      id: 3,
      title: {
        value: '',
        truncateText: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 16 2016',
      magnitude: 100,
      health: <EuiBadge color="success">Healthy</EuiBadge>,
    },
    {
      id: 4,
      title: {
        value: 'Dog',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 13 2016',
      magnitude: 1000,
      health: <EuiBadge color="warning">Warning</EuiBadge>,
    },
    {
      id: 5,
      title: {
        value: 'Dragon',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="success">Healthy</EuiBadge>,
    },
    {
      id: 6,
      title: {
        value: 'Bear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="danger">Danger</EuiBadge>,
    },
    {
      id: 7,
      title: {
        value: 'Dinosaur',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="warning">Warning</EuiBadge>,
    },
    {
      id: 8,
      title: {
        value: 'Spider',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="warning">Warning</EuiBadge>,
    },
    {
      id: 9,
      title: {
        value: 'Bugbear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="success">Healthy</EuiBadge>,
    },
    {
      id: 10,
      title: {
        value: 'Bear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="danger">Danger</EuiBadge>,
    },
    {
      id: 11,
      title: {
        value: 'Dinosaur',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="warning">Warning</EuiBadge>,
    },
    {
      id: 12,
      title: {
        value: 'Spider',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="success">Healthy</EuiHealth>,
    },
    {
      id: 13,
      title: {
        value: 'Bugbear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiBadge color="danger">Danger</EuiBadge>,
    },
  ];

  const [itemIdToSelectedMap, setItemIdToSelectedMap] = useState({});
  const [
    itemIdToOpenActionsPopoverMap,
    setItemIdToOpenActionsPopoverMap,
  ] = useState({});
  const [sortedColumn, setSortedColumn] = useState('title');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const pager = new Pager(items.length, itemsPerPage);

  const [firstItemIndex, setFirstItemIndex] = useState(
    pager.getFirstItemIndex()
  );
  const [lastItemIndex, setLastItemIndex] = useState(pager.getLastItemIndex());

  const sortableProperties = new SortableProperties(
    [
      {
        name: 'title',
        getValue: (item: Item) => item.title.value.toLowerCase(),
        isAscending: true,
      },
      {
        name: 'dateCreated',
        getValue: (item: Item) => item.dateCreated,
        isAscending: true,
      },
      {
        name: 'magnitude',
        getValue: (item: Item) => item.magnitude,
        isAscending: true,
      },
    ],
    sortedColumn
  );

  const columns: any[] = [
    {
      id: 'checkbox',
      isCheckbox: true,
      textOnly: false,
      width: '32px',
    },
    {
      id: 'type',
      label: 'Type',
      isVisuallyHiddenLabel: true,
      alignment: LEFT_ALIGNMENT,
      width: '24px',
      cellProvider: (cell) => <EuiIcon type={cell} size="m" />,
      mobileOptions: {
        show: false,
      },
    },
    {
      id: 'title',
      label: 'Title',
      footer: <em>Title</em>,
      alignment: LEFT_ALIGNMENT,
      isSortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      id: 'title_type',
      label: 'Title',
      mobileOptions: {
        only: true,
        header: false,
        enlarge: true,
        width: '100%',
      },
      render: (title, item) => (
        <span>
          <EuiIcon
            type={item.type}
            size="m"
            style={{ verticalAlign: 'text-top' }}
          />{' '}
          {title}
        </span>
      ),
    },
    {
      id: 'health',
      label: 'Health',
      footer: '',
      alignment: LEFT_ALIGNMENT,
    },
    {
      id: 'dateCreated',
      label: 'Date created',
      footer: 'Date created',
      alignment: LEFT_ALIGNMENT,
      isSortable: true,
    },
    {
      id: 'magnitude',
      label: 'Orders of magnitude',
      footer: ({ items, pagination }) => {
        const { pageIndex, pageSize } = pagination;
        const startIndex = pageIndex * pageSize;
        const pageOfItems = items.slice(
          startIndex,
          Math.min(startIndex + pageSize, items.length)
        );
        return (
          <strong>
            Total: {pageOfItems.reduce((acc, cur) => acc + cur.magnitude, 0)}
          </strong>
        );
      },
      alignment: RIGHT_ALIGNMENT,
      isSortable: true,
    },
    {
      id: 'actions',
      label: 'Actions',
      isVisuallyHiddenLabel: true,
      alignment: RIGHT_ALIGNMENT,
      isActionsPopover: true,
      width: '32px',
    },
  ];

  const onChangeItemsPerPage = (itemsPerPage) => {
    pager.setItemsPerPage(itemsPerPage);
    setItemsPerPage(itemsPerPage);
    setFirstItemIndex(pager.getFirstItemIndex());
    setLastItemIndex(pager.getLastItemIndex());
  };

  const onChangePage = (pageIndex) => {
    pager.goToPageIndex(pageIndex);
    setFirstItemIndex(pager.getFirstItemIndex());
    setLastItemIndex(pager.getLastItemIndex());
  };

  const onSort = (sortableProperty: string) => {
    sortableProperties.sortOn(sortableProperty);
    setSortedColumn(sortableProperty);
  };

  console.log({ sortableProperties, sortedColumn });

  const toggleItem = (itemId) => {
    const newSelection = { ...itemIdToSelectedMap };
    newSelection[itemId] = !itemIdToSelectedMap[itemId];
    setItemIdToSelectedMap(newSelection);
  };

  const toggleAll = () => {
    const newSelection = {};
    items.forEach((item) => {
      newSelection[item.id] = !itemIdToSelectedMap[item.id];
    });
    setItemIdToSelectedMap(newSelection);
  };

  const isItemSelected = (itemId) => {
    return itemIdToSelectedMap[itemId] || false;
  };

  const areAllItemsSelected = () => {
    return items.every((item) => itemIdToSelectedMap[item.id]);
  };

  const areAnyRowsSelected = () => {
    return Object.keys(itemIdToSelectedMap).some(
      (itemId) => itemIdToSelectedMap[itemId]
    );
  };

  const togglePopover = (itemId) => {
    const newPopoverState = { ...itemIdToOpenActionsPopoverMap };
    newPopoverState[itemId] = !itemIdToOpenActionsPopoverMap[itemId];
    setItemIdToOpenActionsPopoverMap(newPopoverState);
  };

  const closePopover = (itemId) => {
    const newPopoverState = { ...itemIdToOpenActionsPopoverMap };
    newPopoverState[itemId] = false;
    setItemIdToOpenActionsPopoverMap(newPopoverState);
  };

  const isPopoverOpen = (itemId) => {
    return itemIdToOpenActionsPopoverMap[itemId] || false;
  };

  const renderSelectAll = (isMobile?: boolean) => {
    return (
      <EuiCheckbox
        id={isMobile ? 'selectAllCheckboxMobile' : 'selectAllCheckboxDesktop'}
        label={isMobile ? 'Select all rows' : null}
        aria-label="Select all rows"
        title="Select all rows"
        checked={areAllItemsSelected()}
        onChange={toggleAll}
        type={isMobile ? null : 'inList'}
      />
    );
  };

  const getTableMobileSortItems = () => {
    const items: EuiTableSortMobileProps['items'] = [];

    columns.forEach((column) => {
      if (column.isCheckbox || !column.isSortable) {
        return;
      }
      items.push({
        name: column.label,
        key: column.id,
        onSort: () => onSort(column.id),
        isSorted: sortedColumn === column.id,
        isSortAscending: sortableProperties.isAscendingByName(column.id),
      });
    });

    return items.length ? items : undefined;
  };

  const renderHeaderCells = () => {
    const headers = [];

    columns.forEach((column, columnIndex) => {
      if (column.isCheckbox) {
        headers.push(
          <EuiTableHeaderCellCheckbox key={column.id} width={column.width}>
            {renderSelectAll()}
          </EuiTableHeaderCellCheckbox>
        );
      } else if (column.isVisuallyHiddenLabel) {
        headers.push(
          <EuiTableHeaderCell key={column.id} width={column.width}>
            <EuiScreenReaderOnly>
              <span>{column.label}</span>
            </EuiScreenReaderOnly>
          </EuiTableHeaderCell>
        );
      } else {
        headers.push(
          <EuiTableHeaderCell
            key={column.id}
            align={columns[columnIndex].alignment}
            width={column.width}
            onSort={column.isSortable ? () => onSort(column.id) : undefined}
            isSorted={sortedColumn === column.id}
            isSortAscending={sortableProperties.isAscendingByName(column.id)}
            mobileOptions={column.mobileOptions}
          >
            {column.label}
          </EuiTableHeaderCell>
        );
      }
    });
    return headers.length ? headers : null;
  };

  const renderRows = () => {
    const renderRow = (item) => {
      const cells = columns.map((column) => {
        const cell = item[column.id];

        let child;

        if (column.isCheckbox) {
          return (
            <EuiTableRowCellCheckbox key={column.id}>
              <EuiCheckbox
                id={`${item.id}-checkbox`}
                checked={isItemSelected(item.id)}
                onChange={() => toggleItem(item.id)}
                type="inList"
                title="Select this row"
                aria-label="Select this row"
              />
            </EuiTableRowCellCheckbox>
          );
        }

        if (column.isActionsPopover) {
          return (
            <EuiTableRowCell
              key={column.id}
              header={column.label}
              textOnly={false}
              hasActions={true}
              align="right"
            >
              <EuiPopover
                id={`${item.id}-actions`}
                button={
                  <EuiButtonIcon
                    aria-label="Actions"
                    iconType="gear"
                    size="s"
                    color="text"
                    onClick={() => togglePopover(item.id)}
                  />
                }
                isOpen={isPopoverOpen(item.id)}
                closePopover={() => closePopover(item.id)}
                panelPaddingSize="none"
                anchorPosition="leftCenter"
              >
                <EuiContextMenuPanel
                  items={[
                    <EuiContextMenuItem
                      key="A"
                      icon="pencil"
                      onClick={() => {
                        closePopover(item.id);
                      }}
                    >
                      Edit
                    </EuiContextMenuItem>,
                    <EuiContextMenuItem
                      key="B"
                      icon="share"
                      onClick={() => {
                        closePopover(item.id);
                      }}
                    >
                      Share
                    </EuiContextMenuItem>,
                    <EuiContextMenuItem
                      key="C"
                      icon="trash"
                      onClick={() => {
                        closePopover(item.id);
                      }}
                    >
                      Delete
                    </EuiContextMenuItem>,
                  ]}
                />
              </EuiPopover>
            </EuiTableRowCell>
          );
        }

        if (column.render) {
          const titleText = item.title.truncateText
            ? item.title.value
            : item.title;
          const title = item.title.isLink ? (
            <EuiLink href="">{item.title.value}</EuiLink>
          ) : (
            titleText
          );
          child = column.render(title, item);
        } else if (column.cellProvider) {
          child = column.cellProvider(cell);
        } else if (cell.isLink) {
          child = <EuiLink href="">{cell.value}</EuiLink>;
        } else if (cell.truncateText) {
          child = cell.value;
        } else {
          child = cell;
        }

        return (
          <EuiTableRowCell
            key={column.id}
            align={column.alignment}
            truncateText={cell && cell.truncateText}
            textOnly={cell ? cell.textOnly : true}
            mobileOptions={{
              header: column.label,
              ...column.mobileOptions,
            }}
          >
            {child}
          </EuiTableRowCell>
        );
      });

      return (
        <EuiTableRow
          key={item.id}
          isSelected={isItemSelected(item.id)}
          isSelectable={true}
          hasActions={true}
        >
          {cells}
        </EuiTableRow>
      );
    };

    const rows = [];

    for (
      let itemIndex = firstItemIndex;
      itemIndex <= lastItemIndex;
      itemIndex++
    ) {
      const item = items[itemIndex];
      rows.push(renderRow(item));
    }

    return rows;
  };

  const getColumnFooter = (column, { items, pagination }) => {
    if (column.footer === null) {
      return null;
    }

    if (column.footer) {
      if (isFunction(column.footer)) {
        return column.footer({ items, pagination });
      }
      return column.footer;
    }

    return undefined;
  };

  const renderFooterCells = () => {
    const footers = [];

    const pagination = {
      pageIndex: pager.getCurrentPageIndex(),
      pageSize: itemsPerPage,
      totalItemCount: pager.getTotalPages(),
    };

    columns.forEach((column) => {
      const footer = getColumnFooter(column, { items, pagination });
      if (column.mobileOptions && column.mobileOptions.only) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <EuiTableFooterCell
            key={`footer_${column.id}`}
            align={column.alignment}
          >
            {footer}
          </EuiTableFooterCell>
        );
      } else {
        footers.push(
          <EuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={column.alignment}
          >
            {undefined}
          </EuiTableFooterCell>
        );
      }
    });
    return footers;
  };

  let optionalActionButtons;
  const exampleId = 'example-id';

  if (areAnyRowsSelected() > 0) {
    optionalActionButtons = (
      <EuiFlexItem grow={false}>
        <EuiButton color="danger">Delete selected</EuiButton>
      </EuiFlexItem>
    );
  }

  return (
    <div>
      <EuiFlexGroup gutterSize="m">
        {optionalActionButtons}

        <EuiFlexItem>
          <EuiFieldSearch fullWidth placeholder="Search..." />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="m" />

      <EuiTableHeaderMobile>
        <EuiFlexGroup
          responsive={false}
          justifyContent="spaceBetween"
          alignItems="baseline"
        >
          <EuiFlexItem grow={false}>{renderSelectAll(true)}</EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiTableSortMobile items={getTableMobileSortItems()} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiTableHeaderMobile>

      <EuiTable id={exampleId}>
        <EuiTableHeader>{renderHeaderCells()}</EuiTableHeader>

        <EuiTableBody>{renderRows()}</EuiTableBody>

        <EuiTableFooter>{renderFooterCells()}</EuiTableFooter>
      </EuiTable>

      <EuiSpacer size="m" />

      <EuiTablePagination
        aria-label="Custom EuiTable demo"
        aria-controls={exampleId}
        activePage={pager.getCurrentPageIndex()}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={[5, 10, 20]}
        pageCount={pager.getTotalPages()}
        onChangeItemsPerPage={onChangeItemsPerPage}
        onChangePage={onChangePage}
        compressed
      />
    </div>
  );
};
