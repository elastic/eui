import React, { Component } from 'react';
import { times } from 'lodash';

import {
  Random
} from '../../../../src/services';

import {
  EuiBasicTable,
  EuiSwitch,
  EuiIcon,
  EuiLink,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    const random = new Random();

    this.state = {
      rows: times(5, index => ({
        id: index,
        string: random.oneOf('martijnvg', 'elissaw', 'clintongormley', 'imotov', 'karmi', 'drewr', 'HonzaKral', 'rashidkpc', 'whack'),
        number: random.integer({ min: 0, max: 2000000 }),
        boolean: random.boolean(),
        date: random.date({ min: new Date(1971, 0, 0), max: new Date(1990, 0, 0) }),
        online: random.boolean(),
      })),
    };
  }

  onRowOnlineStatusChange(rowId, online) {
    this.setState(prevState => {
      const newRows = prevState.rows.slice();
      const row = newRows.find(row => row.id === rowId);
      if (row) {
        row.online = online;
      }

      return {
        rows: newRows,
      };
    });
  }

  render() {
    const {
      rows,
    } = this.state;

    const columns = [{
      field: 'string',
      name: 'string',
      dataType: 'string',
    }, {
      field: 'number',
      name: 'number',
      dataType: 'number'
    }, {
      field: 'boolean',
      name: 'boolean',
      dataType: 'boolean'
    }, {
      field: 'date',
      name: 'date',
      dataType: 'date'
    }, {
      field: 'string',
      name: 'Custom link',
      description: `Row's nickname / online handle`,
      render: value => (
        <EuiLink href={`http://www.github.com/${value}`} target="_blank">
          {value}
        </EuiLink>
      ),
    }, {
      field: 'online',
      name: 'Custom status',
      align: 'right',
      description: `Is this row is currently online?`,
      render: (online, row) => {
        const onChange = (event) => {
          this.onRowOnlineStatusChange(row.id, event.target.checked);
        };

        return (
          <EuiSwitch
            id={`${row.id}-online`}
            onChange={onChange}
            checked={online}
          />
        );
      }
    }, {
      name: 'Custom icon',
      width: '100px',
      align: 'right',
      render: (row) => {
        const color = row.online ? 'success' : 'subdued';
        const title = row.online ? 'Online' : 'Offline';
        return <EuiIcon type="user" color={color} title={title} />;
      },
    }];

    return (
      <EuiBasicTable
        columns={columns}
        rows={rows}
        totalRowCount={rows.length}
      />
    );
  }
}
