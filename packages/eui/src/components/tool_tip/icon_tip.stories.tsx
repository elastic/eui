/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor } from '@storybook/test';

import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { EuiFlexGroup } from '../flex';
import { EuiIconTip, EuiIconTipProps } from './icon_tip';
import { ToolTipDelay } from './tool_tip';

const meta: Meta<EuiIconTipProps> = {
  title: 'Display/EuiIconTip',
  component: EuiIconTip,
  parameters: {
    layout: 'fullscreen',
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  decorators: [
    (Story, { args }) => (
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        css={{
          blockSize: '100vh',
        }}
      >
        <Story {...args} />
      </EuiFlexGroup>
    ),
  ],
  args: {
    type: 'question',
    position: 'top',
    delay: 'regular',
    display: 'inlineBlock',
    // set up for easier testing/QA
    anchorClassName: '',
    repositionOnScroll: false,
    title: '',
  },
};
enableFunctionToggleControls(meta, ['onMouseOut']);
moveStorybookControlsToCategory(
  meta,
  [
    'anchorClassName',
    'anchorProps',
    'content',
    'children',
    'display',
    'onMouseOut',
    'repositionOnScroll',
    'title',
  ],
  'EuiToolTip props'
);

export default meta;
type Story = StoryObj<EuiIconTipProps>;

export const Playground: Story = {
  args: {
    content: 'tooltip content',
    // set delay to none to ensure tooltip appears immediately for the screenshot
    delay: 'none' as ToolTipDelay,
  },
  play: lokiPlayDecorator(async (context) => {
    const { step } = context;

    await step('focus icon to show tooltip with focus outline', async () => {
      // we need to focus the body first and then transition to the icon
      // to ensure the focus outline is visible
      document.body.focus();
      await new Promise((resolve) => setTimeout(resolve, 100));
      await userEvent.tab();

      await waitFor(() => {
        const tooltip = document.querySelector('[data-test-subj="tooltip"]');
        return tooltip !== null;
      });
    });
  }),
};
