/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiBasicTable } from '../basic_table';
import { EuiCallOut } from '../call_out';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiHealth } from '../health';
import { EuiSearchBar } from './search_bar';
import { EuiSpacer } from '../spacer';
import { times } from '../../services/utils';
import { Random } from '../../services';

const initialQuery = '';
const random = new Random();
const types = ['dashboard', 'visualization', 'watch'];
const users = ['dewey', 'wanda', 'carrie', 'jmack', 'gabic'];

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const items = times(5, (id) => {
  return {
    id,
    status: random.oneOf(['open', 'closed']),
    type: random.oneOf(types),
    tag: random.setOf(
      tags.map((tag) => tag.name),
      { min: 0, max: 3 }
    ),
    active: random.boolean(),
    owner: random.oneOf(users),
    followers: random.integer({ min: 0, max: 20 }),
    comments: random.integer({ min: 0, max: 10 }),
    stars: random.integer({ min: 0, max: 5 }),
  };
});

const loadTags = () => {
  return new Promise((resolve) => {
    resolve(
      tags.map((tag) => ({
        value: tag.name,
        view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
      }))
    );
  });
};

export const SearchBar = () => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);

  const onChange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

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
        cache: 10000, // will cache the loaded tags for 10 sec
        options: () => loadTags(),
      },
    ];

    const schema = {
      strict: true,
      fields: {
        type: {
          type: 'string',
        },
        active: {
          type: 'boolean',
        },
        status: {
          type: 'string',
        },
        followers: {
          type: 'number',
        },
        comments: {
          type: 'number',
        },
        stars: {
          type: 'number',
        },
        created: {
          type: 'date',
        },
        owner: {
          type: 'string',
        },
        tag: {
          type: 'string',
          validate: (value) => {
            if (!tags.some((tag) => tag.name === value)) {
              throw new Error(
                `unknown tag (possible values: ${tags
                  .map((tag) => tag.name)
                  .join(',')})`
              );
            }
          },
        },
      },
    };

    return (
      <EuiSearchBar
        query={query}
        box={{
          placeholder: 'type:visualization -is:active joe',
          schema,
        }}
        filters={filters}
        onChange={onChange}
      />
    );
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return (
      <>
        <EuiCallOut iconType="faceSad" color="danger" title="Invalid search" />
        <EuiSpacer size="l" />
      </>
    );
  };

  const renderTable = () => {
    const columns: any = [
      {
        name: 'Type',
        field: 'type',
      },
      {
        name: 'Open',
        field: 'status',
        render: (status) => (status === 'open' ? 'Yes' : 'No'),
      },
      {
        name: 'Active',
        field: 'active',
        dataType: 'boolean',
      },
      {
        name: 'Tags',
        field: 'tag',
      },
      {
        name: 'Owner',
        field: 'owner',
      },
      {
        name: 'Stats',
        width: '150px',
        render: (item) => {
          return (
            <div>
              <div>{`${item.stars} Stars`}</div>
              <div>{`${item.followers} Followers`}</div>
              <div>{`${item.comments} Comments`}</div>
            </div>
          );
        },
      },
    ];

    const queriedItems = EuiSearchBar.Query.execute(query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <EuiBasicTable items={queriedItems} columns={columns} />;
  };

  const content = renderError() || (
    <EuiFlexGroup>
      <EuiFlexItem grow={6}>{renderTable()}</EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>{renderSearch()}</EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      {content}
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
      cy.realPress('Tab');
      cy.get('input[type="search"]').should('have.focus');
      cy.get('input[type="search"]').type('watch');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.lengthOf.lte', 5);
      cy.checkAxe();
      cy.realPress('Tab');
      cy.get('button[data-test-subj="clearSearchButton"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 5);
      cy.checkAxe();
    });

    it('has zero violations after filtering on Open items', () => {
      cy.repeatRealPress('Tab');
      cy.get('button.euiButtonEmpty').first().should('have.focus');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.lengthOf.lte', 5);
      cy.checkAxe();
      cy.realPress(['Shift', 'Tab']);
      cy.get('button[data-test-subj="clearSearchButton"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 5);
      cy.checkAxe();
    });

    it('has zero violations after filtering by Tags', () => {
      cy.repeatRealPress('Tab', 4);
      cy.get('button.euiButtonEmpty').last().should('have.focus');
      cy.realPress('Enter');
      cy.realPress('Tab');
      cy.realPress('ArrowDown');
      cy.realPress('Enter');
      cy.realPress('Escape');
      cy.get('button.euiButtonEmpty').last().should('have.focus');
      cy.get('table.euiTable tbody').find('tr').should('have.lengthOf.lte', 5);
      cy.checkAxe();
      cy.repeatRealPress(['Shift', 'Tab'], 3);
      cy.get('button[data-test-subj="clearSearchButton"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('table.euiTable tbody').find('tr').should('have.length', 5);
      cy.checkAxe();
    });
  });
});
