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

import React, { useState } from 'react';
import { EuiKeyPadMenu } from './key_pad_menu';
import { EuiKeyPadMenuItem } from './key_pad_menu_item';
import { EuiIcon } from '../icon';
import { useGeneratedHtmlId } from '../../services';

const KeyPadMenu = () => {
  const keypadButtonId__1 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'first',
  });
  const keypadButtonId__2 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'second',
  });
  const keypadButtonId__3 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'third',
  });
  const keypadButtonId__4 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'fourth',
  });
  const keypadButtonId__5 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'fifth',
  });
  const keypadButtonId__6 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'sixth',
  });

  const [selectedID, setSelectedID] = useState(keypadButtonId__6);

  return (
    <div aria-label="Menu keypad">
      <EuiKeyPadMenu>
        <EuiKeyPadMenuItem
          data-test-subj="cy-keypad-button-1"
          id={keypadButtonId__1}
          label="Button 1"
          isSelected={selectedID === keypadButtonId__1}
          onClick={() => setSelectedID(keypadButtonId__1)}
        >
          <EuiIcon type="grid" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          data-test-subj="cy-keypad-button-2"
          id={keypadButtonId__2}
          label="Button 2"
          isSelected={selectedID === keypadButtonId__2}
          onClick={() => setSelectedID(keypadButtonId__2)}
        >
          <EuiIcon type="grid" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          data-test-subj="cy-keypad-button-3"
          id={keypadButtonId__3}
          label="Button 3"
          isSelected={selectedID === keypadButtonId__3}
          onClick={() => setSelectedID(keypadButtonId__3)}
        >
          <EuiIcon type="grid" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          data-test-subj="cy-keypad-link-1"
          id={keypadButtonId__4}
          label="Link 1"
          href="#/navigation/key-pad-menu"
          isSelected={selectedID === keypadButtonId__4}
          onClick={() => setSelectedID(keypadButtonId__4)}
        >
          <EuiIcon type="link" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          data-test-subj="cy-keypad-link-2"
          id={keypadButtonId__5}
          label="Link 2"
          href="#/navigation/key-pad-menu"
          isSelected={selectedID === keypadButtonId__5}
          onClick={() => setSelectedID(keypadButtonId__5)}
        >
          <EuiIcon type="link" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          data-test-subj="cy-keypad-link-3"
          id={keypadButtonId__6}
          label="Disabled Link 3"
          isDisabled
          isSelected={selectedID === keypadButtonId__6}
        >
          <EuiIcon type="link" size="l" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
    </div>
  );
};

beforeEach(() => {
  cy.realMount(<KeyPadMenu />);
  cy.get('div[aria-label="Menu keypad"]').should('exist');
});

describe('EuiKeyPadMenu', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations on item click', () => {
      cy.get('a[data-test-subj="cy-keypad-link-2"]').realClick();
      cy.get('a[data-test-subj="cy-keypad-link-2"]').should(
        'have.class',
        'euiKeyPadMenuItem-isSelected'
      );
      cy.checkAxe();
    });

    it('has zero violations on item keypress', () => {
      cy.repeatRealPress('Tab', 3);
      cy.get('button[data-test-subj="cy-keypad-button-3"]').should(
        'have.focus'
      );
      cy.realPress('Space');
      cy.get('button[data-test-subj="cy-keypad-button-3"]').should(
        'have.class',
        'euiKeyPadMenuItem-isSelected'
      );
      cy.checkAxe();
      cy.realPress(['Shift', 'Tab']);
      cy.get('button[data-test-subj="cy-keypad-button-2"]').should(
        'have.focus'
      );
      cy.realPress('Space');
      cy.get('button[data-test-subj="cy-keypad-button-2"]').should(
        'have.class',
        'euiKeyPadMenuItem-isSelected'
      );
      cy.get('button[data-test-subj="cy-keypad-button-3"]').should(
        'not.have.class',
        'euiKeyPadMenuItem-isSelected'
      );
      cy.checkAxe();
    });
  });
});
