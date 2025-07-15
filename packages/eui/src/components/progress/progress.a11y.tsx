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
import { EuiProgress } from './progress';
import { EuiSpacer } from '../spacer';

const ProgressCommonProps = {
  color: 'success',
  max: 100,
};

const ProgressBars = () => {
  return (
    <>
      <div data-test-subj="cy-progress-1">
        <EuiProgress valueText size="xs" value={0} {...ProgressCommonProps} />
      </div>

      <div data-test-subj="cy-progress-2">
        <EuiProgress valueText size="s" value={33} {...ProgressCommonProps} />
      </div>

      <div data-test-subj="cy-progress-3">
        <EuiProgress valueText size="m" value={66} {...ProgressCommonProps} />
      </div>

      <div data-test-subj="cy-progress-4">
        <EuiProgress valueText size="l" value={100} {...ProgressCommonProps} />
      </div>

      <div data-test-subj="cy-progress-5">
        <EuiProgress
          valueText
          label="Basic percentage"
          size="l"
          value={100}
          {...ProgressCommonProps}
        />
      </div>

      <EuiSpacer size="m" />

      <div data-test-subj="cy-progress-infinite">
        <EuiProgress valueText size="l" color="success" />
      </div>
    </>
  );
};

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<ProgressBars />);
  cy.get('div[data-test-subj="cy-progress-1"]').should('exist');
});

describe('EuiProgress', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('displays correct progress values and labels', () => {
      cy.get(
        'div[data-test-subj="cy-progress-1"] div.euiProgress__valueText'
      ).contains('0');
      cy.get(
        'div[data-test-subj="cy-progress-2"] div.euiProgress__valueText'
      ).contains('33');
      cy.get(
        'div[data-test-subj="cy-progress-3"] div.euiProgress__valueText'
      ).contains('66');
      cy.get(
        'div[data-test-subj="cy-progress-4"] div.euiProgress__valueText'
      ).contains('100');
      cy.get(
        'div[data-test-subj="cy-progress-5"] div.euiProgress__label'
      ).contains('Basic percentage');
      cy.get(
        'div[data-test-subj="cy-progress-5"] div.euiProgress__valueText'
      ).contains('100');
      cy.get(
        'div[data-test-subj="cy-progress-infinite"] div.euiProgress__valueText'
      ).should('not.exist');
    });
  });
});
