/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { sleep } from '../../test';
import { EuiFlexGroup } from '../flex';
import { EuiButton } from '../button';
import { EuiToolTip, EuiToolTipProps } from './tool_tip';

const meta: Meta<EuiToolTipProps> = {
  title: 'Display/EuiToolTip',
  component: EuiToolTip,
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

export default meta;
type Story = StoryObj<EuiToolTipProps>;

export const Playground: Story = {
  args: {
    // using autoFocus here as small trick to ensure showing the tooltip on load (e.g. for VRT)
    // TODO: uncomment loki play() interactions and remove autoFocus once #7747 is merged
    children: <EuiButton autoFocus>Tooltip trigger</EuiButton>,
    content: 'tooltip content',
  },
  play: lokiPlayDecorator(async () => {
    // Reduce VRT flakiness/screenshots before tooltip is fully visible
    await sleep(300);
  }),
};

/**
 * VRT only stories
 */

export const DarkMode: Story = {
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
  ...Playground,
  args: {
    ...Playground.args,
    position: 'bottom',
  },
};

export const HighContrastMode: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
  ...Playground,
  args: {
    ...Playground.args,
    position: 'left',
  },
};
