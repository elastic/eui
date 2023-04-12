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

import React, { useState } from 'react';
import moment from 'moment';
import { EuiDatePicker } from './date_picker';
import { EuiFormRow } from '../form';

const DatePicker = () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = (date: moment.Moment) => {
    setStartDate(date);
  };

  return (
    <EuiFormRow label="Select a date">
      <EuiDatePicker selected={startDate} onChange={handleChange} />
    </EuiFormRow>
  );
};

beforeEach(() => {
  cy.realMount(<DatePicker />);
  cy.get('input.euiDatePicker').should('exist');
});

describe('EuiDatePicker', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the calendar widget is expanded', () => {
      cy.get('input.euiDatePicker').realClick();
      cy.get('div.react-datepicker').should('exist');
      cy.checkAxe();
    });

    it('has zero violations after picking a date with arrow keys', () => {
      cy.realPress('Tab');
      cy.get('div.react-datepicker').should('exist');
      cy.repeatRealPress('ArrowDown');
      cy.realPress('ArrowRight');
      cy.realPress('Enter');
      cy.get('div.react-datepicker').should('not.exist');
      cy.checkAxe();
    });

    it('has zero violations after picking a date with dropdown menus', () => {
      cy.realPress('Tab');
      cy.get('div.react-datepicker').should('exist');
      cy.repeatRealPress('Tab', 4);
      cy.get('div.react-datepicker__month-read-view').should('have.focus');
      cy.realPress('Space');
      cy.repeatRealPress('ArrowDown');
      cy.realPress('Enter');
      cy.realPress('Tab');
      cy.realPress('Space');
      cy.repeatRealPress('ArrowDown');
      cy.realPress('Enter');
      cy.checkAxe();
    });
  });
});
