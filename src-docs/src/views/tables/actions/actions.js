import React, { Component } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
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

export class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...this.buildTableState({ page: { index: 0, size: 5 } }),
      selection: [],
      multiAction: false
    };
  }

  buildTableState(criteria) {
    const { page } = criteria;
    return {
      criteria,
      data: store.findUsers(page.index, page.size, criteria.sort)
    };
  }

  reloadData(selection) {
    this.setState(prevState => ({
      ...this.buildTableState(prevState.criteria),
      selection
    }));
  }

  renderDeleteButton() {
    const selection = this.state.selection;
    if (selection.length === 0) {
      return;
    }
    const onClick = () => {
      store.deleteUsers(...selection.map(user => user.id));
      this.reloadData([]);
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

  toggleMultiAction() {
    this.setState(prevState => ({ multiAction: !prevState.multiAction }));
  }

  deleteUser(user) {
    store.deleteUsers(user.id);
    this.reloadData([]);
  }

  cloneUser(user) {
    store.cloneUser(user.id);
    this.reloadData([]);
  }

  render() {
    const { page, sort } = this.state.criteria;
    const data = this.state.data;
    const deleteButton = this.renderDeleteButton();
    return (
      <div>
        <div>
          <EuiFlexGroup alignItems="center">
            {deleteButton}
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label="Multiple Actions"
                checked={this.state.multiAction}
                onChange={this.toggleMultiAction.bind(this)}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
        <EuiSpacer size="l" />
        <EuiBasicTable
          items={data.items}
          columns={[
            {
              field: 'firstName',
              name: 'First Name',
              sortable: true
            },
            {
              field: 'lastName',
              name: 'Last Name'
            },
            {
              field: 'github',
              name: 'Github',
              render: (username) => (
                <EuiLink href={`https://github.com/${username}`} target="_blank">{username}</EuiLink>
              )
            },
            {
              field: 'dateOfBirth',
              name: 'Date of Birth',
              dataType: 'date',
              render: (date) => formatDate(date, 'dobLong'),
              sortable: true
            },
            {
              field: 'nationality',
              name: 'Nationality',
              render: (countryCode) => {
                const country = store.getCountry(countryCode);
                return `${country.flag} ${country.name}`;
              }
            },
            {
              field: 'online',
              name: 'Online',
              dataType: 'boolean',
              render: (online) => {
                const color = online ? 'success' : 'danger';
                const label = online ? 'Online' : 'Offline';
                return <EuiHealth color={color}>{label}</EuiHealth>;
              },
              sortable: true
            },
            {
              name: 'Actions',
              actions: this.state.multiAction ? [
                {
                  name: 'Clone',
                  description: 'Clone this person',
                  icon: 'copy',
                  onClick: (user) => this.cloneUser(user)
                },
                {
                  name: 'Delete',
                  description: 'Delete this person',
                  icon: 'trash',
                  color: 'danger',
                  onClick: (user) => this.deleteUser(user)
                }
              ] : [
                {
                  name: 'Delete',
                  type: 'icon',
                  description: 'Delete this person',
                  icon: 'trash',
                  color: 'danger',
                  onClick: (person) => this.deleteUser(person)
                }
              ]
            }
          ]}
          pagination={{
            pageIndex: page.index,
            pageSize: page.size,
            totalItemCount: data.totalCount,
            pageSizeOptions: [3, 5, 8]
          }}
          sorting={{ sort }}
          selection={{
            itemId: 'id',
            selectable: (user) => user.online,
            selectableMessage: (selectable) => !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: (selection) => this.setState({ selection })
          }}
          onChange={(criteria) => this.setState(this.buildTableState(criteria))}
        />
      </div>
    );
  }
}
