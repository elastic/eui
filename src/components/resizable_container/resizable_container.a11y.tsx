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

describe('Horizontal EuiResizableContainer', () => {
  const HorizontalContainer = () => (
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
    cy.realMount(<HorizontalContainer />);
    cy.get('div.euiResizablePanel').should('exist');
  });

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

describe('Vertical EuiResizableContainer', () => {
  const VerticalContainer = () => (
    <EuiResizableContainer style={{ height: '400px' }} direction="vertical">
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel initialSize={60} minSize="40%" tabIndex={0}>
            <EuiText>
              <div>{text}</div>
            </EuiText>
          </EuiResizablePanel>

          <EuiResizableButton />

          <EuiResizablePanel initialSize={40} minSize="10%" tabIndex={0}>
            <EuiText>
              <div>{text}</div>
            </EuiText>
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  );

  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<VerticalContainer />);
    cy.get('div.euiResizablePanel').should('exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the vertical panels are resized', () => {
      cy.repeatRealPress('Tab');
      cy.get('button.euiResizableButton').should('have.focus');
      cy.repeatRealPress('ArrowDown', 10);
      cy.checkAxe();
    });
  });
});
