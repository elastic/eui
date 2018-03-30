import React from 'react';
import ReactDOM from 'react-dom';

import '../../../../../src/theme_k6_light.scss';
import { EuiLink, EuiBasicTable } from '../../../../../';

const store = {
  users: [
    {
      firstName: 'John',
      lastName: 'Dorlus',
      github: 'silne30',
      nationality: 'HT'
    },
    {
      firstName: 'Lee',
      lastName: 'Drengenberg',
      github: 'leedr',
      nationality: 'US'
    }
  ]
};

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
  name: 'Nationality'
}];

export const SimpleTable = () => {
  return (
    <EuiBasicTable
      className="basicTable"
      items={store.users.filter((user, index) => index < 10)}
      columns={columns}
    />
  );
};

ReactDOM.render(<SimpleTable />, document.getElementById('app'));
