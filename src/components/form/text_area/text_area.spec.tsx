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

import React, { useState } from 'react';
import { EuiTextArea } from './text_area';

describe('EuiTextArea', () => {
  describe('isClearable', () => {
    it('works for uncontrolled components', () => {
      cy.realMount(<EuiTextArea isClearable />);

      cy.get('textarea').type('hello world');
      cy.get('textarea').should('have.value', 'hello world');

      cy.get('[data-test-subj="clearTextAreaButton"]').click();
      cy.get('textarea').should('have.value', '');
    });

    it('works for controlled components', () => {
      const ControlledTextArea = ({}) => {
        const [value, setValue] = useState('');
        return (
          <EuiTextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            isClearable
          />
        );
      };
      cy.realMount(<ControlledTextArea />);

      cy.get('textarea').type('hello world');
      cy.get('textarea').should('have.value', 'hello world');

      cy.get('[data-test-subj="clearTextAreaButton"]').click();
      cy.get('textarea').should('have.value', '');
    });
  });
});
