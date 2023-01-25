/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiResizableContainer } from './resizable_container';
import { EuiText } from '../text';
import { faker } from '@faker-js/faker';

const text = (
  <>
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
  </>
);

const Container = () => (
  <EuiResizableContainer style={{ height: '200px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={50} minSize="30%" tabIndex={0}>
          <EuiText>
            <div>{text}</div>
            <a href="#" data-test-subj="hello-world-link">
              Hello world
            </a>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel initialSize={50} minSize="200px" tabIndex={0}>
          <EuiText>{text}</EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<Container />);
  cy.get('div.euiResizablePanel').should('exist');
});

describe('EuiProgress', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility check', () => {
    it('has zero violations when first panel is scrolled vertically', () => {
      cy.realPress('Tab');
      cy.get('div.euiPanel').first().should('have.focus');
      cy.realPress('End');
      cy.get('a[data-test-subj="hello-world-link"]').should('be.visible');
      cy.checkAxe();
    });

    it('has zero violations when second panel is scrolled vertically', () => {
      cy.repeatRealPress('Tab', 4);
      cy.get('div.euiPanel').last().should('have.focus');
      cy.realPress('End');
      cy.realPress('Home');
      cy.checkAxe();
    });

    it('has zero violations when the horizontal panels are resized', () => {
      cy.repeatRealPress('Tab', 3);
      cy.get('button.euiResizableButton').should('have.focus');
      cy.repeatRealPress('ArrowRight', 10);
      cy.checkAxe();
    });
  });
});
