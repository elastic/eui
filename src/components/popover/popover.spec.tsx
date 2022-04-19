/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';

import { EuiButton } from '../button';
import { EuiPopover } from './popover';

const PopoverComponent = ({ children, ...rest }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const closePopover = () => setIsPopoverOpen(false);
  const togglePopover = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);

  const button = (
    <EuiButton onClick={togglePopover} data-test-subj="togglePopover">
      Show popover
    </EuiButton>
  );

  return (
    <EuiPopover
      panelProps={{ 'data-test-subj': 'popoverPanel' }}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      {...rest}
    >
      {children}
    </EuiPopover>
  );
};

describe('EuiPopover', () => {
  describe('focus behavior', () => {
    it('focuses the panel wrapper by default', () => {
      cy.mount(<PopoverComponent>Test</PopoverComponent>);
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.focused().should('have.attr', 'data-test-subj', 'popoverPanel');
    });

    it('does not focus anything if `ownFocus` is false', () => {
      cy.mount(<PopoverComponent ownFocus={false}>Test</PopoverComponent>);
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.focused().should('have.attr', 'data-test-subj', 'togglePopover');
    });

    describe('initialFocus', () => {
      it('does not focus anything if `initialFocus` is false', () => {
        cy.mount(
          <PopoverComponent initialFocus={false}>Test</PopoverComponent>
        );
        cy.get('[data-test-subj="togglePopover"]').click();
        cy.focused().should('have.attr', 'data-test-subj', 'togglePopover');
      });

      it('focuses selector strings', () => {
        cy.mount(
          <PopoverComponent initialFocus="#test">
            <button id="test">Test</button>
          </PopoverComponent>
        );
        cy.get('[data-test-subj="togglePopover"]').click();
        cy.focused().should('have.attr', 'id', 'test');
      });

      it('focuses functions returning DOM Nodes', () => {
        cy.mount(
          <PopoverComponent
            initialFocus={() => document.getElementById('test')}
          >
            <button id="test">Test</button>
          </PopoverComponent>
        );
        cy.get('[data-test-subj="togglePopover"]').click();
        cy.focused().should('have.attr', 'id', 'test');
      });
    });
  });
});
