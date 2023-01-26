/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { faker } from '@faker-js/faker';

import { EuiInMemoryTable, EuiBasicTableColumn } from './index';
import { EuiHealth } from '../health';
import { EuiLink } from '../link';
import { formatDate } from '../../services';

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

describe('EuiInMemoryTable', () => {
  const mountTable = () => {
    cy.realMount(
      <EuiInMemoryTable
        data-test-subj="cy-in-memory-table"
        tableCaption="Demo of EuiInMemoryTable"
        items={users}
        columns={columns}
        pagination={true}
        sorting={{ sort: { field: 'dateOfBirth', direction: 'desc' } }}
      />
    );
    cy.get('div[data-test-subj="cy-in-memory-table"]').should('exist');
  };

  describe('Automated accessibility check', () => {
    describe('desktop', () => {
      beforeEach(() => {
        cy.viewport(1024, 768); // medium breakpoint
        mountTable();
      });

      it('has zero violations on first render', () => {
        cy.checkAxe();
      });

      it('has zero violations on pagination click', () => {
        cy.get('a[data-test-subj="pagination-button-1"]').realClick();
        cy.get('button[data-test-subj="pagination-button-1"]').should(
          'be.disabled'
        );
        cy.checkAxe();
      });

      it('has zero violations after number of rows is increased', () => {
        cy.get(
          'button[data-test-subj="tablePaginationPopoverButton"]'
        ).realClick();
        cy.get('div[data-popover-open="true"]').should('exist');
        cy.get('button[data-test-subj="tablePagination-25-rows"]').realClick();
        cy.get('table.euiTable')
          .find('tr.euiTableRow')
          .should('have.length', 20);
        cy.checkAxe();
      });

      it('has zero violations after sorting on a column', () => {
        cy.realPress('Tab');
        cy.get('button[data-test-subj="tableHeaderSortButton"]')
          .first()
          .should('have.focus');
        cy.realPress('Enter');
        cy.checkAxe();
      });

      it('has zero violations when number of rows is increased by keyboard', () => {
        cy.repeatRealPress('Tab', 14);
        cy.get('button[data-test-subj="tablePaginationPopoverButton"]')
          .should('have.focus')
          .realPress('Space');
        cy.get('div[data-popover-open="true"]').should('exist');
        cy.get('div[data-popover-open="true"]').should('have.focus');
        cy.repeatRealPress('Tab'); // Switched to Tab from ArrowDown because of flaky test runs
        cy.get('button[data-test-subj="tablePagination-25-rows"]').realPress(
          'Space'
        );
        cy.get('table.euiTable')
          .find('tr.euiTableRow')
          .should('have.length', 20);
        cy.checkAxe();
      });

      it('has zero violations when pagination is pressed', () => {
        cy.repeatRealPress('Tab', 15);
        cy.get('a[data-test-subj="pagination-button-1"]')
          .should('have.focus')
          .realPress('Enter');
        cy.get('button[data-test-subj="pagination-button-1"]').should(
          'be.disabled'
        );
        cy.checkAxe();
      });
    });

    describe('mobile', () => {
      beforeEach(() => {
        cy.viewport(375, 667); // small breakpoint
        mountTable();
      });

      it('has zero violations on render', () => {
        cy.checkAxe();
      });
    });
  });
});
