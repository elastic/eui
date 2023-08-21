/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiTextTruncate, EuiTextTruncateProps } from './text_truncate';

const meta: Meta<EuiTextTruncateProps> = {
  title: 'EuiTextTruncate',
  component: EuiTextTruncate,
};

export default meta;
type Story = StoryObj<EuiTextTruncateProps>;

export const Playground: Story = {
  render: (props) => (
    <div css={{ inlineSize: props.width || 200 }}>
      <EuiTextTruncate {...props}>{(text) => <>{text}</>}</EuiTextTruncate>
    </div>
  ),
  args: {
    text: 'Lorem ipsum dolor sit amet, test test test test test test',
    truncation: 'middle',
    truncationOffset: 0,
    ellipsis: '...',
  },
};
