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
        .trigger('mousedown', { clientX: 400 })
        .trigger('mousemove', { clientX: 600 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '600px');

      cy.get('[data-test-subj="euiResizableButton"]').trigger('mousemove', {
        clientX: 200,
      });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1000px');

      // Should not change the flyout width if not dragging
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mouseup')
        .trigger('mousemove', { clientX: 1000 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1000px');
    });

    it('mobile touch drag', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size={800} />);
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('touchstart', {
          targetTouches: [{ clientX: 400 }],
          touches: [],
        })
        .trigger('touchmove', {
          targetTouches: [{ clientX: 800 }],
          touches: [],
        })
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
        .trigger('mousedown', { clientX: 400 })
        .trigger('mousemove', { clientX: -100 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1180px');
    });

    it('does not allow the flyout to be resized past the max width', () => {
      cy.mount(
        <EuiFlyoutResizable onClose={onClose} size={800} maxWidth={1000} />
      );
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { clientX: 400 })
        .trigger('mousemove', { clientX: 100 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '1000px');
    });

    it('does not allow the flyout to be resized past the min width', () => {
      cy.mount(
        <EuiFlyoutResizable onClose={onClose} size={800} minWidth={100} />
      );
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { clientX: 400 })
        .trigger('mousemove', { clientX: 2000 });
      cy.get('.euiFlyout').should('have.css', 'inline-size', '100px');
    });

    describe('direction', () => {
      it('reverses the calculations for left side flyouts', () => {
        cy.mount(
          <EuiFlyoutResizable onClose={onClose} size={800} side="left" />
        );
        assertReversedDirections();
      });

      it('reverses again for RTL logical property directions', () => {
        cy.mount(
          <EuiFlyoutResizable
            onClose={onClose}
            size={800}
            style={{ direction: 'rtl' }}
          />
        );
        assertReversedDirections({ force: true });
      });

      const assertReversedDirections = (options?: { force: boolean }) => {
        cy.get('[data-test-subj="euiResizableButton"]').focus();

        cy.repeatRealPress('ArrowRight', 10);
        cy.get('.euiFlyout').should('have.css', 'inline-size', '900px');

        cy.repeatRealPress('ArrowLeft', 5);
        cy.get('.euiFlyout').should('have.css', 'inline-size', '850px');

        cy.get('[data-test-subj="euiResizableButton"]')
          .trigger('mousedown', { clientX: 850, ...options })
          .trigger('mousemove', { clientX: 400, ...options });
        cy.get('.euiFlyout').should('have.css', 'inline-size', '400px');
      };
    });

    it('calls the optional onResize callback on mouseup and keyboard events only', () => {
      const onResize = cy.stub();
      cy.mount(
        <EuiFlyoutResizable onClose={onClose} size={800} onResize={onResize} />
      );

      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { clientX: 400 })
        .trigger('mousemove', { clientX: 600 })
        .then(() => {
          expect(onResize).not.have.been.called;
        });
      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mouseup')
        .then(() => {
          expect(onResize.callCount).to.eql(1);
          expect(onResize).to.have.been.calledWith(600);
        });

      cy.get('[data-test-subj="euiResizableButton"]').focus();
      cy.realPress('ArrowRight').then(() => {
        expect(onResize.callCount).to.eql(2);
        expect(onResize).to.have.been.calledWith(590);
      });
      cy.realPress('ArrowLeft').then(() => {
        expect(onResize.callCount).to.eql(3);
        expect(onResize.lastCall.args).to.eql([600]);
      });
    });
  });

  describe('push flyouts', () => {
    it('correctly updates the body padding offset on resize', () => {
      cy.mount(<EuiFlyoutResizable onClose={onClose} size={800} type="push" />);
      cy.get('body').should('have.css', 'padding-inline-end', '800px');

      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { clientX: 400 })
        .trigger('mousemove', { clientX: 1000 });

      cy.get('.euiFlyout').should('have.css', 'inline-size', '200px');
      cy.get('body').should('have.css', 'padding-inline-end', '200px');
    });

    it('handles left side push flyouts', () => {
      cy.mount(
        <EuiFlyoutResizable
          onClose={onClose}
          size={800}
          type="push"
          side="left"
        />
      );
      cy.get('body').should('have.css', 'padding-inline-start', '800px');

      cy.get('[data-test-subj="euiResizableButton"]')
        .trigger('mousedown', { clientX: 800 })
        .trigger('mousemove', { clientX: 200 });

      cy.get('.euiFlyout').should('have.css', 'inline-size', '200px');
      cy.get('body').should('have.css', 'padding-inline-start', '200px');
    });
  });
});
