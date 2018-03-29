import React from 'react';
import ReactDOM from 'react-dom';

import '../../../../../src/theme_k6_light.scss';
import { EuiLink, EuiBasicTable } from '../../../../../';
import { createDataStore } from '../../../../../src-docs/src/views/tables/data_store';

const store = createDataStore();

export const Table = () => {
  const columns = [{
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    'data-test-subj': 'firstNameCell',
  }, {
    field: 'lastName',
    name: 'Last Name',
    truncateText: true,
  }, {
    field: 'github',
    name: 'Github',
    render: (github) => (
      <EuiLink href={'http://www.github.com/' + github} target="_blank">{github}</EuiLink>
    )
  }, {
    field: 'nationality',
    name: 'Nationality',
    render: (countryCode) => {
      const country = store.getCountry(countryCode);
      return `${country.flag} ${country.name}`;
    }
  }];

  return (
    <EuiBasicTable
      items={store.users.filter((user, index) => index < 10)}
      columns={columns}
    />
  );
};

ReactDOM.render(<Table />, document.getElementById('app'));
