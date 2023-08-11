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

import { EuiFieldText } from '../../components';
import { EuiInputPopover } from './input_popover';

describe('EuiPopover', () => {
  const props = {
    input: <EuiFieldText />,
    closePopover: () => {},
    isOpen: true,
  };

  it('renders a popover with equal width to the input', () => {
    cy.mount(<EuiInputPopover {...props}>Popover content</EuiInputPopover>);
    cy.get('[data-popover-panel]')
      .should('have.css', 'left', '0px')
      .invoke('outerWidth')
      .should('equal', 400);
  });

  it('respects `panelMinWidth`', () => {
    cy.mount(
      <EuiInputPopover {...props} panelMinWidth={450}>
        Popover content
      </EuiInputPopover>
    );
    cy.get('[data-popover-panel]').invoke('outerWidth').should('equal', 450);
  });

  it('respects `anchorPosition`', () => {
    cy.mount(
      <div className="eui-textRight">
        <EuiInputPopover
          {...props}
          display="inline-block"
          input={<EuiFieldText controlOnly={true} style={{ width: 150 }} />}
          panelMinWidth={300}
          anchorPosition="downRight"
        >
          Popover content
        </EuiInputPopover>
      </div>
    );
    cy.get('[data-popover-panel]').should('have.css', 'left', '200px');
  });
});
