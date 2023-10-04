/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiPanel } from '../panel';

import {
  EuiTextBlockTruncate,
  EuiTextBlockTruncateProps,
} from './text_block_truncate';

const meta: Meta<EuiTextBlockTruncateProps> = {
  title: 'EuiTextBlockTruncate',
  component: EuiTextBlockTruncate,
  decorators: [
    (Story) => (
      <EuiPanel style={{ width: 200 }}>
        <Story />
      </EuiPanel>
    ),
  ],
};

export default meta;
type Story = StoryObj<EuiTextBlockTruncateProps>;

export const Playground: Story = {
  render: ({ children, ...args }) => (
    <EuiTextBlockTruncate {...args}>
      <p className="cloneElementDemo">{children}</p>
    </EuiTextBlockTruncate>
  ),
  args: {
    lines: 3,
    children:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};
