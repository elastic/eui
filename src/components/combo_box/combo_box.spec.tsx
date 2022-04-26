/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiComboBox } from './index';

describe('EuiComboBox', () => {
  describe('Focus management', () => {
    it('keeps focus on the input box when clicking a disabled item', () => {
      cy.realMount(
        <EuiComboBox
          data-test-subj="combobox"
          options={[
            { label: 'Item 1' },
            { label: 'Item 2', disabled: true },
            { label: 'Item 3' },
          ]}
        />
      );

      cy.get(
        '[data-test-subj=combobox] [data-test-subj=comboBoxSearchInput]'
      ).realClick();

      cy.get('span').contains('Item 2').realClick();

      cy.focused().should('have.attr', 'data-test-subj', 'comboBoxSearchInput');
    });
  });
});
