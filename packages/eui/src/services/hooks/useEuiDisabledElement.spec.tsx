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

import React from 'react';

import { EuiFlexGroup } from '../../components/flex';
import { EuiButtonPropsForButton } from '../../components/button/button';
import { useEuiDisabledElement } from './useEuiDisabledElement';

const Button = ({ isDisabled = false, hasAriaDisabled = false, ...rest }) => {
  const disabledProps = useEuiDisabledElement<HTMLButtonElement>({
    isDisabled: isDisabled,
    hasAriaDisabled: hasAriaDisabled,
    ...rest,
  });

  return (
    <button
      {...rest}
      {...(disabledProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      button label
    </button>
  );
};

const Component = (
  props: EuiButtonPropsForButton & { hasAriaDisabled?: boolean }
) => (
  <EuiFlexGroup gutterSize="s">
    <Button {...props} data-test-subj="button-1">
      Button 1
    </Button>
    <Button {...props} data-test-subj="button-2">
      Button 2
    </Button>
    <Button {...props} data-test-subj="button-3">
      Button 3
    </Button>
  </EuiFlexGroup>
);

describe('useEuiDisabledElement()', () => {
  describe('`hasAriaDisabled=false`', () => {
    describe('`isDisabled=false`', () => {
      it('renders enabled buttons', () => {
        cy.realMount(<Component />);

        cy.get('[data-test-subj="button-1"]').should('be.euiEnabled');
        cy.get('[data-test-subj="button-2"]').should('be.euiEnabled');
        cy.get('[data-test-subj="button-3"]').should('be.euiEnabled');
      });

      it('triggers events correctly', () => {
        const onClickSpy = cy.spy().as('onClickSpy');
        const onMouseDownSpy = cy.spy().as('onMouseDownSpy');
        const onKeyDownSpy = cy.spy().as('onKeyDownSpy');

        cy.realMount(
          <Component
            onClick={onClickSpy}
            onMouseDown={onMouseDownSpy}
            onKeyDown={onKeyDownSpy}
          />
        );

        cy.get('[data-test-subj="button-1"]').should('be.euiEnabled');
        cy.get('[data-test-subj="button-2"]').should('be.euiEnabled');
        cy.get('[data-test-subj="button-3"]').should('be.euiEnabled');

        const button = cy.get('[data-test-subj="button-1"]');

        button.realClick();
        cy.get('@onClickSpy').should('have.been.called');

        button.realMouseDown();
        cy.get('@onMouseDownSpy').should('have.been.called');

        button.realPress('Enter');
        cy.get('@onKeyDownSpy').should('have.been.called');
      });
    });

    describe('`isDisabled=true`', () => {
      it('renders disabled buttons', () => {
        cy.realMount(<Component isDisabled />);

        cy.get('[data-test-subj="button-1"]').should('be.euiDisabled');
        cy.get('[data-test-subj="button-2"]').should('be.euiDisabled');
        cy.get('[data-test-subj="button-3"]').should('be.euiDisabled');
      });
    });
  });

  describe('`hasAriaDisabled=true`', () => {
    describe('`isDisabled=false`', () => {
      it('renders enabled buttons', () => {
        cy.realMount(<Component />);

        cy.get('[data-test-subj="button-1"]').should('be.euiEnabled');
        cy.get('[data-test-subj="button-2"]').should('be.euiEnabled');
        cy.get('[data-test-subj="button-3"]').should('be.euiEnabled');
      });

      it('triggers events', () => {
        const onClickSpy = cy.spy().as('onClickSpy');

        const onMouseDownSpy = cy.spy().as('onMouseDownSpy');
        const onMouseUpSpy = cy.spy().as('onMouseUpSpy');

        const onPointerDownSpy = cy.spy().as('onPointerDownSpy');
        const onPointerUpSpy = cy.spy().as('onPointerUpSpy');

        const onTouchStartSpy = cy.spy().as('onTouchStartSpy');
        const onTouchEndSpy = cy.spy().as('onTouchEndSpy');

        const onKeyDownSpy = cy.spy().as('onKeyDownSpy');
        const onKeyUpSpy = cy.spy().as('onKeyUpSpy');
        const onKeyPressSpy = cy.spy().as('onKeyPressSpy');

        cy.realMount(
          <Component
            onClick={onClickSpy}
            onMouseDown={onMouseDownSpy}
            onMouseUp={onMouseUpSpy}
            onPointerDown={onPointerDownSpy}
            onPointerUp={onPointerUpSpy}
            onTouchStart={onTouchStartSpy}
            onTouchEnd={onTouchEndSpy}
            onKeyDown={onKeyDownSpy}
            onKeyUp={onKeyUpSpy}
            onKeyPress={onKeyPressSpy}
          />
        );

        let button = cy.get('[data-test-subj="button-1"]');

        button.realClick();
        cy.get('@onClickSpy').should('have.been.called');

        button.realMouseDown();
        button.realMouseUp();
        cy.get('@onMouseDownSpy').should('have.been.called');
        cy.get('@onMouseUpSpy').should('have.been.called');

        button = cy.get('[data-test-subj="button-2"]');

        button.trigger('pointerdown');
        button.trigger('pointerup');
        cy.get('@onPointerDownSpy').should('have.been.called');
        cy.get('@onPointerUpSpy').should('have.been.called');

        button.trigger('touchstart');
        button.trigger('touchend');
        cy.get('@onTouchStartSpy').should('have.been.called');
        cy.get('@onTouchEndSpy').should('have.been.called');

        button = cy.get('[data-test-subj="button-3"]');

        button.focus();
        button.realPress('Enter');
        cy.get('@onKeyDownSpy').should('have.been.called');
        cy.get('@onKeyPressSpy').should('have.been.called');
        cy.get('@onKeyUpSpy').should('have.been.called');
      });
    });

    describe('`isDisabled=true`', () => {
      it('renders disabled buttons', () => {
        cy.realMount(<Component isDisabled hasAriaDisabled />);

        cy.get('[data-test-subj="button-1"]').should('be.euiDisabled');
        cy.get('[data-test-subj="button-2"]').should('be.euiDisabled');
        cy.get('[data-test-subj="button-3"]').should('be.euiDisabled');
      });

      it('focuses buttons', () => {
        cy.realMount(<Component isDisabled hasAriaDisabled />);

        cy.get('[data-test-subj="button-1"]').focus();
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'button-2');
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'button-3');
      });

      it('does not trigger events', () => {
        const onClickSpy = cy.spy().as('onClickSpy');

        const onMouseDownSpy = cy.spy().as('onMouseDownSpy');
        const onMouseUpSpy = cy.spy().as('onMouseUpSpy');

        const onPointerDownSpy = cy.spy().as('onPointerDownSpy');
        const onPointerUpSpy = cy.spy().as('onPointerUpSpy');

        const onTouchStartSpy = cy.spy().as('onTouchStartSpy');
        const onTouchEndSpy = cy.spy().as('onTouchEndSpy');

        const onKeyDownSpy = cy.spy().as('onKeyDownSpy');
        const onKeyUpSpy = cy.spy().as('onKeyUpSpy');
        const onKeyPressSpy = cy.spy().as('onKeyPressSpy');

        cy.realMount(
          <Component
            isDisabled
            hasAriaDisabled
            onClick={onClickSpy}
            onMouseDown={onMouseDownSpy}
            onMouseUp={onMouseUpSpy}
            onPointerDown={onPointerDownSpy}
            onPointerUp={onPointerUpSpy}
            onTouchStart={onTouchStartSpy}
            onTouchEnd={onTouchEndSpy}
            onKeyDown={onKeyDownSpy}
            onKeyUp={onKeyUpSpy}
            onKeyPress={onKeyPressSpy}
          />
        );

        let button = cy.get('[data-test-subj="button-1"]');

        button.realClick();
        cy.get('@onClickSpy').should('not.have.been.called');

        button.realMouseDown();
        button.realMouseUp();
        cy.get('@onMouseDownSpy').should('not.have.been.called');
        cy.get('@onMouseUpSpy').should('not.have.been.called');

        button = cy.get('[data-test-subj="button-2"]');

        button.trigger('pointerdown');
        button.trigger('pointerup');
        cy.get('@onPointerDownSpy').should('not.have.been.called');
        cy.get('@onPointerUpSpy').should('not.have.been.called');

        button.trigger('touchstart');
        button.trigger('touchend');
        cy.get('@onTouchStartSpy').should('not.have.been.called');
        cy.get('@onTouchEndSpy').should('not.have.been.called');

        button = cy.get('[data-test-subj="button-3"]');

        button.focus();
        button.realPress('Enter');
        cy.get('@onKeyDownSpy').should('not.have.been.called');
        cy.get('@onKeyPressSpy').should('not.have.been.called');
        cy.get('@onKeyUpSpy').should('not.have.been.called');
      });

      it('triggers allowed key events', () => {
        const onKeyDownSpy = cy.spy().as('onKeyDownSpy');

        cy.realMount(
          <Component isDisabled hasAriaDisabled onKeyDown={onKeyDownSpy} />
        );

        const button = cy.get('[data-test-subj="button-1"]');

        button.focus();
        button.realPress('Tab');
        cy.get('@onKeyDownSpy').should('have.been.called');
        cy.focused().realPress('Escape');
        cy.get('@onKeyDownSpy').should('have.been.called');
      });
    });
  });
});
