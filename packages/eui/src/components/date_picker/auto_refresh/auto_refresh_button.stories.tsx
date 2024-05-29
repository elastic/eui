/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';

import { FLUSH_TYPES } from '../../button/button_empty/button_empty';
import { REFRESH_UNIT_OPTIONS } from '../types';

import {
  EuiAutoRefreshButton,
  EuiAutoRefreshButtonProps,
} from './auto_refresh';

const meta: Meta<EuiAutoRefreshButtonProps> = {
  title: 'Forms/EuiAutoRefresh/EuiAutoRefreshButton',
  component: EuiAutoRefreshButton,
  argTypes: {
    intervalUnits: {
      control: 'radio',
      options: [undefined, ...REFRESH_UNIT_OPTIONS],
    },
    flush: {
      control: 'radio',
      options: [undefined, ...FLUSH_TYPES],
    },
  },
  args: {
    isPaused: true,
    refreshInterval: 1000,
    minInterval: 0,
    shortHand: false,
    size: 's',
    color: 'text',
    isDisabled: false,
    isLoading: false,
  },
};
enableFunctionToggleControls(meta, ['onRefreshChange']);
disableStorybookControls(meta, ['buttonRef']);
moveStorybookControlsToCategory(
  meta,
  [
    'size',
    'color',
    'isDisabled',
    'isLoading',
    'target',
    'href',
    'rel',
    'flush',
    'buttonRef',
    'contentProps',
  ],
  'EuiButtonEmpty props'
);

export default meta;
type Story = StoryObj<EuiAutoRefreshButtonProps>;

export const Playground: Story = {};
