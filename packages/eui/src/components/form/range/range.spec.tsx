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

import React from 'react';

import { EuiRange } from './range';
import { EuiDualRange } from './dual_range';

const sharedProps = {
  min: 0,
  max: 100,
  onChange: () => {},
  showTicks: true,
  showLabels: true,
  levels: [
    {
      min: 0,
      max: 20,
      color: 'danger',
    },
    {
      min: 20,
      max: 100,
      color: 'success',
    },
  ],
};
const firstExpectedLevel = /^0px 255[.0-9]+px$/;
const secondExpectedLevel = /^71[.0-9]+px 0px$/;

describe('EuiRange', () => {
  const props = {
    ...sharedProps,
    value: 50,
    showValue: true,
    showRange: true,
    tickInterval: 20,
  };

  // TODO: These should likely be visual snapshot regression tests instead
  const assertRangePositions = () => {
    // Ticks
    cy.get('.euiRangeTick')
      .first()
      .should('have.css', 'inset-inline-start', '8px');
    cy.get('.euiRangeTick')
      .eq(3)
      .should('have.css', 'inset-inline-start')
      .and('match', /^195[.0-9]+px$/);
    cy.get('.euiRangeTick')
      .last()
      .should('have.css', 'inset-inline-start')
      .and('match', /^319[.0-9]+px$/);

    // Levels - present in both EuiRangeLevels and EuiHighlight
    cy.get('.euiRangeLevel')
      .eq(0)
      .should('have.css', 'inset-inline')
      .and('match', firstExpectedLevel);
    cy.get('.euiRangeLevel')
      .eq(2)
      .should('have.css', 'inset-inline')
      .and('match', firstExpectedLevel);

    cy.get('.euiRangeLevel')
      .eq(1)
      .should('have.css', 'inset-inline')
      .and('match', secondExpectedLevel);
    cy.get('.euiRangeLevel')
      .eq(3)
      .should('have.css', 'inset-inline')
      .and('match', secondExpectedLevel);

    // Highlight
    cy.get('.euiRangeHighlight > div')
      .should('have.css', 'margin-inline-start', '0px')
      .should('have.css', 'inline-size')
      .and('match', /^163[.0-9]+px$/);

    // Tooltip
    cy.get('.euiRangeTooltip > output')
      .should('have.css', 'inset-inline-start')
      .and('match', /^155[.0-9]+px$/);
  };

  it('renders ticks, levels, highlights, and tooltips in their correct positions', () => {
    cy.mount(<EuiRange {...props} />);
    assertRangePositions();
  });

  it('inputWithPopover', () => {
    cy.realMount(
      <EuiRange
        {...props}
        showInput="inputWithPopover"
        inputPopoverProps={{ panelPaddingSize: 'none' }} // Makes the asserted/computed widths equivalent
      />
    );
    cy.realPress('Tab');
    assertRangePositions();
  });
});

describe('EuiDualRange', () => {
  const props = {
    ...sharedProps,
    value: [10, 80] as [number, number],
    ticks: [
      { label: '20kb', value: 20 },
      { label: '100kb', value: 100 },
    ],
  };

  // TODO: These should likely be visual snapshot regression tests instead
  const assertRangePositions = () => {
    // Ticks
    cy.get('.euiRangeTick')
      .first()
      .should('have.css', 'inset-inline-start')
      .and('match', /^69[.0-9]+px$/);
    cy.get('.euiRangeTick')
      .last()
      .should('have.css', 'inset-inline-end', '0px');

    // Levels - present in both EuiRangeLevels and EuiHighlight
    cy.get('.euiRangeLevel')
      .eq(0)
      .should('have.css', 'inset-inline')
      .and('match', firstExpectedLevel);
    cy.get('.euiRangeLevel')
      .eq(2)
      .should('have.css', 'inset-inline')
      .and('match', firstExpectedLevel);

    cy.get('.euiRangeLevel')
      .eq(1)
      .should('have.css', 'inset-inline')
      .and('match', secondExpectedLevel);
    cy.get('.euiRangeLevel')
      .eq(3)
      .should('have.css', 'inset-inline')
      .and('match', secondExpectedLevel);

    // Highlight
    cy.get('.euiRangeHighlight > div')
      .should('have.css', 'margin-inline-start')
      .and('match', /^32[.0-9]+px$/);
    cy.get('.euiRangeHighlight > div')
      .should('have.css', 'inline-size')
      .and('match', /^229[.0-9]+px$/);

    // Thumbs
    cy.get('.euiRangeThumb')
      .first()
      .should('have.css', 'inset-inline-start')
      .and('match', /^31[.0-9]+px$/);
    cy.get('.euiRangeThumb')
      .last()
      .should('have.css', 'inset-inline-start')
      .and('match', /^249[.0-9]+px$/);
  };

  it('renders ticks, levels, highlights, and thumbs in their correct positions', () => {
    cy.mount(<EuiDualRange {...props} />);
    assertRangePositions();
  });

  it('inputWithPopover', () => {
    cy.realMount(
      <EuiDualRange
        {...props}
        showInput="inputWithPopover"
        inputPopoverProps={{ panelPaddingSize: 'none' }} // Makes the asserted/computed widths equivalent
      />
    );
    cy.realPress('Tab');
    assertRangePositions();
  });
});
