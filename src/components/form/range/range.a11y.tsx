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
import { EuiDualRange } from './dual_range';
import { EuiRange } from './range';
import { EuiDualRangeProps, EuiRangeProps } from './types';

describe('Single EuiRange', () => {
  const SingleRange = () => {
    const [value, setValue] = useState('100');

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
      cy.get('output.euiRangeTooltip__value').contains('100 - 110');
      cy.checkAxe();
    });

    it('has zero violations when the range slider is decreased', () => {
      cy.realPress('Tab');
      cy.get('input#cy-range-single').should('have.focus');
      cy.repeatRealPress('ArrowLeft', 10);
      cy.get('output.euiRangeTooltip__value').contains('100 - 100');
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

describe('Highlight Area EuiRange', () => {
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
    it('has zero violations when the highlight area is adjusted using arrow keys', () => {
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

  describe('Drag and drop accessibility check', () => {
    it('has zero violations when the higlight area is dragged using a mouse', () => {
      cy.get('.euiRangeDraggable__inner')
        .realMouseDown({ position: 'center' })
        .realMouseMove(100, 0, {})
        .realMouseUp();
      cy.checkAxe();
    });
  });

  describe('EuiRange in a dropdown', () => {
    const InputWithRange = () => {
      const [value, setValue] = useState<EuiRangeProps['value']>('20');

      return (
        <EuiRange
          id="cy-range-in-dropdown"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          showInput="inputWithPopover"
          showLabels
          aria-label="An example of EuiRange with showInput prop"
        />
      );
    };
    beforeEach(() => {
      cy.viewport(1024, 768); // medium breakpoint
      cy.realMount(<InputWithRange />);
      cy.get('input#cy-range-in-dropdown').should('exist');
    });

    describe('Automated accessibility check', () => {
      it('has zero violations on first render', () => {
        cy.checkAxe();
      });
    });

    describe('Keyboard accessibility check', () => {
      it('updates the range value using arrow keys with input[type="number"]', () => {
        cy.realPress('Tab');
        cy.get('input#cy-range-in-dropdown').should('have.focus');
        cy.repeatRealPress('ArrowUp', 10);
        cy.get('input[type="range"]')
          .first()
          .invoke('attr', 'value')
          .should('eq', '30');
        cy.checkAxe();
      });
    });
  });
});
