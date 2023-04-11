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
import { EuiImage } from './image';

const Image = () => (
  <EuiImage
    size="m"
    hasShadow
    allowFullScreen
    caption="Albert Einstein, theoretical physicist"
    alt="" // Because this image is sufficiently described by its caption, there is no need to repeat it via alt text
    src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg"
  />
);

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<Image />);
  cy.get('figure[aria-label="Albert Einstein, theoretical physicist"]').should(
    'exist'
  );
});

describe('EuiImage', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations on fullscreen render', () => {
      cy.get('button[data-test-subj="activateFullScreenButton"]').realClick();
      cy.get('button[data-test-subj="deactivateFullScreenButton"]').should(
        'exist'
      );
      cy.checkAxe();
      cy.get('div[data-test-subj="fullScreenOverlayMask"]').realClick();
      cy.checkAxe();
    });

    it('has zero violations on keyboard interaction', () => {
      cy.realPress('Tab');
      cy.get('button[data-test-subj="activateFullScreenButton"]').should(
        'have.focus'
      );
      cy.realPress('Enter');
      cy.get('button[data-test-subj="deactivateFullScreenButton"]').should(
        'exist'
      );
      cy.get('button[data-test-subj="deactivateFullScreenButton"]').should(
        'have.focus'
      );
      cy.checkAxe();
      cy.realPress('Escape');
      cy.get('button[data-test-subj="activateFullScreenButton"]').should(
        'have.focus'
      );
      cy.checkAxe();
    });
  });
});
