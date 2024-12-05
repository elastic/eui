/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VIS_COLOR_STORE_EVENTS } from '@elastic/eui-theme-common';

import {
  EUI_VIS_COLOR_STORE,
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  useUpdateEffect,
} from '../../../services';
import { EuiSpacer } from '../../spacer';
import {
  EuiColorPaletteDisplay,
  EuiColorPaletteDisplayProps,
} from './color_palette_display';

const meta: Meta<EuiColorPaletteDisplayProps> = {
  title: 'Forms/EuiColorPalettePicker/EuiColorPaletteDisplay',
  component: EuiColorPaletteDisplay,
  args: {
    // Component defaults
    type: 'fixed',
    size: 's',
  },
};

export default meta;
type Story = StoryObj<EuiColorPaletteDisplayProps>;

export const Playground: Story = {
  args: {
    palette: euiPaletteColorBlind(), // static input
  },
  render: function Render({ palette, ...rest }: EuiColorPaletteDisplayProps) {
    const [_palette, setPalette] = useState(palette);

    // subscribe to theme-related vis_color changes
    useEffect(() => {
      const storeId = EUI_VIS_COLOR_STORE.subscribe(
        VIS_COLOR_STORE_EVENTS.UPDATE,
        () => {
          setPalette(euiPaletteColorBlind());
        }
      );

      return () => {
        EUI_VIS_COLOR_STORE.unsubscribe(VIS_COLOR_STORE_EVENTS.UPDATE, storeId);
      };
    }, []);

    useUpdateEffect(() => {
      setPalette(palette);
    }, [palette]);

    return <EuiColorPaletteDisplay palette={_palette} {...rest} />;
  },
};

const paletteWithStops = [
  { stop: 100, color: 'white' },
  { stop: 250, color: 'lightgray' },
  { stop: 320, color: 'gray' },
  { stop: 470, color: 'black' },
];

export const PaletteWithStops: Story = {
  args: {
    palette: paletteWithStops,
  },
};

/**
 * VRT only
 */

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  render: () => (
    <>
      <EuiColorPaletteDisplay
        type="fixed"
        palette={euiPaletteForStatus(6)}
        size="xs"
      />
      <EuiSpacer />
      <EuiColorPaletteDisplay
        type="gradient"
        palette={euiPaletteForTemperature(4)}
        size="s"
      />
      <EuiSpacer />
      <EuiColorPaletteDisplay
        type="gradient"
        palette={paletteWithStops}
        size="m"
      />
    </>
  ),
};

export const HighContrast: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
