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

import { EuiContextMenuItem } from './context_menu_item';
import { EuiContextMenuPanel } from './context_menu_panel';

const items = [
  <EuiContextMenuItem key="A" data-test-subj="itemA">
    Option A
  </EuiContextMenuItem>,
  <EuiContextMenuItem key="B" data-test-subj="itemB">
    Option B
  </EuiContextMenuItem>,
  <EuiContextMenuItem key="C" data-test-subj="itemC">
    Option C
  </EuiContextMenuItem>,
];

describe('EuiContextMenuPanel', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations', () => {
      const showNextPanelHandler = cy.stub();
      cy.mount(
        <EuiContextMenuPanel
          items={items}
          showNextPanel={showNextPanelHandler}
        />
      );
      cy.checkAxe();
    });
  });
});
