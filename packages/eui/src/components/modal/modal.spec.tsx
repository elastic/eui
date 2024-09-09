/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../cypress/support" />

import React, { ReactNode, useState } from 'react';
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiModalProps,
} from './index';
import { EuiButton } from '../button';
import { EuiPopover } from '../popover';

const Modal = ({ content }: { content?: ReactNode }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const modalProps: EuiModalProps = {
    title: 'Do this thing',
    onClose: closeModal,
    children: null,
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
            {content ?? <p>This is a simple modal body</p>}
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
  describe('Basic functionality', () => {
    it('renders with required props', () => {
      cy.mount(<Modal />);
      cy.get('div.euiModal').should('not.exist');

      cy.get('button.euiButton').click();
      cy.get('div.euiModal').should('exist');
    });

    it('returns focus correctly when X close button is clicked', () => {
      cy.mount(<Modal />);
      cy.get('button.euiButton').click();
      cy.get('div.euiModal').should('exist');
      cy.get('button.euiButtonIcon').click();
      cy.get('div.euiModal').should('not.exist');
    });

    it('handles focus correctly when Close button is clicked', () => {
      cy.mount(<Modal />);
      cy.get('button.euiButton').click();
      cy.get('div.euiModal').should('exist');
      cy.get('div.euiModalFooter > button').click();
      cy.get('div.euiModal').should('not.exist');
    });

    describe('key navigation', () => {
      it('responds to button keypresses', () => {
        cy.realMount(<Modal />);
        cy.realPress('Tab');
        cy.focused().contains('Show confirm modal');
        cy.realPress('Enter');
        cy.focused().contains('Title of modal');
        cy.realPress('Tab');
        cy.realPress('Enter');
        cy.focused().contains('Show confirm modal');
        cy.get('div.euiModal').should('not.exist');
        cy.realPress('Enter');
        cy.focused().contains('Title of modal');
        cy.repeatRealPress('Tab');
        cy.realPress('Enter');
        cy.focused().contains('Show confirm modal');
        cy.get('div.euiModal').should('not.exist');
      });

      it('closes on Escape key press', () => {
        cy.realMount(<Modal />);
        cy.realPress('Tab');
        cy.focused().contains('Show confirm modal');
        cy.realPress('Enter');
        cy.focused().contains('Title of modal');
        cy.realPress('Tab');
        cy.realPress('Tab');
        cy.focused().contains('Close');
        cy.realPress('Escape');
        cy.focused().contains('Show confirm modal');
      });

      it('closes opened content before closing the modal on Escape key press', () => {
        const PopoverContent = () => {
          const [isPopoverOpen, setIsPopoverOpen] = useState(false);

          return (
            <EuiPopover
              button={
                <EuiButton onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                  Show Popover
                </EuiButton>
              }
              isOpen={isPopoverOpen}
              closePopover={() => {
                setIsPopoverOpen(false);
              }}
              panelPaddingSize="none"
            >
              Popover content
            </EuiPopover>
          );
        };

        cy.realMount(<Modal content={<PopoverContent />} />);
        cy.realPress('Tab');
        cy.focused().contains('Show confirm modal');
        cy.realPress('Enter');
        cy.focused().contains('Title of modal');
        cy.realPress('Tab');
        cy.realPress('Tab');
        cy.focused().contains('Show Popover');
        cy.realPress('Enter');
        cy.focused().contains('Popover content');
        cy.realPress('Escape');
        cy.focused().contains('Show Popover');
        cy.realPress('Escape');
        cy.focused().contains('Show confirm modal');
      });
    });
  });
});
