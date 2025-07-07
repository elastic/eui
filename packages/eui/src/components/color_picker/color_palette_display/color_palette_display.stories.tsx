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
  useEuiPaletteColorBlind,
  useEuiPaletteColorBlindBehindText,
  useEuiPaletteComplementary,
  useEuiPaletteCool,
  useEuiPaletteForStatus,
  useEuiPaletteForTemperature,
  useEuiPaletteGray,
  useEuiPaletteGreen,
  useEuiPaletteOrange,
  useEuiPaletteRed,
  useEuiPaletteSkyBlue,
  useEuiPaletteWarm,
  useEuiPaletteYellow,
  useEuiTheme,
  useUpdateEffect,
} from '../../../services';
import { EuiSpacer } from '../../spacer';
import { EuiFlexGroup } from '../../flex';
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
      <EuiFlexGroup direction="column" gutterSize="m">
        <Palettes />
        <EuiSpacer />

        <Palettes size="m" />
        <EuiSpacer />

        <Palettes type="gradient" size="m" />
      </EuiFlexGroup>
    </>
  ),
};

export const DarkMode: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
};

export const HighContrast: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

export const HighContrastDarkMode: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
};

const Palettes = (
  props: Pick<EuiColorPaletteDisplayProps, 'type' | 'size'> = {
    type: 'fixed',
    size: 's',
  }
) => {
  const { euiTheme } = useEuiTheme();

  const euiPaletteColorBlind = useEuiPaletteColorBlind();
  const euiPaletteColorBlindBehindText = useEuiPaletteColorBlindBehindText();
  const euiPaletteForStatus = useEuiPaletteForStatus(6);
  const euiPaletteForTemperature = useEuiPaletteForTemperature(4);
  const euiPaletteComplementary = useEuiPaletteComplementary(5);
  const euiPaletteRed = useEuiPaletteRed(6);
  const euiPaletteGreen = useEuiPaletteGreen(6);
  const euiPaletteSkyBlue = useEuiPaletteSkyBlue(6);
  const euiPaletteYellow = useEuiPaletteYellow(6);
  const euiPaletteOrange = useEuiPaletteOrange(6);
  const euiPaletteCool = useEuiPaletteCool(6);
  const euiPaletteWarm = useEuiPaletteWarm(6);
  const euiPaletteGray = useEuiPaletteGray(6);

  const severityPalette = [
    euiTheme.colors.severity.unknown,
    euiTheme.colors.severity.neutral,
    euiTheme.colors.severity.success,
    euiTheme.colors.severity.warning,
    euiTheme.colors.severity.risk,
    euiTheme.colors.severity.danger,
  ];

  return (
    <>
      <EuiColorPaletteDisplay {...props} palette={euiPaletteColorBlind} />
      <EuiColorPaletteDisplay
        {...props}
        palette={euiPaletteColorBlindBehindText}
      />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteForStatus} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteForTemperature} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteComplementary} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteRed} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteGreen} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteSkyBlue} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteYellow} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteOrange} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteCool} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteWarm} />
      <EuiColorPaletteDisplay {...props} palette={euiPaletteGray} />
      <EuiColorPaletteDisplay {...props} palette={paletteWithStops} />
      <EuiColorPaletteDisplay {...props} palette={severityPalette} />
    </>
  );
};
