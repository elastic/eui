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

import React from 'react';
import {
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
} from '.';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  github: string;
  location: {
    city: string;
    state: string;
  };
};

const users: User[] = [
  {
    id: '47936',
    firstName: 'Robert',
    lastName: 'Stein',
    github: 'steiner_rob',
    location: {
      city: 'Los Angeles',
      state: 'CA',
    },
  },
  {
    id: '54736',
    firstName: 'Martina',
    lastName: 'Conlon',
    github: 'martina_zen',
    location: {
      city: 'Boston',
      state: 'MA',
    },
  },
  {
    id: '40193',
    firstName: 'Alyce',
    lastName: 'Benning',
    github: 'alyce_benning',
    location: {
      city: 'Atlanta',
      state: 'GA',
    },
  },
];

const userRows = users.map((user) => {
  const {
    id,
    firstName,
    lastName,
    github,
    location: { city, state },
  } = user;

  return (
    <EuiTableRow key={id}>
      <EuiTableRowCell>{`${firstName} ${lastName}`}</EuiTableRowCell>
      <EuiTableRowCell>{github}</EuiTableRowCell>
      <EuiTableRowCell>{`${city}, ${state}`}</EuiTableRowCell>
    </EuiTableRow>
  );
});

const customColumns: String[] = ['Name', 'Github', 'Location'];
const columnHeaders = customColumns.map((column, i) => (
  <EuiTableHeaderCell key={i}>{column}</EuiTableHeaderCell>
));

const CustomTable = () => {
  return (
    <EuiTable>
      <EuiTableHeader>{columnHeaders}</EuiTableHeader>
      <EuiTableBody>{userRows}</EuiTableBody>
    </EuiTable>
  );
};

describe('EuiTable', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<CustomTable />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on render', () => {
      cy.checkAxe();
    });
  });
});
