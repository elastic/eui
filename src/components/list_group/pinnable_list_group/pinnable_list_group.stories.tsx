/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { moveStorybookControlsToCategory } from '../../../../.storybook/utils';
import {
  EuiPinnableListGroup,
  EuiPinnableListGroupProps,
} from './pinnable_list_group';

const meta: Meta<EuiPinnableListGroupProps> = {
  title: 'Display/EuiPinnableListGroup',
  component: EuiPinnableListGroup,
  argTypes: moveStorybookControlsToCategory(
    [
      'bordered',
      'color',
      'flush',
      'gutterSize',
      'maxWidth',
      'showToolTips',
      'size',
      'wrapText',
    ],
    'EuiListGroup props'
  ),
};

export default meta;
type Story = StoryObj<EuiPinnableListGroupProps>;

export const Playground: Story = {
  args: {
    listItems: [
      {
        label: 'First item with pinned: true',

        pinned: true,
      },
      { label: 'Second item with iconType', iconType: 'home' },
      { label: 'Third item with isActive: true', isActive: true },
      {
        label: 'Fourth item with extraAction',
        extraAction: { iconType: 'bell', alwaysShow: true },
      },
    ],
    onPinClick: () => {},
  },
};
