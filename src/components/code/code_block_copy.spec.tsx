/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
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

import { EuiCodeBlock } from './code_block';

const codeBlockContent = `"OriginLocation": [
  {
    "coordinates": [
      -97.43309784,
      37.64989853
    ],
    "type": "Point"
  }
],`;

describe('EuiCodeBlock copy UX', () => {
  beforeEach(() => {
    // Clipboard permissions are required for copy behavior to work in non-Electron browsers
    // @see https://github.com/cypress-io/cypress-example-recipes/blob/182400395817a14f0c7f18889b2fcc6b4d189434/examples/testing-dom__clipboard/cypress/e2e/permissions-spec.cy.js#L37
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin,
        },
      })
    );
  });

  const assertClipboardContentEquals = (expectedText: string) => {
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .then((clipboard) => {
        expect(clipboard).equals(expectedText);
      });
  };

  it('correctly copies content', () => {
    cy.realMount(<EuiCodeBlock isCopyable>{codeBlockContent}</EuiCodeBlock>);

    cy.get('[data-test-subj="euiCodeBlockCopy"]').realClick();
    assertClipboardContentEquals(codeBlockContent);
  });

  it('correctly copies virtualized content', () => {
    cy.realMount(
      <EuiCodeBlock isCopyable isVirtualized={true} overflowHeight="50%">
        {codeBlockContent}
      </EuiCodeBlock>
    );

    cy.get('[data-test-subj="euiCodeBlockCopy"]').realClick();
    assertClipboardContentEquals(codeBlockContent);
  });

  it('correctly copies content with line numbers and annotations', () => {
    cy.realMount(
      <EuiCodeBlock
        isCopyable
        lineNumbers={{
          start: 32,
          highlight: '32, 34-37, 40',
          annotations: {
            34: 'Coordinates can be obtained from Elastic Maps',
            38: <>Allowed types: Point, Area</>,
          },
        }}
      >
        {codeBlockContent}
      </EuiCodeBlock>
    );

    cy.get('[data-test-subj="euiCodeBlockCopy"]').realClick();
    assertClipboardContentEquals(codeBlockContent);
  });
});
