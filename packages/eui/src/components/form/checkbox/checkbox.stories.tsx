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
} from '../../../../.storybook/utils';
import { EuiCheckbox, EuiCheckboxProps, TYPES } from './checkbox';

const meta: Meta<EuiCheckboxProps> = {
  title: 'Forms/EuiCheckbox',
  component: EuiCheckbox,
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'radio',
      options: [undefined, ...TYPES],
    },
  },
  args: {
    checked: false,
    compressed: false,
    disabled: false,
    indeterminate: false,
    // set up for easier testing/QA
    id: '',
  },
};
enableFunctionToggleControls(meta, ['onChange']);
disableStorybookControls(meta, ['inputRef']);

export default meta;
type Story = StoryObj<EuiCheckboxProps>;

export const Playground: Story = {
  args: {
    id: 'checkbox',
    label: 'Checkbox label',
  },
};
