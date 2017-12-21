import React, {
  Component,
} from 'react';

import {
  EuiBadge,
  EuiButtonIcon,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiHealth,
  EuiIcon,
  EuiLink,
  EuiPopover,
  EuiTablePlus,
} from '../../../../src/components';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
} from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: undefined,
      itemIdToOpenActionsPopoverMap: {},
    };

    this.items = [{
      id: 0,
      title: 'A very long line which will wrap on narrower screens and NOT become truncated and replaced by an ellipsis',
      type: 'user',
      dateCreated: 'Tue Dec 28 2016',
      magnitude: 1,
      health: 'healthy',
    }, {
      id: 1,
      title: {
        value: 'A very long line which will not wrap on narrower screens and instead will become truncated and replaced by an ellipsis',
        truncateText: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 01 2016',
      magnitude: 1,
      health: 'healthy',
    }, {
      id: 2,
      title: {
        value: 'Boomerang',
        isLink: true,
      },
      type: 'user',
      dateCreated: <span>Tue Dec 01 2016 &nbsp; <EuiBadge color="secondary">New!</EuiBadge></span>,
      magnitude: 10,
      health: 'warning',
    }, {
      id: 3,
      title: {
        value: 'Celebration',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 16 2016',
      magnitude: 100,
      health: 'healthy',
    }, {
      id: 4,
      title: {
        value: 'Dog',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 13 2016',
      magnitude: 1000,
      health: 'warning',
    }, {
      id: 5,
      title: {
        value: 'Dragon',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'healthy',
    }, {
      id: 6,
      title: {
        value: 'Bear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'danger',
    }, {
      id: 7,
      title: {
        value: 'Dinosaur',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'warning',
    }, {
      id: 8,
      title: {
        value: 'Spider',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'warning',
    }, {
      id: 9,
      title: {
        value: 'Bugbear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'healthy',
    }, {
      id: 10,
      title: {
        value: 'Bear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'danger',
    }, {
      id: 11,
      title: {
        value: 'Dinosaur',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'warning',
    }, {
      id: 12,
      title: {
        value: 'Spider',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'healthy',
    }, {
      id: 13,
      title: {
        value: 'Bugbear',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 11 2016',
      magnitude: 10000,
      health: 'danger',
    }];

    this.columns = [{
      id: 'type',
      align: LEFT_ALIGNMENT,
      width: '24px',
    }, {
      id: 'title',
      content: 'Title',
      align: LEFT_ALIGNMENT,
      isSortable: true,
    }, {
      id: 'health',
      content: 'Health',
      align: LEFT_ALIGNMENT,
    }, {
      id: 'dateCreated',
      content: 'Date created',
      align: LEFT_ALIGNMENT,
      isSortable: true,
    }, {
      id: 'magnitude',
      content: 'Orders of magnitude',
      align: RIGHT_ALIGNMENT,
      isSortable: true,
    }, {
      id: 'actions',
      content: '',
      align: RIGHT_ALIGNMENT,
      width: '32px',
    }];

    this.columnIdToCellProviderMap = {
      type: (EuiTablePlusCell, cell, column) => (
        <EuiTablePlusCell
          key={column.id}
          align={column.align}
        >
          <EuiIcon type={cell} size="m" />
        </EuiTablePlusCell>
      ),
      title: (EuiTablePlusCell, cell, column) => {
        if (typeof cell === 'string') {
          return (
            <EuiTablePlusCell
              key={column.id}
              align={column.align}
            >
              {cell}
            </EuiTablePlusCell>
          );
        }

        const {
          isLink,
          value,
          truncateText,
        } = cell;

        let child;
        if (isLink) {
          child = (
            <EuiLink>
              {value}
            </EuiLink>
          );
        } else {
          child = value;
        }

        return (
          <EuiTablePlusCell
            key={column.id}
            truncateText={truncateText}
            align={column.align}
          >
            {child}
          </EuiTablePlusCell>
        );
      },
      health: (EuiTablePlusCell, cell, column) => {
        const healthToColorMap = {
          healthy: 'success',
          danger: 'danger',
          warning: 'warning',
        };

        return (
          <EuiTablePlusCell
            key={column.id}
            align={column.align}
          >
            <EuiHealth color={healthToColorMap[cell]}>{cell}</EuiHealth>
          </EuiTablePlusCell>
        );
      },
      actions: (EuiTablePlusCell, cell, column, row) => (
        <EuiTablePlusCell
          key={column.id}
          textOnly={false}
          align={column.align}
        >
          <EuiPopover
            id={`${row.id}-actions`}
            button={(
              <EuiButtonIcon
                aria-label="Actions"
                iconType="gear"
                size="s"
                color="text"
                onClick={() => this.togglePopover(row.id)}
              />
            )}
            isOpen={this.isPopoverOpen(row.id)}
            closePopover={() => this.closePopover(row.id)}
            panelPaddingSize="none"
            anchorPosition="leftCenter"
          >
            <EuiContextMenuPanel
              items={[
                (
                  <EuiContextMenuItem
                    key="A"
                    icon="pencil"
                    onClick={() => { this.closePopover(row.id); }}
                  >
                    Edit
                  </EuiContextMenuItem>
                ), (
                  <EuiContextMenuItem
                    key="B"
                    icon="share"
                    onClick={() => { this.closePopover(row.id); }}
                  >
                    Share
                  </EuiContextMenuItem>
                ), (
                  <EuiContextMenuItem
                    key="C"
                    icon="trash"
                    onClick={() => { this.closePopover(row.id); }}
                  >
                    Delete
                  </EuiContextMenuItem>
                ),
              ]}
            />
          </EuiPopover>
        </EuiTablePlusCell>
      ),
    };
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

  renderCell = (EuiTablePlusCell, cell, column, row) => {
    if (this.columnIdToCellProviderMap[column.id]) {
      return this.columnIdToCellProviderMap[column.id](EuiTablePlusCell, cell, column, row);
    }

    return (
      <EuiTablePlusCell
        key={column.id}
        align={column.align}
        truncateText={cell && cell.truncateText}
        textOnly={cell ? cell.textOnly : true}
      >
        {cell}
      </EuiTablePlusCell>
    );
  }

  render() {
    return (
      <EuiTablePlus
        search={this.state.searchTerm}
        onSearchChange={() => {}}
        columns={this.columns}
        rows={this.items}
        rowCellProvider={this.renderCell}
        initialSortedColumn={'title'}
        sortablePropertiesConfig={[{
          name: 'title',
          getValue: column => column.title.toLowerCase(),
          isAscending: true,
        }, {
          name: 'dateCreated',
          getValue: column => column.dateCreated.toLowerCase(),
          isAscending: true,
        }, {
          name: 'magnitude',
          getValue: column => column.magnitude.toLowerCase(),
          isAscending: true,
        }]}
      />
    );
  }
}
