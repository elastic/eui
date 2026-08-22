/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { EuiAccordion, EuiAccordionProps } from './accordion';
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader } from '../flyout';
import { EuiTitle } from '../title';
import React, { StrictMode } from 'react';

const meta: Meta<EuiAccordionProps> = {
  title: 'Layout/EuiAccordion',
  component: EuiAccordion,
  argTypes: {
    forceState: {
      options: [undefined, 'closed', 'open'],
    },
  },
  args: {
    // Component defaults
    role: 'group',
    element: 'div',
    buttonElement: 'button',
    arrowDisplay: 'left',
    borders: 'none',
    initialIsOpen: false,
    isDisabled: false,
    isLoading: false,
    isLoadingMessage: '',
  },
};

export default meta;
type Story = StoryObj<EuiAccordionProps>;

export const Playground: Story = {
  args: {
    buttonContent: 'Accordion toggle content',
    children: 'Accordion content',
  },
};

export const StrictModeInitialOpen: Story = {
  args: {
    id: 'accordion-strict-mode',
    initialIsOpen: true,
    buttonContent: 'Open on load',
    children: (
      <div
        css={({ euiTheme }) => ({
          padding: 16,
          background: euiTheme.colors.backgroundBaseSubdued,
        })}
      >
        This content should be visible immediately.
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <StrictMode>
        <Story />
      </StrictMode>
    ),
  ],
};

/**
 * Reproduction for https://github.com/elastic/eui/issues/9029
 */
export const StrictModeInFlyout: Story = {
  render: () => (
    <StrictMode>
      <EuiFlyout onClose={() => {}} aria-labelledby="flyout-9029-title">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyout-9029-title">Flyout with accordion</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiAccordion
            id="accordion-in-flyout-9029"
            initialIsOpen
            buttonContent="Accordion in flyout"
          >
            <div
              css={({ euiTheme }) => ({
                padding: 16,
                background: euiTheme.colors.backgroundBaseSubdued,
              })}
            >
              Accordion content inside flyout (issue #9029)
            </div>
          </EuiAccordion>
        </EuiFlyoutBody>
      </EuiFlyout>
    </StrictMode>
  ),
};
