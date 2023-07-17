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

import { useCurrentEuiBreakpoint } from './';

describe('useCurrentEuiBreakpoint', () => {
  const MockComponent = () => {
    const currentBreakpoint = useCurrentEuiBreakpoint();
    return (
      <>
        Current breakpoint: <strong data-test-subj>{currentBreakpoint}</strong>
      </>
    );
  };

  describe('with default EUI theme breakpoints', () => {
    beforeEach(() => {
      cy.viewport(1600, 600);
      cy.mount(<MockComponent />);
      cy.wait(50); // Throttle race conditions - won't typically happen in production, but Cypress does everything extremely fast
    });

    it('returns the current EUI breakpoint based on window width on page load', () => {
      cy.get('[data-test-subj]').should('have.text', 'xl');
    });

    describe('updates the current EUI breakpoint on resize', () => {
      it('xs', () => {
        cy.viewport(300, 600);
        cy.get('[data-test-subj]').should('have.text', 'xs');
      });

      it('s', () => {
        cy.viewport(575, 600);
        cy.get('[data-test-subj]').should('have.text', 's');
      });

      it('m', () => {
        cy.viewport(768, 600);
        cy.get('[data-test-subj]').should('have.text', 'm');
      });

      it('l', () => {
        cy.viewport(992, 600);
        cy.get('[data-test-subj]').should('have.text', 'l');
      });

      it('xl', () => {
        cy.viewport(1200, 600);
        cy.get('[data-test-subj]').should('have.text', 'xl');
      });
    });
  });

  describe('with custom breakpoints', () => {
    beforeEach(() => {
      const customBreakpoints = {
        xxs: 0,
        xs: 250,
        s: 500,
        m: 1000,
        l: 1500,
        xl: 2000,
        xxl: 2500,
      };
      cy.mount(<MockComponent />, {
        providerProps: { modify: { breakpoint: customBreakpoints } },
      });
      cy.wait(50); // Throttle race conditions - won't typically happen in production, but Cypress does everything extremely fast
    });

    describe('returns the correct custom breakpoint based on window width', () => {
      it('custom xxs breakpoint', () => {
        cy.viewport(100, 600);
        cy.get('[data-test-subj]').should('have.text', 'xxs');
      });

      it('xs', () => {
        cy.viewport(300, 600);
        cy.get('[data-test-subj]').should('have.text', 'xs');
      });

      it('s', () => {
        cy.viewport(500, 600);
        cy.get('[data-test-subj]').should('have.text', 's');
      });

      it('m', () => {
        cy.viewport(1001, 600);
        cy.get('[data-test-subj]').should('have.text', 'm');
      });

      it('l', () => {
        cy.viewport(1500, 600);
        cy.get('[data-test-subj]').should('have.text', 'l');
      });

      it('xl', () => {
        cy.viewport(2000, 600);
        cy.get('[data-test-subj]').should('have.text', 'xl');
      });

      it('custom xxl breakpoint', () => {
        cy.viewport(2500, 600);
        cy.get('[data-test-subj]').should('have.text', 'xxl');
      });
    });
  });
});
