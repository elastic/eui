/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiButtonIcon } from '../button';
import { EuiCommentEvent, EuiCommentEventProps } from './comment_event';

const meta: Meta<EuiCommentEventProps> = {
  title: 'EuiCommentEvent',
  component: EuiCommentEvent,
  args: {
    username: 'janed',
  },
  argTypes: {
    eventColor: {
      options: [
        undefined,
        'subdued',
        'transparent',
        'plain',
        'warning',
        'danger',
        'success',
        'primary',
        'accent',
      ],
      control: { type: 'radio' },
      defaultValue: undefined,
    },
  },
};

const exampleAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="copy"
  />
);

export default meta;
type Story = StoryObj<EuiCommentEventProps>;

export const Regular: Story = {
  args: {
    event: 'added a comment',
    eventIcon: 'faceHappy',
    eventIconAriaLabel: 'Happy face comment icon',
    timestamp: 'on Jan 1, 2020',
    actions: exampleAction,
    children:
      'Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small unregarded yellow sun.',
  },
};

export const Update: Story = {
  args: {
    event: 'added a comment',
    eventIcon: 'faceHappy',
    eventIconAriaLabel: 'Happy face comment icon',
    timestamp: 'on Jan 1, 2020',
    actions: exampleAction,
  },
};

export const Custom: Story = {
  args: {
    children:
      'No header or wrapper should appear if no event, icon, timestamp, or actions are passed',
  },
};
