import React, { useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiHealth,
  EuiIcon,
  EuiLink,
  EuiToolTip,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiSpacer,
  EuiCode,
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

export const Table = () => {
  const [enableAll, setEnableAll] = useState(false);
  const [readonly, setReadonly] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      truncateText: true,
      mobileOptions: {
        render: (item) => (
          <span>
            {item.firstName} {item.lastName}
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
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'github',
      name: (
        <EuiToolTip content="Their mascot is the Octokitty">
          <span>
            Github{' '}
            <EuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="eui-alignTop"
            />
          </span>
        </EuiToolTip>
      ),
      render: (username) => (
        <EuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </EuiLink>
      ),
    },
    {
      field: 'dateOfBirth',
      name: (
        <EuiToolTip content="Colloquially known as a 'birthday'">
          <span>
            Date of Birth{' '}
            <EuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="eui-alignTop"
            />
          </span>
        </EuiToolTip>
      ),
      schema: 'date',
      render: (date) => formatDate(date, 'dobLong'),
    },
    {
      field: 'nationality',
      name: (
        <EuiToolTip content="The nation in which this person resides">
          <span>
            Nationality{' '}
            <EuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="eui-alignTop"
            />
          </span>
        </EuiToolTip>
      ),
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: (
        <EuiToolTip content="Free to talk or busy with business">
          <span>
            Online{' '}
            <EuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="eui-alignTop"
            />
          </span>
        </EuiToolTip>
      ),
      schema: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
  ];

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
    enableAllColumns: enableAll,
    readOnly: readonly,
  };

  return (
    <div>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={<EuiCode>enableAllColumns</EuiCode>}
            checked={enableAll}
            onChange={() => setEnableAll((enabled) => !enabled)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={<EuiCode>readOnly</EuiCode>}
            checked={readonly}
            onChange={() => setReadonly((readonly) => !readonly)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
      />
    </div>
  );
};
