/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiHeaderLink, EuiHeaderLinkProps } from './header_link';
import { disableStorybookControls } from '../../../../.storybook/utils';

const meta: Meta<EuiHeaderLinkProps> = {
  title: 'EuiHeaderLink',
  component: EuiHeaderLink,
  argTypes: {
    flush: {
      options: [undefined, 'left', 'right', 'both'],
    },
    iconType: { control: 'text' },
    target: { control: 'text' },
  },
  // Component defaults
  args: {
    type: 'button',
    size: 'm',
    iconSize: 'm',
    iconSide: 'left',
    isDisabled: false,
    isLoading: false,
    isSelected: false,
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<EuiHeaderLinkProps>;

export const Playground: Story = {
  argTypes: disableStorybookControls(['buttonRef']),
  args: {
    children: 'Header link',
  },
};
