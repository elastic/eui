/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiInMemoryTable } from './in_memory_table';
import { EuiHealth } from '../health';
import { EuiLink } from '../link';
import { formatDate, PropertySort } from '../../services';
import { createDataStore } from '../../../src-docs/src/views/tables/data_store';

interface SortingOptions {
  sort: PropertySort;
}

const store = createDataStore();

const InMemoryTable = () => {
  const columns: any[] = [
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
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country!.flag} ${country!.name}`;
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
  ];

  const sorting: SortingOptions = {
    sort: {
      field: 'dateOfBirth',
      direction: 'desc',
    },
  };

  return (
    <EuiInMemoryTable
      data-test-subj="cy-in-memory-table"
      tableCaption="Demo of EuiInMemoryTable"
      items={store.users}
      columns={columns}
      pagination={true}
      sorting={sorting}
    />
  );
};

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<InMemoryTable />);
  cy.get('div[data-test-subj="cy-in-memory-table"]').should('exist');
});

describe('EuiInMemoryTable', () => {
  describe('Automated accessibility check', () => {
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
      cy.get('table.euiTable').find('tr.euiTableRow').should('have.length', 20);
      cy.checkAxe();
    });

    it('has zero violations after sorting on a column', () => {
      cy.realPress('Tab');
      cy.get('button[data-test-subj="tableHeaderSortButton"]')
        .first()
        .should('have.focus');
      cy.realPress('Enter');
      cy.get('tbody tr.euiTableRow span.euiTableCellContent__text')
        .first()
        .contains(
          'Another very long first name which will wrap or be truncated'
        );
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
      cy.get('table.euiTable').find('tr.euiTableRow').should('have.length', 20);
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
});
