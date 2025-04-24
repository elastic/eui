/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';
import { EuiCheckboxGroup, EuiCheckboxGroupProps } from './checkbox_group';

const meta: Meta<EuiCheckboxGroupProps> = {
  title: 'Forms/EuiCheckboxGroup',
  component: EuiCheckboxGroup,
  args: {
    disabled: false,
    compressed: false,
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiCheckboxGroupProps>;

export const Playground: Story = {
  args: {
    options: [
      { id: 'checkbox-1', label: 'Checkbox 1' },
      { id: 'checkbox-2', label: 'Checkbox 2' },
      { id: 'checkbox-3', label: 'Checkbox 3', disabled: true },
      { id: 'checkbox-4', label: 'Checkbox 4', disabled: true },
    ],
    idToSelectedMap: {
      'checkbox-2': true,
      'checkbox-4': true,
    },
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
