/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import { euiPaletteColorBlind, euiPaletteForStatus } from '../../../services';

import {
  EuiColorPalettePicker,
  EuiColorPalettePickerProps,
} from './color_palette_picker';
import { EuiBadge } from '../../badge';
import { EuiText } from '../../text';

const meta: Meta<EuiColorPalettePickerProps<string>> = {
  title: 'Forms/EuiColorPalettePicker/EuiColorPalettePicker',
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
      {
        value: 'palette2',
        title: 'Palette 2',
        palette: euiPaletteForStatus(10),
        type: 'gradient',
      },
    ],
    valueOfSelected: 'palette1',
  },
};

export const CustomTitles: Story = {
  argTypes: {
    palettes: {
      control: false,
    },
  },
  args: {
    palettes: [
      {
        value: 'palette1',
        title: (
          <div
            css={({ euiTheme }) => css`
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: ${euiTheme.size.xs};
            `}
          >
            <EuiText
              aria-hidden="true"
              className="euiColorPalettePicker__itemTitle"
              size="xs"
            >
              Elastic
            </EuiText>
            <EuiBadge color="hollow">Default</EuiBadge>
          </div>
        ),
        palette: euiPaletteColorBlind(),
        type: 'fixed',
      },
      {
        value: 'pallette2',
        title: 'Status',
        palette: euiPaletteForStatus(10),
        type: 'gradient',
      },
    ],
    valueOfSelected: 'palette1',
  },
};
