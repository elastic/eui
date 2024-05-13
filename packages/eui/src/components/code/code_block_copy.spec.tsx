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

  // NOTE: Clipboard content is naturally preserved between tests. Use this utility
  // or custom content to generate different text per test & ensure no false positives
  const generateCodeBlockContent = () =>
    Cypress.currentTest.title
      .split(' ')
      .map((text, i) => {
        const indentation = ' '.repeat(i * 2);
        return `${indentation}${text}`;
      })
      .join('\n');

  const assertClipboardContentEquals = (expectedText: string) => {
    cy.window()
      .its('navigator.clipboard')
      .then((clip) => clip.readText())
      .then((clipboard) => {
        expect(clipboard).equals(expectedText);
      });
  };

  it('correctly copies content', () => {
    cy.realMount(
      <EuiCodeBlock isCopyable>{Cypress.currentTest.title}</EuiCodeBlock>
    );

    cy.get('[data-test-subj="euiCodeBlockCopy"]').realClick();
    assertClipboardContentEquals(Cypress.currentTest.title);
  });

  it('correctly copies virtualized content', () => {
    const codeBlockContent = generateCodeBlockContent();
    cy.realMount(
      <EuiCodeBlock isCopyable isVirtualized={true} overflowHeight="10px">
        {codeBlockContent}
      </EuiCodeBlock>
    );

    cy.get('[data-test-subj="euiCodeBlockCopy"]').realClick();
    assertClipboardContentEquals(codeBlockContent);
  });

  it('correctly copies content with line numbers and annotations', () => {
    const codeBlockContent = generateCodeBlockContent();
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

  // Regression test for https://github.com/elastic/eui/issues/6585
  it('correctly copies lines ending in question marks', () => {
    const questionContent = 'hello?\nworld??';
    cy.realMount(<EuiCodeBlock isCopyable>{questionContent}</EuiCodeBlock>);

    cy.get('[data-test-subj="euiCodeBlockCopy"]').realClick();
    assertClipboardContentEquals(questionContent);
  });
});
