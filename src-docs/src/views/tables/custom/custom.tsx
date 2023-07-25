import React, { Component, ReactNode } from 'react';

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
  EuiTableFieldDataColumnType,
  EuiTableSortMobileProps,
} from '../../../../../src/components';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  HorizontalAlignment,
  Pager,
  SortableProperties,
} from '../../../../../src/services';

interface DataTitle {
  value: ReactNode;
  truncateText?: boolean;
  isLink?: boolean;
}

interface DataItem {
  id: number;
  title: ReactNode | DataTitle;
  type: string;
  dateCreated: string;
  magnitude: number;
  health: ReactNode;
}

interface Column {
  id: string;
  label?: string;
  isVisuallyHiddenLabel?: boolean;
  isSortable?: boolean;
  isCheckbox?: boolean;
  isActionsPopover?: boolean;
  textOnly?: boolean;
  alignment?: HorizontalAlignment;
  width?: string;
  footer?: ReactNode | Function;
  render?: Function;
  cellProvider?: Function;
  mobileOptions?: EuiTableFieldDataColumnType<DataItem>['mobileOptions'];
}

interface State {
  itemIdToSelectedMap: Record<number | string, boolean>;
  itemIdToOpenActionsPopoverMap: Record<number | string, boolean>;
  sortedColumn: keyof DataItem;
  itemsPerPage: number;
  firstItemIndex: number;
  lastItemIndex: number;
}

interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalItemCount: number;
}

