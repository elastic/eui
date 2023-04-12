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

import { EuiTourStep } from './tour_step';

const steps = [
  {
    step: 1,
    content: 'You are here',
  },
];

const config = {
  onFinish: () => {},
  stepsTotal: 1,
  title: 'A demo',
};

describe('EuiTourStep', () => {
  describe('with an `anchor` configuration', () => {
    it('attaches to the anchor element', () => {
      cy.realMount(
        <>
          <span id="anchor">Test</span>
          <EuiTourStep
            data-test-subj="step"
            {...config}
            {...steps[0]}
            isStepOpen
            anchor="#anchor"
          />
        </>
      );

      expect(cy.get('[data-test-subj="step"]').find('#anchor')).to.exist;
    });
  });
});
