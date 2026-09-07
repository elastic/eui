/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/html-vite';
import { fn } from 'storybook/test';

import { mountButton } from './mount';
import { postToHost } from '../mcp';
import {
  BUTTON_COLORS,
  BUTTON_DISPLAYS,
  BUTTON_SIZES,
  type EuiHtmlButtonProps,
} from './types';

const meta = {
  title: 'Button',
  args: {
    label: 'Button',
    color: 'primary',
    size: 'm',
    display: 'fill',
    onClick: fn(),
  },
  argTypes: {
    color: { control: 'select', options: [...BUTTON_COLORS] },
    size: { control: 'select', options: [...BUTTON_SIZES] },
    display: { control: 'select', options: [...BUTTON_DISPLAYS] },
  },
  render: (args) => {
    const host = document.createElement('div');

    mountButton(host, {
      ...args,
      onClick: (event) => {
        args.onClick?.(event);
        postToHost('ui/message', { text: args.label });
      },
    });

    return host;
  },
} satisfies Meta<EuiHtmlButtonProps>;

export default meta;
type Story = StoryObj<EuiHtmlButtonProps>;

export const Fill: Story = {};

export const Empty: Story = {
  args: { display: 'empty' },
};

export const Base: Story = {
  args: { display: 'base' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
