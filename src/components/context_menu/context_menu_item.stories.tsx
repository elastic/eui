/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../.storybook/utils';

import {
  EuiContextMenuItem,
  EuiContextMenuItemProps,
} from './context_menu_item';

const meta: Meta<EuiContextMenuItemProps> = {
  title: 'EuiContextMenuItem',
  component: EuiContextMenuItem,
  argTypes: {
    ...disableStorybookControls(['buttonRef']),
    icon: { control: 'text' },
  },
  args: {
    // Component defaults
    size: 'm',
    layoutAlign: 'center',
    hasPanel: false,
    disabled: false,
  },
};

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
