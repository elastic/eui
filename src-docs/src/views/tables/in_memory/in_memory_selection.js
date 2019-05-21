import React, { Component } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiInMemoryTable,
  EuiEmptyPrompt,
} from '../../../../../src/components';
import { Random } from '../../../../../src/services/random';

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

const random = new Random();

const store = createDataStore();

const noItemsFoundMsg = 'No users match search criteria';

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      message: (
        <EuiEmptyPrompt
          title={<h3>No users</h3>}
          titleSize="xs"
          body="Looks like you don&rsquo;t have any users. Let&rsquo;s create some!"
          actions={
            <EuiButton size="s" key="loadUsers" onClick={this.loadUsers}>
              Load Users
            </EuiButton>
          }
        />
      ),
      selection: [],
    };
  }

  loadUsers = () => {
    this.setState({
      message: 'Loading users...',
      loading: true,
      users: undefined,
      error: undefined,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        message: noItemsFoundMsg,
        error: undefined,
        users: store.users,
      });
    }, random.number({ min: 0, max: 3000 }));
  };

  loadUsersWithError() {
    this.setState({
      message: 'Loading users...',
      loading: true,
      users: undefined,
      error: undefined,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        error: 'ouch!... again... ',
        users: undefined,
        message: noItemsFoundMsg,
      });
    }, random.number({ min: 0, max: 3000 }));
  }

  renderToolsLeft() {
    const selection = this.state.selection;

    if (selection.length === 0) {
      return;
    }

    const onClick = () => {
      store.deleteUsers(...selection.map(user => user.id));
      this.setState({ selection: [] });
    };

    return (
      <EuiButton color="danger" iconType="trash" onClick={onClick}>
        Delete {selection.length} Users
      </EuiButton>
    );
  }

  renderToolsRight() {
    return [
      <EuiButton
        key="loadUsers"
        onClick={this.loadUsers.bind(this)}
        isDisabled={this.state.loading}>
        Load Users
      </EuiButton>,
      <EuiButton
        key="loadUsersError"
        onClick={this.loadUsersWithError.bind(this)}
        isDisabled={this.state.loading}>
        Load Users (Error)
      </EuiButton>,
    ];
  }

  render() {
    const columns = [
      {
        field: 'firstName',
        name: 'First Name',
        sortable: true,
        truncateText: true,
      },
      {
        field: 'lastName',
        name: 'Last Name',
        truncateText: true,
      },
      {
        field: 'github',
        name: 'Github',
        render: username => (
          <EuiLink href={`https://github.com/${username}`} target="_blank">
            {username}
          </EuiLink>
        ),
      },
      {
        field: 'dateOfBirth',
        name: 'Date of Birth',
        dataType: 'date',
        render: date => formatDate(date, 'dobLong'),
        sortable: true,
      },
      {
        field: 'nationality',
        name: 'Nationality',
        render: countryCode => {
          const country = store.getCountry(countryCode);
          return `${country.flag} ${country.name}`;
        },
      },
      {
        field: 'online',
        name: 'Online',
        dataType: 'boolean',
        render: online => {
          const color = online ? 'success' : 'danger';
          const label = online ? 'Online' : 'Offline';
          return <EuiHealth color={color}>{label}</EuiHealth>;
        },
        sortable: true,
      },
    ];

    const search = {
      toolsLeft: this.renderToolsLeft(),
      toolsRight: this.renderToolsRight(),
      box: {
        incremental: true,
      },
      filters: [
        {
          type: 'is',
          field: 'online',
          name: 'Online',
          negatedName: 'Offline',
        },
        {
          type: 'field_value_selection',
          field: 'nationality',
          name: 'Nationality',
          multiSelect: false,
          options: store.countries.map(country => ({
            value: country.code,
            name: country.name,
            view: `${country.flag} ${country.name}`,
          })),
        },
      ],
    };

    const pagination = {
      initialPageSize: 5,
      pageSizeOptions: [3, 5, 8],
    };

    const selection = {
      selectable: user => user.online,
      selectableMessage: selectable =>
        !selectable ? 'User is currently offline' : undefined,
      onSelectionChange: selection => this.setState({ selection }),
    };

    return (
      <div>
        <EuiInMemoryTable
          items={this.state.users}
          itemId="id"
          error={this.state.error}
          loading={this.state.loading}
          message={this.state.message}
          columns={columns}
          search={search}
          pagination={pagination}
          sorting={true}
          selection={selection}
          isSelectable={true}
        />
      </div>
    );
  }
}
