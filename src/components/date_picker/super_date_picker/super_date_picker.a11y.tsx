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
import { EuiSuperDatePicker, OnTimeChangeProps } from './super_date_picker';

const SuperDatePicker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateButton] = useState(true);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [showFill] = useState(true);

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    setStart(start);
    setEnd(end);
    setIsLoading(true);
    startLoading();
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const datepickerProps = {
    isLoading: isLoading,
    start: start,
    end: end,
    onTimeChange: onTimeChange,
    showUpdateButton: showUpdateButton,
  };

  return (
    <EuiSuperDatePicker
      {...datepickerProps}
      updateButtonProps={{ fill: showFill }}
    />
  );
};

beforeEach(() => {
  cy.mount(<SuperDatePicker />);
  cy.get('div.euiSuperDatePicker__flexWrapper').should('exist');
});

describe('EuiSuperDatePicker', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on render', () => {
      cy.checkAxe();
    });

    it('has zero violations when quick select menu is open', () => {
      cy.get('button.euiFormControlLayout__prepend').click();
      cy.get('div.euiPanel').contains('Quick select').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when start / end date menus are open', () => {
      cy.get('button.euiSuperDatePicker__prettyFormat').click();
      cy.get('div.euiDatePopoverContent').should('exist');
      cy.checkAxe();

      cy.get('button.euiDatePopoverButton--start').click();
      cy.get('button.euiDatePopoverButton--end').click();
      cy.get('div.euiDatePopoverContent').should('exist');
      cy.checkAxe();

      cy.get('button.euiDatePopoverButton--end').click();
      cy.get('div.euiDatePopoverContent').should('not.exist');
      cy.checkAxe();
    });
  });
});
