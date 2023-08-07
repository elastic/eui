/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiCollapsedNavItem } from './collapsed_nav_item';

const meta: Meta<typeof EuiCollapsedNavItem> = {
  title: 'EuiCollapsedNavItem',
  component: EuiCollapsedNavItem,
  argTypes: {
    icon: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof EuiCollapsedNavItem>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <div className="eui-displayInlineBlock">
      <EuiCollapsedNavItem {...args} />
    </div>
  ),
  args: {
    title: 'Collapsed nav item',
    href: '#',
    linkProps: { target: '_blank' },
    icon: 'home',
    items: [
      { title: 'Popover link A', href: '#', linkProps: { target: '_blank' } },
      { title: 'Popover link B', href: '#' },
      { title: 'Popover link C', href: '#' },
    ],
  },
};
