/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../../cypress/support" />

import React from 'react';
import { EuiThemeProvider } from '../../../services';
import { useDataGridKeyboardShortcuts } from './keyboard_shortcuts';

const KeyboardShortcuts = () => {
  const { keyboardShortcuts } = useDataGridKeyboardShortcuts();
  return <>{keyboardShortcuts}</>;
};

describe('Data grid keyboard shortcuts', () => {
  it('can be reached, scrolled, and closed with the keyboard', () => {
    cy.viewport(1000, 400);
    cy.realMount(<KeyboardShortcuts />);

    cy.realPress('Tab');
    cy.get('[data-test-subj="dataGridKeyboardShortcutsButton"]').should(
      'have.focus'
    );
    cy.realPress('Enter');
    cy.get('[data-popover-open]').should('have.focus');
    cy.realPress('Tab');
    cy.get('[role="region"][aria-labelledby]')
      .should('have.focus')
      .and('have.css', 'outline-style', 'solid')
      .and('have.css', 'outline-offset', '-2px');
    cy.get('[role="region"][aria-labelledby]').should(($region) => {
      expect($region[0].scrollHeight).to.be.greaterThan(
        $region[0].clientHeight
      );
    });
    cy.realPress('PageDown');
    cy.get('[role="region"][aria-labelledby]')
      .its('0.scrollTop')
      .should('be.greaterThan', 0);

    cy.realPress('Escape');
    cy.get('[data-popover-open]').should('not.exist');
    cy.get('[data-test-subj="dataGridKeyboardShortcutsButton"]').should(
      'have.focus'
    );
  });

  it('matches themed title and description typography while allowing overrides', () => {
    cy.mount(
      <EuiThemeProvider modify={{ font: { scale: { m: 1.5 } } }}>
        <KeyboardShortcuts />
      </EuiThemeProvider>
    );
    cy.get('[data-test-subj="dataGridKeyboardShortcutsButton"]').click();
    cy.contains('dt', 'Up arrow').should('have.css', 'font-size', '14px');
    cy.contains('dd', 'Move one cell up').should(
      'have.css',
      'font-size',
      '14px'
    );
    cy.contains('dt', 'Up arrow').then(($title) => {
      const titleLineHeight = getComputedStyle($title[0]).lineHeight;
      expect(parseFloat(titleLineHeight)).to.be.closeTo(20, 0.01);
      cy.contains('dd', 'Move one cell up').should(
        'have.css',
        'line-height',
        titleLineHeight
      );
    });

    cy.document().then((document) => {
      const style = document.createElement('style');
      style.id = 'keyboard-shortcuts-consumer-override';
      style.textContent =
        '.euiDataGrid__keyboardShortcuts dt { font-size: 19px; line-height: 23px; }';
      document.head.appendChild(style);
    });
    cy.contains('dt', 'Up arrow')
      .should('have.css', 'font-size', '19px')
      .and('have.css', 'line-height', '23px');
    cy.get('#keyboard-shortcuts-consumer-override').invoke('remove');
  });
});
