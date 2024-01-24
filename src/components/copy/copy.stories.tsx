/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiButton } from '../button';

import { EuiCopy, EuiCopyProps } from './copy';

const meta: Meta<EuiCopyProps> = {
  title: 'EuiCopy',
  component: EuiCopy,
  argTypes: {
    afterMessage: { control: 'text' },
    beforeMessage: { control: 'text' },
  },
  args: {
    // Component defaults
    afterMessage: 'Copied',
  },
};

export default meta;
type Story = StoryObj<EuiCopyProps>;

export const Playground: Story = {
  args: {
    textToCopy: 'Hello world',
    children: (copy) => <EuiButton onClick={copy}>Click to copy</EuiButton>,
  },
};
