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
import { EuiComboBox, EuiComboBoxOptionOption } from './index';

interface ComboBoxOption {
  id?: string;
  label: string;
  'data-test-subj': string;
}
type ComboBoxOptions = Array<EuiComboBoxOptionOption<ComboBoxOption>>;

const ComboBox = ({
  initialOptions,
  rowHeight,
}: {
  initialOptions?: ComboBoxOptions;
  rowHeight: any;
}) => {
  const [options] = useState<ComboBoxOptions>(
    initialOptions ?? [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
      },
      {
        label: 'Enceladus',
        'data-test-subj': 'enceladusOption',
      },
      {
        label: 'Mimas',
        'data-test-subj': 'mimasOption',
      },
      {
        label: 'Dione',
        'data-test-subj': 'dioneOption',
      },
      {
        label: 'Iapetus',
        'data-test-subj': 'iapetusOption',
      },
      {
        label: 'Phoebe',
        'data-test-subj': 'phoebeOption',
      },
      {
        label: 'Rhea',
        'data-test-subj': 'rheaOption',
      },
      {
        label: 'Tethys',
        'data-test-subj': 'tethysOption',
      },
      {
        label: 'Hyperion',
        'data-test-subj': 'hyperionOption',
      },
    ]
  );

  const [selectedOptions, setSelected] = useState<ComboBoxOptions>([]);

  const onChange = (selectedOptions: ComboBoxOptions) => {
    setSelected(selectedOptions);
  };

  return (
    <EuiComboBox
      aria-label="Accessible screen reader label"
      placeholder="Select options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      isClearable={true}
      isCaseSensitive
      rowHeight={rowHeight}
    />
  );
};

afterEach(() => {
  cy.get('input[data-test-subj="comboBoxSearchInput"]').should('exist');
});

describe('EuiComboBox', () => {
  [undefined, 'auto'].forEach((rowHeight) => {
    describe(`Automated accessibility check with rowHeight ${
      rowHeight ?? 'default'
    }`, () => {
      it('has zero violations on render', () => {
        cy.realMount(<ComboBox rowHeight={rowHeight} />);
        cy.checkAxe();
      });

      it('has zero violations when the combobox is expanded', () => {
        cy.realMount(<ComboBox rowHeight={rowHeight} />);
        cy.get('input[data-test-subj="comboBoxSearchInput"]').realClick();
        cy.get('button[data-test-subj="titanOption"]').should('exist');
        cy.checkAxe();
      });

      it('has zero violations after keyboard interaction', () => {
        cy.realMount(<ComboBox rowHeight={rowHeight} />);
        cy.realPress('Tab');
        cy.get('input[data-test-subj="comboBoxSearchInput"]').should(
          'have.focus'
        );
        cy.get('button[data-test-subj="titanOption"]').should('exist');
        cy.repeatRealPress('ArrowDown');
        cy.realPress('Enter');
        cy.repeatRealPress('ArrowDown');
        cy.realPress('Enter');
        cy.repeatRealPress('ArrowDown');
        cy.realPress('Enter');
        cy.get('div[data-test-subj="comboBoxInput"]')
          .find('span.euiBadge')
          .should('have.length', 3);
        cy.checkAxe();

        // Close the listbox and interact with the Clear button
        cy.realPress('Escape');
        cy.realPress('Tab');
        cy.get('button[data-test-subj="comboBoxClearButton"]').should(
          'have.focus'
        );
        cy.realPress('Space');
        cy.get('div[data-test-subj="comboBoxInput"]')
          .find('span.euiBadge')
          .should('have.length', 0);
        cy.checkAxe();
      });
    });

    describe(`Manual Accessibility check with rowHeight ${
      rowHeight ?? 'default'
    }`, () => {
      it('sets the correct aria-activedescendant id', () => {
        cy.realMount(<ComboBox rowHeight={rowHeight} />);
        cy.realPress('Tab');
        cy.get('input[data-test-subj="comboBoxSearchInput"]').should(
          'have.focus'
        );
        cy.get('button[data-test-subj="titanOption"]').should('exist');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');

        cy.get('input[data-test-subj="comboBoxSearchInput"]')
          .invoke('attr', 'aria-activedescendant')
          .should('include', 'option-2');

        cy.realPress('Enter');
        cy.realPress('ArrowDown');

        cy.get('input[data-test-subj="comboBoxSearchInput"]')
          .invoke('attr', 'aria-activedescendant')
          .should('include', 'option-3');
      });

      it('sets the correct aria-activedescendant id with custom option ids', () => {
        cy.realMount(
          <ComboBox
            rowHeight={rowHeight}
            initialOptions={[
              {
                id: 'titan',
                label: 'Titan',
                'data-test-subj': 'titanOption',
              },
              {
                id: 'enceladus',
                label: 'Enceladus',
                'data-test-subj': 'enceladusOption',
              },
              {
                id: 'mimas',
                label: 'Mimas',
                'data-test-subj': 'mimasOption',
              },
              {
                id: 'dione',
                label: 'Dione',
                'data-test-subj': 'dioneOption',
              },
              {
                id: 'iapetus',
                label: 'Iapetus',
                'data-test-subj': 'iapetusOption',
              },
            ]}
          />
        );
        cy.get('input[data-test-subj="comboBoxSearchInput"]').should('exist');

        cy.realPress('Tab');
        cy.get('input[data-test-subj="comboBoxSearchInput"]').should(
          'have.focus'
        );
        cy.get('button[data-test-subj="titanOption"]').should('exist');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');

        cy.get('input[data-test-subj="comboBoxSearchInput"]').should(
          'have.attr',
          'aria-activedescendant',
          'mimas'
        );

        cy.realPress('Enter');
        cy.realPress('ArrowDown');

        cy.get('input[data-test-subj="comboBoxSearchInput"]').should(
          'have.attr',
          'aria-activedescendant',
          'iapetus'
        );
      });
    });
  });
});
