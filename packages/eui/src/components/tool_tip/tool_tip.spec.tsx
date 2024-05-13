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

import { EuiButton } from '../../components';
import { EuiToolTip } from './tool_tip';

describe('EuiToolTip', () => {
  it('shows the tooltip on hover', () => {
    cy.mount(
      <EuiToolTip content="Tooltip text here" data-test-subj="tooltip">
        <EuiButton data-test-subj="toggleToolTip">Show tooltip</EuiButton>
      </EuiToolTip>
    );
    cy.get('[data-test-subj="tooltip"]').should('not.exist');
    cy.get('[data-test-subj="toggleToolTip"]').trigger('mouseover');
    cy.get('[data-test-subj="tooltip"]').should('exist');
  });

  it('shows the tooltip on keyboard focus', () => {
    cy.mount(
      <EuiToolTip content="Tooltip text here" data-test-subj="tooltip">
        <EuiButton data-test-subj="toggleToolTip">Show tooltip</EuiButton>
      </EuiToolTip>
    );
    cy.get('[data-test-subj="tooltip"]').should('not.exist');
    cy.get('[data-test-subj="toggleToolTip"]').focus();
    cy.get('[data-test-subj="tooltip"]').should('exist');
  });

  it('does not show multiple tooltips if one tooltip toggle is focused and another tooltip toggle is hovered', () => {
    cy.mount(
      <>
        <EuiToolTip content="Tooltip A" data-test-subj="tooltipA">
          <EuiButton data-test-subj="toggleToolTipA">Show tooltip A</EuiButton>
        </EuiToolTip>
        <EuiToolTip content="Tooltip B" data-test-subj="tooltipB">
          <EuiButton data-test-subj="toggleToolTipB">Show tooltip B</EuiButton>
        </EuiToolTip>
      </>
    );
    cy.get('[data-test-subj="tooltip"]').should('not.exist');

    cy.get('[data-test-subj="toggleToolTipA"]').focus();
    cy.contains('Tooltip A').should('exist');
    cy.contains('Tooltip B').should('not.exist');

    cy.get('[data-test-subj="toggleToolTipB"]').trigger('mouseover');
    cy.contains('Tooltip B').should('exist');
    cy.contains('Tooltip A').should('not.exist');
  });
});
