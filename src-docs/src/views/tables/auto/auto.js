import React, { Component } from 'react';

import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiSpacer,
  EuiSwitch,
} from '../../../../../src/components';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

const store = createDataStore();

const columns = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    'data-test-subj': 'firstNameCell',
    mobileOptions: {
      render: item => (
        <span>
          {item.firstName}{' '}
          <EuiLink href="#" target="_blank">
            {item.lastName}
          </EuiLink>
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      fullWidth: true,
    },
  },
  {
    field: 'lastName',
    name: 'Last Name',
    truncateText: true,
    render: name => (
      <EuiLink href="#" target="_blank">
        {name}
      </EuiLink>
    ),
    mobileOptions: {
      show: false,
    },
  },
  {
    field: 'github',
    name: 'Github',
  },
];

const items = store.users.filter((user, index) => index < 10);

const getRowProps = item => {
  const { id } = item;
  return {
    'data-test-subj': `row-${id}`,
    className: 'customRowClass',
    onClick: () => console.log(`Clicked row ${id}`),
  };
};

const getCellProps = (item, column) => {
  const { id } = item;
  const { field } = column;
  return {
    className: 'customCellClass',
    'data-test-subj': `cell-${id}-${field}`,
    textOnly: true,
  };
};

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoLayout: true,
    };
  }

  toggleTableLayout = () => {
    this.setState(prevState => ({ autoLayout: !prevState.autoLayout }));
  };

  render() {
    return (
      <div>
        <EuiSwitch
          label="Show auto layout"
          checked={this.state.autoLayout}
          onChange={this.toggleTableLayout}
        />
        <EuiSpacer size="m" />
        <EuiBasicTable
          items={items}
          columns={columns}
          tableLayout={this.state.autoLayout ? 'auto' : 'fixed'}
          rowProps={getRowProps}
          cellProps={getCellProps}
        />
      </div>
    );
  }
}
