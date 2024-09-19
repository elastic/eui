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
import {
  EuiDataGrid,
  EuiDataGridColumn,
  EuiDataGridSorting,
  RenderCellValue,
} from './index';
import { faker } from '@faker-js/faker';

const columns: EuiDataGridColumn[] = [
  {
    id: 'Name',
  },
  {
    id: 'Email',
    cellActions: [
      ({ rowIndex, columnId, Component }) => {
        const row = ++rowIndex;
        return (
          <Component
            onClick={() => {}}
            iconType="heart"
            aria-label={`Send love to ${row}, column "${columnId}" `}
          >
            Send love
          </Component>
        );
      },
    ],
  },
  {
    id: 'User ID',
    schema: 'string',
  },
  {
    id: 'Account balance',
  },
  {
    id: 'Last purchase',
    schema: 'datetime',
  },
  {
    id: 'Favorite distro',
    schema: 'favoriteDistro',
  },
];

const storeData: any[] = [];

for (let i = 1; i < 11; i++) {
  storeData.push({
    Name: `${faker.person.lastName()}, ${faker.person.firstName()} ${faker.person.suffix()}`,
    Email: `${faker.internet.email()}`,
    'User ID': `${faker.number.int({ min: 1000000, max: 9999999 })}`,
    'Account balance': faker.finance.amount(),
    'Last purchase': `${faker.date.past()}`,
    'Favorite distro': i % 2 === 0 ? 'Alma' : 'Debian',
  });
}

const commaSeparateNumbers = (numberString: string) => {
  // extract the groups-of-three digits that are right-aligned
  return numberString.replace(/((\d{3})+)$/, (match) =>
    // then replace each group of xyz digits with ,xyz
    match.replace(/(\d{3})/g, ',$1')
  );
};

const renderCellValue: RenderCellValue = ({ rowIndex, columnId, schema }) => {
  let value = storeData[rowIndex][columnId];

  if (schema === 'numeric') {
    value = commaSeparateNumbers(value);
  }

  return value;
};

const DataGrid = () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const [data, setData] = useState(storeData);
  const [sortingColumns, setSortingColumns] = useState<
    EuiDataGridSorting['columns']
  >([{ id: 'custom', direction: 'asc' }]);

  const setSorting = (sortingColumns: EuiDataGridSorting['columns']) => {
    const sortedData = [...data].sort((a, b) => {
      for (let i = 0; i < sortingColumns.length; i++) {
        const column = sortingColumns[i];
        const aValue = a[column.id];
        const bValue = b[column.id];

        if (aValue < bValue) return column.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return column.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });

    setData(sortedData);
    setSortingColumns(sortingColumns);
  };

  return (
    <EuiDataGrid
      aria-label="Data grid schema example"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      inMemory={{ level: 'sorting' }}
      renderCellValue={renderCellValue}
      sorting={{ columns: sortingColumns, onSort: setSorting }}
      schemaDetectors={[
        {
          type: 'favoriteDistro',
          textTransform: 'capitalize',
          detector(value) {
            return value.toLowerCase() === 'alma' ||
              value.toLowerCase() === 'debian'
              ? 1
              : 0;
          },
          comparator(a, b, direction) {
            const aValue = a.toLowerCase() === 'alma';
            const bValue = b.toLowerCase() === 'alma';
            if (aValue < bValue) return direction === 'asc' ? 1 : -1;
            if (aValue > bValue) return direction === 'asc' ? -1 : 1;
            return 0;
          },
          sortTextAsc: 'Alma to Debian',
          sortTextDesc: 'Debian to Alma',
          icon: 'starFilled',
          color: '#800080',
        },
      ]}
    />
  );
};

beforeEach(() => {
  cy.viewport(1280, 800); // large breakpoint
  cy.mount(
    <div style={{ width: '80%', margin: '0 auto' }}>
      <DataGrid />
    </div>
  );
});

describe('EuiDataGrid', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the columns visibility menu is open', () => {
      cy.get(
        'button[data-test-subj="dataGridColumnSelectorButton"]'
      ).realClick();
      cy.checkAxe();
    });

    it('has zero violations when the hide all columns button is clicked', () => {
      cy.get(
        'button[data-test-subj="dataGridColumnSelectorButton"]'
      ).realClick();
      cy.get(
        'button[data-test-subj="dataGridColumnSelectorHideAllButton"]'
      ).realClick();
      // TODO: Log this issue and remove the skipFailures boolean when fixed
      cy.checkAxe({ skipFailures: true });
    });

    it('has zero violations when the columns reorder searchbox returns multiple results', () => {
      cy.get(
        'button[data-test-subj="dataGridColumnSelectorButton"]'
      ).realClick();
      cy.get('input[data-test-subj="dataGridColumnSelectorSearch"]').type('a');
      cy.get('.euiSwitch').should(($s) => {
        expect($s).to.have.length(5);
      });
      cy.checkAxe();
    });

    it('has zero violations when the columns reorder searchbox returns 1 result', () => {
      cy.get(
        'button[data-test-subj="dataGridColumnSelectorButton"]'
      ).realClick();
      cy.get('input[data-test-subj="dataGridColumnSelectorSearch"]').type(
        'favorite'
      );
      cy.get('.euiSwitch').should(($s) => {
        expect($s).to.have.length(1);
      });
      cy.checkAxe();
    });

    it('has zero violations when the columns reorder searchbox returns 0 results', () => {
      cy.get(
        'button[data-test-subj="dataGridColumnSelectorButton"]'
      ).realClick();
      cy.get('input[data-test-subj="dataGridColumnSelectorSearch"]').type('x');
      cy.get('div.euiSwitch--compressed').should(($s) => {
        expect($s).to.have.length(0);
      });
      cy.checkAxe();
    });

    it('has zero violations when the keyboard shortcut menu is open', () => {
      cy.get(
        'button[data-test-subj="dataGridKeyboardShortcutsButton"]'
      ).realClick();
      cy.checkAxe();
    });

    it('has zero violations when the grid display menu is open', () => {
      cy.get(
        'button[data-test-subj="dataGridDisplaySelectorButton"]'
      ).realClick();
      cy.checkAxe();
    });

    it('has zero violations when the column actions menu is open', () => {
      cy.get('.euiDataGridHeaderCell').first().realHover();
      cy.get('button.euiDataGridHeaderCell__button').first().realClick();
      cy.checkAxe();
    });

    it('has zero violations when a cell expansion popover is open', () => {
      cy.get(
        'div[data-gridcell-visible-row-index="0"][data-gridcell-column-index="1"]'
      ).realClick();
      cy.get(
        'div[data-gridcell-visible-row-index="0"][data-gridcell-column-index="1"]'
      )
        .find('button.euiButtonIcon')
        .last()
        .realClick();
      cy.checkAxe();
    });

    it('has zero violations on sort and when the columns sorting menu is open', () => {
      cy.get('.euiDataGridHeaderCell').last().realHover();
      cy.wait(200); // Wait for transition
      cy.get('button.euiDataGridHeaderCell__button').last().realClick();
      cy.get('button.euiListGroupItem__button')
        .contains('Sort Alma to Debian')
        .should('exist')
        .realClick();
      cy.get(
        'div[data-test-subj="dataGridColumnSortingPopover"] button'
      ).realClick();
      cy.checkAxe();
    });

    it('has zero violations when fullscreen is open', () => {
      cy.get('button[data-test-subj="dataGridFullScreenButton"]').realClick();
      cy.get('div.euiDataGrid--fullScreen').should('exist');
      cy.checkAxe();
    });
  });
});
