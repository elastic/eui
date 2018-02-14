import React, {
  Component
} from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
  EuiButton,
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
      ...this.buildState({ page: { index: 0, size: 5 } }),
      selection: []
    };
  }

  buildState(criteria) {
    const { page } = criteria;
    return {
      criteria,
      data: store.findUsers(page.index, page.size, criteria.sort)
    };
  }

  renderDeleteButton() {
    const selection = this.state.selection;
    if (selection.length === 0) {
      return;
    }
    const onClick = () => {
      store.deleteUsers(selection.map(user => user.id));
      this.setState(prevState => ({
        ...this.buildState(prevState.criteria),
        selection: []
      }));
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
    const { page, sort } = this.state.criteria;
    const data = this.state.data;
    const deleteButton = this.renderDeleteButton();
    return (
      <div>
        {deleteButton}
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
          onChange={(criteria) => this.setState(this.buildState(criteria))}
        />
      </div>
    );
  }
}
