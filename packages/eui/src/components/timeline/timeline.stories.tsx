/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiTimeline, EuiTimelineProps } from './timeline';

const meta: Meta<EuiTimelineProps> = {
  title: 'Display/EuiTimeline/EuiTimeline',
  component: EuiTimeline,
  args: {
    gutterSize: 'xl',
  },
};

export default meta;
type Story = StoryObj<EuiTimelineProps>;

export const Playground: Story = {
  args: {
    items: [
      {
        icon: 'pencil',
        children: 'Project renamed to "Revenue Dashboard".',
      },
      {
        icon: 'email',
        children: (
          <>
            <strong>dev@elastic.co</strong> was invited to the project.
          </>
        ),
      },
      {
        icon: 'folderClosed',
        children: 'The project was archived.',
      },
    ],
  },
};

export const HighContrast: Story = {
  ...Playground,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
