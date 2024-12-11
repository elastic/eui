/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiProgress, COLORS } from './progress';

const meta: Meta<typeof EuiProgress> = {
  title: 'Display/EuiProgress',
  component: EuiProgress,
  argTypes: {
    color: { control: 'select', options: [...COLORS] },
    // for quicker/easier QA
    label: { control: 'text' },
    value: { control: 'number' },
    valueText: { control: 'boolean' },
  },
  args: {
    color: 'success',
    size: 'm',
    position: 'static',
    valueText: false,
  },
};

export default meta;
type Story = StoryObj<typeof EuiProgress>;

export const Determinate: Story = {
  args: {
    label: '',
    value: 70,
    max: 100,
  },
};

export const Indeterminate: Story = {
  parameters: {
    controls: { include: ['color', 'position', 'size', 'aria-label'] },
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    ...Determinate.args,
    size: 'xs',
    color: 'primary',
  },
};
