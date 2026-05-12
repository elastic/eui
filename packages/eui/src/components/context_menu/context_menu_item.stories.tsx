/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../.storybook/utils';

import {
  EuiContextMenuItem,
  EuiContextMenuItemProps,
} from './context_menu_item';

const meta: Meta<EuiContextMenuItemProps> = {
  title: 'Navigation/EuiContextMenu/EuiContextMenuItem',
  component: EuiContextMenuItem,
  argTypes: {
    icon: { control: 'text' },
    external: {
      control: 'radio',
      options: [undefined, true, false],
    },
  },
  args: {
    // Component defaults
    layoutAlign: 'center',
    hasPanel: false,
    disabled: false,
    external: undefined,
  },
};
disableStorybookControls(meta, ['buttonRef']);

export default meta;
type Story = StoryObj<EuiContextMenuItemProps>;

export const Playground: Story = {
  args: {
    children: 'Context menu item',
    href: '',
    icon: 'link',
    toolTipContent: '',
  },
};

export const ExternalLink: Story = {
  parameters: {
    controls: {
      include: ['children', 'href', 'icon', 'target', 'external'],
    },
  },
  args: {
    children: 'Context menu item',
    href: '#',
    icon: 'link',
    target: '_blank',
  },
};

export const LayoutAlign: Story = {
  tags: ['vrt-only'],
  name: 'layoutAlign',
  args: {
    children:
      'Context menu item with a long label that should break into multiple lines',
    href: '',
    icon: 'link',
    toolTipContent: '',
  },
  render: (args) => (
    <div
      css={css`
        inline-size: 250px;
      `}
    >
      <EuiContextMenuItem {...args} layoutAlign="top" />
      <EuiContextMenuItem {...args} />
      <EuiContextMenuItem {...args} layoutAlign="bottom" />
    </div>
  ),
};
