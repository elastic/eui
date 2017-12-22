import React from 'react';
import { times } from 'lodash';

import {
  EuiTableOfRecords,
} from '../../../../src/components';

const selectRandom = (...array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
};

const people = times(20, (index) => {
  return {
    id: index,
    firstName: selectRandom('Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Jordan'),
    lastName: selectRandom('van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Sissel'),
    nickname: selectRandom('mvg', 'elissa', 'clint', 'imotov', 'karmi', 'drewr', 'honza', 'whack'),
    dateOfBirth: new Date(
      1990 + Math.floor(Math.random() * (1990 - 1971)), // year
      Math.floor(Math.random() * 12), // month
      Math.floor(Math.random() * 28), // day
      0, 0, 0, 0
    ),
    country: selectRandom('us', 'nl', 'cz', 'za', 'au'),
    online: selectRandom(true, false)
  };
});

export default () => {

  const model = {
    page: {
      pageIndex: 0,
      pageSize: people.length,
      items: people,
      totalItemCount: people.length
    }
  };

  const config = {
    recordId: 'id',
    columns: [
      {
        key: 'firstName',
        name: 'First Name',
        description: `Person's given name`
      },
      {
        key: 'lastName',
        name: 'Last Name',
        description: `Person's family name`
      },
      {
        key: 'nickname',
        name: 'Nickname',
        description: `Person's nickname / online handle`
      },
      {
        key: 'dateOfBirth',
        name: 'Date of Birth',
        description: `Person's date of birth`
      },
      {
        key: 'online',
        name: 'Online',
        description: `Is this person is currently online?`
      }
    ]
  };

  return <EuiTableOfRecords config={config} model={model}/>;
};
