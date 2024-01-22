/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiCodeBlock, EuiCodeBlockProps } from './code_block';

const meta: Meta<EuiCodeBlockProps> = {
  title: 'EuiCodeBlock',
  component: EuiCodeBlock,
  argTypes: {
    lineNumbers: { control: 'boolean' },
    overflowHeight: { control: 'number' },
  },
  args: {
    // Component defaults
    fontSize: 's',
    paddingSize: 'l',
    whiteSpace: 'pre-wrap',
    lineNumbers: false,
    isCopyable: false,
    isVirtualized: false,
    transparentBackground: false,
  },
};

export default meta;
type Story = StoryObj<EuiCodeBlockProps>;

export const Playground: Story = {
  args: {
    children: `<p>
  <!-- Hello world -->
</p>`,
  },
};
