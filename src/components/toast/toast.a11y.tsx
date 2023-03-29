/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiButton } from '../button';
import { EuiToast } from './toast';

describe('EuiToast', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
  });

  describe('Keyboard and screen reader accessibility', () => {
    it('renders with default props', () => {
      cy.mount(
        <div style={{ maxWidth: '60ch', marginInline: 'auto' }}>
          <EuiToast title="Generic toast">
            <p>This is a generic toast message. It is read-only.</p>
          </EuiToast>
        </div>
      );
      cy.checkAxe();
    });

    it('renders with default props', () => {
      cy.mount(
        <div style={{ maxWidth: '60ch', marginInline: 'auto' }}>
          <EuiToast title="Actionable toast">
            <>
              <p>This is a security measure.</p>
              <p>
                Please click the button below or move your mouse to show that
                you&rsquo;re still using Kibana.
              </p>
              <EuiButton autoFocus>Extend my session</EuiButton>
            </>
          </EuiToast>
        </div>
      );
      cy.focused().contains('Extend my session');
      cy.checkAxe();
    });
  });
});
