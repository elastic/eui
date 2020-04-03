import React, { Component } from 'react';

import { createDataStore } from '../data_store';

import { htmlIdGenerator } from '../../../../../src/services';

import {
  EuiBasicTable,
  EuiButtonGroup,
  EuiCallOut,
  EuiLink,
  EuiSpacer,
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
    truncateText: true,
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

const customColumns = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    truncateText: true,
    'data-test-subj': 'firstNameCell',
    width: '20%',
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

const idPrefix = htmlIdGenerator()();

const toggleButtons = [
  {
    id: `${idPrefix}0`,
    label: 'Fixed',
    value: 'fixed',
  },
  {
    id: `${idPrefix}1`,
    label: 'Auto',
    value: 'auto',
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
    value: 'custom',
  },
];

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 'fixed',
      toggleIdSelected: `${idPrefix}0`,
    };
  }

  onChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
      layout: toggleButtons.find(x => x.id === optionId).value,
    });
  };

  toggleTableLayout = () => {
    this.setState(prevState => ({ autoLayout: !prevState.autoLayout }));
  };

  render() {
    let callOutText;

    switch (this.state.layout) {
      case 'fixed':
        callOutText = 'First Name has truncateText set to true';
        break;
      case 'auto':
        callOutText =
          'First Name has truncateText set to true which is not applied since tableLayout is set to auto';
        break;
      case 'custom':
        callOutText =
          'First Name has truncateText set to true and width set to 20%';
        break;
    }

    return (
      <div>
        <EuiButtonGroup
          legend="Table layout group"
          options={toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
        />
        <EuiSpacer size="m" />
        <EuiCallOut
          size="s"
          color={this.state.layout === 'auto' ? 'warning' : 'primary'}
          title={callOutText}
        />
        <EuiSpacer size="m" />
        <EuiBasicTable
          items={items}
          columns={this.state.layout === 'custom' ? customColumns : columns}
          tableLayout={this.state.layout === 'auto' ? 'auto' : 'fixed'}
          rowProps={getRowProps}
          cellProps={getCellProps}
        />
      </div>
    );
  }
}
