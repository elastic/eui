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
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiModalProps,
} from './index';
import { EuiButton } from '../button';

const Modal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const modalProps: EuiModalProps = {
    title: 'Do this thing',
    onClose: closeModal,
    children: React,
  };

  return (
    <div>
      <EuiButton onClick={showModal}>Show confirm modal</EuiButton>
      {isModalVisible && (
        <EuiModal {...modalProps}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Title of modal</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <p>This is a simple modal body</p>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton onClick={closeModal} fill>
              Close
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </div>
  );
};

beforeEach(() => {
  cy.mount(<Modal />);
  cy.get('div.euiModal').should('not.exist');
  cy.get('button.euiButton').realClick();
  cy.get('div.euiModal').should('exist');
});

describe('EuiModal', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations when modal is open', () => {
      cy.checkAxe();
    });

    it('has zero violations when modal is closed', () => {
      cy.get('div.euiModalFooter button.euiButton').click();
      cy.get('div.euiModal').should('not.exist');
      cy.checkAxe();
    });
  });
});
