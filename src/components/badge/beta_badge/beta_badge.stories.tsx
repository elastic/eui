/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiBetaBadge, EuiBetaBadgeProps } from './beta_badge';

const meta: Meta<EuiBetaBadgeProps> = {
  title: 'EuiBetaBadge',
  component: EuiBetaBadge,
  argTypes: {
    iconType: { control: 'text' },
    tooltipContent: { control: 'text' },
  },
  args: {
    // Component defaults
    color: 'hollow',
    size: 'm',
    alignment: 'baseline',
    tooltipPosition: 'top',
  },
};

export default meta;
type Story = StoryObj<EuiBetaBadgeProps>;

export const Playground: Story = {
  args: {
    label: 'Beta',
  },
};
