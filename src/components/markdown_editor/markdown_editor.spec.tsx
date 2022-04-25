/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiMarkdownEditor } from './index';

describe('EuiMarkdownEditor', () => {
  describe('toolbar interactions', () => {
    it('keeps focus on the input box when clicking a disabled item', () => {
      const value = `**bold**

_italic_

> quote

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

      // verify all of the toolbar buttons are not selected
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-pressed=true]'
      ).should('not.exist');

      // Focus the editor text area for key events
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorTextArea]'
      ).focus();

      // Enter the bold node & verify
      cy.realPress('ArrowRight');
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Bold][aria-pressed=true]'
      ).should('exist');

      // Enter the italic node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Italic][aria-pressed=true]'
      ).should('exist');

      // Enter the quote node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Quote][aria-pressed=true]'
      ).should('exist');

      // Enter the inline code node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Code][aria-pressed=true]'
      ).should('exist');

      // Enter the link node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Link][aria-pressed=true]'
      ).should('exist');

      // Enter the tooltip node & verify
      cy.repeatRealPress('ArrowDown', 2);
      cy.get(
        '[data-test-subj=test-editor] [data-test-subj=euiMarkdownEditorToolbar] button[aria-label=Tooltip][aria-pressed=true]'
      ).should('exist');
    });
  });
});
