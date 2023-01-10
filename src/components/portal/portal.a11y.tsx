/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiEmptyPrompt } from '../empty_prompt';
import { EuiFocusTrap } from '../focus_trap';
import { EuiHorizontalRule } from '../horizontal_rule';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiPanel } from '../panel';
import { EuiPortal } from './portal';
import { EuiSpacer } from '../spacer';
import { EuiText, EuiTextColor } from '../text';
import { EuiTitle } from '../title';
import { euiCanAnimate } from '../../global_styling';
import { euiFlyoutSlideInRight } from '../flyout';
import { useEuiTheme } from '../../services';
import { css } from '@emotion/react';

const Portal = () => {
  const [isCustomFlyoutVisible, setIsCustomFlyoutVisible] = useState(false);
  const euiThemeContext = useEuiTheme();
  const euiTheme = euiThemeContext.euiTheme;

  const toggleCustomFlyout = () => {
    setIsCustomFlyoutVisible(!isCustomFlyoutVisible);
  };

  const closeCustomFlyout = () => {
    setIsCustomFlyoutVisible(false);
  };

  let customFlyout;

  if (isCustomFlyoutVisible) {
    customFlyout = (
      <EuiPortal>
        <EuiOverlayMask>
          <EuiFocusTrap onClickOutside={closeCustomFlyout}>
            <EuiPanel
              aria-labelledby="custom-heading-title"
              role="dialog"
              paddingSize="l"
              css={css`
                position: fixed;
                max-inline-size: 480px;
                max-block-size: auto;
                inset-inline-end: ${euiTheme.size.l};
                inset-block-start: ${euiTheme.size.l};
                block-size: calc(100% - (${euiTheme.size.l} * 2));

                ${euiCanAnimate} {
                  animation: ${euiFlyoutSlideInRight}
                    ${euiTheme.animation.normal}
                    ${euiTheme.animation.resistance};
                }
              `}
            >
              <div>
                {/* Flyout Header */}
                <div>
                  <EuiSpacer size="s" />
                  <EuiTitle size="m">
                    <h2 id="custom-heading-title">Let&apos;s get started!</h2>
                  </EuiTitle>

                  <EuiButtonIcon
                    iconType="cross"
                    aria-label="Close modal"
                    onClick={closeCustomFlyout}
                    color="text"
                    css={css`
                      position: absolute;
                      inset-block-start: ${euiTheme.size.base};
                      inset-inline-end: ${euiTheme.size.base};
                    `}
                  />

                  <EuiHorizontalRule />
                </div>

                {/* Flyout Body */}
                <div>
                  <div>
                    <EuiText size="s">
                      <p>
                        Elastic Observability provides a unified view into the
                        health and performance of your entire digital ecosystem.
                        With easy ingest of multiple kinds of data via pre-built
                        collectors for hundreds of data sources.
                      </p>

                      <EuiHorizontalRule />

                      <ol>
                        <li>
                          <h3>Step 1</h3>
                          <p>Select an ingestion method</p>

                          <EuiHorizontalRule />
                        </li>
                        <li>
                          <EuiTextColor color="subdued">
                            <h3>Step 2</h3>
                            <p>Select an ingestion method</p>
                          </EuiTextColor>

                          <EuiHorizontalRule />
                        </li>
                        <li>
                          <EuiTextColor color="subdued">
                            <h3>Step 3</h3>
                            <p>Select an ingestion method</p>
                          </EuiTextColor>

                          <EuiHorizontalRule />
                        </li>
                      </ol>
                    </EuiText>
                  </div>
                </div>
              </div>
            </EuiPanel>
          </EuiFocusTrap>
        </EuiOverlayMask>
      </EuiPortal>
    );
  }

  return (
    <div>
      <EuiEmptyPrompt
        color="subdued"
        iconType="logoObservability"
        iconColor="default"
        title={<h2>Observe my data</h2>}
        titleSize="xs"
        body={
          <p>
            Choose one of our many integrations to bring your data in, and start
            visualizing it.
          </p>
        }
        actions={<EuiButton onClick={toggleCustomFlyout}>View guide</EuiButton>}
      />
      {customFlyout}
    </div>
  );
};

describe('EuiPortal', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<Portal />);
    cy.get('div[data-relative-to-header="above"]').should('not.exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations after the portal is activated', () => {
      cy.get('button[type="button"]').contains('View guide').realClick();
      cy.get('div[data-relative-to-header="above"]').should('exist');
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations when the portal is opened by keyboard', () => {
      cy.realPress('Tab');
      cy.get('button[type="button"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('div[data-relative-to-header="above"]').should('exist');
      cy.get('button[aria-label="Close modal"]').should('have.focus');
      cy.checkAxe();
      cy.realPress('Enter');
      cy.get('div[data-relative-to-header="above"]').should('not.exist');
      cy.get('button[type="button"]').should('have.focus');
      cy.checkAxe();
    });
  });
});
