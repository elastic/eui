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
import { VRT_SELECTORS, vrtPlayDecorator } from '../../../.storybook/vrt';
import { sleep } from '../../test';
import { EuiButton } from '../button';
import { EuiFlexGroup } from '../flex';
import {
  EuiToolTip,
  EuiToolTipProps,
  DEFAULT_TOOLTIP_OFFSET,
} from './tool_tip';

const meta: Meta<EuiToolTipProps> = {
  title: 'Display/EuiToolTip',
  component: EuiToolTip,
  parameters: {
    layout: 'fullscreen',
    vrt: {
      selector: VRT_SELECTORS.portal,
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
    disableScreenReaderOutput: false,
    offset: DEFAULT_TOOLTIP_OFFSET,
  },
};
enableFunctionToggleControls(meta, ['onMouseOut']);

export default meta;
type Story = StoryObj<EuiToolTipProps>;

export const Playground: Story = {
  args: {
    // using autoFocus here as small trick to ensure showing the tooltip on load (e.g. for VRT)
    children: <EuiButton autoFocus>Tooltip trigger</EuiButton>,
    content: 'tooltip content',
  },
  play: vrtPlayDecorator(async () => {
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
