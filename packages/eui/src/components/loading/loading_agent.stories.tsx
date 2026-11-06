/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EuiAgentLoader, EuiAgentLoaderProps, SIZES } from './loading_agent';

const meta: Meta<EuiAgentLoaderProps> = {
  title: 'Display/EuiAgentLoader',
  component: EuiAgentLoader,
  argTypes: {
    size: { options: SIZES },
  },
  args: {
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiAgentLoaderProps>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      {SIZES.map((size) => (
        <EuiAgentLoader key={size} size={size} />
      ))}
    </div>
  ),
};
