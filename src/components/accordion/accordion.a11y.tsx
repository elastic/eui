/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiAccordion, EuiAccordionProps } from './index';
import { EuiPanel } from '../../components/panel';
import { htmlIdGenerator } from '../../services';

const baseProps: EuiAccordionProps = {
  buttonContent: 'Click me to toggle',
  id: htmlIdGenerator()(),
  initialIsOpen: false,
};

const noArrow = { arrowDisplay: 'none' };
const noArrowProps: EuiAccordionProps = Object.assign(baseProps, noArrow);

describe('EuiAccordion', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations when expanded', () => {
      cy.mount(
        <EuiAccordion {...noArrowProps}>
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
