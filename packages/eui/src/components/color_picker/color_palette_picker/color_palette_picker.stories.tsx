/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { fireEvent, waitFor } from '@storybook/test';

import { within } from '../../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import {
  EUI_VIS_COLOR_STORE,
  euiPaletteColorBlind,
  euiPaletteForStatus,
  useUpdateEffect,
} from '../../../services';
import { EuiText } from '../../text';

import {
  EuiColorPalettePicker,
  EuiColorPalettePickerPaletteProps,
  EuiColorPalettePickerProps,
} from './color_palette_picker';
import { VIS_COLOR_STORE_EVENTS } from '@elastic/eui-theme-common';

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

const getInitialPalettes = (): EuiColorPalettePickerPaletteProps[] => [
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
];

export const Playground: Story = {
  args: {
    palettes: getInitialPalettes(),
    valueOfSelected: 'palette1',
  },
  render: function Render({
    palettes,
    ...rest
  }: EuiColorPalettePickerProps<string>) {
    const [_palettes, setPalettes] = useState(palettes);

    // subscribe to theme-related vis_color changes
    useEffect(() => {
      const storeId = EUI_VIS_COLOR_STORE.subscribe(
        VIS_COLOR_STORE_EVENTS.UPDATE,
        () => {
          setPalettes(getInitialPalettes());
        }
      );

      return () => {
        EUI_VIS_COLOR_STORE.unsubscribe(VIS_COLOR_STORE_EVENTS.UPDATE, storeId);
      };
    }, []);

    useUpdateEffect(() => {
      setPalettes(palettes);
    }, [palettes]);

    return <EuiColorPalettePicker palettes={_palettes} {...rest} />;
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
