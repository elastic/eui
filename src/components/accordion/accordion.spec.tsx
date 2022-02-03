/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiAccordion, EuiAccordionProps } from './index';
import { EuiPanel } from '../../components/panel';
import { htmlIdGenerator } from '../../services';

const baseProps: EuiAccordionProps = {
  buttonContent: 'Click me to toggle',
  id: htmlIdGenerator()(),
  initialIsOpen: false,
};

const noArrow = { arrowDisplay: 'none' };
const noArrowProps: EuiAccordionProps = Object.assign(baseProps, noArrow);

beforeEach(() => {
  cy.injectAxe();
});

describe('EuiAccordion', () => {
  describe('Keyboard and screen reader accessibility', () => {
    it('renders with required props', () => {
      cy.realMount(
        <EuiAccordion {...baseProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.realPress('Tab');
      cy.focused().contains('Click me to toggle');
    });

    it('opens and closes on ENTER keypress', () => {
      cy.realMount(
        <EuiAccordion {...baseProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.realPress('Tab');
      cy.focused().contains('Click me to toggle').realPress('Enter');
      cy.realPress(['Shift', 'Tab']);
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'true');
      cy.realPress('Enter');
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'false');
    });

    it('opens and closes on SPACE keypress', () => {
      cy.realMount(
        <EuiAccordion {...baseProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.realPress('Tab');
      cy.focused().contains('Click me to toggle').realPress('Space');
      cy.realPress(['Shift', 'Tab']);
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'true');
      cy.realPress('Space');
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'false');
    });
  });

  describe('Props and keyboard navigation', () => {
    it('should not have an arrow', () => {
      cy.realMount(
        <EuiAccordion {...noArrowProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.get('.euiAccordion__iconButton').should('not.exist');
    });

    it('manages focus when panel is opened', () => {
      cy.realMount(
        <EuiAccordion {...noArrowProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here. We will include <a href="#">a link</a> to confirm focus.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.realPress('Tab');
      cy.focused().contains('Click me to toggle').realPress('Enter');
      cy.focused().invoke('attr', 'tabindex').should('equal', '-1');
      cy.focused().contains('Any content inside of EuiAccordion');
      cy.realPress('Tab');
      cy.focused().contains('a link');
    });

    it('manages focus when forceState is open', () => {
      cy.realMount(
        <EuiAccordion {...noArrowProps} forceState="open">
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here. We will include <a href="#">a link</a> to confirm focus.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.realPress('Tab');
      cy.focused().contains('Click me to toggle');
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'true');
      cy.focused().invoke('attr', 'tabindex').should('not.exist');
      cy.realPress('Tab');
      cy.focused().contains('a link');
    });
  });

  describe('Axe checks', () => {
    it('has zero axe violations when expanded', () => {
      cy.mount(
        <EuiAccordion {...noArrowProps}>
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here. We will include <a href="#">a link</a> to confirm focus.
          </EuiPanel>
        </EuiAccordion>
      );
      cy.get('button.euiAccordion__button').click();
      cy.checkA11y('div#__cy_root', {
        rules: {
          'color-contrast': { enabled: false },
        },
      });
    });
  });
});
