/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  EuiShimmeringText,
  EuiShimmeringTextProps,
} from './loading_shimmer_text';

const meta: Meta<EuiShimmeringTextProps> = {
  title: 'Display/EuiShimmeringText',
  component: EuiShimmeringText,
  args: {
    children: 'Planning next moves',
    isLoading: true,
  },
};

export default meta;
type Story = StoryObj<EuiShimmeringTextProps>;

export const Playground: Story = {};

export const ThinkingStates: Story = {
  args: {
    children: undefined,
    texts: [
      'Planning next moves',
      'Reading the files',
      'Running a command',
      'Writing the changes',
    ],
  },
};
