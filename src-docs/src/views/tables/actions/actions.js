import React, { useState, useEffect, Fragment } from 'react';
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

export const Table = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [multiAction, setMultiAction] = useState(true);
  const [customAction, setCustomAction] = useState(false);
  const [ctrlIsPressed, setCtrlIsPressed] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ctrlHandler = (e) => {
    if (e && e.metaKey) {
      setCtrlIsPressed(true);
    } else {
      setCtrlIsPressed(false);
    }
  };

  // Add window resize handlers
  useEffect(() => {
    window.addEventListener('keydown', ctrlHandler);
    window.addEventListener('keypress', ctrlHandler);
    window.addEventListener('keyup', ctrlHandler);

    return () => {
      window.removeEventListener('keydown', ctrlHandler);
      window.removeEventListener('keypress', ctrlHandler);
      window.removeEventListener('keyup', ctrlHandler);
    };
  }, [ctrlHandler]);

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const onClickDelete = () => {
    store.deleteUsers(...selectedItems.map((user) => user.id));

    setSelectedItems([]);
  };

  const onSelectionChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return;
    }

    return (
      <EuiFlexItem grow={false}>
        <EuiButton color="danger" iconType="trash" onClick={onClickDelete}>
          Delete {selectedItems.length} Users
        </EuiButton>
      </EuiFlexItem>
    );
  };

  const toggleMultiAction = () => {
    setMultiAction(!multiAction);
  };

  const toggleCustomAction = () => {
    setCustomAction(!customAction);
  };

  const primaryAction = (user) => {
    // store.deleteUsers(user.id);
    // setSelectedItems([]);
    window.alert(`Goes somewhere for "${user.firstName}"`);
  };

  const filter = (user, e) => {
    if (e && e.metaKey) {
      filterOut(user);
      return;
    }

    window.alert(`Filter IN for "${user.firstName}"`);
    return;
  };

  const filterOut = (user) => {
    window.alert(`Filter OUT for "${user.firstName}"`);
    return;
  };

  const cloneUser = (user) => {
    store.cloneUser(user.id);
    setSelectedItems([]);
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const deleteButton = renderDeleteButton();

  let actions = null;

  if (multiAction) {
    actions = customAction
      ? [
          {
            render: (item) => {
              return (
                <EuiLink color="success" onClick={() => cloneUser(item)}>
                  Clone
                </EuiLink>
              );
            },
          },
          {
            render: (item) => {
              return (
                <EuiLink color="danger" onClick={() => primaryAction(item)}>
                  Delete
                </EuiLink>
              );
            },
          },
        ]
      : [
          {
            name: 'Primary action',
            isPrimary: true,
            description: 'Primary action',
            icon: 'timeline',
            type: 'icon',
            onClick: primaryAction,
          },
          {
            name: (item) => (item.id ? 'Filter in' : 'Filter'),
            isPrimary: true,
            description: ctrlIsPressed
              ? 'Filter out, release ctrl to filter in'
              : 'Filter in, or ctrl+click to filter out',
            icon: ctrlIsPressed ? 'minusInCircle' : 'plusInCircle',
            type: 'icon',
            onClick: filter,
          },
          {
            name: 'Filter out',
            // description: 'Clone this user',
            icon: 'minusInCircle',
            onClick: filterOut,
          },
          {
            name: 'Share',
            isPrimary: true,
            description: 'Share this user',
            icon: 'share',
            type: 'icon',
            onClick: () => {},
            'data-test-subj': 'action-share',
          },
          {
            name: 'Elastic.co',
            description: 'Go to elastic.co',
            icon: 'logoElastic',
            type: 'icon',
            href: 'https://elastic.co',
            target: '_blank',
            'data-test-subj': 'action-outboundlink',
          },
        ];
  } else {
    actions = customAction
      ? [
          {
            render: (item) => {
              return (
                <EuiLink onClick={() => primaryAction(item)} color="danger">
                  Delete
                </EuiLink>
              );
            },
          },
        ]
      : [
          {
            name: 'Elastic.co',
            description: 'Go to elastic.co',
            icon: 'editorLink',
            color: 'primary',
            type: 'icon',
            href: 'https://elastic.co',
            target: '_blank',
            'data-test-subj': 'action-outboundlink',
          },
        ];
  }

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true,
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
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
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
    {
      name: 'Actions',
      actions,
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
  };

  const selection = {
    selectable: (user) => user.online,
    selectableMessage: (selectable) =>
      !selectable ? 'User is currently offline' : undefined,
    onSelectionChange: onSelectionChange,
  };

  return (
    <Fragment>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Multiple Actions"
            checked={multiAction}
            onChange={toggleMultiAction}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Custom Actions"
            checked={customAction}
            onChange={toggleCustomAction}
          />
        </EuiFlexItem>
        <EuiFlexItem />
        {deleteButton}
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiBasicTable
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        hasActions={customAction ? false : true}
        onChange={onTableChange}
      />
    </Fragment>
  );
};
