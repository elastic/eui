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
import { EuiBadge } from '../badge';
import { EuiButton } from '../button';
import { EuiCheckboxGroup, EuiFieldText } from '../form';
import { EuiFocusTrap } from './focus_trap';
import { EuiSpacer } from '../spacer';
import { EuiPanel } from '../panel';
import { EuiText } from '../text';
import { useGeneratedHtmlId } from '../../services';

const CheckboxGroup = () => {
  const checkboxGroupItemId__1 = useGeneratedHtmlId({
    prefix: 'checkboxGroupItem',
    suffix: 'first',
  });
  const checkboxGroupItemId__2 = useGeneratedHtmlId({
    prefix: 'checkboxGroupItem',
    suffix: 'second',
  });

  const checkboxes = [
    {
      id: checkboxGroupItemId__1,
      label: 'Option one is checked by default',
    },
    {
      id: checkboxGroupItemId__2,
      label: 'Option two',
    },
  ];
  const [checkboxIdToSelectedMap] = useState({
    [checkboxGroupItemId__1]: true,
  });

  return (
    <EuiCheckboxGroup
      options={checkboxes}
      idToSelectedMap={checkboxIdToSelectedMap}
      onChange={() => {}}
    />
  );
};

const FocusTrap = () => {
  const [isDisabled, changeDisabled] = useState(true);
  const toggleDisabled = () => changeDisabled(!isDisabled);

  return (
    <div data-test-subj="cy-trap-container">
      <EuiBadge data-test-subj="cy-trap-message">
        Trap is {isDisabled ? 'disabled' : 'enabled'}
      </EuiBadge>
      <EuiSpacer size="s" />
      <EuiFocusTrap disabled={isDisabled}>
        <EuiPanel>
          <EuiFieldText
            data-test-subj="cy-input-one"
            placeholder="Placeholder text first input"
            value=""
            onChange={() => {}}
            aria-label="First focusable input"
          />
          <EuiSpacer size="m" />
          <CheckboxGroup />
          <EuiSpacer size="m" />
          <EuiButton
            onClick={toggleDisabled}
            data-test-subj="cy-focus-trap-button"
          >
            {`${!isDisabled ? 'Disable' : 'Enable'} Focus Trap`}
          </EuiButton>
        </EuiPanel>
      </EuiFocusTrap>
      <EuiSpacer size="l" />
      <EuiText>
        The button below is not focusable by keyboard as long as the focus trap
        is enabled.
      </EuiText>
      <EuiButton onClick={() => {}} data-test-subj="cy-external-button">
        External Focusable Element
      </EuiButton>
    </div>
  );
};

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<FocusTrap />);
});

describe('EuiFocusTrap', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the focus trap is enabled', () => {
      cy.get('button[data-test-subj="cy-focus-trap-button"]').realClick();
      cy.get('span[ data-test-subj="cy-trap-message"]').should(
        'have.text',
        'Trap is enabled'
      );
      cy.checkAxe();
    });
  });

  describe('Accessibility checks for keyboard navigation', () => {
    it('allows the button outside the FocusTrap to receive focus', () => {
      cy.repeatRealPress('Tab', 5);
      cy.get('button[data-test-subj="cy-external-button"]').should(
        'have.focus'
      );
      cy.checkAxe();
    });

    it('prevents the button outside the FocusTrap from receiving focus', () => {
      cy.repeatRealPress('Tab', 4);
      cy.realPress('Enter');
      cy.realPress('Tab');
      cy.get('input[data-test-subj="cy-input-one"]').should('have.focus');
      cy.checkAxe();
    });
  });
});
