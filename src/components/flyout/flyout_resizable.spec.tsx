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

import { EuiFlyoutResizable } from './flyout_resizable';

const onClose = () => {};

describe('EuiFlyoutResizable', () => {
  beforeEach(() => {
    cy.viewport(1200, 500);
  });

  describe('sets the flyout size after initial load to a static number', () => {
    it('default size', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} />);
      cy.get('.euiFlyout').should('have.css', 'inline-size', '600px');
    });

    it('size enum', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size="s" />);
      cy.get('.euiFlyout').should('have.css', 'inline-size', '384px');
    });

    it('number', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size={300} />);
      cy.get('.euiFlyout').should('have.css', 'inline-size', '300px');
    });

    it('CSS width', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size="80%" />);
      cy.get('.euiFlyout').should('have.css', 'inline-size', '960px');
    });

    it('with max width', () => {
      cy.mount(
        <EuiFlyoutResizable onClose={onClose} size="100%" maxWidth={400} />
      );
      cy.get('.euiFlyout').should('have.css', 'inline-size', '400px');
    });

    it('with min width', () => {
      cy.mount(
        <EuiFlyoutResizable onClose={onClose} size={100} minWidth={200} />
      );
      cy.get('.euiFlyout').should('have.css', 'inline-size', '200px');
    });
  });

  describe('resizing', () => {
    // There isn't a way to actually drag & drop in Cypress, so we're mocking it via triggers
    it('mouse drag', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size={800} />);
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { pageX: 400 })
        .trigger('mousemove', { pageX: 600 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '600px');

      cy.get('[data-test-subj="euiResizableButton"]').trigger('mousemove', {
        pageX: 200,
      });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1000px');

      // Should not change the flyout width if not dragging
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mouseup')
        .trigger('mousemove', { pageX: 1000 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1000px');
    });

    it('mobile touch drag', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size={800} />);
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('touchstart', { targetTouches: [{ pageX: 400 }], touches: [] })
        .trigger('touchmove', { targetTouches: [{ pageX: 800 }], touches: [] })
        .trigger('touchend', { touches: [] });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '400px');
    });

    it('keyboard tabbing', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size={800} />);
      cy.get('[data-test-subj="euiResizableButton"]').focus();

      cy.repeatRealPress('ArrowRight', 10);
      cy.get('.euiFlyout').should('have.css', 'inline-size', '700px');

      cy.repeatRealPress('ArrowLeft', 5);
      cy.get('.euiFlyout').should('have.css', 'inline-size', '750px');
    });

    it('does not allow the flyout to be resized past the window width', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size={800} />);
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { pageX: 400 })
        .trigger('mousemove', { pageX: -100 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1180px');
    });

    it('does not allow the flyout to be resized past the max width', () => {
      cy.mount(
        <EuiFlyoutResizable onClose={onClose} size={800} maxWidth={1000} />
      );
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { pageX: 400 })
        .trigger('mousemove', { pageX: 100 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1000px');
    });

    it('does not allow the flyout to be resized past the min width', () => {
      cy.mount(
        <EuiFlyoutResizable onClose={onClose} size={800} minWidth={100} />
      );
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { pageX: 400 })
        .trigger('mousemove', { pageX: 2000 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '100px');
    });
  });
});
