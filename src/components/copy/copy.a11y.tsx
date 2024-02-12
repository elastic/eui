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
import { EuiButton } from '../button';
import { EuiCopy } from './copy';
import { EuiFormRow, EuiFieldText } from '../form';
import { EuiSpacer } from '../spacer';

const Copy = () => {
  const [copyText, setCopyText] = useState('I am the text that will be copied');

  return (
    <div>
      <EuiFormRow label="Enter text that will be copied to clipboard">
        <EuiFieldText
          value={copyText}
          onChange={(e) => setCopyText(e.target.value)}
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiCopy textToCopy={copyText}>
        {(copy) => (
          <EuiButton onClick={copy} data-test-subj="cy-copy-button">
            Click to copy input text
          </EuiButton>
        )}
      </EuiCopy>
    </div>
  );
};

beforeEach(() => {
  cy.realMount(<Copy />);
});

describe('EuiCopy', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on render', () => {
      cy.checkAxe();
    });

    it('has zero violations after the copy button is clicked', () => {
      cy.get('button[data-test-subj="cy-copy-button"]').realClick();
      cy.checkAxe();
    });

    it('has zero violations after keyboard interaction', () => {
      cy.repeatRealPress('Tab');
      cy.realPress('Enter');
      cy.checkAxe();
    });
  });
});
