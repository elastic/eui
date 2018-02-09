import React, {
  Component
} from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import { EuiBasicTable } from '../../../../../src/components/basic_table';
import { EuiLink } from '../../../../../src/components/link/link';
import { EuiHealth } from '../../../../../src/components/health';

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
    this.state = this.buildState({
      page: {
        index: 0,
        size: 5
      }
    });
  }

  buildState(criteria) {
    const { page } = criteria;
    return {
      criteria,
      data: store.findUsers(page.index, page.size)
    };
  }

  render() {
    const page = this.state.criteria.page;
    const data = this.state.data;
    return (
      <EuiBasicTable
        items={data.items}
        columns={[
          {
            field: 'firstName',
            name: 'First Name'
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
            render: (date) => formatDate(date, 'dobLong')
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
            }
          }
        ]}
        pagination={{
          pageIndex: page.index,
          pageSize: page.size,
          totalItemCount: data.totalCount,
          pageSizeOptions: [3, 5, 8]
        }}
        onChange={(criteria) => this.setState(this.buildState(criteria))}
      />
    );
  }
}
