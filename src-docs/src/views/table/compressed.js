import React, {
  Component,
} from 'react';

import {
  EuiCheckbox,
  EuiIcon,
  EuiLink,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
} from '../../../../src/components';

import {
  LEFT_ALIGNMENT,
} from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemIdToSelectedMap: {
        2: true,
      },
    };

    this.items = [{
      id: 0,
      title: 'A very long line which will wrap on narrower screens and NOT become truncated using an ellipsis',
      type: 'user',
      dateCreated: 'Tue Dec 01 2016 12:56:15 GMT-0800 (PST)',
    }, {
      id: 1,
      title: {
        value: 'A very long line which will not wrap on narrower screens and instead will become truncated using an ellipsis',
        truncateText: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 01 2016 12:56:15 GMT-0800 (PST)',
    }, {
      id: 2,
      title: {
        value: 'Boomerang',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 28 2016 12:56:15 GMT-0800 (PST)',
    }, {
      id: 3,
      title: {
        value: 'Celebration',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 16 2016 12:56:15 GMT-0800 (PST)',
    }, {
      id: 4,
      title: {
        value: 'Dog',
        isLink: true,
      },
      type: 'user',
      dateCreated: 'Tue Dec 13 2016 12:56:15 GMT-0800 (PST)',
    }];

    this.columns = [{
      id: 'checkbox',
      isCheckbox: true,
      width: '20px',
    }, {
      id: 'title',
      label: 'Title',
      alignment: LEFT_ALIGNMENT,
    }, {
      id: 'type',
      label: 'Type',
      alignment: LEFT_ALIGNMENT,
      width: '60px',
      cellProvider: cell => <EuiIcon type={cell} size="m" />,
    }, {
      id: 'dateCreated',
      label: 'Date created',
      alignment: LEFT_ALIGNMENT,
    }];
  }

  toggleItem = itemId => {
    const newItemIdToSelectedMap = ({ ...this.state.itemIdToSelectedMap, ...{
      [itemId]: !this.state.itemIdToSelectedMap[itemId],
    } });

    this.setState({
      itemIdToSelectedMap: newItemIdToSelectedMap,
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
        >
          {column.label}
        </EuiTableHeaderCell>
      );
    });
  }

  renderRows() {
    return this.items.map(item => {
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
    });
  }

  render() {
    return (
      <EuiTable compressed>
        <EuiTableHeader>
          {this.renderHeaderCells()}
        </EuiTableHeader>

        <EuiTableBody>
          {this.renderRows()}
        </EuiTableBody>
      </EuiTable>
    );
  }
}
