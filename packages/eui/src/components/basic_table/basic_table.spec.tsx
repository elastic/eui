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
import { EuiHealth } from '../../components';
import { EuiBasicTable, EuiBasicTableColumn } from './index';

describe('EuiBasicTable', () => {
  const columns: Array<EuiBasicTableColumn<any>> = [
    { field: 'a', name: 'A', render: () => 'Hello' },
    { field: 'b', name: 'B', render: () => 'World' },
    {
      field: 'c',
      name: 'Status',
      render: () => <EuiHealth color="success">Online</EuiHealth>,
    },
  ];

  describe('copying tabular content', () => {
    it('renders one newline per-row and renders horizontal tab characters between cells', () => {
      cy.realMount(
        <EuiBasicTable
          tableCaption="Demo of EuiBasicTable"
          items={[{}]}
          rowHeader="firstName"
          columns={columns}
          responsiveBreakpoint={false}
        />
      );

      cy.selectAndCopy('.euiTable').then((copiedText) => {
        expect(copiedText).to.eq(
          `A\tB\t\Status
Hello\tWorld\tOnline
`
        );
      });
    });
  });
});
