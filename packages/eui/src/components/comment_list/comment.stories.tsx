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

import { EuiComment, EuiCommentProps } from './comment';

/**
 * Shared comment story utils/arg types
 */

export const _eventColorArgType = {
  options: [
    undefined,
    'subdued',
    'transparent',
    'plain',
    'highlighted',
    'warning',
    'danger',
    'success',
    'primary',
    'accent',
  ],
  control: { type: 'radio' },
} as const;
export const _actionsExampleArgType = {
  control: 'radio',
  options: ['Example action', 'No actions'],
  mapping: {
    'Example action': (
      <EuiButtonIcon
        title="Custom action"
        aria-label="Custom action"
        color="text"
        iconType="copy"
      />
    ),
    'No actions': null,
  },
  defaultValue: 'Example action',
} as const;

/**
 * Rendered stories
 */

const meta: Meta<EuiCommentProps> = {
  title: 'Display/EuiComment/EuiComment',
  component: EuiComment,
  argTypes: {
    eventColor: _eventColorArgType,
    actions: _actionsExampleArgType,
  },
  excludeStories: /^_/, // Do not render the shared argTypes as stories
};

export default meta;
type Story = StoryObj<EuiCommentProps>;

export const Playground: Story = {
  args: {
    username: 'User',
    timelineAvatar: 'user',
    event: 'posted',
    eventIcon: 'pencil',
    timestamp: 'on Jan 1, 2020',
    actions: 'Example action',
    children: 'A user message or any custom component',
  },
};
