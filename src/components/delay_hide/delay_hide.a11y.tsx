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
import { EuiDelayHide } from './delay_hide';
import { EuiCheckbox, EuiFieldNumber, EuiFormRow } from '../form';
import { EuiFlexItem } from '../flex';
import { EuiLoadingSpinner } from '../loading';

const DelayHide = () => {
  const [minimumDuration, setDuration] = useState(1000);
  const [hide, setHide] = useState(false);

  return (
    <>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiCheckbox
            id="dummy-id"
            checked={hide}
            onChange={(event) => setHide(event.target.checked)}
            label="Hide child"
          />
        </EuiFormRow>
        <EuiFormRow label="Minimum duration">
          <EuiFieldNumber
            value={minimumDuration}
            onChange={(event) => setDuration(parseInt(event.target.value, 10))}
          />
        </EuiFormRow>

        <EuiFormRow label="Child to render">
          <EuiDelayHide
            hide={hide}
            minimumDuration={minimumDuration}
            render={() => <EuiLoadingSpinner size="m" />}
          />
        </EuiFormRow>
      </EuiFlexItem>
    </>
  );
};

beforeEach(() => {
  cy.realMount(<DelayHide />);
});

describe('EuiHideRender', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the hide child input is checked', () => {
      cy.get('input.euiCheckbox__input').realClick();
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]', { timeout: 5000 })
        .should('not.exist');
      cy.checkAxe();
    });

    it('has zero violations when the hide child input is pressed', () => {
      cy.realPress('Tab');
      cy.get('input.euiCheckbox__input').should('have.focus');
      cy.realPress('Space');
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]', { timeout: 5000 })
        .should('not.exist');
      cy.checkAxe();
    });

    it('has zero violations when the hide child input is toggled', () => {
      cy.realPress('Tab');
      cy.get('input.euiCheckbox__input').should('have.focus');
      cy.realPress('Space');
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]')
        .should('not.exist');
      cy.realPress('Space');
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]', { timeout: 5000 })
        .should('exist');
      cy.checkAxe();
    });
  });
});
