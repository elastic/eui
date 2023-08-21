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

const componentDefaults = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  truncation: 'middle',
} as const;

export const Playground: Story = {
  render: (props) => (
    <div css={{ inlineSize: props.width }}>
      <EuiTextTruncate {...props}>{(text) => <>{text}</>}</EuiTextTruncate>
    </div>
  ),
  args: {
    ...componentDefaults,
    truncationOffset: 0,
    ellipsis: '...',
    width: 200,
  },
};

export const ResizeObserver: Story = {
  render: (props) => (
    <>
      <i>
        Drag the corner of the text to resize, and look in the console log to
        see the reported width
      </i>
      <br />
      <br />
      {/* // Width here is just for testing resize behavior and isn't meant to be RTL compliant */}
      <div css={{ width: 200, overflow: 'auto', resize: 'horizontal' }}>
        <EuiTextTruncate {...props}>{(text) => text}</EuiTextTruncate>
      </div>
    </>
  ),
  args: {
    ...componentDefaults,
    onResize: console.log,
  },
  argTypes: {
    width: { control: false },
  },
};
