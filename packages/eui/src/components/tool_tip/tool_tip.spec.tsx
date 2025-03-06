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

import React, { ComponentProps, useState } from 'react';

import { EuiButton } from '../button';
import { EuiFlyout } from '../flyout';
import { EuiModal } from '../modal';
import { EuiPopover } from '../popover';
import { EuiToolTip } from './tool_tip';

describe('EuiToolTip', () => {
  it('shows the tooltip on hover and hides it on mouseout', () => {
    cy.mount(
      <EuiToolTip content="Tooltip text here" data-test-subj="tooltip">
        <EuiButton data-test-subj="toggleToolTip">Show tooltip</EuiButton>
      </EuiToolTip>
    );
    cy.get('[data-test-subj="tooltip"]').should('not.exist');

    cy.get('[data-test-subj="toggleToolTip"]').trigger('mouseover');
    cy.get('[data-test-subj="tooltip"]').should('exist');

    cy.get('[data-test-subj="toggleToolTip"]').trigger('mouseout');
    cy.get('[data-test-subj="tooltip"]').should('not.exist');
  });

  it('shows the tooltip on keyboard focus and hides it on blur', () => {
    cy.mount(
      <EuiToolTip content="Tooltip text here" data-test-subj="tooltip">
        <EuiButton data-test-subj="toggleToolTip">Show tooltip</EuiButton>
      </EuiToolTip>
    );
    cy.get('[data-test-subj="tooltip"]').should('not.exist');

    cy.get('[data-test-subj="toggleToolTip"]').focus();
    cy.get('[data-test-subj="tooltip"]').should('exist');

    cy.get('[data-test-subj="toggleToolTip"]').blur();
    cy.get('[data-test-subj="tooltip"]').should('not.exist');
  });

  it('does not show multiple tooltips if one tooltip toggle is focused and another tooltip toggle is hovered', () => {
    cy.mount(
      <>
        <EuiToolTip content="Tooltip A" data-test-subj="tooltipA">
          <EuiButton data-test-subj="toggleToolTipA">Show tooltip A</EuiButton>
        </EuiToolTip>
        <EuiToolTip content="Tooltip B" data-test-subj="tooltipB">
          <EuiButton data-test-subj="toggleToolTipB">Show tooltip B</EuiButton>
        </EuiToolTip>
      </>
    );
    cy.get('[data-test-subj="tooltip"]').should('not.exist');

    cy.get('[data-test-subj="toggleToolTipA"]').focus();
    cy.contains('Tooltip A').should('exist');
    cy.contains('Tooltip B').should('not.exist');

    cy.get('[data-test-subj="toggleToolTipB"]').trigger('mouseover');
    cy.contains('Tooltip B').should('exist');
    cy.contains('Tooltip A').should('not.exist');
  });

  describe('Escape key', () => {
    it('hides the tooltip when rendered by itself', () => {
      cy.mount(
        <EuiToolTip content="Tooltip text here" data-test-subj="tooltip">
          <EuiButton data-test-subj="toggleToolTip">Show tooltip</EuiButton>
        </EuiToolTip>
      );
      cy.realPress('Tab');
      cy.get('[data-test-subj="tooltip"]').should('exist');

      cy.realPress('Escape');
      cy.get('[data-test-subj="tooltip"]').should('not.exist');
    });

    it('hides the tooltip when rendered by EuiFlyout', () => {
      const Flyout = (
        props: Omit<ComponentProps<typeof EuiFlyout>, 'onClose'>
      ) => {
        const [isOpen, setIsOpen] = useState(true);

        return isOpen ? (
          <EuiFlyout
            {...props}
            data-test-subj="flyout"
            onClose={() => setIsOpen(false)}
          />
        ) : null;
      };

      cy.mount(
        <Flyout>
          <EuiToolTip content="Tooltip text here" data-test-subj="tool_tip">
            <EuiButton data-test-subj="tool_tip_trigger">
              Show tooltip
            </EuiButton>
          </EuiToolTip>
        </Flyout>
      );
      cy.get('[data-test-subj="tool_tip"]').should('not.exist');

      cy.get('[data-test-subj="flyout"]').focus();

      cy.repeatRealPress('Tab', 2);
      cy.get('[data-test-subj="tool_tip"]').should('exist');

      cy.realPress('Escape');
      cy.get('[data-test-subj="tool_tip"]').should('not.exist');
      cy.get('[data-test-subj="flyout"]').should('exist');

      cy.realPress('Escape');
      cy.get('[data-test-subj="flyout"]').should('not.exist');
    });

    it('hides the tooltip when rendered by EuiModal', () => {
      const Modal = (
        props: Omit<ComponentProps<typeof EuiModal>, 'onClose'>
      ) => {
        const [isOpen, setIsOpen] = useState(true);

        return isOpen ? (
          <EuiModal
            {...props}
            data-test-subj="modal"
            onClose={() => setIsOpen(false)}
          />
        ) : null;
      };

      cy.mount(
        <Modal>
          <EuiToolTip content="Tooltip text here" data-test-subj="tool_tip">
            <EuiButton data-test-subj="tool_tip_trigger">
              Show tooltip
            </EuiButton>
          </EuiToolTip>
        </Modal>
      );
      cy.get('[data-test-subj="tool_tip"]').should('not.exist');

      cy.get('[data-test-subj="modal"]').focus();

      cy.repeatRealPress('Tab', 2);
      cy.get('[data-test-subj="tool_tip"]').should('exist');

      cy.realPress('Escape');
      cy.get('[data-test-subj="tool_tip"]').should('not.exist');
      cy.get('[data-test-subj="modal"]').should('exist');

      cy.realPress('Escape');
      cy.get('[data-test-subj="modal"]').should('not.exist');
    });

    it('hides the tooltip when rendered by EuiPopover', () => {
      const Popover = (
        props: Omit<
          ComponentProps<typeof EuiPopover>,
          'closePopover' | 'button'
        >
      ) => {
        const [isOpen, setIsOpen] = useState(true);

        return (
          <EuiPopover
            {...props}
            button={
              <EuiButton
                onClick={() => setIsOpen(true)}
                data-test-subj="popover_toggle"
              >
                Show popover
              </EuiButton>
            }
            panelProps={{ 'data-test-subj': 'popover' }}
            isOpen={isOpen}
            closePopover={() => setIsOpen(false)}
          >
            {props.children}
          </EuiPopover>
        );
      };

      cy.mount(
        <Popover>
          <EuiToolTip content="Tooltip text here" data-test-subj="tool_tip">
            <EuiButton data-test-subj="tool_tip_trigger">
              Show tooltip
            </EuiButton>
          </EuiToolTip>
        </Popover>
      );
      cy.get('[data-test-subj="tool_tip"]').should('not.exist');

      cy.get('[data-test-subj="popover"]').focus();

      cy.realPress('Tab');
      cy.get('[data-test-subj="tool_tip"]').should('exist');

      cy.realPress('Escape');
      cy.get('[data-test-subj="tool_tip"]').should('not.exist');
      cy.get('[data-test-subj="popover"]').should('exist');

      cy.realPress('Escape');
      cy.get('[data-test-subj="popover"]').should('not.exist');
    });
  });
});
