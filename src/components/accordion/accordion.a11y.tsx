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
import { EuiAccordion, EuiAccordionProps } from './index';
import { EuiPanel } from '../../components/panel';
import { useGeneratedHtmlId } from '../../services';

const baseProps: Omit<EuiAccordionProps, 'id'> = {
  buttonContent: 'Click me to toggle',
  initialIsOpen: false,
};

const noArrow = { arrowDisplay: 'none' };
const noArrowProps: Omit<EuiAccordionProps, 'id'> = Object.assign(
  baseProps,
  noArrow
);

describe('EuiAccordion', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations when expanded', () => {
      cy.mount(
        <EuiAccordion id={useGeneratedHtmlId()} {...noArrowProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here. We will include <a href="#">a link</a> to confirm focus.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.get('button.euiAccordion__button').click();
      cy.checkAxe();
    });
  });
});
