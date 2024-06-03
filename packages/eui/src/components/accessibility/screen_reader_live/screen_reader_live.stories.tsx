/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiScreenReaderLive,
  EuiScreenReaderLiveProps,
} from './screen_reader_live';

const meta: Meta<EuiScreenReaderLiveProps> = {
  title: 'Utilities/EuiScreenReaderLive',
  component: EuiScreenReaderLive,
  args: {
    // Component defaults
    role: 'status',
    isActive: true,
    focusRegionOnTextChange: false,
  },
  parameters: {
    loki: {
      // There are no visual elements to test
      skip: true,
    },
  },
};

export default meta;
type Story = StoryObj<EuiScreenReaderLiveProps>;

export const Playground: Story = {
  args: {
    children: 'You have new notifications',
  },
};
