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
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../../.storybook/utils';
import { EuiIcon } from '../../icon';

import { EuiSelect, EuiSelectProps } from './select';

const meta: Meta<EuiSelectProps> = {
  title: 'Forms/EuiSelect',
  component: EuiSelect,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appened',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
  },
  args: {
    fullWidth: false,
    isLoading: false,
    hasNoInitialSelection: false,
    compressed: false,
    // set up for easier testing/QA
    isInvalid: false,
    disabled: false,
    id: '',
    name: '',
  },
};
// adding onChange for visibility
enableFunctionToggleControls(meta, ['onChange', 'onMouseUp']);
disableStorybookControls(meta, ['inputRef']);

export default meta;
type Story = StoryObj<EuiSelectProps>;

export const Playground: Story = {
  args: {
    defaultValue: 'option-2',
    options: [
      { value: 'option-1', text: 'Option 1' },
      { value: 'option-2', text: 'Option 2' },
      { value: 'option-3', text: 'Option 3' },
    ],
  },
};
