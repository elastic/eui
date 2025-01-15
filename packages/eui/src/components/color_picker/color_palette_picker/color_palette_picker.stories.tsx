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
import { fireEvent, waitFor } from '@storybook/test';

import { within } from '../../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import { euiPaletteColorBlind, euiPaletteForStatus } from '../../../services';

import {
  EuiColorPalettePicker,
  EuiColorPalettePickerProps,
} from './color_palette_picker';
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

export const AppendedTitles: Story = {
  parameters: {
    controls: { include: ['palettes', 'valueOfSelected'] },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    palettes: [
      {
        value: 'palette1',
        title: 'Elastic',
        append: (
          <EuiText color="subdued" size="xs">
            <span
              css={css`
                display: inline-block;
              `}
            >
              Default
            </span>
          </EuiText>
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('show popover on click', async () => {
      await waitFor(async () => {
        await fireEvent.click(canvas.getByRole('button'));
      });
      await canvas.waitForEuiPopoverVisible();
    });
  },
};
