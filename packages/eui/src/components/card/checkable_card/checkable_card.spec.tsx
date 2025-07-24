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

import { FunctionComponent, useState } from 'react';

import { EuiCheckableCard, type EuiCheckableCardProps } from '../index';

describe('EuiCheckableCard', () => {
  const StatefulCheckableCard: FunctionComponent<
    Partial<EuiCheckableCardProps>
  > = ({ checkableType = 'checkbox', ...rest }) => {
    const [isChecked, setChecked] = useState(false);

    return (
      <EuiCheckableCard
        id="checkableCard"
        label="Checkable card"
        data-test-subj="checkableCard"
        checkableType={checkableType}
        {...rest}
        checked={isChecked}
        onChange={() => setChecked((checked) => !checked)}
      />
    );
  };

  describe('Click behavior', () => {
    it('fires onChange only once when the checkbox is clicked', () => {
      cy.realMount(<StatefulCheckableCard />);

      cy.get('[data-test-subj=checkableCard]').realClick();

      cy.get('[data-test-subj=checkableCard]').should('be.checked');
    });

    it('fires onChange when clicking on non-interactive children', () => {
      cy.realMount(
        <StatefulCheckableCard>
          <div data-test-subj="non-interactive-content">
            Non-interactive text content
          </div>
        </StatefulCheckableCard>
      );

      cy.get('[data-test-subj=non-interactive-content]').realClick();

      cy.get('[data-test-subj=checkableCard]').should('be.checked');
    });

    it('does not fire onChange when clicking on interactive children', () => {
      cy.realMount(
        <StatefulCheckableCard>
          <button data-test-subj="interactive-button">
            Interactive button
          </button>
        </StatefulCheckableCard>
      );

      cy.get('[data-test-subj=interactive-button]').realClick();

      cy.get('[data-test-subj=checkableCard]').should('not.be.checked');
    });
  });
});
