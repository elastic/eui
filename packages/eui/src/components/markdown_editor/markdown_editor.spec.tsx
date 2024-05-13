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
import { EuiMarkdownEditor } from './index';

describe('EuiMarkdownEditor', () => {
  describe('toolbar interactions', () => {
    it('keeps focus on the input box when clicking a disabled item', () => {
      const value = `**bold**

_italic_

\`inline codeblock\`

[link](https://elastic.co)

!{tooltip[text](help)}`;

      cy.realMount(
        <EuiMarkdownEditor
          data-test-subj="test-editor"
          aria-label="editor for cypress test"
          value={value}
          onChange={() => {}}
        />
      );

      // Focus the editor text area for key events
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorTextArea]'
      ).focus();

      // Enter the bold node & verify
      cy.realPress('ArrowRight');
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Bold][data-test-subj="euiMarkdownEditorToolbarButton pressed"]'
      ).should('exist');

      // Enter the italic node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Italic][data-test-subj="euiMarkdownEditorToolbarButton pressed"]'
      ).should('exist');

      // Enter the inline code node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Code][data-test-subj="euiMarkdownEditorToolbarButton pressed"]'
      ).should('exist');

      // Enter the link node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Link][data-test-subj="euiMarkdownEditorToolbarButton pressed"]'
      ).should('exist');

      // Enter the tooltip node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Tooltip][data-test-subj="euiMarkdownEditorToolbarButton pressed"]'
      ).should('exist');
    });
  });
});
