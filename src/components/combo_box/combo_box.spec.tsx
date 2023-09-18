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
import { EuiComboBox } from './index';

describe('EuiComboBox', () => {
  describe('Focus management', () => {
    it('keeps focus on the input box when clicking a disabled item', () => {
      cy.realMount(
        <EuiComboBox
          data-test-subj="combobox"
          options={[
            { label: 'Item 1' },
            { label: 'Item 2', disabled: true },
            { label: 'Item 3' },
          ]}
        />
      );

      cy.get(
        '[data-test-subj=combobox] [data-test-subj=comboBoxSearchInput]'
      ).realClick();

      cy.get('span').contains('Item 2').realClick();

      cy.focused().should('have.attr', 'data-test-subj', 'comboBoxSearchInput');
    });
  });

  describe('truncation', () => {
    const sharedProps = {
      style: { width: 200 },
      options: [
        { label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
    };

    it('defaults to end truncation', () => {
      cy.realMount(<EuiComboBox {...sharedProps} />);
      cy.get('[data-test-subj="comboBoxInput"]').realClick();
      cy.get('[data-test-subj="truncatedText"]').should(
        'have.text',
        'Lorem ipsum dolor sit a…'
      );
    });

    it('allows customizing truncationProps', () => {
      cy.realMount(
        <EuiComboBox
          {...sharedProps}
          truncationProps={{ truncation: 'middle' }}
        />
      );
      cy.get('[data-test-subj="comboBoxInput"]').realClick();
      cy.get('[data-test-subj="truncatedText"]').should(
        'have.text',
        'Lorem ipsum …piscing elit.'
      );
    });

    it('allows individual option truncationProps to override parent truncationProps', () => {
      cy.realMount(
        <EuiComboBox
          {...sharedProps}
          truncationProps={{ truncation: 'middle' }}
          options={[
            {
              ...sharedProps.options[0],
              truncationProps: { truncation: 'start', truncationOffset: 5 },
            },
          ]}
        />
      );
      cy.get('[data-test-subj="comboBoxInput"]').realClick();
      cy.get('[data-test-subj="truncatedText"]').should(
        'have.text',
        'Lorem…tur adipiscing elit.'
      );
    });

    describe('when searching', () => {
      it('uses start & end truncation position', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('sit');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          '…sum dolor sit amet, co…'
        );
      });

      it('does not truncate the start when the found search is near the start', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('ipsum');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lorem ipsum dolor sit a…'
        );
      });

      it('does not truncate the end when the found search is near the end', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('eli');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          '…nsectetur adipiscing elit.'
        );
      });

      it('marks the full available text if the search input is longer than the truncated text', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('Lorem ipsum dolor sit amet');
        cy.get('.euiMark').should('have.text', '…rem ipsum dolor sit am…');
      });
    });
  });

  describe('Backspace to delete last pill', () => {
    const options = [
      { label: 'Item 1' },
      { label: 'Item 2' },
      { label: 'Item 3' },
    ];

    const TestComboBox = (...rest) => {
      const [selectedOptions, setSelected] = useState([]);
      const onChange = (selectedOptions) => {
        setSelected(selectedOptions);
      };
      return (
        <EuiComboBox
          options={options}
          selectedOptions={selectedOptions}
          onChange={onChange}
          {...rest}
        />
      );
    };

    it('does not delete the last pill if there is search text', () => {
      cy.realMount(<TestComboBox />);
      cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
      cy.realPress('{downarrow}');
      cy.realPress('Enter');
      cy.realPress('{downarrow}');
      cy.realPress('Enter');
      cy.get('.euiComboBoxPill').should('have.length', 2);

      cy.get('[data-test-subj=comboBoxSearchInput]').type('test');
      cy.get('[data-test-subj=comboBoxSearchInput]').realPress('Backspace');

      cy.get('[data-test-subj=comboBoxSearchInput]')
        .invoke('val')
        .should('equal', 'tes');
      cy.get('.euiComboBoxPill').should('have.length', 2);
    });

    it('does not delete the last pill if the input is not active when backspace is pressed', () => {
      cy.realMount(<TestComboBox />);
      cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
      cy.realPress('{downarrow}');
      cy.realPress('Enter');
      cy.get('[data-test-subj=comboBoxSearchInput]').type('test');
      cy.realPress('Escape');
      cy.get('.euiComboBoxPill').should('have.length', 1);

      cy.realPress(['Shift', 'Tab']); // Should be focused on the first pill's X button
      cy.realPress('Backspace');
      cy.get('.euiComboBoxPill').should('have.length', 1);

      cy.repeatRealPress('Tab', 2); // Should be focused on the clear button
      cy.realPress('Backspace');
      cy.get('.euiComboBoxPill').should('have.length', 1);
    });

    it('deletes the last pill added when backspace on the input is pressed ', () => {
      cy.realMount(<TestComboBox />);
      cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
      cy.realPress('{downarrow}');
      cy.realPress('Enter');
      cy.realPress('{downarrow}');
      cy.realPress('Enter');
      cy.get('.euiComboBoxPill').should('have.length', 2);

      cy.get('[data-test-subj=comboBoxSearchInput]').realPress('Backspace');
      cy.get('.euiComboBoxPill').should('have.length', 1);
    });

    it('opens up the selection list again after deleting the active single selection ', () => {
      cy.realMount(<TestComboBox singleSelection />);
      cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
      cy.realPress('{downarrow}');
      cy.realPress('Enter');

      cy.realPress('Backspace');
      cy.get('[data-test-subj=comboBoxOptionsList]').should('have.length', 1);
    });
  });
});
