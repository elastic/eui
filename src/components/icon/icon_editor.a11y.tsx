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
import { EuiIcon } from './icon';

describe('EuiIcons', () => {
  describe('Automated accessibility check for editor icons', () => {
    const EditorIcons = [
      'editorAlignCenter',
      'editorAlignLeft',
      'editorAlignRight',
      'editorBold',
      'editorChecklist',
      'editorCodeBlock',
      'editorComment',
      'editorDistributeHorizontal',
      'editorDistributeVertical',
      'editorHeading',
      'editorItalic',
      'editorItemAlignBottom',
      'editorItemAlignCenter',
      'editorItemAlignLeft',
      'editorItemAlignMiddle',
      'editorItemAlignRight',
      'editorItemAlignTop',
      'editorLink',
      'editorOrderedList',
      'editorPositionBottomLeft',
      'editorPositionBottomRight',
      'editorPositionTopLeft',
      'editorPositionTopRight',
      'editorRedo',
      'editorStrike',
      'editorTable',
      'editorUnderline',
      'editorUndo',
      'editorUnorderedList',
    ];

    const EditorGrid = () => (
      <div>
        {EditorIcons.map((glyph) => (
          <EuiIcon className="eui-alignMiddle" type={glyph} />
        ))}
      </div>
    );

    it('has zero violations on first render', () => {
      cy.mount(<EditorGrid />);
      cy.get('div[data-cy-root]')
        .find('svg', { timeout: 5000 })
        .should('have.length', 29);
      cy.checkAxe();
    });
  });
});
