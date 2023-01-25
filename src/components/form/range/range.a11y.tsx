/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiDualRange } from './dual_range';
import { EuiRange } from './range';
import { EuiDualRangeProps, EuiRangeProps } from './types';

describe('Single EuiRange', () => {
  const SingleRange = () => {
    const [value, setValue] = useState('120');

    const onChange: EuiRangeProps['onChange'] = (e) => {
      setValue(e.currentTarget.value);
    };

    return (
      <EuiRange
        id="cy-range-single"
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showRange
        showValue
        valuePrepend="100 - "
        aria-label="An example of EuiRange with valuePrepend prop"
      />
    );
  };

  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<SingleRange />);
    cy.get('div.euiRangeWrapper').should('exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility check', () => {
    it('has zero violations when the range slider is increased', () => {
      cy.realPress('Tab');
      cy.get('input#cy-range-single').should('have.focus');
      cy.repeatRealPress('ArrowRight', 10);
      cy.get('output.euiRangeTooltip__value').contains('100 - 130');
      cy.checkAxe();
    });

    it('has zero violations when the range slider is decreased', () => {
      cy.realPress('Tab');
      cy.get('input#cy-range-single').should('have.focus');
      cy.repeatRealPress('ArrowLeft', 10);
      cy.get('output.euiRangeTooltip__value').contains('100 - 110');
      cy.checkAxe();
    });
  });
});

describe('Dual EuiRange', () => {
  const DualRange = () => {
    const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
      '100',
      '150',
    ]);

    const onDualChange = (value: EuiDualRangeProps['value']) => {
      setDualValue(value);
    };

    return (
      <EuiDualRange
        id="cy-range-dual"
        min={0}
        max={300}
        step={10}
        value={dualValue}
        onChange={onDualChange}
        showLabels
        aria-label="An example of EuiDualRange"
      />
    );
  };

  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<DualRange />);
    cy.get('div.euiRangeWrapper').should('exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility check', () => {
    it('has zero violations when the range sliders are adjusted', () => {
      cy.realPress('Tab');
      cy.get('div[role="slider"]').first().should('have.focus');
      cy.repeatRealPress('ArrowLeft', 3);
      cy.get('div[role="slider"]')
        .first()
        .invoke('attr', 'aria-valuenow')
        .should('eq', '70');
      cy.realPress('Tab');
      cy.get('div[role="slider"]').last().should('have.focus');
      cy.repeatRealPress('ArrowRight', 3);
      cy.get('div[role="slider"]')
        .last()
        .invoke('attr', 'aria-valuenow')
        .should('eq', '180');
      cy.checkAxe();
    });
  });
});

describe('Draggable Area EuiRange', () => {
  const DraggableRange = () => {
    const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
      '40',
      '60',
    ]);

    return (
      <EuiDualRange
        id="cy-range-draggable"
        min={0}
        max={100}
        step={1}
        value={dualValue}
        onChange={setDualValue}
        showLabels
        aria-label="An example of EuiDualRange with isDraggable='true'"
        isDraggable
      />
    );
  };

  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<DraggableRange />);
    cy.get('div.euiRangeWrapper').should('exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility check', () => {
    it('has zero violations when the range slider is dragged', () => {
      cy.realPress('Tab');
      cy.get('div[role="slider"]').first().should('have.focus');
      cy.repeatRealPress('ArrowLeft', 3);
      cy.get('div[role="slider"]')
        .first()
        .invoke('attr', 'aria-valuetext')
        .should('eq', '37, 57');
      cy.checkAxe();
    });
  });
});
