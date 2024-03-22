/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { disableStorybookControls } from '../../../.storybook/utils';
import { EuiListGroupItem, EuiListGroupItemProps } from './list_group_item';

const meta: Meta<EuiListGroupItemProps> = {
  title: 'Display/EuiListGroup/EuiListGroupItem',
  component: EuiListGroupItem,
  argTypes: {
    ...disableStorybookControls(['buttonRef']),
    iconType: {
      control: { type: 'text' },
    },
  },
  args: {
    size: 'm',
    color: 'text',
    showToolTip: false,
  },
};

export default meta;
type Story = StoryObj<EuiListGroupItemProps>;

export const Playground: Story = {
  args: {
    label: 'Link group item',
  },
};
