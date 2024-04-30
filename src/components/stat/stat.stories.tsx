/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiStat, EuiStatProps } from './stat';

const meta: Meta<EuiStatProps> = {
  title: 'Display/EuiStat',
  component: EuiStat,
  argTypes: {
    title: { control: 'text' },
  },
  args: {
    textAlign: 'left',
    titleColor: 'default',
    titleSize: 'l',
    titleElement: 'p',
    descriptionElement: 'p',
    isLoading: false,
    reverse: false,
  },
};

export default meta;
type Story = StoryObj<EuiStatProps>;

export const Playground: Story = {
  args: {
    title: '999,999',
    description: 'description',
  },
};
