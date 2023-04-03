/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { ReactNode, useState } from 'react';
import { EuiBasicTable } from './';
import { EuiBasicTableColumn } from './';
import { EuiButtonIcon } from '../button';
import { EuiScreenReaderOnly } from '../accessibility';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
};

const users: User[] = [
  {
    id: '47936',
    firstName: 'Robert',
    lastName: 'Stein',
    city: 'Los Angeles',
  },
  {
    id: '54736',
    firstName: 'Martina',
    lastName: 'Conlon',
    city: 'Boston',
  },
  {
    id: '40193',
    firstName: 'Alyce',
    lastName: 'Benning',
    city: 'Atlanta',
  },
];

const columns: EuiBasicTableColumn<User>[] = [
  {
    field: 'id',
    name: 'ID',
  },
  {
    field: 'firstName',
    name: 'First Name',
  },
  {
    field: 'lastName',
    name: 'Last Name',
  },
  {
    field: 'city',
    name: 'City',
  },
];

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
          <p>{`Location: ${user.city}`}</p>
          <p>This person is online.</p>
        </div>
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columnsWithExpandingRowToggle: EuiBasicTableColumn<User>[] = [
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
            onClick={() => toggleDetails(user)}
            aria-label={
              itemIdToExpandedRowMapValues[user.id] ? 'Collapse' : 'Expand'
            }
            iconType={
              itemIdToExpandedRowMapValues[user.id] ? 'arrowDown' : 'arrowRight'
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
    />
  );
};

describe('EuiExpandableRowTable', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<ExpandableRowTable />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations after expanding a row', () => {
      cy.realPress('Tab');
      cy.get('button.euiButtonIcon').first().should('have.focus');
      cy.realPress('Enter');
      cy.get('tr.euiTableRow-isExpandedRow div.euiTableCellContent').should(
        'exist'
      );
      cy.checkAxe();
    });
  });
});
