/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiTimelineItemEvent,
  EuiTimelineItemEventProps,
} from './timeline_item_event';

const meta: Meta<EuiTimelineItemEventProps> = {
  title: 'Display/EuiTimeline/Subcomponents/EuiTimelineItemEvent',
  component: EuiTimelineItemEvent,
  decorators: [
    (Story, { args }) => (
      <div css={{ display: 'flex', width: '100%', height: '40px' }}>
        <Story {...args} />
      </div>
    ),
  ],
  args: {
    verticalAlign: 'center',
  },
};

export default meta;
type Story = StoryObj<EuiTimelineItemEventProps>;

export const Playground: Story = {
  args: {
    children: 'timeline item event',
  },
};
