import React, {
  Component,
} from 'react';

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
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTablePagination,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
} from '../../../../src/components';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  Pager,
  SortableProperties,
} from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemIdToSelectedMap: {},
      itemIdToOpenActionsPopoverMap: {},
      sortedColumn: 'title',
      itemsPerPage: 20,
    };

    this.items = [{
      id: 0,
      title: 'A very long line which will wrap on narrower screens and NOT become truncated and replaced by an ellipsis',
      type: 'user',
      dateCreated: 'Tue Dec 28 2016',
      magnitude: 1,
      health: <EuiHealth color="success">Healthy</EuiHealth>,
    }, {
      id: 1,
      title: {
        value: 'A very long line which will not wrap on narrower screens and instead will become truncated and replaced by an ellipsis',
        truncateText: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 01 2016',
      magnitude: 1,
      health: <EuiHealth color="success">Healthy</EuiHealth>,
    }, {
      id: 2,
      title: {
        value: 'Boomerang',
        isLink: true,
      },
      type: 'user',
      dateCreated: <span>Tue Dec 01 2016 &nbsp; <EuiBadge color="secondary">New!</EuiBadge></span>,
      magnitude: 10,
      health: <EuiHealth color="warning">Warning</EuiHealth>,
    }, {
      id: 3,
      title: {
        value: 'Celebration',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 16 2016',
      magnitude: 100,
      health: <EuiHealth color="success">Healthy</EuiHealth>,
    }, {
      id: 4,
      title: {
        value: 'Dog',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 13 2016',
      magnitude: 1000,
      health: <EuiHealth color="warning">Warning</EuiHealth>,
    }, {
      id: 5,
      title: {
        value: 'Dragon',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="success">Healthy</EuiHealth>,
    }, {
      id: 6,
      title: {
        value: 'Bear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="danger">Danger</EuiHealth>,
    }, {
      id: 7,
      title: {
        value: 'Dinosaur',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="warning">Warning</EuiHealth>,
    }, {
      id: 8,
      title: {
        value: 'Spider',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="warning">Warning</EuiHealth>,
    }, {
      id: 9,
      title: {
        value: 'Bugbear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="success">Healthy</EuiHealth>,
    }, {
      id: 10,
      title: {
        value: 'Bear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="danger">Danger</EuiHealth>,
    }, {
      id: 11,
      title: {
        value: 'Dinosaur',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="warning">Warning</EuiHealth>,
    }, {
      id: 12,
      title: {
        value: 'Spider',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="success">Healthy</EuiHealth>,
    }, {
      id: 13,
      title: {
        value: 'Bugbear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: <EuiHealth color="danger">Danger</EuiHealth>,
    }];

    this.sortableProperties = new SortableProperties([{
      name: 'title',
      getValue: item => item.title.toLowerCase(),
      isAscending: true,
    }, {
      name: 'dateCreated',
      getValue: item => item.dateCreated.toLowerCase(),
      isAscending: true,
    }, {
      name: 'magnitude',
      getValue: item => item.magnitude.toLowerCase(),
      isAscending: true,
    }], this.state.sortedColumn);

    this.columns = [{
      id: 'checkbox',
      isCheckbox: true,
      textOnly: false,
      width: '24px',
    }, {
      id: 'type',
      label: '',
      alignment: LEFT_ALIGNMENT,
      width: '24px',
      cellProvider: cell => <EuiIcon type={cell} size="m" />,
    }, {
      id: 'title',
      label: 'Title',
      alignment: LEFT_ALIGNMENT,
      isSortable: true,
    }, {
      id: 'health',
      label: 'Health',
      alignment: LEFT_ALIGNMENT,
    }, {
      id: 'dateCreated',
      label: 'Date created',
      alignment: LEFT_ALIGNMENT,
      isSortable: true,
    }, {
      id: 'magnitude',
      label: 'Orders of magnitude',
      alignment: RIGHT_ALIGNMENT,
      isSortable: true,
    }, {
      id: 'actions',
      label: '',
      alignment: RIGHT_ALIGNMENT,
      isActionsPopover: true,
      width: '32px',
    }];

    this.pager = new Pager(this.items.length, this.state.itemsPerPage);
    this.state.firstItemIndex = this.pager.getFirstItemIndex();
    this.state.lastItemIndex = this.pager.getLastItemIndex();
  }

  onChangeItemsPerPage = itemsPerPage => {
    this.pager.setItemsPerPage(itemsPerPage);
    this.setState({
      itemsPerPage,
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  }

  onChangePage = pageIndex => {
    this.pager.goToPageIndex(pageIndex);
    this.setState({
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  };

  onSort = prop => {
    this.sortableProperties.sortOn(prop);

    this.setState({
      sortedColumn: prop,
    });
  }

  toggleItem = itemId => {
    this.setState(previousState => {
      const newItemIdToSelectedMap = {
        ...previousState.itemIdToSelectedMap,
        [itemId]: !previousState.itemIdToSelectedMap[itemId],
      };

      return {
        itemIdToSelectedMap: newItemIdToSelectedMap,
      };
    });
  }

  toggleAll = () => {
    const allSelected = this.areAllItemsSelected();
    const newItemIdToSelectedMap = {};
    this.items.forEach(item => newItemIdToSelectedMap[item.id] = !allSelected);

    this.setState({
      itemIdToSelectedMap: newItemIdToSelectedMap,
    });
  }

  isItemSelected = itemId => {
    return this.state.itemIdToSelectedMap[itemId];
  }

  areAllItemsSelected = () => {
    const indexOfUnselectedItem = this.items.findIndex(item => !this.isItemSelected(item.id));
    return indexOfUnselectedItem === -1;
  }

  areAnyRowsSelected = () => {
    return Object.keys(this.state.itemIdToSelectedMap).findIndex(id => {
      return this.state.itemIdToSelectedMap[id];
    }) !== -1;
  }

  togglePopover = itemId => {
    this.setState(previousState => {
      const newItemIdToOpenActionsPopoverMap = {
        ...previousState.itemIdToOpenActionsPopoverMap,
        [itemId]: !previousState.itemIdToOpenActionsPopoverMap[itemId],
      };

      return {
        itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
      };
    });
  };

  closePopover = itemId => {
    this.setState(previousState => {
      const newItemIdToOpenActionsPopoverMap = {
        ...previousState.itemIdToOpenActionsPopoverMap,
        [itemId]: false,
      };

      return {
        itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
      };
    });
  };

  isPopoverOpen = itemId => {
    return this.state.itemIdToOpenActionsPopoverMap[itemId];
  };

  renderHeaderCells() {
    return this.columns.map((column, columnIndex) => {
      if (column.isCheckbox) {
        return (
          <EuiTableHeaderCellCheckbox
            key={column.id}
            width={column.width}
          >
            <EuiCheckbox
              id="selectAllCheckbox"
              checked={this.areAllItemsSelected()}
              onChange={this.toggleAll.bind(this)}
              type="inList"
            />
          </EuiTableHeaderCellCheckbox>
        );
      }

      return (
        <EuiTableHeaderCell
          key={column.id}
          align={this.columns[columnIndex].alignment}
          width={column.width}
          onSort={column.isSortable ? this.onSort.bind(this, column.id) : undefined}
          isSorted={this.state.sortedColumn === column.id}
          isSortAscending={this.sortableProperties.isAscendingByName(column.id)}
        >
          {column.label}
        </EuiTableHeaderCell>
      );
    });
  }

  renderRows() {
    const renderRow = item => {
      const cells = this.columns.map(column => {
        const cell = item[column.id];

        let child;

        if (column.isCheckbox) {
          return (
            <EuiTableRowCellCheckbox key={column.id}>
              <EuiCheckbox
                id={`${item.id}-checkbox`}
                checked={this.isItemSelected(item.id)}
                onChange={this.toggleItem.bind(this, item.id)}
                type="inList"
              />
            </EuiTableRowCellCheckbox>
          );
        }

        if (column.isActionsPopover) {
          return (
            <EuiTableRowCell
              key={column.id}
              textOnly={false}
              align="right"
            >
              <EuiPopover
                id={`${item.id}-actions`}
                button={(
                  <EuiButtonIcon
                    aria-label="Actions"
                    iconType="gear"
                    size="s"
                    color="text"
                    onClick={() => this.togglePopover(item.id)}
                  />
                )}
                isOpen={this.isPopoverOpen(item.id)}
                closePopover={() => this.closePopover(item.id)}
                panelPaddingSize="none"
                anchorPosition="leftCenter"
              >
                <EuiContextMenuPanel
                  items={[
                    (
                      <EuiContextMenuItem
                        key="A"
                        icon="pencil"
                        onClick={() => { this.closePopover(item.id); }}
                      >
                        Edit
                      </EuiContextMenuItem>
                    ), (
                      <EuiContextMenuItem
                        key="B"
                        icon="share"
                        onClick={() => { this.closePopover(item.id); }}
                      >
                        Share
                      </EuiContextMenuItem>
                    ), (
                      <EuiContextMenuItem
                        key="C"
                        icon="trash"
                        onClick={() => { this.closePopover(item.id); }}
                      >
                        Delete
                      </EuiContextMenuItem>
                    ),
                  ]}
                />
              </EuiPopover>
            </EuiTableRowCell>
          );
        }

        if (column.cellProvider) {
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
          >
            {child}
          </EuiTableRowCell>
        );
      });

      return (
        <EuiTableRow
          key={item.id}
          isSelected={this.isItemSelected(item.id)}
        >
          {cells}
        </EuiTableRow>
      );
    };

    const rows = [];

    for (let itemIndex = this.state.firstItemIndex; itemIndex <= this.state.lastItemIndex; itemIndex++) {
      const item = this.items[itemIndex];
      rows.push(renderRow(item));
    }

    return rows;
  }

  render() {
    let optionalActionButtons;

    if (this.areAnyRowsSelected() > 0) {
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

        <EuiTable>
          <EuiTableHeader>
            {this.renderHeaderCells()}
          </EuiTableHeader>

          <EuiTableBody>
            {this.renderRows()}
          </EuiTableBody>
        </EuiTable>

        <EuiSpacer size="m" />

        <EuiTablePagination
          activePage={this.pager.getCurrentPageIndex()}
          itemsPerPage={this.state.itemsPerPage}
          itemsPerPageOptions={[5, 10, 20]}
          pageCount={this.pager.getTotalPages()}
          onChangeItemsPerPage={this.onChangeItemsPerPage}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}
