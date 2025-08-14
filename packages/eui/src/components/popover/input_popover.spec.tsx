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

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';

import { EuiFieldText, EuiTextArea } from '../../components';

import { EuiInputPopover, EuiInputPopoverProps } from './input_popover';

describe('EuiPopover', () => {
  // The viewport width matters for position assertions, so ensure it's explicitly defined
  beforeEach(() => {
    cy.viewport(500, 300);
  });

  const props = {
    input: <EuiFieldText />,
    closePopover: () => {},
    isOpen: true,
  };

  it('renders a popover with equal width to the input', () => {
    cy.mount(<EuiInputPopover {...props}>Popover content</EuiInputPopover>);
    cy.get('[data-popover-panel]')
      .should('have.css', 'left', '0px')
      .invoke('outerWidth')
      .should('equal', 400);
  });

  it('respects `panelMinWidth`', () => {
    cy.mount(
      <EuiInputPopover {...props} panelMinWidth={450}>
        Popover content
      </EuiInputPopover>
    );
    cy.get('[data-popover-panel]').invoke('outerWidth').should('equal', 450);
  });

  it('respects `anchorPosition`', () => {
    cy.mount(
      <div className="eui-textRight">
        <EuiInputPopover
          {...props}
          display="inline-block"
          input={<EuiFieldText controlOnly={true} style={{ width: 150 }} />}
          panelMinWidth={300}
          anchorPosition="downRight"
        >
          Popover content
        </EuiInputPopover>
      </div>
    );
    cy.get('[data-popover-panel]').should('have.css', 'left', '200px');
  });

  describe('on input resize', () => {
    const initialWidth = 250;
    const resizeProps = {
      ...props,
      display: 'inline-block',
      input: (
        <EuiTextArea
          rows={1}
          resize="horizontal"
          style={{ width: initialWidth }}
        />
      ),
    };
    const resizeInput = (width: number) => {
      // Cypress doesn't seem to have a way to mimic manual dragging/resizing, so we'll do it programmatically
      cy.get('textarea').then(($el) => ($el[0].style.width = `${width}px`));
    };

    it('repositions and resizes the popover to match the input', () => {
      cy.mount(
        <div className="eui-textCenter">
          <EuiInputPopover {...resizeProps}>Popover content</EuiInputPopover>
        </div>
      );
      cy.get('[data-popover-panel]')
        .should('have.css', 'inline-size', '250px')
        .should('have.css', 'left', '125px');

      resizeInput(150);

      cy.get('[data-popover-panel]')
        .should('have.css', 'inline-size', '150px')
        .should('have.css', 'left', '175px');
    });

    it('repositions the popover even when the popover width does not change', () => {
      cy.mount(
        <div className="eui-textCenter">
          <EuiInputPopover
            {...resizeProps}
            panelMinWidth={initialWidth}
            anchorPosition="downRight"
          >
            Popover content
          </EuiInputPopover>
        </div>
      );
      cy.get('[data-popover-panel]')
        .should('have.css', 'inline-size', '250px')
        .should('have.css', 'left', '125px');

      resizeInput(100);

      cy.get('[data-popover-panel]')
        .should('have.css', 'inline-size', '250px')
        .should('have.css', 'left', '50px');
    });

    it('calls `onPanelResize`', () => {
      const onPanelResize = cy.stub().as('onPanelResize');
      cy.realMount(
        <EuiInputPopover {...resizeProps} onPanelResize={onPanelResize} />
      );
      cy.get('@onPanelResize').should('have.been.calledWith', 250);

      resizeInput(200);
      cy.get('@onPanelResize').should('have.been.calledWith', 200);
    });
  });

  describe('focus/tab management', () => {
    const StatefulInputPopover: FunctionComponent<
      PropsWithChildren & Partial<EuiInputPopoverProps>
    > = ({ children, ...rest }) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <EuiInputPopover
          {...rest}
          isOpen={isOpen}
          closePopover={() => setIsOpen(false)}
          input={<EuiFieldText data-test-subj="input" autoFocus />}
        >
          {children}
        </EuiInputPopover>
      );
    };

    describe('with focus trap enabled', () => {
      it('auto focuses popover content', () => {
        cy.mount(
          <StatefulInputPopover>
            <button data-test-subj="popover">Focusable popover content</button>
          </StatefulInputPopover>
        );

        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'popover');
        cy.get('[data-popover-panel]').should('exist');
      });

      it('automatically closes the popover when users tab off the last item in the popover', () => {
        cy.mount(
          <StatefulInputPopover>
            <button data-test-subj="one">one</button>
            <button data-test-subj="two">two</button>
          </StatefulInputPopover>
        );

        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'one');
        cy.realPress('Tab');
        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'two');
        cy.realPress('Tab');

        cy.get('[data-popover-panel]').should('not.exist');
      });

      it('does not close the popover when users Shift+Tab from the last item in the popover', () => {
        cy.mount(
          <StatefulInputPopover>
            <button data-test-subj="one">one</button>
            <button data-test-subj="two">two</button>
          </StatefulInputPopover>
        );

        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'one');
        cy.realPress('Tab');
        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'two');
        cy.realPress(['Shift', 'Tab']);
        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'one');
        cy.get('[data-popover-panel]').should('exist');
      });
    });

    describe('with focus trap disabled', () => {
      it('does not auto focus popover content', () => {
        cy.mount(
          <StatefulInputPopover disableFocusTrap={true}>
            <button data-test-subj="popover">Focusable popover content</button>
          </StatefulInputPopover>
        );
        cy.wait(100); // wait a tick to prevent false positives

        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'input');
        cy.get('[data-popover-panel]').should('exist');
      });

      it('behaves with normal popover focus trap/tab behavior if `ownFocus` is set to true', () => {
        cy.mount(
          <>
            <StatefulInputPopover disableFocusTrap={true} ownFocus={true}>
              <button data-test-subj="one">one</button>
              <button data-test-subj="two">two</button>
            </StatefulInputPopover>
          </>
        );

        cy.get('[data-test-subj="one"]').click();
        // Should not close the popover
        cy.realPress('Tab');
        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'two');
        // Should cycle back to the beginning of the focus trap
        cy.repeatRealPress('Tab', 2);
        cy.focused().invoke('attr', 'data-test-subj').should('eq', 'one');
      });
    });
  });

  describe('closeOnScroll', () => {
    const ScrollAllTheThings = () => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <div style={{ display: 'flex' }}>
          <div style={{ height: '150vh', margin: 10 }}>
            <EuiInputPopover
              closeOnScroll={true}
              isOpen={isOpen}
              closePopover={() => setIsOpen(false)}
              input={
                <EuiTextArea
                  data-test-subj="inputWithScroll"
                  onClick={() => setIsOpen(true)}
                  rows={1}
                  defaultValue={`hello\nworld`}
                />
              }
            >
              <div
                style={{ height: 100, overflow: 'auto' }}
                data-test-subj="popoverWithScroll"
              >
                <div style={{ height: 400 }}>Popover content</div>
              </div>
            </EuiInputPopover>
          </div>
          <div
            style={{ height: 100, overflow: 'auto', width: 100, margin: 10 }}
            data-test-subj="scrollingSibling"
          >
            <div style={{ height: 200, backgroundColor: 'pink' }} />
          </div>
        </div>
      );
    };

    it('closes the popover when the user scrolls outside of the component', () => {
      cy.mount(<ScrollAllTheThings />);

      // Scrolling the input or popover should not close the popover
      cy.get('[data-test-subj="inputWithScroll"]').scrollTo('bottom');
      cy.get('[data-popover-panel]').should('exist');

      // Scrolling an element that doesn't contain/affect the input should not close the popover
      cy.get('[data-test-subj="scrollingSibling"]').scrollTo('bottom');
      cy.get('[data-popover-panel]').should('exist');

      cy.get('[data-test-subj="popoverWithScroll"]').scrollTo('bottom');
      cy.wait(500); // Wait a tick for false positives
      cy.get('[data-popover-panel]').should('exist');

      // Scrolling the actual body should close the popover
      cy.scrollTo('bottom');
      cy.get('[data-popover-panel]').should('not.exist');

      // Popover should be able to re-opened after close
      cy.get('[data-test-subj="inputWithScroll"]').click();
      cy.get('[data-popover-panel]').should('exist');
    });
  });
});
