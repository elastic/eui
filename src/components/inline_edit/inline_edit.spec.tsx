/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiInlineEditText } from './inline_edit_text';

describe('EuiInlineEditText', () => {
  describe('Editing text', () => {
    it('saves text edits', () => {
      cy.realMount(
        <EuiInlineEditText
          defaultValue="Hello World!"
          inputAriaLabel="textEditInput"
          saveButtonAriaLabel="saveEditButton"
        />
      );

      cy.get('button').contains('Hello World!').realClick();
      cy.get('input[aria-label="textEditInput"]').clear().type('New message');
      cy.get('button[aria-label="saveEditButton"]')
        .realClick()
        .then(() => {
          expect(cy.get('button').contains('New message'));
        });
    });

    it('cancels text edits', () => {
      cy.realMount(
        <EuiInlineEditText
          defaultValue="Hello World!"
          inputAriaLabel="textEditInput"
          cancelButtonAriaLabel="cancelEditButton"
        />
      );

      cy.get('button').contains('Hello World!').realClick();
      cy.get('input[aria-label="textEditInput"]').clear().type('New message');
      cy.get('button[aria-label="cancelEditButton"]')
        .realClick()
        .then(() => {
          expect(cy.get('button').contains('Hello World!'));
        });
    });
  });

  describe('Validation and Loading', () => {
    it('should not save empty text', () => {
      cy.realMount(
        <EuiInlineEditText
          defaultValue="Hello World!"
          inputAriaLabel="textEditInput"
          saveButtonAriaLabel="saveEditButton"
        />
      );

      cy.get('button').contains('Hello World!').realClick();
      cy.get('input[aria-label="textEditInput"]').clear();
      cy.get('button[aria-label="saveEditButton"]')
        .realClick()
        .then(() => {
          expect(cy.get('button').contains('Hello World!'));
        });
    });

    it('should obey user generated validation rules', () => {
      cy.realMount(
        <EuiInlineEditText
          defaultValue="Hello World!"
          inputAriaLabel="textEditInput"
          saveButtonAriaLabel="saveEditButton"
          startWithEditOpen={true}
          isInvalid={true}
        />
      );

      cy.get('input[aria-label="textEditInput"]').should(
        'have.attr',
        'aria-invalid'
      );
      cy.get('button[aria-label="saveEditButton"]').should('be.disabled');
    });

    it('should not be able to save when component is loading', () => {
      cy.realMount(
        <EuiInlineEditText
          defaultValue="Hello World!"
          inputAriaLabel="textEditInput"
          saveButtonAriaLabel="saveEditButton"
          cancelButtonAriaLabel="cancelEditButton"
          startWithEditOpen={true}
          isLoading={true}
        />
      );

      cy.get('input[aria-label="textEditInput"]').should(
        'have.class',
        'euiFieldText-isLoading'
      );
      cy.get('button[aria-label="saveEditButton"]').should('not.exist');
      cy.get('button[aria-label="cancelEditButton"]').should('not.exist');
    });
  });

  describe('onConfirm Property', () => {
    it('should return to edit mode when the onConfirm flag is false', () => {
      cy.realMount(
        <EuiInlineEditText
          defaultValue="Hello World!"
          inputAriaLabel="textEditInput"
          saveButtonAriaLabel="saveEditButton"
          startWithEditOpen={true}
          onConfirm={() => {
            return false;
          }}
        />
      );

      cy.get('button[aria-label="saveEditButton"]').realClick();
      cy.get('input[aria-label="textEditInput"]').should('exist');
      cy.get('button').contains('Hello World!').should('not.exist');
    });

    it('should return to read mode when the onConfirm flag is true', () => {
      cy.realMount(
        <EuiInlineEditText
          defaultValue="Hello World!"
          inputAriaLabel="textEditInput"
          saveButtonAriaLabel="saveEditButton"
          startWithEditOpen={true}
          onConfirm={() => {
            return true;
          }}
        />
      );

      cy.get('button[aria-label="saveEditButton"]').realClick();
      cy.get('input[aria-label="textEditInput"]').should('not.exist');
      cy.get('button').contains('Hello World!').should('exist');
    });
  });
});
