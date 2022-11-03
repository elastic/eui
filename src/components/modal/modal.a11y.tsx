/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

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
            <EuiModalHeaderTitle>
              <h1>Title of modal</h1>
            </EuiModalHeaderTitle>
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

describe('EuiModal', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations when modal is open', () => {
      cy.mount(<Modal />);
      cy.get('div.euiModal').should('not.exist');

      cy.get('button.euiButton').click();
      cy.get('div.euiModal').should('exist');
      cy.checkAxe();
    });
  });
});
