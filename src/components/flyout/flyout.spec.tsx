/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';

import { EuiGlobalToastList } from '../toast';
import { EuiHeader } from '../header';
import { EuiFlyout } from './flyout';

const childrenDefault = (
  <>
    <button data-test-subj="itemA">Item A</button>
    <button data-test-subj="itemB">Item B</button>
    <button data-test-subj="itemC">Item C</button>
    <input data-test-subj="itemD" />
  </>
);

const Flyout = ({ children = childrenDefault, ...rest }) => {
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
      cy.repeatRealPress('Tab', 4);
      cy.focused().should('have.attr', 'data-test-subj', 'itemC');
      cy.repeatRealPress('Tab', 3);
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'euiFlyoutCloseButton'
      );
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
      cy.get('.euiOverlayMask')
        .realClick()
        .then(() => {
          expect(cy.get('[data-test-subj="flyoutSpec"]').should('not.exist'));
        });
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
        .realClick()
        .then(() => {
          expect(cy.get('[data-test-subj="flyoutSpec"]').should('not.exist'));
        });
    });
  });

  describe('EuiHeader shards', () => {
    const FlyoutWithHeader = ({ children = childrenDefault, ...rest }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <EuiHeader position="fixed">
            <button
              data-test-subj="toggleFlyoutFromHeader"
              onClick={() => setIsOpen(!isOpen)}
            >
              Toggle flyout
            </button>
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

    it('does not shard fixed headers if `includeFixedHeadersInFocusTrap` is set to false', () => {
      cy.mount(<FlyoutWithHeader includeFixedHeadersInFocusTrap={false} />);
      cy.get('[data-test-subj="toggleFlyoutFromHeader"]').click();
      cy.repeatRealPress('Tab', 6);
      cy.focused().should('have.class', 'euiFlyout');
    });
  });
});
