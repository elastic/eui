import React, {
  Component
} from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiInMemoryTable
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

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      message: 'No users',
      selection: []
    };
  }

  loadUsers() {
    this.setState({
      message: 'Loading users...',
      loading: true,
      users: undefined,
      error: undefined
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        message: undefined,
        error: undefined,
        users: store.users
      });
    }, random.number({ min: 0, max: 3000 }));
  }

  loadUsersWithError() {
    this.setState({
      message: 'Loading users...',
      loading: true,
      users: undefined,
      error: undefined
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        error: 'ouch!... again... ',
        users: undefined,
        message: undefined
      });
    }, random.number({ min: 0, max: 3000 }));
  }

  renderDeleteButton() {
    const selection = this.state.selection;
    if (selection.length === 0) {
      return;
    }
    const onClick = () => {
      store.deleteUsers(...selection.map(user => user.id));
      this.setState({ selection: [] });
    };
    return (
      <EuiButton
        color="danger"
        iconType="trash"
        onClick={onClick}
      >
        Delete {selection.length} Users
      </EuiButton>
    );
  }

  render() {
    const deleteButton = this.renderDeleteButton();
    const columns = [{
      field: 'firstName',
      name: 'First Name',
      sortable: true
    }, {
      field: 'lastName',
      name: 'Last Name'
    }, {
      field: 'github',
      name: 'Github',
      render: (username) => (
        <EuiLink href={`https://github.com/${username}`} target="_blank">{username}</EuiLink>
      )
    }, {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong'),
      sortable: true
    }, {
      field: 'nationality',
      name: 'Nationality',
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      }
    }, {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true
    }];

    const pagination = {
      initialPageSize: 5,
      pageSizeOptions: [3, 5, 8]
    };

    const selection = {
      itemId: 'id',
      selectable: (user) => user.online,
      selectableMessage: (selectable) => !selectable ? 'User is currently offline' : undefined,
      onSelectionChange: (selection) => this.setState({ selection })
    };

    return (
      <div>
        <EuiFlexGroup alignItems="center">
          { deleteButton ? <EuiFlexItem grow={false}>{deleteButton}</EuiFlexItem> : undefined }
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.loadUsers.bind(this)} isDisabled={this.state.loading}>
              Load Users
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.loadUsersWithError.bind(this)} isDisabled={this.state.loading}>
              Load Users (Error)
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l"/>

        <EuiInMemoryTable
          items={this.state.users}
          error={this.state.error}
          loading={this.state.loading}
          message={this.state.message}
          columns={columns}
          pagination={pagination}
          sorting={true}
          selection={selection}
        />
      </div>
    );
  }
}
