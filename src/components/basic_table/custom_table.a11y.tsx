/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import {
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
} from '../table';

type User = {
  name: string;
  department: string;
  team: string;
  location: string;
  timezone: string;
};

const users: User[] = [
  {
    name: 'Maria Sanders',
    department: 'Legal',
    team: 'Lead counsel',
    location: 'Chicago, IL',
    timezone: 'Central',
  },
  {
    name: 'Robert Stein',
    department: 'Engineering',
    team: 'Security',
    location: 'Los Angeles, CA',
    timezone: 'Pacific',
  },
  {
    name: 'Andrew Phipps',
    department: 'Design',
    team: 'Website marketing',
    location: 'Seattle, WA',
    timezone: 'Pacific',
  },
];

const userRows = users.map((user) => {
  const { name, department, team, location, timezone } = user;

  return (
    <EuiTableRow>
      <EuiTableRowCell>{name}</EuiTableRowCell>
      <EuiTableRowCell>{department}</EuiTableRowCell>
      <EuiTableRowCell>{team}</EuiTableRowCell>
      <EuiTableRowCell>{location}</EuiTableRowCell>
      <EuiTableRowCell>{timezone}</EuiTableRowCell>
    </EuiTableRow>
  );
});

const columns: String[] = [
  'Name',
  'Department',
  'Team',
  'Location',
  'Timezone',
];

const columnHeaders = columns.map((column) => (
  <EuiTableHeaderCell>{column}</EuiTableHeaderCell>
));

const CustomTable = () => {
  return (
    <EuiTable>
      <EuiTableHeader>{columnHeaders}</EuiTableHeader>
      <EuiTableBody>{userRows}</EuiTableBody>
    </EuiTable>
  );
};

describe('EuiCustomTable', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<CustomTable />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.checkAxe();
    });
  });
});
