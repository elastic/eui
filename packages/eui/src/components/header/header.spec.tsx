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

import { EuiHeader } from './header';
import { EuiFlyout } from '../flyout';

describe('EuiHeader', () => {
  describe('fixed position', () => {
    it('is above EuiFlyout', () => {
      cy.mount(
        <>
          <EuiHeader data-test-subj="header" position="fixed" />
          <EuiFlyout data-test-subj="flyout" />
        </>
      );

      cy.get('[data-test-subj="flyout"]').then(($flyout) => {
        const styles = window.getComputedStyle($flyout[0]);
        const flyoutZIndex = parseInt(styles.getPropertyValue('z-index'), 10);

        cy.get('[data-test-subj="header"]')
          .should('have.css', 'z-index')
          .then((value) => parseInt(value, 10))
          .and('be.above', flyoutZIndex);
      });
    });
  });
});
