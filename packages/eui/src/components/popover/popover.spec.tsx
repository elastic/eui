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

import React, {
  useState,
  useEffect,
  FC,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import { EuiButton, EuiConfirmModal } from '../../components';
import { EuiPopover, EuiPopoverProps } from './popover';

const PopoverToggle: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }> = ({
  onClick,
}) => (
  <EuiButton onClick={onClick} data-test-subj="togglePopover">
    Show popover
  </EuiButton>
);

const PopoverComponent: FC<Partial<EuiPopoverProps>> = ({
  children,
  ...rest
}) => {
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
            initialFocus={() => document.getElementById('test')!}
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

  describe('toggle click behavior', () => {
    it('closes the popover on outside click after multiple clicks on the trigger', () => {
      cy.mount(
        <PopoverComponent initialFocus="#test">
          <button data-test-subj="popover-toggle">Test</button>
        </PopoverComponent>
      );

      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();

      cy.get('[data-test-subj="popoverPanel"]').should('exist');

      cy.get('body').click();

      cy.get('[data-test-subj="popoverPanel"]').should('not.exist');
    });

    it('closes the popover on ESCAPE keypress after multiple clicks on the trigger', () => {
      cy.mount(
        <PopoverComponent initialFocus="#test">
          <button data-test-subj="popover-toggle">Test</button>
        </PopoverComponent>
      );

      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();
      cy.get('[data-test-subj="togglePopover"]').click();

      cy.get('[data-test-subj="popoverPanel"]').should('exist');

      cy.focused().type('{esc}');

      cy.get('[data-test-subj="popoverPanel"]').should('not.exist');
    });
  });

  describe('repositionToCrossAxis', () => {
    beforeEach(() => {
      // Set a forced viewport with not enough room to render the popover vertically
      cy.viewport(500, 50);
    });

    it('allows the popover to reposition to the cross/secondary axis if there is not enough room on the primary axis', () => {
      cy.mount(
        <PopoverComponent anchorPosition="downCenter">Test</PopoverComponent>
      );
      cy.get('[data-test-subj="togglePopover"]').click();

      // Assert that the popover rendered horizontally and not vertically
      cy.get('[data-popover-panel]')
        .invoke('offset')
        .then((offset) => {
          if (offset) {
            expect(offset.left).to.be.gt(offset.top);
          }
        });
    });

    it('does not reposition to the cross axis if set to false', () => {
      cy.mount(
        <PopoverComponent
          anchorPosition="downCenter"
          repositionToCrossAxis={false}
        >
          Test
        </PopoverComponent>
      );
      cy.get('[data-test-subj="togglePopover"]').click();

      // Assert that the popover vertically and not horizontally
      cy.get('[data-popover-panel]')
        .invoke('offset')
        .then((offset) => {
          if (offset) {
            expect(offset.top).to.be.gt(offset.left);
          }
        });
    });
  });

  describe('insert', () => {
    const sibling = document.createElement('div');
    sibling.id = 'sibling';
    const componentDefaults = {
      EuiPortal: { insert: { sibling, position: 'before' as const } },
    };

    const Wrapper: FC<PropsWithChildren> = ({ children }) => {
      const [mounted, setMounted] = useState(false);

      useEffect(() => {
        document.body.appendChild(sibling);
        setMounted(true);
      }, []);

      return <>{mounted && children}</>;
    };

    it('inherits from componentDefaults.EuiPortal', () => {
      cy.mount(
        <Wrapper>
          <PopoverComponent isOpen={true} />
        </Wrapper>,
        { providerProps: { componentDefaults } }
      );

      // verify the popover was appended before the sibling
      cy.get('div[data-euiportal]').then((portal) => {
        cy.get('div#sibling').then((sibling) => {
          expect(portal).to.have.lengthOf(1);
          expect(sibling).to.have.lengthOf(1);
          expect(sibling.get(0).previousElementSibling).to.equal(portal.get(0));
        });
      });
    });

    it('still allows overriding defaults via component props', () => {
      cy.mount(
        <Wrapper>
          <PopoverComponent
            isOpen={true}
            insert={{ sibling, position: 'after' }}
          />
        </Wrapper>,
        { providerProps: { componentDefaults } }
      );

      // verify portal elements were appended before and after the sibling
      cy.get('div[data-euiportal]').then((portal) => {
        cy.get('div#sibling').then((sibling) => {
          expect(portal).to.have.lengthOf(1);
          expect(sibling).to.have.lengthOf(1);
          expect(sibling.get(0).nextElementSibling).to.equal(portal.get(0));
        });
      });
    });
  });
});
