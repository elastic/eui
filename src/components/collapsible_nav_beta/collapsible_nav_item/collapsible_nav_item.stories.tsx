/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiCollapsibleNavItem,
  EuiCollapsibleNavItemProps,
} from './collapsible_nav_item';

const meta: Meta<EuiCollapsibleNavItemProps> = {
  title: 'EuiCollapsibleNavItem',
  component: EuiCollapsibleNavItem,
};
export default meta;
type Story = StoryObj<EuiCollapsibleNavItemProps>;

export const Playground: Story = {
  args: {
    title: 'Home',
    titleElement: 'span',
    iconType: 'home',
    accordionProps: {
      initialIsOpen: true,
    },
    items: [
      {
        title: 'Child link one',
        href: '#',
      },
      {
        title: 'Child link two',
        href: '#',
        linkProps: { target: '_blank' },
      },
    ],
  },
};
