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

import React, { useState } from 'react';

import { EuiBasicTable } from '../basic_table';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiHealth } from '../health';
import { EuiSpacer } from '../spacer';

import { EuiSearchBar, Query } from './search_bar';

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const tagsMap = tags.map((tag) => ({
  value: tag.name,
  view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
}));

const items = [
  {
    type: 'Dashboard',
    id: 1,
    status: 'Open',
    tag: ['finance', 'sales', 'marketing'],
    owner: 'Dewey',
  },
  {
    type: 'Visualization',
    id: 2,
    status: 'Open',
    tag: ['finance'],
    owner: 'Wanda',
  },
  {
    type: 'Dashboard',
    id: 3,
    status: 'Closed',
    tag: ['eng'],
    owner: 'Carrie',
  },
  {
    type: 'Watch',
    id: 4,
    status: 'Open',
    tag: ['sales', 'ga'],
    owner: 'Dewey',
  },
  {
    type: 'Dashboard',
    id: 5,
    status: 'Closed',
    tag: ['finance'],
    owner: 'Carrie',
  },
];

export const SearchBar = () => {
  const [query, setQuery] = useState<Query | string>('');

  const renderSearch = () => {
    const filters: any = [
      {
        type: 'field_value_toggle_group',
        field: 'status',
        items: [
          {
            value: 'open',
            name: 'Open',
          },
          {
            value: 'closed',
            name: 'Closed',
          },
        ],
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: 'or',
        options: tagsMap,
      },
    ];

    const schema = {
      strict: true,
      fields: {
        type: {
          type: 'string',
        },
        status: {
          type: 'string',
        },
        created: {
          type: 'date',
        },
        owner: {
          type: 'string',
        },
        tag: {
          type: 'string',
        },
      },
    };

    return (
      <EuiSearchBar
        query={query}
        box={{
          placeholder: 'type:visualization',
          schema,
        }}
        filters={filters}
        onChange={({ query }) => {
          if (query) setQuery(query);
        }}
      />
    );
  };

  const renderTable = () => {
    const columns: any = [
      {
        name: 'Type',
        field: 'type',
      },
      {
        name: 'Owner',
        field: 'owner',
      },
      {
        name: 'Open',
        field: 'status',
      },
      {
        name: 'Tags',
        field: 'tag',
      },
    ];

    const queriedItems = EuiSearchBar.Query.execute(query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <EuiBasicTable items={queriedItems} columns={columns} />;
  };

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>{renderSearch()}</EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <EuiFlexGroup>
        <EuiFlexItem grow={6}>{renderTable()}</EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

describe('EuiSearchBar', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<SearchBar />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.get('table.euiTable tbody').find('tr').should('have.length', 5);
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations after a full-text search', () => {
      cy.get('input[type="search"]').focus();
      cy.get('input[type="search"]').type('watch');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 1);
      cy.checkAxe();
      cy.realPress('Tab');
      cy.get('button[data-test-subj="clearSearchButton"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 5);
      cy.checkAxe();
    });

    it('has zero violations after filtering on Open items', () => {
      cy.get('button.euiFilterButton').first().focus();
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 3);
      cy.checkAxe();
      cy.realPress(['Shift', 'Tab']);
      cy.get('button[data-test-subj="clearSearchButton"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 5);
      cy.checkAxe();
    });

    it('has zero violations after filtering by Tags', () => {
      cy.get('button.euiFilterButton').last().focus();
      cy.realPress('Enter');
      cy.realPress('ArrowDown');
      cy.realPress('Enter');
      cy.realPress('Escape');
      cy.get('button.euiFilterButton').last().should('have.focus');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 3);
      cy.checkAxe();
      cy.repeatRealPress(['Shift', 'Tab'], 3);
      cy.get('button[data-test-subj="clearSearchButton"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 5);
      cy.checkAxe();
    });
  });
});
