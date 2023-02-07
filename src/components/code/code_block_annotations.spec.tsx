/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';

import { EuiCodeBlock } from './code_block';

describe('EuiCodeBlock annotations', () => {
  describe('non-virtualized', () => {
    const content = `"OriginLocation": [
  {
    "coordinates": [
      -97.43309784,
      37.64989853
    ],
    "type": "Point"
  }
],`;

    it('renders a clickable annotation icon that toggles a popover', () => {
      cy.mount(
        <EuiCodeBlock
          language="json"
          fontSize="m"
          paddingSize="m"
          lineNumbers={{
            annotations: {
              1: 'Annotation',
            },
          }}
        >
          {content}
        </EuiCodeBlock>
      );
      cy.get('[data-test-subj="euiCodeBlockAnnotationIcon"]').click();
      cy.contains(
        '[data-test-subj="euiCodeBlockAnnotationPopover"]',
        'Annotation'
      );
    });
  });

  describe('virtualized', () => {
    const content = `{
    "id": "1",
    "rawResponse": {
      "took": 19,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      }
    },
    "id": "2",
    "rawResponse": {
      "took": 20,
      "timed_out": false,
      "_shards": {
        "total": 2,
        "successful": 0,
        "skipped": 1,
        "failed": 1
      }
    }
  }`;

    const virtualizedCodeBlock = (
      <EuiCodeBlock
        language="json"
        isVirtualized
        overflowHeight={200}
        lineNumbers={{
          start: 32,
          highlight: '33-42',
          annotations: {
            35: (
              <span data-test-subj="annotation1">
                Annotation <a href="#">1</a>
              </span>
            ),
            52: (
              <span data-test-subj="annotation2">
                Annotation <strong>2</strong>
              </span>
            ),
          },
        }}
      >
        {content}
      </EuiCodeBlock>
    );

    it('renders annotations in virtualized code blocks', () => {
      cy.mount(virtualizedCodeBlock);
      cy.get('[data-test-subj="euiCodeBlockAnnotationIcon"]').click();
      cy.get('[data-test-subj="annotation1"]').should(
        'have.text',
        'Annotation 1'
      );
      cy.realPress('Escape');
      cy.get('.euiCodeBlock__pre').scrollTo(0, 500);
      cy.wait(100);
      cy.get('.euiCodeBlock__pre').scrollTo(0, 500);
      cy.get('[data-test-subj="euiCodeBlockAnnotationIcon"]').click();
      cy.get('[data-test-subj="annotation2"]').should(
        'have.text',
        'Annotation 2'
      );
    });

    it('renders annotations in fullscreen mode', () => {
      cy.mount(virtualizedCodeBlock);
      cy.get('.euiCodeBlock__fullScreenButton').click();
      cy.get('.euiCodeBlockFullScreen')
        .find('[data-test-subj="euiCodeBlockAnnotationIcon"]')
        .first()
        .focus()
        .realPress('Enter');
      cy.get('[data-test-subj="annotation1"]').should(
        'have.text',
        'Annotation 1'
      );
      cy.realPress('Tab');
      cy.realPress('Escape');
      cy.get('.euiCodeBlockFullScreen')
        .find('[data-test-subj="euiCodeBlockAnnotationIcon"]')
        .last()
        .focus()
        .realPress('Enter');
      cy.get('[data-test-subj="annotation2"]').should(
        'have.text',
        'Annotation 2'
      );
    });
  });
});
