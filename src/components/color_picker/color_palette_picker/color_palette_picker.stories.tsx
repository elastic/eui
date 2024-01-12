/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { euiPaletteColorBlind } from '../../../services';

import {
  EuiColorPalettePicker,
  EuiColorPalettePickerProps,
} from './color_palette_picker';

const meta: Meta<EuiColorPalettePickerProps<string>> = {
  title: 'EuiColorPalettePicker',
  component: EuiColorPalettePicker,
  argTypes: {
    placeholder: { control: 'text' },
    append: { control: 'text' },
    prepend: { control: 'text' },
  },
  args: {
    // Component defaults
    selectionDisplay: 'palette',
    disabled: false,
    readOnly: false,
    fullWidth: false,
    compressed: false,
    isLoading: false,
    isInvalid: false,
    isOpen: false,
  },
};

export default meta;
type Story = StoryObj<EuiColorPalettePickerProps<string>>;

export const Playground: Story = {
  args: {
    palettes: [
      {
        value: 'palette1',
        title: 'Palette 1',
        palette: euiPaletteColorBlind(),
        type: 'fixed',
      },
    ],
    valueOfSelected: 'palette1',
  },
};
