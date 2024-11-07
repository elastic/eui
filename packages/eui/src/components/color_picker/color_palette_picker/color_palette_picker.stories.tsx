/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EUI_VIS_COLOR_STORE,
  euiPaletteColorBlind,
  useUpdateEffect,
} from '../../../services';

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
