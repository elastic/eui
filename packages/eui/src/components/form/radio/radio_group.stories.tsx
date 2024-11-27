/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';
import { EuiRadioGroup, EuiRadioGroupProps } from './radio_group';

const meta: Meta<EuiRadioGroupProps> = {
  title: 'Forms/EuiRadioGroup',
  component: EuiRadioGroup,
  args: {
    compressed: false,
    disabled: false,
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiRadioGroupProps>;

export const Playground: Story = {
  args: {
    options: [
      { id: 'radio-1', label: 'Radio 1', value: 'radio-1' },
      { id: 'radio-2', label: 'Radio 2', value: 'radio-2' },
      { id: 'radio-3', label: 'Radio 3', value: 'radio-3', disabled: true },
    ],
    idSelected: 'radio-2',
    name: 'radio-group',
    // set up for easier testing/QA
    legend: {
      children: 'Group label',
      compressed: false,
      display: 'visible',
    },
  },
};

export const HighContrast: Story = {
  ...Playground,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
