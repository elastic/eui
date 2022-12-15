/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiDelayRender } from './delay_render';
import { EuiCheckbox, EuiFieldNumber, EuiFormRow } from '../form';
import { EuiFlexItem } from '../flex';
import { EuiLoadingSpinner } from '../loading';

const DelayRender = () => {
  const [minimumDelay, setDelay] = useState(1000);
  const [render, setRender] = useState(false);

  const onChangeMinimumDelay = (event) => {
    setDelay(parseInt(event.target.value, 10));
  };

  const onChangeHide = (event) => {
    setRender(event.target.checked);
  };

  const status = render ? 'showing' : 'hidden';
  const label = `Child (${status})`;
  return (
    <>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiCheckbox
            id="dummy-id"
            checked={render}
            onChange={onChangeHide}
            label="Show child"
          />
        </EuiFormRow>
        <EuiFormRow label="Minimum delay">
          <EuiFieldNumber
            value={minimumDelay}
            onChange={onChangeMinimumDelay}
          />
        </EuiFormRow>

        <EuiFormRow label={label}>
          {render ? (
            <EuiDelayRender delay={minimumDelay}>
              <EuiLoadingSpinner size="m" />
            </EuiDelayRender>
          ) : (
            <></>
          )}
        </EuiFormRow>
      </EuiFlexItem>
    </>
  );
};

beforeEach(() => {
  cy.realMount(<DelayRender />);
});

describe('EuiDelayRender', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the show child input is checked', () => {
      cy.get('input.euiCheckbox__input').realClick();
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]', { timeout: 5000 })
        .should('exist');
      cy.checkAxe();
    });

    it('has zero violations when the show child input is pressed', () => {
      cy.realPress('Tab');
      cy.get('input.euiCheckbox__input').should('have.focus');
      cy.realPress('Space');
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]', { timeout: 5000 })
        .should('exist');
      cy.checkAxe();
    });

    it('has zero violations when the show child input is toggled', () => {
      cy.realPress('Tab');
      cy.get('input.euiCheckbox__input').should('have.focus');
      cy.realPress('Space');
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]', { timeout: 5000 });
      cy.realPress('Space');
      cy.get('div.euiFormRow__fieldWrapper')
        .last()
        .find('span[role="progressbar"]', { timeout: 5000 })
        .should('not.exist');
      cy.checkAxe();
    });
  });
});
