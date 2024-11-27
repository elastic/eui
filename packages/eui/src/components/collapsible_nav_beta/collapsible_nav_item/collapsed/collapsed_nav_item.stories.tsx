/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../../../.storybook/utils';
import { EuiCollapsedNavItem } from './collapsed_nav_item';

const meta: Meta<typeof EuiCollapsedNavItem> = {
  title:
    'Navigation/EuiCollapsibleNav (beta)/EuiCollapsibleNavItem/EuiCollapsedNavItem',
  component: EuiCollapsedNavItem,
  argTypes: {
    icon: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof EuiCollapsedNavItem>;

export const Link: Story = {
  render: ({ ...args }) => (
    <div className="eui-displayInlineBlock">
      <EuiCollapsedNavItem {...args} />
    </div>
  ),
  args: {
    title: 'Collapsed nav item',
    icon: 'home',
    href: '#',
    linkProps: { target: '_blank' },
  },
};
hideStorybookControls(Link, ['accordionProps', 'isCollapsible', 'items']);

export const Accordion: Story = {
  render: ({ ...args }) => (
    <div className="eui-displayInlineBlock">
      <EuiCollapsedNavItem {...args} />
    </div>
  ),
  args: {
    title: 'Collapsed nav item',
    icon: 'home',
    items: [
      {
        title: 'Popover link A',
        href: '#',
        linkProps: { target: '_blank' },
        onClick: (event) => event.preventDefault(),
      },
      { title: 'Popover link B', href: '#' },
      { title: 'Popover link C', href: '#' },
      {
        renderItem: ({ closePortals }) => (
          <button
            css={({ euiTheme }) => ({ padding: euiTheme.size.s })}
            onClick={(event) => closePortals?.(event)}
          >
            Custom button
          </button>
        ),
      },
    ],
  },
};
hideStorybookControls(Accordion, ['href', 'linkProps']);
