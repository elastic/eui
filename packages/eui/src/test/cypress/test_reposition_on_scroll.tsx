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

type ComponentName = 'EuiToolTip' | 'EuiPopover';

interface RepositionTestConfig {
  shouldReposition: boolean;
  propValue?: boolean;
  componentDefaultValue?: boolean;
  componentName: ComponentName;
  triggerSelector: string;
  panelSelector: string;
  renderComponent: (props: {
    repositionOnScroll?: boolean;
  }) => React.ReactElement;
}

export const testRepositionOnScroll = ({
  shouldReposition,
  propValue,
  componentDefaultValue,
  componentName,
  triggerSelector,
  panelSelector,
  renderComponent,
}: RepositionTestConfig) => {
  const repositionProps = {
    repositionOnScroll: typeof propValue === 'boolean' ? propValue : undefined,
  };

  const providerProps =
    typeof componentDefaultValue === 'boolean'
      ? {
          providerProps: {
            componentDefaults: {
              [componentName]: { repositionOnScroll: componentDefaultValue },
            },
          },
        }
      : undefined;

  cy.mount(
    <>
      <div style={{ height: '200vh' }} />
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
      >
        {renderComponent(repositionProps)}
      </div>
    </>,
    providerProps
  );

  cy.get(triggerSelector).click();

  // Wait for positioning to finish
  cy.get(panelSelector).as('panel').should('exist').waitForPositionToSettle();

  cy.get('@panel').then(($panel) => {
    const initialRect = $panel[0].getBoundingClientRect();
    cy.scrollTo(0, 500);

    // Wait for re-positioning to finish
    cy.get('@panel')
      .waitForPositionToSettle()
      .then(($repositionedPanel) => {
        const finalRect = $repositionedPanel[0].getBoundingClientRect();
        if (shouldReposition) {
          expect(finalRect.top).to.equal(initialRect.top);
        } else {
          expect(finalRect.top).to.not.equal(initialRect.top);
        }
      });
  });
};
