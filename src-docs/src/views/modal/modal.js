import React, { useState } from 'react';
import _times from 'lodash/times';
import {
  EuiButton,
  EuiModal,
  EuiModalHeader,
  EuiModalBody,
  EuiModalHeaderTitle,
  EuiInMemoryTable,
  EuiLink,
  EuiHealth,
} from '../../../../src/components';
import { formatDate } from '../../../../src/services';

const firstNames = [
  'Very long first name that will wrap or be truncated',
  'Another very long first name which will wrap or be truncated',
  'Clinton',
  'Igor',
  undefined,
  'Drew',
  null,
  'Rashid',
  undefined,
  'John',
];

const lastNames = [
  'Very long last name that will wrap or be truncated',
  'Another very long last name which will wrap or be truncated',
  'Gormley',
  'Motov',
  'Minarik',
  'Raines',
  'Král',
  'Khan',
  'Sissel',
  'Dorlus',
];

const github = [
  'martijnvg',
  'elissaw',
  'clintongormley',
  'imotov',
  'karmi',
  'drewr',
  'HonzaKral',
  'rashidkpc',
  'jordansissel',
  'silne30',
];

const createUsers = () => {
  return _times(20, (index) => {
    return {
      id: index,
      firstName: index < 10 ? firstNames[index] : firstNames[index - 10],
      lastName: index < 10 ? lastNames[index] : lastNames[index - 10],
      github: index < 10 ? github[index] : github[index - 10],
      dateOfBirth: new Date(
        1980,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 27) + 1
      ),
      nationality: 'nationality',
      online: index % 2 === 0,
    };
  });
};

const MyTable = () => {
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
      render: (username) => (
        <EuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </EuiLink>
      ),
    },
    {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong'),
      sortable: true,
    },
    {
      field: 'nationality',
      name: 'Nationality',
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
      sortable: true,
    },
  ];

  const sorting = {
    sort: {
      field: 'dateOfBirth',
      direction: 'desc',
    },
  };

  return (
    <EuiInMemoryTable
      tableCaption="Demo of EuiInMemoryTable"
      items={createUsers()}
      columns={columns}
      pagination={true}
      sorting={sorting}
    />
  );
};

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  return isModalVisible ? (
    <>
      <EuiButton>Hello world!</EuiButton>
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>title</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <MyTable />
        </EuiModalBody>
      </EuiModal>
    </>
  ) : (
    <>
      <EuiButton onClick={showModal}>Show Modal</EuiButton>
    </>
  );
};
