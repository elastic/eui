/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiTokenProps } from './token_types';
import { EuiToken } from './token';

const meta: Meta<EuiTokenProps> = {
  title: 'Display/EuiToken',
  component: EuiToken,
  argTypes: {
    iconType: { control: 'text' },
  },
  args: {
    size: 's',
    fill: 'light',
    shape: 'circle',
    // set up for easier testing/QA
    title: '',
  },
};

export default meta;
type Story = StoryObj<EuiTokenProps>;

export const Playground: Story = {
  args: {
    iconType: 'tokenAlias',
  },
};
