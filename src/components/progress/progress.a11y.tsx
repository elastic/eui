/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiProgress } from './progress';

const ProgressCommonProps = {
  color: 'success',
  max: 100,
  value: 50,
};

const ProgressBars = () => {
  return (
    <>
      <EuiProgress
        valueText
        size="xs"
        data-test-subj="cy-progress-1"
        {...ProgressCommonProps}
      />

      <EuiProgress
        valueText
        size="s"
        data-test-subj="cy-progress-2"
        {...ProgressCommonProps}
      />

      <EuiProgress
        valueText
        size="m"
        data-test-subj="cy-progress-3"
        {...ProgressCommonProps}
      />

      <EuiProgress
        valueText
        size="l"
        data-test-subj="cy-progress-4"
        {...ProgressCommonProps}
      />
    </>
  );
};

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<ProgressBars />);
  cy.get('progress[data-test-subj="cy-progress-1"]').should('exist');
});

describe('EuiProgress', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });
  });
});
