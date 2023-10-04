/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiCommentEvent, EuiCommentEventProps } from './comment_event';
import { EuiText } from '../text';
import { EuiButtonIcon } from '../button';

const meta: Meta<EuiCommentEventProps> = {
  title: 'EuiCommentEvent',
  component: EuiCommentEvent,
  args: {
    username: 'janed',
  },
};

export default meta;
type Story = StoryObj<EuiCommentEventProps>;

export const Playground: Story = {
  args: {
    event: 'added a comment',
    eventIcon: 'faceHappy',
    eventIconAriaLabel: 'Happy face comment icon',
    timestamp: 'on Jan 1, 2020',
    children: (
      <EuiText size="s">
        <p>
          Far out in the uncharted backwaters of the unfashionable end of the
          western spiral arm of the Galaxy lies a small unregarded yellow sun.
        </p>
      </EuiText>
    ),
    actions: (
      <EuiButtonIcon
        title="Custom action"
        aria-label="Custom action"
        color="text"
        iconType="copy"
      />
    ),
  },
};
