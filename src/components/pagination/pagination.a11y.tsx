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
import { EuiPagination } from './pagination';

const Pagination = () => {
  const [activePage, setActivePage] = useState(0);

  return (
    <EuiPagination
      aria-label="Many pages example"
      pageCount={22}
      activePage={activePage}
      onPageClick={(activePage) => setActivePage(activePage)}
    />
  );
};

describe('EuiPagination', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first mobile render', () => {
      cy.viewport(375, 667); // small breakpoint
      cy.mount(<Pagination />);
      cy.get('nav.euiPagination').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when rendered using non-mobile breakpoint', () => {
      cy.viewport(1280, 800); //macbook-13
      cy.mount(<Pagination />);
      cy.get('nav.euiPagination').should('exist');
      cy.checkAxe();
    });
  });
});
