/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../cypress/support" />

import React, { ReactNode, useState } from 'react';
import { EuiBasicTable, EuiBasicTableColumn } from './basic_table';
import { EuiButtonIcon } from '../button';
import { EuiHealth } from '../health';
import { EuiLink } from '../link';
import { EuiScreenReaderOnly } from '../accessibility';
import { formatDate } from '../../services';

import { faker } from '@faker-js/faker';

type User = {
  id: number;
  firstName: string | null | undefined;
  lastName: string;
  github: string;
  dateOfBirth: Date;
  online: boolean;
  location: {
    city: string;
    country: string;
  };
};

const users: User[] = [];

for (let i = 0; i < 20; i++) {
  users.push({
    id: i + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    online: faker.datatype.boolean(),
    location: {
      city: faker.address.city(),
      country: faker.address.country(),
    },
  });
}

const columns: Array<EuiBasicTableColumn<User>> = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    truncateText: true,
    mobileOptions: {
      render: (user: User) => (
        <span>
          {user.firstName} {user.lastName}
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
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
    render: (username: User['github']) => (
      <EuiLink href="#" target="_blank">
        {username}
      </EuiLink>
    ),
  },
  {
    field: 'dateOfBirth',
    name: 'Date of Birth',
    dataType: 'date',
    render: (dateOfBirth: User['dateOfBirth']) =>
      formatDate(dateOfBirth, 'dobLong'),
    sortable: true,
  },
  {
    field: 'location',
    name: 'Location',
    truncateText: true,
    textOnly: true,
    render: (location: User['location']) => {
      return `${location.city}, ${location.country}`;
    },
  },
  {
    field: 'online',
    name: 'Online',
    dataType: 'boolean',
    render: (online: User['online']) => {
      const color = online ? 'success' : 'danger';
      const label = online ? 'Online' : 'Offline';
      return <EuiHealth color={color}>{label}</EuiHealth>;
    },
    sortable: true,
    mobileOptions: {
      show: false,
    },
  },
];

describe('EuiTable', () => {
  const BasicTable = () => (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable"
      columns={columns}
      items={users}
      data-test-subj="cy-basic-table"
    />
  );

  describe('Basic table', () => {
    describe('Automated accessibility check', () => {
      it('has zero violations on render', () => {
        cy.viewport(1024, 768); // medium breakpoint
        cy.realMount(<BasicTable />);
        cy.get('[data-test-subj="cy-basic-table"]').should('exist');
        cy.checkAxe();
      });
    });
  });

  describe('Mobile basic table', () => {
    describe('Automated accessibility check', () => {
      it('has zero violations on render', () => {
        cy.viewport(375, 667); // small breakpoint
        cy.realMount(<BasicTable />);
        cy.get('[data-test-subj="cy-basic-table"]').should('exist');
        cy.checkAxe();
      });
    });
  });

  describe('Expandable rows', () => {
    const ExpandableRowTable = () => {
      const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
        Record<string, ReactNode>
      >({});

      const toggleDetails = (user: User) => {
        const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

        if (itemIdToExpandedRowMapValues[user.id]) {
          delete itemIdToExpandedRowMapValues[user.id];
        } else {
          itemIdToExpandedRowMapValues[user.id] = (
            <div>
              <p>{`Location: ${user.location.city}`}</p>
              <p>This person is online.</p>
            </div>
          );
        }
        setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
      };

      const columnsWithExpandingRowToggle: Array<EuiBasicTableColumn<User>> = [
        ...columns,
        {
          align: 'right',
          width: '40px',
          isExpander: true,
          name: (
            <EuiScreenReaderOnly>
              <span>Expand rows</span>
            </EuiScreenReaderOnly>
          ),
          render: (user: User) => {
            const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

            return (
              <EuiButtonIcon
                id={user.id.toString()}
                onClick={() => toggleDetails(user)}
                aria-label={
                  itemIdToExpandedRowMapValues[user.id] ? 'Collapse' : 'Expand'
                }
                iconType={
                  itemIdToExpandedRowMapValues[user.id]
                    ? 'arrowDown'
                    : 'arrowRight'
                }
              />
            );
          },
        },
      ];

      return (
        <EuiBasicTable
          tableCaption="Demo of EuiBasicTable with expanding rows"
          itemIdToExpandedRowMap={itemIdToExpandedRowMap}
          isExpandable={true}
          columns={columnsWithExpandingRowToggle}
          items={users}
          itemId="id"
          data-test-subj="cy-expandable-row-table"
        />
      );
    };

    beforeEach(() => {
      cy.viewport(1024, 768); // medium breakpoint
      cy.realMount(<ExpandableRowTable />);
      cy.get('[data-test-subj="cy-expandable-row-table"]').should('exist');
    });

    describe('Automated accessibility check', () => {
      it('has zero violations on render', () => {
        cy.checkAxe();
      });
    });

    describe('Keyboard accessibility', () => {
      it('has zero violations after expanding a row', () => {
        cy.repeatRealPress('Tab');
        cy.get('button#1').should('have.focus');
        cy.realPress('Enter');
        cy.get('tr.euiTableRow-isExpandedRow div.euiTableCellContent').should(
          'exist'
        );
        cy.checkAxe();
      });
    });
  });
});
