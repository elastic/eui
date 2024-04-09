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
  hideStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';

import { EuiFieldText, EuiFieldTextProps } from './field_text';

const meta: Meta<EuiFieldTextProps> = {
  title: 'Forms/EuiFieldText',
  component: EuiFieldText,
  argTypes: {
    // For quicker/easier QA
    icon: { control: 'text' },
    prepend: { control: 'text' },
    append: { control: 'text' },
  },
  args: {
    // Component defaults
    compressed: false,
    fullWidth: false,
    isInvalid: false,
    isLoading: false,
    disabled: false,
    readOnly: false,
    controlOnly: false,
    // Added for easier testing
    placeholder: 'EuiFieldText',
  },
};

export default meta;
type Story = StoryObj<EuiFieldTextProps>;
disableStorybookControls(meta, ['inputRef']);

export const Playground: Story = {};

export const IconShape: Story = {
  argTypes: { icon: { control: 'object' } },
  args: { icon: { type: 'warning', color: 'warning', side: 'left' } },
};
// Move other props below the icon prop
moveStorybookControlsToCategory(IconShape, [
  'compressed',
  'fullWidth',
  'isInvalid',
  'isLoading',
  'disabled',
  'readOnly',
  'placeholder',
  'prepend',
  'append',
]);
// Hide props that remove or won't affect the icon or its positioning
hideStorybookControls(IconShape, ['controlOnly', 'inputRef']);
