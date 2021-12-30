/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Fragment } from 'react';
import { EuiAccordion, EuiAccordionProps } from './index';
import { EuiPanel } from '../../components/panel';

const baseProps: EuiAccordionProps = {
  arrowDisplay: 'none',
  buttonContent: 'Click me to toggle',
  id: 'data-cypress-accordion-id',
  initialIsOpen: false,
};

describe('EuiAccordion', () => {
  it('renders with default props', () => {
    cy.mount(
      <Fragment>
        <div
          id="data-cypress-target"
          style={{ height: '1px', width: '100%' }}
        />
        <EuiAccordion {...baseProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </EuiPanel>
        </EuiAccordion>
      </Fragment>
    );
    cy.get('#data-cypress-target').realClick({ position: 'topLeft' });
    cy.realPress('Tab');
    cy.focused().contains('Click me to toggle').realPress('Enter');
    cy.focused().contains(
      'Any content inside of EuiAccordion will appear here.'
    );
  });
});