export default class extends Component<{}, State> {
  items: DataItem[] = [
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
      title: (
        <span>
          A very long line in an ELEMENT which will wrap on narrower screens and
          NOT become truncated and replaced by an ellipsis
        </span>
      ),
      type: 'user',
      dateCreated: 'Tue Dec 01 2016',
      magnitude: 10,
      health: <EuiBadge color="warning">Warning</EuiBadge>,
    },
    {
      id: 3,
      title: {
        value: (
          <span>
            A very long line in an ELEMENT which will not wrap on narrower
            screens and instead will become truncated and replaced by an
            ellipsis
          </span>
        ),
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

  columns: Column[] = [
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
      cellProvider: (cell: string) => <EuiIcon type={cell} size="m" />,
      mobileOptions: {
        show: false,
      },
    },
    {
      id: 'title',
      label: 'Title',
      footer: <em>Title</em>,
      alignment: LEFT_ALIGNMENT,
      isSortable: false,
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
      render: (title: DataItem['title'], item: DataItem) => (
        <span>
          <EuiIcon
            type={item.type}
            size="m"
            style={{ verticalAlign: 'text-top' }}
          />{' '}
          {title as ReactNode}
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
      footer: ({
        items,
        pagination,
      }: {
        items: DataItem[];
        pagination: Pagination;
      }) => {
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

  sortableProperties: SortableProperties<DataItem>;
  pager: Pager;

  constructor(props: {}) {
    super(props);

    const defaultItemsPerPage = 10;
    this.pager = new Pager(this.items.length, defaultItemsPerPage);

    this.state = {
      itemIdToSelectedMap: {},
      itemIdToOpenActionsPopoverMap: {},
      sortedColumn: 'magnitude',
      itemsPerPage: defaultItemsPerPage,
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    };

    this.sortableProperties = new SortableProperties(
      [
        {
          name: 'dateCreated',
          getValue: (item) => item.dateCreated.toLowerCase(),
          isAscending: true,
        },
        {
          name: 'magnitude',
          getValue: (item) => String(item.magnitude).toLowerCase(),
          isAscending: true,
        },
      ],
      this.state.sortedColumn
    );
  }

  onChangeItemsPerPage = (itemsPerPage: number) => {
    this.pager.setItemsPerPage(itemsPerPage);
    this.setState({
      itemsPerPage,
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  };

  onChangePage = (pageIndex: number) => {
    this.pager.goToPageIndex(pageIndex);
    this.setState({
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  };

  onSort = (prop: string) => {
    this.sortableProperties.sortOn(prop);

    this.setState({
      sortedColumn: prop as keyof DataItem,
    });
  };

  toggleItem = (itemId: number) => {
    this.setState((previousState) => {
      const newItemIdToSelectedMap = {
        ...previousState.itemIdToSelectedMap,
        [itemId]: !previousState.itemIdToSelectedMap[itemId],
      };

      return {
        itemIdToSelectedMap: newItemIdToSelectedMap,
      };
    });
  };

  toggleAll = () => {
    const allSelected = this.areAllItemsSelected();
    const newItemIdToSelectedMap: State['itemIdToSelectedMap'] = {};
    this.items.forEach(
      (item) => (newItemIdToSelectedMap[item.id] = !allSelected)
    );

    this.setState({
      itemIdToSelectedMap: newItemIdToSelectedMap,
    });
  };

  isItemSelected = (itemId: number) => {
    return this.state.itemIdToSelectedMap[itemId];
  };

  areAllItemsSelected = () => {
    const indexOfUnselectedItem = this.items.findIndex(
      (item) => !this.isItemSelected(item.id)
    );
    return indexOfUnselectedItem === -1;
  };

  areAnyRowsSelected = () => {
    return (
      Object.keys(this.state.itemIdToSelectedMap).findIndex((id) => {
        return this.state.itemIdToSelectedMap[id];
      }) !== -1
    );
  };

  togglePopover = (itemId: number) => {
    this.setState((previousState) => {
      const newItemIdToOpenActionsPopoverMap = {
        ...previousState.itemIdToOpenActionsPopoverMap,
        [itemId]: !previousState.itemIdToOpenActionsPopoverMap[itemId],
      };

      return {
        itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
      };
    });
  };

  closePopover = (itemId: number) => {
    // only update the state if this item's popover is open
    if (this.isPopoverOpen(itemId)) {
      this.setState((previousState) => {
        const newItemIdToOpenActionsPopoverMap = {
          ...previousState.itemIdToOpenActionsPopoverMap,
          [itemId]: false,
        };

        return {
          itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
        };
      });
    }
  };

  isPopoverOpen = (itemId: number) => {
    return this.state.itemIdToOpenActionsPopoverMap[itemId];
  };

  renderSelectAll = (mobile?: boolean) => {
    return (
      <EuiCheckbox
        id={mobile ? 'selectAllCheckboxMobile' : 'selectAllCheckboxDesktop'}
        label={mobile ? 'Select all rows' : null}
        aria-label="Select all rows"
        title="Select all rows"
        checked={this.areAllItemsSelected()}
        onChange={this.toggleAll.bind(this)}
        type={mobile ? undefined : 'inList'}
      />
    );
  };

  private getTableMobileSortItems() {
    const items: EuiTableSortMobileProps['items'] = [];

    this.columns.forEach((column) => {
      if (column.isCheckbox || !column.isSortable) {
        return;
      }
      items.push({
        name: column.label,
        key: column.id,
        onSort: this.onSort.bind(this, column.id),
        isSorted: this.state.sortedColumn === column.id,
        isSortAscending: this.sortableProperties.isAscendingByName(column.id),
      });
    });
    return items;
  }

  renderHeaderCells() {
    const headers: ReactNode[] = [];

    this.columns.forEach((column, columnIndex) => {
      if (column.isCheckbox) {
        headers.push(
          <EuiTableHeaderCellCheckbox key={column.id} width={column.width}>
            {this.renderSelectAll()}
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
            align={this.columns[columnIndex].alignment}
            width={column.width}
            onSort={
              column.isSortable ? this.onSort.bind(this, column.id) : undefined
            }
            isSorted={this.state.sortedColumn === column.id}
            isSortAscending={this.sortableProperties.isAscendingByName(
              column.id
            )}
            mobileOptions={column.mobileOptions}
          >
            {column.label}
          </EuiTableHeaderCell>
        );
      }
    });
    return headers.length ? headers : null;
  }

  renderRows() {
    const renderRow = (item: DataItem) => {
      const cells = this.columns.map((column) => {
        const cell = item[column.id as keyof DataItem];

        let child;

        if (column.isCheckbox) {
          return (
            <EuiTableRowCellCheckbox key={column.id}>
              <EuiCheckbox
                id={`${item.id}-checkbox`}
                checked={this.isItemSelected(item.id)}
                onChange={this.toggleItem.bind(this, item.id)}
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
              textOnly={false}
              hasActions={true}
              align="right"
              mobileOptions={{ header: column.label }}
            >
              <EuiPopover
                id={`${item.id}-actions`}
                button={
                  <EuiButtonIcon
                    aria-label="Actions"
                    iconType="gear"
                    size="s"
                    color="text"
                    onClick={() => this.togglePopover(item.id)}
                  />
                }
                isOpen={this.isPopoverOpen(item.id)}
                closePopover={() => this.closePopover(item.id)}
                panelPaddingSize="none"
                anchorPosition="leftCenter"
              >
                <EuiContextMenuPanel
                  items={[
                    <EuiContextMenuItem
                      key="A"
                      icon="pencil"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}
                    >
                      Edit
                    </EuiContextMenuItem>,
                    <EuiContextMenuItem
                      key="B"
                      icon="share"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}
                    >
                      Share
                    </EuiContextMenuItem>,
                    <EuiContextMenuItem
                      key="C"
                      icon="trash"
                      onClick={() => {
                        this.closePopover(item.id);
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

        if (column.id === 'title' || column.id === 'title_type') {
          let title = item.title;

          if ((item.title as DataTitle)?.value) {
            const titleObj = item.title as DataTitle;
            const titleText = titleObj.value;
            title = titleObj.isLink ? (
              <EuiLink href="#">{titleText}</EuiLink>
            ) : (
              titleText
            );
          }

          if (column.render) {
            child = column.render(title, item);
          } else {
            child = title;
          }
        } else if (column.cellProvider) {
          child = column.cellProvider(cell);
        } else {
          child = cell;
        }

        return (
          <EuiTableRowCell
            key={column.id}
            align={column.alignment}
            truncateText={(cell as DataTitle)?.truncateText}
            textOnly={column.textOnly || false}
            mobileOptions={{
              header: column.label,
              ...column.mobileOptions,
              render: column.mobileOptions?.render?.(item),
            }}
          >
            {child}
          </EuiTableRowCell>
        );
      });

      return (
        <EuiTableRow
          key={item.id}
          isSelected={this.isItemSelected(item.id)}
          isSelectable={true}
          hasActions={true}
        >
          {cells}
        </EuiTableRow>
      );
    };

    const rows = [];

    for (
      let itemIndex = this.state.firstItemIndex;
      itemIndex <= this.state.lastItemIndex;
      itemIndex++
    ) {
      const item = this.items[itemIndex];
      rows.push(renderRow(item));
    }

    return rows;
  }

  renderFooterCells() {
    const footers: ReactNode[] = [];

    const items = this.items;
    const pagination = {
      pageIndex: this.pager.getCurrentPageIndex(),
      pageSize: this.state.itemsPerPage,
      totalItemCount: this.pager.getTotalPages(),
    };

    this.columns.forEach((column) => {
      const footer = this.getColumnFooter(column, { items, pagination });
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
  }

  getColumnFooter = (
    column: Column,
    {
      items,
      pagination,
    }: {
      items: DataItem[];
      pagination: Pagination;
    }
  ) => {
    if (column.footer === null) {
      return null;
    }

    if (column.footer) {
      if (typeof column.footer === 'function') {
        return column.footer({ items, pagination });
      }
      return column.footer;
    }

    return undefined;
  };

  render() {
    let optionalActionButtons;
    const exampleId = 'example-id';

    if (!!this.areAnyRowsSelected()) {
      optionalActionButtons = (
        <EuiFlexItem grow={false}>
          <EuiButton color="danger">Delete selected</EuiButton>
        </EuiFlexItem>
      );
    }

    return (
      <>
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
            <EuiFlexItem grow={false}>{this.renderSelectAll(true)}</EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiTableSortMobile items={this.getTableMobileSortItems()} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiTableHeaderMobile>

        <EuiTable id={exampleId}>
          <EuiTableHeader>{this.renderHeaderCells()}</EuiTableHeader>

          <EuiTableBody>{this.renderRows()}</EuiTableBody>

          <EuiTableFooter>{this.renderFooterCells()}</EuiTableFooter>
        </EuiTable>

        <EuiSpacer size="m" />

        <EuiTablePagination
          aria-label="Custom EuiTable demo"
          aria-controls={exampleId}
          activePage={this.pager.getCurrentPageIndex()}
          itemsPerPage={this.state.itemsPerPage}
          itemsPerPageOptions={[5, 10, 20]}
          pageCount={this.pager.getTotalPages()}
          onChangeItemsPerPage={this.onChangeItemsPerPage}
          onChangePage={this.onChangePage}
          compressed
        />
      </>
    );
  }
}
