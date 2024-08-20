/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiTimelineItem, EuiTimelineItemProps } from './timeline_item';

const meta: Meta<EuiTimelineItemProps> = {
  title: 'Display/EuiTimeline/EuiTimelineItem',
  component: EuiTimelineItem,
  argTypes: {
    // re-adding type descriptions that are not resolved (removed in Omit<> type)
    children: {
      description: 'Accepts any node. But preferably `EuiPanel`',
      // @ts-ignore - overwritting to ensure correct expected type
      type: 'ReactNode',
    },
    icon: {
      description:
        "Any `ReactNode`, but preferably `EuiAvatar`, or a string as an `EuiIcon['type']`.",
      // @ts-ignore - overwritting to ensure correct expected type
      type: 'ReactNode | IconType',
    },
    iconAriaLabel: {
      description:
        'Specify an `aria-label` for the icon when passed as an `IconType`. If no `aria-label` is passed we assume the icon is purely decorative.',
    },
  },
  args: {
    verticalAlign: 'center',
    iconAriaLabel: '',
  },
};

export default meta;
type Story = StoryObj<EuiTimelineItemProps>;

export const Playground: Story = {
  args: {
    children: 'timeline item',
    icon: 'email',
  },
};
