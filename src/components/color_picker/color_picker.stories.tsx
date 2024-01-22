/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiColorPicker, EuiColorPickerProps } from './color_picker';

const meta: Meta<EuiColorPickerProps> = {
  title: 'EuiColorPicker',
  component: EuiColorPicker,
  argTypes: {
    color: { control: 'color' },
    swatches: { control: 'array' }, // TODO: crashes if clicked in Storybook
    append: { control: 'text' },
    prepend: { control: 'text' },
  },
  args: {
    // Component defaults
    showAlpha: false,
    disabled: false,
    readOnly: false,
    fullWidth: false,
    compressed: false,
    isClearable: false,
    isInvalid: false,
    display: 'default',
    mode: 'default',
    secondaryInputDisplay: 'none',
  },
};

export default meta;
type Story = StoryObj<EuiColorPickerProps>;

export const Playground: Story = {};
