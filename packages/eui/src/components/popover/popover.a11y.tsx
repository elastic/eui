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
import { EuiPopover, EuiPopoverProps } from './popover';
import { EuiButtonEmpty } from '../button';
import { EuiText } from '../text';

const Popover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconType="documentation"
      iconSide="right"
      onClick={onButtonClick}
    >
      How it works
    </EuiButtonEmpty>
  );

  const popoverProps: EuiPopoverProps = {
    button: button,
    isOpen: isPopoverOpen,
    closePopover: closePopover,
  };

  return (
    <EuiPopover {...popoverProps}>
      <EuiText style={{ width: 300 }}>
        <p>Popover content that&rsquo;s wider than the default width</p>
      </EuiText>
    </EuiPopover>
  );
};

beforeEach(() => {
  cy.mount(<Popover />);
  cy.get('div.euiPopover__panel').should('not.exist');
});

describe('EuiPopover', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on render', () => {
      cy.checkAxe();
    });

    it('has zero violations when popover is opened', () => {
      cy.get('button.euiButtonEmpty').click();
      cy.get('div.euiPopover__panel').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when popover is closed', () => {
      cy.get('button.euiButtonEmpty').click();
      cy.get('div.euiPopover__panel').should('exist');
      cy.get('button.euiButtonEmpty').click();
      cy.get('div.euiPopover__panel').should('not.exist');
      cy.checkAxe();
    });
  });
});
