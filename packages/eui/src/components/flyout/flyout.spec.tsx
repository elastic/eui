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

import React, { useRef, useState } from 'react';

import { EuiGlobalToastList } from '../toast';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItemButton,
} from '../header';
import { EuiCollapsibleNavBeta } from '../collapsible_nav_beta';
import { EuiFlyout } from './flyout';
import { EuiCollapsibleNav, EuiCollapsibleNavGroup } from '../collapsible_nav';
import { EuiIcon } from '../icon';
import { EuiButton } from '../button';

const childrenDefault = (
  <>
    <button data-test-subj="itemA">Item A</button>
    <button data-test-subj="itemB">Item B</button>
    <button data-test-subj="itemC">Item C</button>
    <input data-test-subj="itemD" />
  </>
);

const Flyout = ({
  children = childrenDefault,
  hasTrigger = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(hasTrigger ? false : true);

  return (
    <>
      {hasTrigger && (
        <EuiButton
          onClick={() => setIsOpen(!isOpen)}
          data-test-subj="flyoutSpecTrigger"
        >
          Trigger
        </EuiButton>
      )}
      {isOpen ? (
        <EuiFlyout
          data-test-subj="flyoutSpec"
          onClose={() => setIsOpen(false)}
          {...rest}
        >
          {children}
        </EuiFlyout>
      ) : null}
    </>
  );
};

describe('EuiFlyout', () => {
  describe('Focus behavior', () => {
    it('focuses the flyout wrapper by default', () => {
      cy.mount(<Flyout />);
      cy.focused().should('have.class', 'euiFlyout');
      cy.focused().should('have.attr', 'data-autofocus', 'true');
    });

    it('traps focus and cycles tabbable items', () => {
      cy.mount(<Flyout />);
      cy.get('[data-test-subj="flyoutSpec"]').should('be.focused');
      cy.repeatRealPress('Tab', 4);
      cy.get('[data-test-subj="itemC"]').should('be.focused');
      cy.repeatRealPress('Tab', 3);
      cy.get('[data-test-subj="euiFlyoutCloseButton"]').should('be.focused');
    });

    it('does not focus trap or scrollLock for push flyouts', () => {
      cy.mount(
        <>
          <div style={{ height: 2000 }}>Body scroll</div>
          <Flyout type="push" pushMinBreakpoint="xs" size="100px" />
        </>
      );

      cy.get('body').realClick({ position: 'topLeft' }).realPress('End'); // TODO: Use cypress-real-event's `realMouseWheel` API, whenever they release it
      cy.wait(500); // Wait a tick to let scroll position update
      cy.window().its('scrollY').should('not.equal', 0);
    });
  });

  describe('Return focus behavior', () => {
    it('returns focus to the trigger on close', () => {
      cy.mount(<Flyout hasTrigger />);

      cy.get('[data-test-subj="flyoutSpecTrigger"]').click();
      cy.get('[data-test-subj="flyoutSpec"]').should('be.focused');
      cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
      cy.get('[data-test-subj="flyoutSpecTrigger"]').should('be.focused');
    });

    it('does not return focus to the trigger when `focusTrapProps.returnFocus` is `false`', () => {
      cy.mount(<Flyout hasTrigger focusTrapProps={{ returnFocus: false }} />);

      cy.get('[data-test-subj="flyoutSpecTrigger"]').click();
      cy.get('[data-test-subj="flyoutSpec"]').should('be.focused');
      cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
      cy.get('[data-test-subj="flyoutSpecTrigger"]').should('not.be.focused');
    });

    it('returns focus to a custom element', () => {
      const FlyoutWrapper = () => {
        const customTriggerRef = useRef<HTMLButtonElement>(null);

        return (
          <>
            <EuiButton
              buttonRef={customTriggerRef}
              data-test-subj="flyoutSpecCustomTrigger"
            >
              Custom trigger
            </EuiButton>
            <Flyout
              hasTrigger
              focusTrapProps={{
                returnFocus: () => {
                  customTriggerRef.current?.focus();
                  return false;
                },
              }}
            />
          </>
        );
      };
      cy.mount(<FlyoutWrapper />);

      cy.get('[data-test-subj="flyoutSpecTrigger"]').click();
      cy.get('[data-test-subj="flyoutSpec"]').should('be.focused');
      cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
      cy.get('[data-test-subj="flyoutSpecTrigger"]').should('not.be.focused');
      cy.get('[data-test-subj="flyoutSpecCustomTrigger"]').should('be.focused');
    });
  });

  describe('Close behavior: standard', () => {
    it('closes the flyout when the close button is clicked', () => {
      cy.mount(<Flyout />);
      cy.get('[data-test-subj="euiFlyoutCloseButton"]')
        .click()
        .then(() => {
          expect(cy.get('[data-test-subj="flyoutSpec"]').should('not.exist'));
        });
    });

    it('closes the flyout with `escape` key', () => {
      cy.mount(<Flyout />);
      cy.realPress('Escape').then(() => {
        expect(cy.get('[data-test-subj="flyoutSpec"]').should('not.exist'));
      });
    });
  });

  describe('Close behavior: outside clicks', () => {
    // We're using toasts here to trigger outside clicks, as a UX case where
    // we would generally expect toasts overlaid on top of a flyout *not* to close the flyout
    const FlyoutWithToasts = ({ children = childrenDefault, ...rest }) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <>
          {isOpen ? (
            <EuiFlyout
              data-test-subj="flyoutSpec"
              onClose={() => setIsOpen(false)}
              {...rest}
            >
              {children}
            </EuiFlyout>
          ) : null}
          <EuiGlobalToastList
            toasts={[
              {
                title: 'Toast!',
                text: 'Yeah toast',
                id: 'a',
              },
            ]}
            dismissToast={() => {}}
            toastLifeTimeMs={10000}
          />
        </>
      );
    };

    it('closes the flyout when the overlay mask is clicked', () => {
      cy.mount(<Flyout />);
      cy.get('[data-test-subj="flyoutSpec"]').should('be.visible');

      // wait and exists instead of be.visible are used here because cypress
      // thinks the overlay is covered due to our position: fixed style.
      // This is likely fixed in more recent versions of Cypress
      cy.wait(0);
      cy.get('.euiOverlayMask').should('exist').realClick({ position: 'left' });

      cy.get('[data-test-subj="flyoutSpec"]').should('not.exist');
    });

    it('does not close the flyout when `outsideClickCloses=false` and the overlay mask is clicked', () => {
      cy.mount(<Flyout outsideClickCloses={false} />);
      cy.get('.euiOverlayMask')
        .realClick()
        .then(() => {
          expect(cy.get('[data-test-subj="flyoutSpec"]').should('exist'));
        });
    });

    it('does not close the flyout when the overlay mask is only the target of mouseup', () => {
      cy.mount(<Flyout />);
      cy.get('[data-test-subj="itemD"]').realMouseDown().realMouseMove(-100, 0);
      cy.get('.euiOverlayMask')
        .realMouseUp()
        .then(() => {
          expect(cy.get('[data-test-subj="flyoutSpec"]').should('exist'));
        });
    });

    it('does not close the flyout when the toast is clicked when `ownFocus=true`', () => {
      cy.mount(<FlyoutWithToasts />);
      cy.get('[data-test-subj="toastCloseButton"]')
        .realClick()
        .then(() => {
          expect(cy.get('[data-test-subj="flyoutSpec"]').should('exist'));
        });
    });

    it('closes the flyout when the toast is clicked when `ownFocus=false`', () => {
      cy.mount(<FlyoutWithToasts ownFocus={false} outsideClickCloses={true} />);
      cy.get('[data-test-subj="toastCloseButton"]')
        .should('be.visible')
        .realClick();
      cy.get('[data-test-subj="flyoutSpec"]').should('not.exist');
    });
  });

  describe('EuiHeader shards', () => {
    const FlyoutWithHeader = ({
      children = childrenDefault,
      collapsibleNavVariant = undefined,
      ...rest
    }: {
      children?: React.ReactNode;
      collapsibleNavVariant?: 'beta' | 'default';
    }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [navIsOpen, setNavIsOpen] = useState(false);

      // We need to toggle it in order to properly test
      // the expected focus behavior
      const collapsibleNav = (
        <EuiCollapsibleNav
          isOpen={navIsOpen}
          button={
            <EuiHeaderSectionItemButton
              data-test-subj="toggleNavButton"
              onClick={() => setNavIsOpen(!navIsOpen)}
            >
              <EuiIcon type={'menu'} size="m" aria-hidden="true" />
            </EuiHeaderSectionItemButton>
          }
          onClose={() => setNavIsOpen(false)}
        >
          <EuiCollapsibleNavGroup>
            <a href="#">Link A</a>
          </EuiCollapsibleNavGroup>
        </EuiCollapsibleNav>
      );
      // No need to toggle…
      const collapsibleNavBeta = (
        <EuiCollapsibleNavBeta>
          <EuiCollapsibleNavBeta.Body>
            <EuiCollapsibleNavBeta.Item
              title="Items"
              isCollapsible={false}
              items={[
                { title: 'Item A', href: '#' },
                { title: 'Item B', href: '#' },
                { title: 'Item C', href: '#' },
              ]}
            />
          </EuiCollapsibleNavBeta.Body>
        </EuiCollapsibleNavBeta>
      );

      return (
        <>
          <EuiHeader position="fixed">
            {collapsibleNavVariant && (
              <EuiHeaderSection>
                {collapsibleNavVariant === 'beta'
                  ? collapsibleNavBeta
                  : collapsibleNav}
              </EuiHeaderSection>
            )}
            <EuiHeaderSection>
              <button
                data-test-subj="toggleFlyoutFromHeader"
                onClick={() => setIsOpen(!isOpen)}
              >
                Toggle flyout
              </button>
            </EuiHeaderSection>
          </EuiHeader>
          {isOpen ? (
            <EuiFlyout
              data-test-subj="flyoutSpec"
              onClose={() => setIsOpen(false)}
              {...rest}
            >
              {children}
            </EuiFlyout>
          ) : null}
        </>
      );
    };

    it('correctly focuses on the flyout wrapper when flyouts are toggled from headers', () => {
      cy.mount(<FlyoutWithHeader />);
      cy.get('[data-test-subj="toggleFlyoutFromHeader"]').click();
      cy.focused().should('have.class', 'euiFlyout');
    });

    it('automatically includes fixed EuiHeaders on the page as shards, including them in the tab rotation', () => {
      cy.mount(<FlyoutWithHeader />);
      cy.get('[data-test-subj="toggleFlyoutFromHeader"]').click();
      cy.repeatRealPress('Tab', 6);
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'toggleFlyoutFromHeader'
      );
    });

    it('includes EuiCollapsibleNavBeta items in tab rotation, inside EuiHeaders shards', () => {
      cy.viewport(800, 600);
      cy.mount(
        <FlyoutWithHeader collapsibleNavVariant="beta"> </FlyoutWithHeader>
      );
      cy.get('[data-test-subj="toggleFlyoutFromHeader"]').click();
      cy.repeatRealPress('Tab', 4);
      cy.focused().should('have.text', 'Item B');
      cy.repeatRealPress('Tab', 2);
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'toggleFlyoutFromHeader'
      );
    });

    /**
     * @todo this fails with React 18, but passes with previous versions
     * Focus behaviour is different in React 18, depending on whether 1 or more flyouts are open
     *
     * @see https://github.com/elastic/eui/pull/8325#discussion_r1973266414
     * @see https://github.com/elastic/eui/issues/8376
     */
    it.skip('includes EuiCollapsibleNav items in tab rotation, inside EuiHeaders shards', () => {
      cy.viewport(800, 600);
      cy.mount(
        <FlyoutWithHeader collapsibleNavVariant="default"> </FlyoutWithHeader>
      );
      // Open the collapsible nav
      // should be accessible by tabbing
      cy.get('[data-test-subj="toggleNavButton"]').click();
      cy.repeatRealPress('Tab', 2);
      cy.focused().should('have.text', 'Link A');
      cy.repeatRealPress('Tab', 1);
      cy.focused().should('have.attr', 'data-test-subj', 'toggleNavButton');
      // Open the flyout, without closing the collapsible nav;
      // nav should not be accessible by tabbing
      // though it's visible, behind the overlay
      cy.get('[data-test-subj="toggleFlyoutFromHeader"]').click();
      cy.realPress('Tab');
      cy.focused().should('not.have.text', 'Link A');
      cy.realPress('Tab');
      cy.focused().should('not.have.text', 'Link A');
      cy.realPress('Tab');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'toggleFlyoutFromHeader'
      );
    });

    it('does not shard fixed headers if `includeFixedHeadersInFocusTrap` is set to false', () => {
      cy.mount(<FlyoutWithHeader includeFixedHeadersInFocusTrap={false} />);
      cy.get('[data-test-subj="toggleFlyoutFromHeader"]').click();
      cy.repeatRealPress('Tab', 6);
      cy.focused().should('have.class', 'euiFlyout');
    });
  });

  describe('css variables', () => {
    const euiPushFlyoutOffsetInlineEnd = '--euiPushFlyoutOffsetInlineEnd';
    const euiPushFlyoutOffsetInlineStart = '--euiPushFlyoutOffsetInlineStart';

    it('sets the correct css variables for the flyout', () => {
      cy.mount(
        <Flyout
          type="push"
          hasTrigger={true}
          pushMinBreakpoint={'xs'}
          size={'100px'}
        />
      );

      cy.get(':root').cssVar(euiPushFlyoutOffsetInlineEnd).should('not.exist');
      cy.get(':root')
        .cssVar(euiPushFlyoutOffsetInlineStart)
        .should('not.exist');

      cy.get('[data-test-subj="flyoutSpecTrigger"]').click();

      cy.get(':root')
        .cssVar(euiPushFlyoutOffsetInlineStart)
        .should('not.exist');
      cy.get(':root')
        .cssVar(euiPushFlyoutOffsetInlineEnd)
        .should('eq', '100px');

      cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();

      cy.get(':root').cssVar(euiPushFlyoutOffsetInlineEnd).should('not.exist');
      cy.get(':root')
        .cssVar(euiPushFlyoutOffsetInlineStart)
        .should('not.exist');

      cy.mount(
        <Flyout
          type="push"
          hasTrigger={true}
          pushMinBreakpoint={'xs'}
          size={'100px'}
          side={'left'}
        />
      );

      cy.get('[data-test-subj="flyoutSpecTrigger"]').click();

      cy.get(':root')
        .cssVar(euiPushFlyoutOffsetInlineStart)
        .should('eq', '100px');
      cy.get(':root').cssVar(euiPushFlyoutOffsetInlineEnd).should('not.exist');
    });
  });
});
