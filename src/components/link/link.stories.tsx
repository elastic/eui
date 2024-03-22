/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiLink, EuiLinkProps } from './link';

const meta: Meta<EuiLinkProps> = {
  title: 'Navigation/EuiLink',
  component: EuiLink,
  argTypes: {
    // setting up native HTML attributes to ensure they show up as control
    target: { control: { type: 'text' } },
    rel: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    color: 'primary',
    type: 'button',
  },
};

export default meta;
type Story = StoryObj<EuiLinkProps>;

export const Playground: Story = {
  args: {
    children: 'Elastic website',
    href: 'http://www.elastic.co/',
  },
};
