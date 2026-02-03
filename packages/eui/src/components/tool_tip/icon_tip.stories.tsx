/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiFlexGroup } from '../flex';
import { ToolTipDelay } from './tool_tip';
import { EuiIconTip, EuiIconTipProps } from './icon_tip';

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
    iconProps: {
      // using autoFocus here as small trick to ensure showing the tooltip on load (e.g. for VRT)
      // TODO: exchange for loki play() interactions once #7735 is merged
      // @ts-ignore - temp. solution for storybook VRT testing
      autofocus: 'true',
    },
    delay: 'none' as ToolTipDelay, // passing a (not-yet) supported value to hackishly force a lower delay for VRT
  },
};
