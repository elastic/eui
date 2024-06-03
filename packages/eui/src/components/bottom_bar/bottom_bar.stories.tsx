/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiBottomBar, EuiBottomBarProps } from './bottom_bar';

const meta: Meta<EuiBottomBarProps> = {
  title: 'Layout/EuiBottomBar',
  component: EuiBottomBar,
  argTypes: {
    top: { control: 'number' },
  },
  args: {
    // Component defaults
    bottom: 0,
    left: 0,
    right: 0,
    paddingSize: 'm',
    position: 'fixed',
    usePortal: true,
    affordForDisplacement: true,
  },
  parameters: {
    loki: {
      // Bottom bar content is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiBottomBarProps>;

export const Playground: Story = {
  args: {
    children: 'Bottom bar content',
  },
};
