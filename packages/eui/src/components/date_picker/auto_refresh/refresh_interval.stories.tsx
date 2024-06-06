/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';
import { REFRESH_UNIT_OPTIONS } from '../types';

import {
  EuiRefreshInterval,
  EuiRefreshIntervalProps,
} from './refresh_interval';

const meta: Meta<EuiRefreshIntervalProps> = {
  title: 'Forms/EuiRefreshInterval',
  component: EuiRefreshInterval,
  argTypes: {
    intervalUnits: {
      control: 'radio',
      options: [undefined, ...REFRESH_UNIT_OPTIONS],
    },
  },
  args: {
    isPaused: true,
    refreshInterval: 1000,
    minInterval: 0,
  },
};
enableFunctionToggleControls(meta, ['onRefreshChange']);

export default meta;
type Story = StoryObj<EuiRefreshIntervalProps>;

export const Playground: Story = {};
