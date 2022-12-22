/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';

import { EuiButton, EuiConfirmModal } from '../../components';
import { EuiPopover } from './popover';

const PopoverToggle = ({ onClick }) => (
  <EuiButton onClick={onClick} data-test-subj="togglePopover">
    Show popover
  </EuiButton>
);

const PopoverComponent = ({ children, ...rest }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const closePopover = () => setIsPopoverOpen(false);
  const togglePopover = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);

  return (
    <EuiPopover
      panelProps={{ 'data-test-subj': 'popoverPanel' }}
      button={<PopoverToggle onClick={togglePopover} />}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      {...rest}
    >
      {children}
    </EuiPopover>
  );
};

describe('EuiPopover', () => {
  describe('focus behavior', () => {
    it('focuses the panel wrapper by default', () => {
      cy.mount(<PopoverComponent>Test</PopoverComponent>);
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.focused()
        .should('have.attr', 'data-test-subj', 'popoverPanel')
        .should('have.attr', 'data-autofocus', 'true'); // set by react-focus-on on the initially focused node
    });

    it('does not focus anything if `ownFocus` is false', () => {
      cy.mount(<PopoverComponent ownFocus={false}>Test</PopoverComponent>);
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.focused().should('have.attr', 'data-test-subj', 'togglePopover');
      cy.get('[data-test-subj="popoverPanel"]').should(
        'not.have.attr',
        'data-autofocus'
      );
    });

    describe('initialFocus', () => {
      it('focuses selector strings', () => {
        cy.mount(
          <PopoverComponent initialFocus="#test">
            <button id="test">Test</button>
          </PopoverComponent>
        );
        cy.get('[data-test-subj="togglePopover"]').click();
        cy.focused()
          .should('have.attr', 'id', 'test')
          .should('have.attr', 'data-autofocus', 'true');
        cy.get('[data-test-subj="popoverPanel"]').should(
          'not.have.attr',
          'data-autofocus'
        );
      });

      it('focuses functions returning DOM Nodes', () => {
        cy.mount(
          <PopoverComponent
            initialFocus={() => document.getElementById('test')}
          >
            <button id="test">Test</button>
          </PopoverComponent>
        );
        cy.get('[data-test-subj="togglePopover"]').click();
        cy.focused()
          .should('have.attr', 'id', 'test')
          .should('have.attr', 'data-autofocus', 'true');
        cy.get('[data-test-subj="popoverPanel"]').should(
          'not.have.attr',
          'data-autofocus'
        );
      });
    });

    describe('focusTrapProps', () => {
      it('allows overriding clickOutsideDisables and onClickOutside', () => {
        const PopoverWithConfirmModal = () => {
          const [isPopoverOpen, setIsPopoverOpen] = useState(false);
          const closePopover = () => setIsPopoverOpen(false);
          const button = (
            <PopoverToggle onClick={() => setIsPopoverOpen(true)} />
          );

          const [isModalVisible, setIsModalVisible] = useState(false);
          const closeModal = () => setIsModalVisible(false);
          const showModal = () => setIsModalVisible(true);

          const modal = isModalVisible ? (
            <EuiConfirmModal
              title="You have unsaved work"
              onCancel={closeModal}
              onConfirm={() => {
                closeModal();
                closePopover();
              }}
              cancelButtonText="No, don't do it"
              confirmButtonText="Yes, do it"
              defaultFocusedButton="cancel"
            >
              <p>Are you sure you to close the popover?</p>
            </EuiConfirmModal>
          ) : null;

          return (
            <>
              <PopoverComponent
                focusTrapProps={{
                  clickOutsideDisables: false,
                  onClickOutside: showModal,
                }}
                closePopover={closePopover}
                isOpen={isPopoverOpen}
                button={button}
              >
                Test
              </PopoverComponent>
              {modal}
            </>
          );
        };
        cy.mount(<PopoverWithConfirmModal />);
        cy.get('[data-test-subj="togglePopover"]').click();
        cy.focused().should('have.attr', 'data-test-subj', 'popoverPanel'); // Popover exists

        // Trigger the confirm modal via outside click and then cancel (popover remains)
        cy.get('body').click('bottomRight');
        cy.focused()
          .should('have.attr', 'data-test-subj', 'confirmModalCancelButton')
          .click();
        cy.focused().should('have.attr', 'data-test-subj', 'popoverPanel'); // Confirm modal should close and popover should still exist and be re-focused

        // Trigger the confirm modal via outside click and then confirm (popover closes)
        cy.get('body').click('bottomRight');
        cy.get('[data-test-subj="confirmModalConfirmButton"]').click();
        cy.get('[data-test-subj="popoverPanel"]').should('not.exist');
        cy.focused().should('have.attr', 'data-test-subj', 'togglePopover'); // Popover toggle should be re-focused
      });
    });
  });
});
