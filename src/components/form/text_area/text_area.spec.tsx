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
      const onChange = cy.stub();
      const ControlledTextArea = ({}) => {
        const [value, setValue] = useState('');
        onChange.callsFake((e) => {
          setValue(e.target.value);
        });
        return <EuiTextArea value={value} onChange={onChange} isClearable />;
      };
      cy.realMount(<ControlledTextArea />);

      cy.get('textarea').type('hello world');
      cy.get('textarea')
        .should('have.value', 'hello world')
        .then(() => {
          expect(onChange).to.have.callCount(11);
        });

      cy.get('[data-test-subj="clearTextAreaButton"]').click();
      cy.get('textarea')
        .should('have.value', '')
        .then(() => {
          expect(onChange).to.have.callCount(12);
        });
    });

    it('manually fires an onInput event', () => {
      const onInput = cy.stub();
      cy.realMount(<EuiTextArea isClearable onInput={onInput} />);

      cy.get('textarea')
        .type('1')
        .then(() => {
          expect(onInput).to.have.callCount(1);
        });

      cy.get('[data-test-subj="clearTextAreaButton"]')
        .click()
        .then(() => {
          expect(onInput).to.have.callCount(2);
        });
    });
  });
});
